"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Upload } from "lucide-react";
import Image from "next/image";
import { getUserNFTs, setMergeNFTs } from "@/actions/royaltynft";
import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { GetNFTSTypes } from "@/actions/royaltynft/types";
import UserNFTs from "./user-nfts";
import { getNFTName, getNftNumber } from "@/helper";
import { useRecoilState } from "recoil";
import { disableIdsAtom, nft2Info, nft3Info, selectNFT2, selectNFT3 } from "@/store/recoil-store/nftStates";
import { getNftContractInstance } from "@/contract/royaltynfts/nft-contract-instance";
import { ethers } from "ethers";


interface NFTUploadProps {
  isOpen: boolean;
  nftName: string;
  nftId: number;
  box:number
  onOpenChange?: (open: boolean) => void;
}

const NFTUpload = ({ isOpen, nftName, nftId ,box}: NFTUploadProps) => {
  const activeAccount = useActiveAccount();
  const [disableIds, setDisableIds] = useRecoilState(disableIdsAtom);
  const [isSelectedNFT2,setSelectedNFT2] = useRecoilState(selectNFT2);
  const [isSelectedNFT3,setSelectedNFT3] = useRecoilState(selectNFT3);
  const [nft2Details,setNFT2Details] = useRecoilState(nft2Info);
  const [nft3Details,setNFT3Details] = useRecoilState(nft3Info);

  const router = useRouter();
  const [nfts, setNFTs] = useState<GetNFTSTypes[] | undefined>([]);


  const handleNFTSelect = (nftInfo:GetNFTSTypes) =>{
    console.log("handleNFTSelect")

     // If nft2 is not selected, set it as selected
  if (!isSelectedNFT2) {
    console.log("Selecting NFT for nft2");
    setDisableIds((prevId) => [...prevId, nftInfo.tokenId]); // Disable this NFT
    setSelectedNFT2(true);
    setNFT2Details(nftInfo);
  }
  // If nft2 is selected and nft3 is not, set nft3
  else if (!isSelectedNFT3) {
    console.log("Selecting NFT for nft3");
    setDisableIds((prevId) => [...prevId, nftInfo.tokenId]); // Disable this NFT
    setSelectedNFT3(true);
    setNFT3Details(nftInfo);
  }
    
  }






  useEffect(() => {
    if (!activeAccount?.address) {
      router.push("/");
      toast.error("please connect wallet again");
      return;
    }

    const geUserNFTFromServer = async () => {
      const data: GetNFTSTypes[] | undefined = await getUserNFTs(
        activeAccount?.address
      );
      console.log("data", data);
      setNFTs(data);
    };

    geUserNFTFromServer();
  }, []);

  const filteredNFTs = nfts?.filter((data) => {
  
    const nftNameServer = getNFTName(data.tokenType); // Get the NFT name from tokenType
    const isDisabled = disableIds.includes(data.tokenId); // Check if the tokenId is in disableIds
    return nftName === nftNameServer && !isDisabled && data.tokenType !== 0 && data.tokenId !== nftId // Show only if nftName is valid and tokenId is not disabled
  });

  console.log("filerNFTs", filteredNFTs);

  return (
    <div>
      <Dialog open={isOpen}>
        <DialogTrigger asChild>
          <Button variant="none" className="">
            <Upload />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] lg:max-w-3xl h-[30rem]">
          <DialogHeader>
            <p className="text-center font-semibold text-xl">
              Select NFT to Merge
            </p>
          </DialogHeader>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-x-5">
            {filteredNFTs &&
              filteredNFTs.map((data) => (
                <div key={data.id} onClick={()=>handleNFTSelect(data)}>
                  <p>{box}</p>
                  <Image
                    key={data.tokenId} // Use a unique key for each image
                    src={`/${getNFTName(data.tokenType)}Img.png`}
                    alt="NFTImg"
                    height={200}
                    width={200}
                  />
                </div>
              ))}
          </div>

          <DialogFooter className=" flex sm:space-x-5 sm:items-center sm:justify-center ">
            <Button onClick={()=>handleNFTSelect}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NFTUpload;
