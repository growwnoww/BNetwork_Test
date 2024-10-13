"use client";
import React, { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActiveAccount } from "thirdweb/react";
import toast from "react-hot-toast";
import {
  getCosmosContractInstance,
  getGasPrice,
} from "@/contract/cosmosnetwork/cosmos-contract-instance";
import { registerUserInDB, ServerActionRes } from "@/actions/registartion";
import { ethers } from "ethers";
import { client, TestnetChain } from "@/lib/client";
import { ethers5Adapter } from "thirdweb/adapters/ethers5";


interface RegisterInputType {
  referral_address: string;
  newuser_address: string;
}

const NewBelieverMain = () => {
  const [registerInputValue, setRegisterInputValue] =
    useState<RegisterInputType>({ referral_address: "", newuser_address: "" });

  const activeAccount = useActiveAccount();

  const handleBelieverRegistration = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRegisterInputValue((prev: RegisterInputType) => ({
      ...prev,
      [id]: value,
    }));

    console.log(registerInputValue);
  };

  const registerUserInSC = async () => {
    try {
      if (!activeAccount?.address) {
        toast.error("Something went wrong, please reconnect your wallet");
        return;
      }
      const contractInstance = await getCosmosContractInstance(activeAccount)
  

      // Check if user already exists
      const isRegistered = await contractInstance.isUserExists(
        registerInputValue.newuser_address
      );
  
      if (isRegistered) {
        toast.error("User Already Registered!");
        return;
      }
  
      // Check if referral exists
      const isReferralExist = await contractInstance.isUserExists(
        registerInputValue.referral_address
      );
  
      if (!isReferralExist) {
        toast.error("Referral Not Registered!");
        return;
      }


      const signer = await ethers5Adapter.signer.toEthers({
        client,
        chain: TestnetChain,
        account: activeAccount!,
      });
  
      // Fetch gas price and gas fees
      const gasPrice = await signer.getGasPrice();
      const gasFee = await contractInstance.gasfees();
  
      console.log(`Gas price: ${gasPrice.toString()}, Gas fee: ${gasFee.toString()}`);
  
      // Convert gas fee to a suitable format
      const gasFeeInWei = Number(gasFee?._hex).toString(); // Make sure gasFee is in the correct format
  
      // Perform the registration
      const buyPlanetResSC = await contractInstance.registrations_user(
        registerInputValue.referral_address, // First: referrerAddress
        registerInputValue.newuser_address,   // Second: MemberAddress
        {
          gasPrice,              // Gas options
          gasLimit: "200000",    // Specify gas limit
          value: gasFeeInWei,    // Use the gas fee
        }
      );
  
      await buyPlanetResSC.wait();
  
      if (buyPlanetResSC.hash) {
        registerUserInServer(
          registerInputValue.newuser_address,
          registerInputValue.referral_address
        );
        toast.success("Registration Successful");
      }
  
    } catch (error) {
      console.log("Something went wrong in registerUserInSC", error);
      toast.error("Registration Failed");
    }
  };
  
  
  

  const registerUserInServer = async (userAddress:string,referral_address:string) =>{
    try {

      const res:ServerActionRes = await registerUserInDB(userAddress,referral_address);

      if(!res.success){
        toast.error(res.msg);
        return
      }

      if(res.success){
        toast.success("user registered successfuly")

      }

      
    } catch (error) {
      console.log("something went wrong registerUserInServer",error)
      toast.error("something went wrong")
    }

  }



  return (
    <div className="w-full flex   min-h-[90vh]  ">
      <Tabs
        defaultValue="registration"
        className="w-full  flex flex-col items-center justify-center "
      >
        <TabsList className="grid  grid-cols-2 w-[400px] ">
          <TabsTrigger value="registration">Registration</TabsTrigger>
          <TabsTrigger value="buyplanet">Buy Planet</TabsTrigger>
        </TabsList>

        <TabsContent value="registration" className="w-[400px] lg:w-[550px]">
          <Card>
            <CardHeader>
              <CardTitle>Registration new user</CardTitle>
              <CardDescription>
                This action lets you do register other user by using there
                wallet address. put the Referral address and new user address
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="referral_address">Referral Address</Label>
                <Input
                  id="referral_address"
                  placeholder="0x12Tr50..."
                  name="referral_address"
                  value={registerInputValue.referral_address}
                  onChange={handleBelieverRegistration}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="newuser_address">New Believer Address</Label>
                <Input
                  id="newuser_address"
                  placeholder="0x12BN50..."
                  value={registerInputValue.newuser_address}
                  onChange={handleBelieverRegistration}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={()=>registerUserInSC()}>Register Believer</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="buyplanet" className="w-[400px] lg:w-[550px]">
          <Card>
            <CardHeader>
              <CardTitle>Buy Planet For User</CardTitle>
              <CardDescription>
                This Action lets you do package for new believer by putting new
                believer address and selecting package
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="believer-address">
                  Believer  Address
                </Label>
                <Input id="believer-address" type="text" />
              </div>
              <div className="space-y-1">
                <Label>Select Package</Label>
                <Select defaultValue="apple">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NewBelieverMain;