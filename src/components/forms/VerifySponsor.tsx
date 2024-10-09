"use client";
import { verifyRegisteredUser, verifySponsor } from "@/actions/registartion";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ethers5Adapter } from "thirdweb/adapters/ethers5";
import { client, TestnetChain } from "@/lib/client";
import { defineChain } from "thirdweb";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { ethers } from "ethers";
import {
  cosmosnetworkAbi,
  cosmosnetworkAddress,
} from "@/contract/cosmosnetwork";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  activeAccountState,
  activeWalletState,
  sessionDataState,
  walletConnectedState,
} from "@/store/recoil-store/walletState";
import { signin, SignInResponse } from "@/actions/signin";
import { getCosmosContractInstance } from "@/contract/cosmosnetwork/cosmos-contract-instance";
import { RegistereBulkTypes, registrationInBulk } from "@/actions/bulk/register";
interface SuccessResponse {
  success: boolean;
}

interface ErrorResponse {
  error: any;
}
interface ValueTypes {
  publicAddress: string;
  signedNonce: string;
}

type SigninResponse = SuccessResponse | ErrorResponse;

const VerifySponsor = () => {
  const router = useRouter();
  const { pending } = useFormStatus();
  const { data } = useSession();
  const activeAccount = useActiveAccount();
  const [activeAccountAddress, setActiveAccountAddress] =
    useRecoilState(activeAccountState);
  const [walletConnected, setWalletConnected] =
    useRecoilState(walletConnectedState);
  const setActiveWallet = useSetRecoilState(activeWalletState);
  const setSessionData = useSetRecoilState(sessionDataState);
  const wallet = useActiveWallet();
  const [usersdetails,setUsersDetails] = useState<RegistereBulkTypes[]>([])

  function isSuccessResponse(
    response: SigninResponse
  ): response is SuccessResponse {
    return "success" in response && response.success;
  }

  async function onSignInWithCrypto() {
    try {
      const publicAddress = activeAccount?.address;
      console.log("Public address:", publicAddress);

      if (!publicAddress) {
        throw new Error(
          "Active account is not available or does not have an address."
        );
      }

      // Update Recoil state with the active account address
      setActiveAccountAddress(publicAddress);
      setWalletConnected(true);
      setActiveWallet(wallet);

      await new Promise((resolve) => setTimeout(resolve, 100));

      const response = await fetch("/api/auth/crypto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicAddress }),
      });

      const responseData = await response.json();
      console.log("res data is ", responseData);

      const signedNonce = await activeAccount?.signMessage({
        message: responseData.nonce,
      });
      console.log("Signed nonce:", signedNonce);

      const values: ValueTypes = {
        publicAddress,
        signedNonce,
      };

      const res: SigninResponse = await signin(values);

      if (isSuccessResponse(res)) {
        router.push("/dashboard");
        return;
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  const registerUser = async (sponsorAddress: string) => {
    try {
      // Ensure that the correct chain configuration is being passed
  

      const signer = await ethers5Adapter.signer.toEthers({
        client,
        chain: TestnetChain,
        account: activeAccount!,
      });

      console.log("signer", signer);

      const gasPrice = await signer.getGasPrice();


      const contractInstance = new ethers.Contract(
        "0xc190CDF5D2a53a18d4932d5E5af5FCa63eEcAFA4",
        cosmosnetworkAbi,
        signer
      );

      // Get the gas fees
      const gasFee = await contractInstance.gasfees();
      console.log(`gasprice is ${gasPrice} and gas fee ${gasFee}`);
      const convert = Number(gasFee?._hex).toString();

      console.log("convert",convert)

      const registration = await contractInstance.registrations(
        sponsorAddress,
        {
          gasPrice: gasPrice,
          gasLimit: "200000",
          value: convert,
        }
      );

      await registration.wait();

      if (registration.hash) {
        toast.success("Registration Successfully");
        await onSignInWithCrypto();
      }

      console.log("done ", registration);
    } catch (error) {
      console.log("Something went wrong", error);
      toast.error("Registration Failed");
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

        const sponsorAddress = formData.get("address");

        const result = await verifyRegisteredUser(activeAccount?.address!);

        console.log("verify client", result);
      } else {
        // Handle error or display message
        toast.error("Sponsor Address is not registered");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    }
  };


  const bulkRegistration = async ()=>{

    try {

      if(!activeAccount?.address){
        toast.error("no wallet connected");
        return;
      }
      const usersArray:RegistereBulkTypes[]= [];




      const cosmosInstance = await getCosmosContractInstance(activeAccount);

      const totalUser = await cosmosInstance.regCounter();
      const totalCount = Number(totalUser._hex);

      for (let i = 365; i <= 864; i++) { // limit to first 10 users for example
        const address = await cosmosInstance!.RegisterUserById(i);
        const userDetailsBN = await cosmosInstance!.RegisterUserDetails(address);
        // const hightPlanetCount = await cosmosInstance!.UserPlannet(address);
        const referralId =  ethers.BigNumber.from(userDetailsBN.regReferalId).toNumber()
        let pureAddress = await cosmosInstance.RegisterUserById(referralId)
        console.log('pure address',pureAddress)
        
        if(referralId === 0){
          pureAddress = "0xF346C0856DF3e220E57293a0CF125C1322cfD778";
        }


        const formattedResponse:RegistereBulkTypes = {
            wallet_address: userDetailsBN.regUser,
            registeredTime: ethers.BigNumber.from(userDetailsBN.regTime).toNumber(),
            regId: ethers.BigNumber.from(userDetailsBN.regId).toNumber(),
            sponser_address: pureAddress,
            sponser_regId: ethers.BigNumber.from(userDetailsBN.regReferalId).toNumber(),
            // teamCount: ethers.BigNumber.from(userDetailsBN.teamCount).toNumber(),
            // hightPlanetCount:ethers.BigNumber.from(hightPlanetCount).toNumber()
        };


        console.log("forrmated res ",formattedResponse)

        usersArray.push(formattedResponse); 

        await sendsUserDetailsToServer(formattedResponse);

        

        console.log(usersArray)

      }


    setUsersDetails(usersArray)






      
    } catch (error) {
      console.log("something went wrong in the bulk regiseter client ",error)
    }
  }


  const sendsUserDetailsToServer = async (data:RegistereBulkTypes)=>{

    try {
      console.log("data coming",data)

      const res = await registrationInBulk(data)

      console.log(`res status ${res.success} adn res msg ${res.msg}`)
      
    } catch (error) {
      console.log("something went wrong sendsUserDetailsToServer",error)
    }

  }


  useEffect(()=>{
    bulkRegistration()
  },[])

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
