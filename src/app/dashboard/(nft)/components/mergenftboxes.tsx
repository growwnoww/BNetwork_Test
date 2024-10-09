"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { setMergeNFTs } from "@/actions/royaltynft";
import { getNftContractInstance } from "@/contract/royaltynfts/nft-contract-instance";
import { getNftNumber } from "@/helper";
import { ethers } from "ethers";
import router from "next/router";
import toast from "react-hot-toast";
import { useActiveAccount } from "thirdweb/react";
import { useRecoilState } from "recoil";
import { disableIdsAtom } from "@/store/recoil-store/nftStates";

export function MergeNFTBoxes({nftName,nftId}:{nftName:string,nftId:number}) {
  const [files, setFiles] = useState<File[]>([]);
  const activeAccount = useActiveAccount()
  const [disableIds, setDisableIds] = useRecoilState(disableIdsAtom);

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  const mergeNFTs = async ()=>{
    try {

      if(!activeAccount?.address){
        toast.error("May Be Your wallet is not connected, Please Check wallet Conect ")
        router.push('/dashboard/nft')
        return
      }

      const nftContractInstance = await getNftContractInstance(activeAccount);

      if(disableIds.length > 2){
        toast.error("select at least three nfts")
      }

      console.log("ids disbale  ",disableIds)

      const res = await nftContractInstance.mergeNFT(nftId,disableIds[0],disableIds[1],getNftNumber(nftName));

      await res.wait();


      const txHash = res.hash;

      const etherProvider = nftContractInstance.provider;
      const receipt = await etherProvider.getTransactionReceipt(txHash);
  

      const transferEventABI = [
        "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
      ];
  

      const iface = new ethers.utils.Interface(transferEventABI);
      let newTokenId ;
  
      receipt.logs.forEach((log) => {
        try {
          const parsedLog = iface.parseLog(log);
          if (parsedLog.name === "Transfer") {
            const { from, to, tokenId } = parsedLog.args;
            console.log(`Transfer event: from ${from}, to ${to}, tokenId ${tokenId.toString()}`);
            if(from == "0x0000000000000000000000000000000000000000" ){
              newTokenId =   ethers.BigNumber.from(tokenId).toNumber()
            }

          }
        } catch (error) {

        }
      });

      console.log("newTokenId",newTokenId)

      toast.success("Merge Successfully")
      updateMergeNFTs(activeAccount.address,getNftNumber(nftName),nftId,disableIds[0],disableIds[1],newTokenId!)
      
    } catch (error) {
      console.log("someting went wrong in the nft merge",error)
    }
  }


  const updateMergeNFTs  = async (wallet_address:string,currentTokenType:number,tokenId1:number,tokenId2:number,tokenId3:number,newTokenId:number) =>{
    try {

      const res = await setMergeNFTs(wallet_address,currentTokenType,tokenId1,tokenId2,tokenId3,newTokenId);

      if(!res.status){
        toast.error(res.message)
      }


      toast.success(res.message)


      
    } catch (error) {
      
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto min-h-72 border border-dashed bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload  nftName={nftName} nftId={nftId}/>

      <div className="flex items-center justify-center my-5">
      <Button variant="default" className="px-10" onClick={()=>mergeNFTs()}>Merge</Button>

      </div>

    </div>
  );
}
