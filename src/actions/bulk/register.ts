"use server";

import { db } from "@/db/db";
import { ServerActionRes } from "../registartion";
import { referralsArrayType, RegistereBulkTypes } from "./type";

export const updateTotalTeam = async (wallet_address:string, i :number)=>{

  try {

    if(i > 10 ){
      return;
    }

  

    const user = await db.user.findFirst({
      where:{
        wallet_address
      },
      include:{
        cosmosPlanets:true,
      }
    });

    if(!user){
      return;
    }

    const decendentCount = await db.ancestors.count({
      where:{
        wallet_address
      }
    })

    console.log("decendent count "+decendentCount+"wallet address"+wallet_address)


      const updateTotalTeamCount = await db.user.upsert({
        where: {
          wallet_address: wallet_address
        },
        update: {
          totalTeam_Count: decendentCount, // Increment sponsor's direct team count
        },
        create: {
          wallet_address: wallet_address,
          totalTeam_Count: 0, 
        },
      });

      console.log("updateTotalTeamCount",updateTotalTeamCount.totalTeam_Count+"user is "+updateTotalTeamCount.wallet_address+"i value "+i)

    if(!user.sponser_address){
      return
    }

    i = i+1
    console.log("i is inc",i)

    updateTotalTeam(user.sponser_address,i)

  
    
  }catch (error) {
    
  }
}


export const updateAncestors = async (sponsor: string, currentUser: string) => {
  try {
    const user = await db.user.findUnique({
      where: { wallet_address: currentUser },
      include: { ancestors: true },
    });

    if (!user) {
      throw new Error("Current user not found");
    }

    const referrer = await db.user.findUnique({
      where: { wallet_address: sponsor },
      include: { ancestors: true },
    });


    console.log("referrer is ",referrer?.wallet_address)
    if (!referrer) {
      throw new Error("Referrer not found");
    }

    let stackAncestors: referralsArrayType[] = [];

    // Push referrer to stack first
    stackAncestors.push({
      wallet_address: referrer.wallet_address,
      ancestorsNumber: 1,
      id:referrer.id
    });

    console.log("first push referrer",stackAncestors)

    // Then, push referrer's ancestors to the stack
    if(referrer.ancestors.length < 0){
    
    }
    else{
    const sortedAncestors = referrer.ancestors.sort(
      (a, b) => a.ancestorsNumber - b.ancestorsNumber
    );

    console.log("sorted ancestors",sortedAncestors)

    sortedAncestors.forEach((ancestor) => {
      if (stackAncestors.length < 10) {

        console.log("i am push in stack",ancestor.wallet_address)
        stackAncestors.push({
          id: ancestor.id,
          wallet_address: ancestor.wallet_address,
          ancestorsNumber: ancestor.ancestorsNumber + 1, // Increment ancestorsNumber accordingly
        });
      }
    })
  }


    // No need to slice since we're already limiting to 10
    console.log("stackAncestors after all push", stackAncestors);

    // Remove any existing ancestors already in user's ancestors list
    const newAncestors = stackAncestors.filter(
      (ancestor) =>
        !user.ancestors.some(
          (existing) => existing.wallet_address === ancestor.wallet_address
        )
    );

    console.log('after removing exisitng one',newAncestors)

    if (newAncestors.length > 0) {
      const createAncestorsPromises = newAncestors.map((ancestor) =>
        db.ancestors.create({
          data: {
            wallet_address: ancestor.wallet_address,
            userId: user.id,
            ancestorsNumber: ancestor.ancestorsNumber,
            createdAt: new Date(), // Assign order based on the index
          },
        })
      );

      await Promise.all(createAncestorsPromises);
      console.log("Created ancestors");
    } else {
      console.log("No new ancestors to add");
    }

    // Update user with new ancestors, connect them
    await db.user.update({
      where: { id: user.id },
      data: {
        ancestors: {
          connect: newAncestors.map((ancestor) => ({
            userId_wallet_address: {
              wallet_address: ancestor.wallet_address,
              userId: user.id,
            },
          })),
        },
      },
      include: { ancestors: true },
    });

    // Update ancestorsNumber for the new ancestors
    const updateAncestorsNumberPromises = newAncestors.map((ancestor) =>
      db.ancestors.updateMany({
        where: {
          userId: user.id,
          wallet_address: ancestor.wallet_address,
        },
        data: {
          ancestorsNumber: ancestor.ancestorsNumber,
        },
      })
    );

    await Promise.all(updateAncestorsNumberPromises);

    let i = 0;

     await updateTotalTeam(currentUser,i)
  } catch (error) {
    console.log("Something went wrong in the updateAncestors function", error);
  }
};

