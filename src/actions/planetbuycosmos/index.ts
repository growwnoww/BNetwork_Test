"use server";
import { auth } from "@/auth";
import { db } from "@/db/db";
import { ServerActionRes } from "../registartion";
import { BulkPlanetBuyTypes, getPlanetDetailsById } from "./types";
import { distributeLevelEarning, distributeUpgradeEaning ,distributeDirectEarning} from "./cosmosearnings";
import { distributeAutopoolEarning } from "./autopoolearning";




const checkUserPlanetBuy = async (planetId: number, userAddress: string) => {

  try {
    const user = await db.user.findFirst({
      where: {
        wallet_address: userAddress,
      },
      include: {
        cosmosPlanets: true,
      },
    });
   
    if(!user){
        return false;
    }
  

    const isUserHasPlanet = user?.cosmosPlanets.some(
      (planet) => planet.planetNum == planetId
    );

    if(!isUserHasPlanet){
        return false;
    }

    return true;
  } catch (error) {
    console.log("something went wrong in the ",error)
  }
};


export const buyPlanetStatus = async (planetId:number) =>{
    
    const session = await auth();

    console.log("session  in action", session);
    console.log(
      "session in the planet buy server action ",
      session?.user.wallet_address
    );
    if (!session || !session.user.wallet_address) {
      return;
    }


  
    try {

        const isPlanetAlreadyBought = await checkUserPlanetBuy(planetId,session.user.wallet_address)

        
        if(!isPlanetAlreadyBought){
            const requestBody = {
                wallet_address: session.user.wallet_address,
                planetNum: Number(planetId),
              };
            console.log('request body',requestBody)
             
            const response = await fetch("http://localhost:4000/api/planet/planetbuy", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
              });
    
        }

        return;
        
    } catch (error) {
        console.log('something went wrong in the buyPlanetStatus',error)
    }
}


const handleEarningsDistribution = async (
  wallet_address: string,
  planetName: string,
  planetNum: number,
  planetPrice: number,
  universalPlanetCount: number, 
  bn_id: string
) => {
  try {
    if (planetName === "Earth") {
      await distributeDirectEarning(wallet_address, planetName);
    }

    await distributeLevelEarning(wallet_address, planetName, planetPrice);

    if (planetName !== "Earth") {
      await distributeUpgradeEaning(
        wallet_address,
        planetNum,
        planetPrice,
        planetName
      );
    }


    await distributeAutopoolEarning(
      wallet_address,
      planetName,
      planetNum,
      planetPrice,
      universalPlanetCount,
      bn_id!
    );
  } catch (error) {
    console.error("Error in earnings distribution:", error);
    throw error; 
  }
};



export const bulkPlanetBuyCosmos = async (data:BulkPlanetBuyTypes):Promise<ServerActionRes>=>{
  try {
    const {wallet_address,planetNum} = data;

    console.log("data planet buy",data)

    const user = await db.user.findFirst({
      where:{
        wallet_address
      },
      include:{
        cosmosPlanets:true
      }
    })

    if(!user){
      return {success:false,msg:"User not found"}
    }





    const isAlreadyBought = user.cosmosPlanets.some((planet) => planet.planetNum === planetNum)

    if(isAlreadyBought){
      console.log(`${planetNum} is already we skip this one`)
      return {success:true,msg:"user already bought this planet"}
    }

    const {planetName,planetPrice} = getPlanetDetailsById(planetNum);

    const planet = await db.$transaction(
      async (db) => {
        const newPlanet = await db.cosmosPlanet.create({
          data: {
            planetName,
            planetNum,
            planetPrice,
            user: { connect: { id: user.id } },
            planet: {
              connectOrCreate: {
                where: { planetNum }, 
                create: {
                  planetName,
                  planetNum,
                  planetPrice,
                },
              },
            },
          },
        });

      
        //Distribute earnings
  

        return newPlanet;
      },
      { maxWait: 5000,  
      timeout: 60000, }
    );

    const updatedPlanet = await db.planet.update({
      where: { planetNum },
      data: {
        universalCount: { increment: 1 },
      },
      select: { universalCount: true },
    });


    await handleEarningsDistribution(
      user.wallet_address,
      planetName,
      planetNum,
      planetPrice,
      updatedPlanet.universalCount,
      user.bn_id!
    );

    console.log('planet res primsa',planet)

    if (!planet) {
      console.log(`Failed to create planet ${planetNum}. Skipping to next.`);
      return {success:false,msg:"something went worng in planet transactin"}

    }

    console.log(`Successfully bought planet ${planetNum}: ${planetName}`);



    return {success:true, msg:`user ${user.regId}   buy ${planetNum} successfully`}
    } catch (error) {
      console.error('Error in bulkPlanetBuyCosmos:', error);
      return { success: false, msg: "Failed to complete bulk planet purchase" };
  }
}


