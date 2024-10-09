"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";
import { tree } from "next/dist/build/templates/app-page";


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




