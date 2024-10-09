'use server'

import { SigninSchema } from '@/schema/SignSchema'
import { error } from 'console';
import {z} from 'zod'
import { auth, signIn } from '@/auth';
import { signOut } from '@/auth';
import { tree } from 'next/dist/build/templates/app-page';
export type SignInResponse = { success: boolean } | { error: string };


interface Cookie {
    name: string;
    value: string;
    options: {
      [key: string]: any; // Replace with more specific types if known
    };
  }
  
  interface SignOutResponse {
    redirect?: string; // URL to redirect to after sign-out
    cookies: Cookie[]; // Array of cookies to set or clear
  }
  


export const signout = async ():Promise<SignOutResponse | null>=>{
    try {
        console.log('lets do sign out')
      const op =  await signOut({redirect:false})
      return op;
      
    } catch (error) {
        console.log("something went wrong in signOut",error)
        return null
    }
}

export const getSessionStatus = async ():Promise<boolean> =>{
    const session = await auth();

    if(session?.user){
       return true
    }

    return false;
}
export const signin = async(values:z.infer<typeof SigninSchema>):Promise<SignInResponse> =>{
    console.log("helo from server")
     const validatedFields = SigninSchema.safeParse(values);
     console.log("validatedFields",validatedFields)
 
     if(!validatedFields.success){
         return {success:false,error:"Invalid Fields"}
     }
 
     const {publicAddress,signedNonce} = validatedFields.data;
   console.log("validdate data ",validatedFields.data)
     try {
         const res =  await signIn('crypto',{
             publicAddress,
             signedNonce,
             redirect:false
             
         })
         console.log("res ",res)
         if(res){
             return {success:true,error:"false"}
         }
         
     } catch (error) {
         
         console.log('something went wrong',error)
         return {success:false,error:'something went wrong'}
     }
 
     return {success:true,error:'something went wrong'}
 
 
 }