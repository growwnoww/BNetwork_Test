'use server'

import { auth } from "@/auth";
import { db } from "@/db/db";
import { string } from "zod";


export interface cosmosautpoolType {
    id: string,
    recycleNumber: number,
    reg_user_address: string,
    bn_id: string,
    planetName: string,
    amount: number,
    currentPosition: number,
    currentLevel: number,
    timestamp: Date,
    autoPoolId: string
}

export const cosmosautopooldata = async(planetName:string):Promise <cosmosautpoolType [] | null>=>{
    const session = await auth()
    if(!session?.user.wallet_address){
        return null;
    }
    try {
        const publicAddress = session.user.wallet_address

    
        const user = await db.user.findFirst({
          where:{
            wallet_address:publicAddress,
          },
          include:{
            cosmosPlanets:true
          }
        });
    
        if(!user){
          return null;
        }
    
        const isPlanetBought = user?.cosmosPlanets.some((planet)=> planet.planetName === planetName)
    
        if(!isPlanetBought){
          return null;
        }
    
        const cosMosAutoPool = await db.cosMosAutoPool.findFirst({
        where:{
          reg_user_address:user.wallet_address,
          planetName:planetName
        },
        include:{
          autoPoolEarningHistory:true
        }
        })
    
        console.log('user is ',cosMosAutoPool)
        console.log('autoPoolEarningHistory is ',cosMosAutoPool?.autoPoolEarningHistory)
    
    
        if(!cosMosAutoPool){
          return null
        }

        const data:cosmosautpoolType[] | null =  cosMosAutoPool.autoPoolEarningHistory
    
        return data
    
    
    
        
      } catch (error) {
        return null
      }
}