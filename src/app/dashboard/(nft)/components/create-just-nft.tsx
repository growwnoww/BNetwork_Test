"use client";
import React, { useEffect, useState } from "react";
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
import { Account, walletConnect } from "thirdweb/wallets";
import { setJustTokenNFTs } from "@/actions/royaltynft";

const CreateJustNFT = () => {
  const activeAccount = useActiveAccount();
  const router = useRouter();

  const energyToken = "0x9A7A2F80FD5Cf89209EC40192f481005cA3A779d";

  const isJustExistToUser = async (
    activeAccount: Account
  ): Promise<boolean> => {
    try {
      const nftContractInstance = await getNftContractInstance(activeAccount);
      const isUser = await nftContractInstance.userMetadata(
        activeAccount.address
      );
      console.log("is user",isUser)
      const isAva = isUser._justToken;
      console.log("is isAva",isAva)

      if(isAva){
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error checking if user exists: ", error);
      return false;
    }
  };

  const createJustNftToken = async () => {
    try {
      if (!activeAccount) {
        toast.error("Please Connect Wallet");
        router.push("/");
        return;
      }

      const nftContractInstance = await getNftContractInstance(activeAccount);
      const isUserHasJustNFT = await isJustExistToUser(activeAccount);
      if (isUserHasJustNFT) {
        toast('You have already Just NFT!', {
          icon: 'ℹ️',
        });
        return;
      }

      console.log("nft", nftContractInstance);
      const res = await nftContractInstance?.purchaseJustToken();

      await res.wait();

      await setJustNFTTokenInDB(activeAccount.address);

      router.refresh()

      console.log("tranx ", res);
    } catch (error) {
      const err = error as { code?: string; message?: string };
    
      if (err.code) {

        switch (err.code) {
          case 'UNPREDICTABLE_GAS_LIMIT':
            console.error("Unpredictable gas limit error: ", err);
            toast.error("Transaction failed due to unpredictable gas limit.");
            break;
          case 'INSUFFICIENT_FUNDS':
            console.error("Insufficient funds for transaction: ", err);
            toast.error("Insufficient funds to complete the transaction.");
            break;
          default:
            console.error("Ethers.js error occurred: ", err);
            toast.error("An error occurred during the transaction.");
        }
      } else {
        // General error handling
        console.error("Unexpected error occurred: ", err.message || error);
        toast.error("Something went wrong. Please try again.");
      }   
    }
  };

  const setJustNFTTokenInDB = async (address:string) =>{
    try {

      const response =  await setJustTokenNFTs(address,0);

      if(!response.status){
        toast.error(response.message);
        return;
      }

      toast.success(response.message)

    } catch (error) {
      console.log("something went wrong  setJustNFTTokenInDB",error)
    }
  }

  

  return (
    <div className="flex flex-col  md:w-screen lg:w-fit  lg:flex-row  items-center justify-center mt-10 mx-12 gap-x-5 gap-y-5 lg:gap-y-0">
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
            src="/just_spaceship.mp4"
            type="video/mp4"
            className="rounded-xl "
          />
        </video>
      </div>
      <div className=" lg:w-[60%] lg:h-[34rem] flex flex-col gap-y-3  mb-5">
        <div className="flex flex-col gap-y-6">
          <div className="text-3xl lg:text-5xl font-semibold">Just Spaceship NFT</div>

          {/* <div className="flex gap-x-3 items-center">
            <p>Contract Address:</p>
            <span className="text-muted-foreground/70 text-base">
              {activeAccount?.address}
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
          </div> */}
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
            <span className="text-muted-foreground text-sm bg-neutral-800 p-2 rounded-sm w-fit"> ℹ️ Make Sure You have 5 packages in CosMos nad Universe Network To get Just NFT  </span>
         
          </div>
        </div>

        <div className="flex gap-x-3">
          <Button
            className="rounded-[7px] font-semibold text-lg py-2 px-10"
            onClick={createJustNftToken}
          >
            Create Just NFT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateJustNFT;
