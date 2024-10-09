"use client";
import React, { act, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, TrendingUp, User } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import toast from "react-hot-toast";
import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";

import { getNftContractInstance } from "@/contract/royaltynfts/nft-contract-instance";
import TransferNFT from "./transfernft-dialog";
import { Account } from "thirdweb/wallets";
import { tr } from "@faker-js/faker";
import TransactionLoader from "@/components/(dashboard-page)/loader";
import { setEarthNFTs } from "@/actions/royaltynft";
import { ethers } from "ethers";
import { ethers5Adapter } from "thirdweb/adapters/ethers5";

const BuyEarthNFT = () => {
  const activeAccount = useActiveAccount();
  const router = useRouter();
  const energyToken = "0x9A7A2F80FD5Cf89209EC40192f481005cA3A779d";
  const [isTransactionInProgress, setIsTransactionInProgress] = useState(false);
  const [isTransactionSuccessful, setIsTransactionSuccessful] = useState<
    boolean | null
  >(null);

  const isJustNFTExistToUser = async (
    activeAccount: Account
  ): Promise<boolean> => {
    try {
      const nftContractInstance = await getNftContractInstance(activeAccount);
      const isUser = await nftContractInstance.userMetadata(
        activeAccount.address
      );
      if (isUser) {
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error checking if user exists: ", error);
      return false;
    }
  };
  const buyEarthNFT = async () => {
    try {
      if (!activeAccount) {
        toast.error("Please Connect Wallet");
        router.push("/");
        return;
      }
  
      setIsTransactionInProgress(true);
  
      const nftContractInstance = await getNftContractInstance(activeAccount);
  
      const isUserHasJustNFT = await isJustNFTExistToUser(activeAccount);
  
      if (!isUserHasJustNFT) {
        toast("You do not have Just NFT!", {
          icon: "ℹ️",
        });
        setIsTransactionInProgress(false);
        return;
      }
  
      console.log("nft", nftContractInstance);
      const res = await nftContractInstance?.mint(energyToken);
      await res.wait();
  

      const txHash = res.hash;

      const etherProvider = nftContractInstance.provider;
      const receipt = await etherProvider.getTransactionReceipt(txHash);
  

      const transferEventABI = [
        "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
      ];
  

      const iface = new ethers.utils.Interface(transferEventABI);
      let tokenIdIs ;
  
      receipt.logs.forEach((log) => {
        try {
          const parsedLog = iface.parseLog(log);
          if (parsedLog.name === "Transfer") {
            const { from, to, tokenId } = parsedLog.args;
            console.log(`Transfer event: from ${from}, to ${to}, tokenId ${tokenId.toString()}`);
            tokenIdIs  = ethers.BigNumber.from(tokenId).toNumber()
          }
        } catch (error) {

        }
      });
  
      toast.success("NFT Buy Successfully!");
      setEarthNFTDB(activeAccount.address,tokenIdIs!)
      setIsTransactionSuccessful(true);
      router.refresh()
      console.log("tranx ", res);
    } catch (error) {
      console.log("something went wrong in the buy nft", error);
      toast.error("something went wrong");
      setIsTransactionSuccessful(false);
    } finally {
      setIsTransactionInProgress(false);
    }
  };
  

  const setEarthNFTDB = async (address:string,tokenId:number) =>{
  

      try {

        console.log("token id ",tokenId)
        const response =  await setEarthNFTs(address,1,tokenId);
  
        if(!response.status){
          toast.error(response.message);
          return;
        }
  
        toast.success(response.message)
  
      } catch (error) {
        console.log("something went wrong  setJustNFTTokenInDB",error)
      }
      
    
  }

  useEffect(() => {
    if (isTransactionSuccessful !== null) {
      if (isTransactionSuccessful) {
        router.refresh();
      } else {
        console.log("Transaction failed.");
      }
    }
  }, [isTransactionSuccessful, router]);

  return (
    <div className="flex flex-col  md:w-screen lg:w-fit  lg:flex-row  items-center justify-center mt-10 mx-12 gap-x-5 gap-y-5 lg:gap-y-0">
      {isTransactionInProgress ? (
        <TransactionLoader loaderDescription="Please wait unitl minting...." />
      ) : (
        <>
         <div className="  lg:w-[35%] lg:h-[34rem]   ">
            <video
              autoPlay
              loop
              muted
              height={700}
              width={700}
              className=" rounded-xl"
            >
              <source
                src="/Earth_NFT.mp4"
                type="video/mp4"
                className="rounded-xl "
              />
            </video>
          </div>
          <div className=" lg:w-[60%] lg:h-[34rem] flex flex-col gap-y-3  mb-5">
            <div className="flex flex-col gap-y-6">
              <div className="text-3xl lg:text-5xl font-semibold">Earth NFT</div>

              <div className="flex gap-x-3 items-center">
                <p>Contract Address:</p>
                <span className="text-muted-foreground/70 text-base">
                  {/* {activeAccount?.address} */}
                </span>
                <Link
                  href="https://bscscan.com/address/0x296a2f11a0dB84fEd2C8eA0Ba252D1659B582d27"
                  target="_blank"
                >
                  {" "}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <ArrowUpRight className="hover:bg-zinc-700 hover:rounded-full" />
                      </TooltipTrigger>
                      <TooltipContent>View Contract</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
              <div className="flex  gap-x-3">
                <div className="bg-primary/30 rounded-full p-1 px-3 w-fit flex">
                  <User />
                  <p>10</p>
                </div>
                <div className="flex gap-x-2 text-muted-foreground/40">
                  <TrendingUp />
                  <span>Top 21% </span>
                </div>
              </div>

              <div className="flex flex-col  gap-x-2">
                <span className="text-muted-foreground"> Current Price </span>
                <div className="flex">
                  <span className="text-2xl"> 3000 BNS Energy Token </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center w-full  lg:flex-row gap-x-3 gap-y-3">
              <Button
                className="rounded-[7px] font-semibold text-lg py-3 px-10"
                onClick={buyEarthNFT}
              >
                Buy NFT
              </Button>
              <TransferNFT />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BuyEarthNFT;
