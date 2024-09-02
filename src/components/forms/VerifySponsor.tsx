"use client";
import { verifyRegisteredUser, verifySponsor } from "@/actions/registartion";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Web3 from "web3";
import { ethers5Adapter } from "thirdweb/adapters/ethers5";
import { client } from "@/lib/client";
import { defineChain } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { ethers } from "ethers";
import {
  cosmosnetworkAbi,
  cosmosnetworkAddress,
} from "@/contract/cosmosnetwork";

const web3 = new Web3();

export const MainnetChain = defineChain({
  id: 56, // BNB Mainnet chain ID
  rpc: "https://bsc-dataseed.binance.org/", // RPC URL for BNB Mainnet
  nativeCurrency: {
    name: "Binance Coin",
    symbol: "BNB",
    decimals: 18,
  },
});

export const TestnetChain = defineChain({
  id: 97, // BNB Testnet chain ID
  rpc: "https://data-seed-prebsc-1-s1.binance.org:8545/", // RPC URL for BNB Testnet
  nativeCurrency: {
    name: "Binance Coin",
    symbol: "BNB",
    decimals: 18,
  },
});

const VerifySponsor = () => {
  const router = useRouter();
  const { pending } = useFormStatus();
  const { data } = useSession();
  const activeAccount = useActiveAccount();

  const registerUser = async (sponsorAddress: string) => {
    try {
      // Ensure that the correct chain configuration is being passed
      const provider = ethers5Adapter.provider.toEthers({
        client,
        chain: TestnetChain,
      });
 

      const signer = await ethers5Adapter.signer.toEthers({
        client,
        chain: TestnetChain,
        account: activeAccount!,
      });

      console.log("signer", signer);

      const gasPrice = await signer.getGasPrice();
      const gasPriceOg = ethers.BigNumber.from(gasPrice).toNumber();


      // Validate that cosmosnetworkAddress is defined and valid

      const contractInstance = new ethers.Contract(
        "0x04DADba64bc3D2A8e843D17086582b631765eAcB",
        cosmosnetworkAbi,
        signer
      );

      // Get the gas fees
      const gasFee = await contractInstance.gasfees();
      console.log(`gasprice is ${gasPrice} and gas fee ${gasFee}`);
      const convert = Number(gasFee?._hex).toString();
  

      const registration = await contractInstance.registrations(
        sponsorAddress,
        {
          gasPrice: gasPrice,
          gasLimit: "200000",
          value: convert,
        }
      );

      await registration.wait();

      console.log("done ", registration);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.currentTarget);

    try {
      const response = await verifySponsor(formData); // Call server action

      if (response.status === "success") {
        toast.success("Sponsor verified!");
        await registerUser(response.address!);

        const sponsorAddress = formData.get("address")
       

        const result = await verifyRegisteredUser(activeAccount?.address!,response.address!)

        console.log("verify client",result)

      } else {
        // Handle error or display message
        toast.error("Sponsor Address is not registered");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="address">Sponsor Address</Label>
            <Input
              id="address"
              name="address" // Important for formData.get("address") to work
              type="text"
              placeholder="0x01453fdDv.....U8K99"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Verifying..." : "Verify Sponsor"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default VerifySponsor;
