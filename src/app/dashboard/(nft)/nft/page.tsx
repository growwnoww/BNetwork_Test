import { auth } from "@/auth";
import RenderNFTBuy from "../components/nft-buy-main";
import React from "react";
import UserNFTs from "../components/user-nfts";
import { getUserNFTs } from "@/actions/royaltynft";
import { redirect } from "next/navigation";
import { GetNFTSTypes } from "@/actions/royaltynft/types";





export default async function NFTPage() {
  const session = await auth();

  if(!session?.user.wallet_address){
    redirect("/")
  }

  //get user nfs from server actions
  const userNFTs:GetNFTSTypes[] | undefined= await getUserNFTs(session.user.wallet_address);

  return (
     <>

       <RenderNFTBuy/>
       <UserNFTs userNFTs={userNFTs!} />
 
    </>
  );
}
