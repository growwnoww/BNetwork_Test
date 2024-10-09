import { auth } from "@/auth";


export async function isSessionActive():Promise <boolean>{
    const session = await auth();

    if(session?.user.isRegistered || session?.user.wallet_address){
        return true;
    }

    return false;
}