import { auth } from "@/auth";
import UserInfo from "./components/user-info";
import { redirect } from "next/navigation";
import { UserTypes } from "@/actions/dashboardhome/types";
import { getUsersDetails } from "@/actions/dashboardhome";
import NFTsInfo from "./components/nft-info";


 export default async function DashboardPage () {

    const session = await auth();

    if(!session?.user.wallet_address || !session?.user.isRegistered){
      redirect('/')
    }
   
    const user:UserTypes | null = await getUsersDetails(session.user.wallet_address)
    

  return (

      <main className="flex bg-muted/35 md:w-screen lg:w-full flex-col h-full   gap-4 p-4 lg:gap-6 lg:p-2 lg:py-4 ">
  
         <UserInfo user={user} />

         <NFTsInfo/>
         
        
        {/* <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="col-span-2">
            <RecentTransaction />
          </div>
          <div className="">
            <NFTInfoComponent />
          </div>
        </div> */}
      </main>

  );
};


