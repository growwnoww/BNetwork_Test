'use server'

import { SigninSchema } from '@/schema/SignSchema'
import { error } from 'console';
import {z} from 'zod'
import { signIn } from '@/auth';
import { signOut } from '@/auth';
export type SignInResponse = { success: string } | { error: string };


export const signin = async(values:z.infer<typeof SigninSchema>) =>{
   console.log("helo from server")
    const validatedFields = SigninSchema.safeParse(values);
    console.log("validatedFields",validatedFields)

    if(!validatedFields.success){
        return {error:"Invalid Fields"}
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
        
    } catch (error) {
        
        console.log('something went wrong',error)
    }

    return {success:"User signned in!"}

}


export const signout = async ()=>{
    try {
        console.log('lets do sign out')
      const op =  await signOut({redirect:false})
      console.log('op',op)
    } catch (error) {
        console.log("something went wrong in signOut",error)
    }
}