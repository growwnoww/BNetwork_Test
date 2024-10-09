"use server";

import { db } from "@/db/db";
import { ServerActionRes } from "../registartion";

export interface RegistereBulkTypes {
  regId: number;
  wallet_address: string;
  sponser_address: string;
  registeredTime: number;
  sponser_regId: number;
}

interface referralsArrayType {
  id: string;
  wallet_address: string;
  ancestorsNumber: number;
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

    if (!referrer) {
      throw new Error("Referrer not found");
    }

    let updatedAncestors = [];
    let referralSInArrray: referralsArrayType[] = [];

    if (referrer.ancestors.length === 0) {
      updatedAncestors.push({
        wallet_address: referrer.wallet_address,
        ancestorsNumber: 1,
      });
    } else {
      const pushAddressInArray = referrer.ancestors.forEach((user) => {
        referralSInArrray.push({
          id: user.id,
          wallet_address: user.wallet_address,
          ancestorsNumber: user.ancestorsNumber,
        });
      });

      updatedAncestors = [
        ...referralSInArrray,
        {
          wallet_address: referrer.wallet_address,
          ancestorsNumber: referrer.ancestors.length + 1,
        },
      ];
    }

    if (updatedAncestors.length > 10) {
      updatedAncestors = updatedAncestors.slice(-10);
    }

    console.log("updatedAncestors", updatedAncestors);

    let totalTeam = updatedAncestors.map(async (data) => {
      const updateDirectTeam = await db.user.upsert({
        where: {
          wallet_address: data.wallet_address,
        },
        update: {
          totalTeam_Count: { increment: 1 }, // Increment sponsor's direct team count
        },
        create: {
          wallet_address: data.wallet_address,
          totalTeam_Count: 1, // If sponsor doesn't exist, create with count 1
        },
      });
    });

    const newAncestors = updatedAncestors.filter(
      (ancestor) =>
        !user.ancestors.some(
          (existing) => existing.wallet_address === ancestor.wallet_address
        )
    );

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
          increment: bnCoinRegistration + bnCoinSponserReward, // Adjust for actual increments
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
