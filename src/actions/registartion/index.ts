'use server';
import { db } from '@/db/db';
import {z} from 'zod'
import Web3 from 'web3';
import { cosmosnetworkAbi, cosmosnetworkAddress } from '@/contract/cosmosnetwork';

const addressSchema = z.string().min(1,"Address cannot be empty")


const web3 = new Web3();


async function isUserRegistered (sponsorAddress:string,userAddress:string):Promise <boolean | undefined >{
    try {

      const isUserExist = await db.user.findFirst({
        where:{
          wallet_address:userAddress
        }
      })

      if(isUserExist){
        return true;
      }

      return false;
      
    
    } catch (error) {
        console.log("something went wrong in registerUser ",error)
    }

}

export async function verifySponsor( formData: FormData): Promise<{ status: string; message: string,redirectUrl?:string,address?:string }>{

  const address = formData.get("address")


   if (typeof address !== "string") {
    throw new Error("Invalid data type for address.");
  }


  const result = addressSchema.safeParse(address);

  console.log(result)

  if (!result.success) {
    throw new Error(result.error.errors.map((e) => e.message).join(", "));
  }

  const sponsorAddress = result.data;

  const isSponsorExist = await db.user.findFirst({
    where:{
        wallet_address:sponsorAddress
    }
  })

  console.log("sponser is ",isSponsorExist)
  if(!isSponsorExist){
    return {status:"failed",message:"sponsor doesn't exist"}
  }

  // await isUserRegistered(sponsorAddress,address);

  return {status:"success",message:"sponser address verify successfully!",address:address}


}

export async function verifyRegisteredUser(userAddress:string,sponsorAddress:string){

  try {
    const result = addressSchema.safeParse(userAddress);

    if (!result.success) {
      throw new Error(result.error.errors.map((e) => e.message).join(", "));
    }

    const wallet_address = result.data;

    const isRegister =  await isUserRegistered(sponsorAddress,userAddress)


    if(!isRegister){
      return {status:"failed",message:"user is not registered in smart contract"}
    }

    
   return {status:"success",message:"user is registered success fully"}
    
  } catch (error) {
    
  }
}