export async function registrationInBulk(
  data: RegistereBulkTypes
): Promise<ServerActionRes> {
  try {
    const {
      regId,
      wallet_address,
      sponser_address,
      registeredTime,
      sponser_regId,
    } = data;

    console.log("data ", data);

    const user = await db.user.findFirst({
      where: {
        wallet_address: wallet_address,
      },
    });

    if (user) {
      return { success: false, msg: "user registered already" };
    }

    const sponser = await db.user.findFirst({
      where: {
        wallet_address: sponser_address,
      },
      include: {
        bnCoinEarned: true,
        direct_team: true,
      },
    });



    if (!sponser) {
      return { success: false, msg: "sponser not registered" };
    }

    const last8Characters = wallet_address.slice(-8);
    const newBNId = "BN" + last8Characters;

    const BNMaxRewardsCoins = await db.bNCoinConfig.findUnique({
      where: { key: "BNMaxRewardsCoins" },
    });

    if (!BNMaxRewardsCoins) {
      return { msg: "Configuration not found", success: false };
    }


    let bnCoinRegistration:number = 0;
    let bnCoinSponserReward:number = 0;

    if (BNMaxRewardsCoins.BNCoinDistributed! + 0.075 < BNMaxRewardsCoins.BNMaxRewardsCoins) {
      bnCoinRegistration = 0.05;
      bnCoinSponserReward = 0.025
    }

    const newUser = await db.user.create({
      data: {
        regId: regId,
        wallet_address: wallet_address,
        sponser_address: sponser_address,
        registeredTime: registeredTime,
        bn_id: newBNId,
        isRegistered: true,
        bnCoinEarned: {
          create: {
            bn_id: newBNId,
            wallet_address: wallet_address,
            amount: bnCoinRegistration,
            timeStamp: new Date(),
          },
        },
      },
    });

    await db.user.upsert({
      where: {
        wallet_address: sponser.wallet_address,
      },
      update: {
        directTeam_Count: { increment: 1 },
      },
      create: {
        wallet_address: sponser.wallet_address,
        directTeam_Count: 1,
      },
    });

    

    let incrementBNCoinAmountSponser = 0;
    sponser.bnCoinEarned.find((item) => {
      const sponserBNCoin = item.amount ?? 0;
      incrementBNCoinAmountSponser = sponserBNCoin + bnCoinSponserReward;
    });


    await db.user.update({
      where: { id: sponser.id },
      data: {
        direct_team: {
          create: {
            wallet_address: newUser.wallet_address,
            id: newUser.id,
          },
        },
        bnCoinEarned:{
          create:{
            bn_id:newUser.bn_id!,
            wallet_address:newUser.wallet_address,
            amount:bnCoinSponserReward,
            timeStamp:new Date()
          },
        }
      },
      include: { direct_team: true ,bnCoinEarned:true},
    });
   


      await db.bNCoinConfig.update({
      where: { key: "BNMaxRewardsCoins" },
      data: {
        BNCoinDistributed: {
          increment: bnCoinRegistration + bnCoinSponserReward, 
        },
        BNMaxAirDropCoins:{
          decrement:bnCoinRegistration + bnCoinSponserReward
        }
      },
     });

   

    // Update ancestors (Assumed logic exists elsewhere)
    await updateAncestors(sponser.wallet_address, wallet_address);

    return { success: true, msg: `User ${regId} saved successfully` };
  } catch (error) {
    console.log("error in the registraton bulk", error);
    return {
      success: false,
      msg: "something went wrong in the registrationInBulk",
    };
  }
}


