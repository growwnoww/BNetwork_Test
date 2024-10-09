'use server'

import { auth } from "@/auth"
import { db } from "@/db/db"
import { isSessionActive } from "@/helper/serverhelper"
import { UserTypes } from "./types"




export async function getUsersDetails(userAddress:string):Promise <UserTypes | null>{
    try {
        const session = await isSessionActive()
        if(!session){
         return null;
        }
         
        const user = await db.user.findFirst({
            where:{
                wallet_address:userAddress
            }
        })

        if(!user){
           return null;
        }

        //sponsor,
        //bn_id,
        //directteam count & total count
        //latestplanet


        return user;
        

    } catch (error) {
        console.log("something went wrong in getUserDetails server action",error)
        return null;
    }
}