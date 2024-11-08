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
import { registrationInBulk } from "@/actions/bulk/register";
import { RegistereBulkTypes } from "@/actions/bulk/type";
import { BulkPlanetBuyTypes } from "@/actions/planetbuycosmos/types";
import { bulkPlanetBuyCosmos } from "@/actions/planetbuycosmos";
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
  const [usersdetails, setUsersDetails] = useState<RegistereBulkTypes[]>([])

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

      console.log("convert", convert)

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


  const bulkRegistration = async () => {

    try {

      if (!activeAccount?.address) {
        toast.error("no wallet connected");
        return;
      }
      const usersArray: RegistereBulkTypes[] = [];




      const cosmosInstance = await getCosmosContractInstance(activeAccount);

      const totalUser = await cosmosInstance.regCounter();
      const totalCount = Number(totalUser._hex);

      for (let i =7289; i <= 7302; i++) { // limit to first 10 users for example
        const address = await cosmosInstance!.RegisterUserById(i);
        const userDetailsBN = await cosmosInstance!.RegisterUserDetails(address);
        // const hightPlanetCount = await cosmosInstance!.UserPlannet(address);
        const referralId = ethers.BigNumber.from(userDetailsBN.regReferalId).toNumber()
        let pureAddress = await cosmosInstance.RegisterUserById(referralId)
        console.log('pure address', pureAddress)

        if (referralId === 0) {
          pureAddress = "0xF346C0856DF3e220E57293a0CF125C1322cfD778";
        }


        const formattedResponse: RegistereBulkTypes = {
          wallet_address: userDetailsBN.regUser,
          registeredTime: ethers.BigNumber.from(userDetailsBN.regTime).toNumber(),
          regId: ethers.BigNumber.from(userDetailsBN.regId).toNumber(),
          sponser_address: pureAddress,
          sponser_regId: ethers.BigNumber.from(userDetailsBN.regReferalId).toNumber(),
          // teamCount: ethers.BigNumber.from(userDetailsBN.teamCount).toNumber(),
          // hightPlanetCount:ethers.BigNumber.from(hightPlanetCount).toNumber()
        };


        console.log("forrmated res ", formattedResponse)

        usersArray.push(formattedResponse);

        await sendsUserDetailsToServer(formattedResponse);



        console.log(usersArray)

      }


      setUsersDetails(usersArray)







    } catch (error) {
      console.log("something went wrong in the bulk regiseter client ", error)
    }
  }


  const sendsUserDetailsToServer = async (data: RegistereBulkTypes) => {

    try {
      console.log("data coming", data)

      const res = await registrationInBulk(data)

      console.log(`res status ${res.success} adn res msg ${res.msg}`)

    } catch (error) {
      console.log("something went wrong sendsUserDetailsToServer", error)
    }

  }

  const bulkPlanetBuy = async () => {
    try {

      if (!activeAccount?.address) {
        toast.error("no wallet connected");
        return;
      }
      const usersArray: BulkPlanetBuyTypes[] = [];

      const cosmosInstance = await getCosmosContractInstance(activeAccount);

      for (let i = 1; i <=18; i++) {
        let userDetailsBN = await cosmosInstance!.WalletdetailsUser(10, i);
        let userAddress = userDetailsBN.originalUser;


        if (userAddress === "0xebf738543adE1024f3373C415fbB0669E5de327f") {
          userAddress = "0xC928c65bb83Ea7C3A4609046a114670D9fC6217B";
        }

        if (userAddress === "0x92858193B01088FE5809856801064F6a380F3c70") {
          userAddress = "0x2C7f4dB6A0B1df04EA8550c219318C7f2FF3D34C";
        }

        if (userAddress === "0xA7F69414Ae98509A3178BDD0C20f1852DB69f897") {
          userAddress = "0x971F9B00e7C462790Af5229797D4b4fD7863a204";
        }

        if (userAddress === "0x01c44D7f36f818b82105dC3EEc5a411433589769") {
          userAddress = "0x9927A2CBa1b8CEa3554027D42a39AE9a4A8Fe015"
        }

        if (userAddress === "0xa3008d49566f253941Ee6A674d6D27A9F0E75ce7") {
          userAddress = "0x2bE39393cd58Cd1c716BcDB95c7EADC5e30a2478"
        }

        if (userAddress === "0x0C75f2aBebA065292DA923214F6f964Dc807635c") {
          userAddress = "0xcECfEB87955F9038cDc00A1ACe00FA3550c84E2c"
        }

        if (userAddress === "0xe27218d31beA902403Dc12ACa8Ef6aDad086494b") {
          userAddress = "0xBF334d8026DB2Ca2a905235fe8d872C5166EF085";
        }

        if (userAddress === "0x92dc32aAe1e7bEE4148908c019530F50f5eB81e8") {
          userAddress = "0xF0a443703d744BF8eADC0b2b874f519bbb588E95"
        }

        if (userAddress === "0xB64e25fb556aa795E3bc312b2fBdBF88a253F5A1") {
          userAddress = "0x3171061bA2c4AeF5155917F4268F33dD723e7d72"
        }

        if (userAddress === "0xCaADA9c62d67f42af8954dd18E5A3F55d9593e3c") {
          userAddress = "0x38e7f3A4F367f1D20A08D4f8D3Aa86331D2B8224"
        }

        if (userAddress === "0x8Ac37aFA178fA2AFB67A2229238Dbab3Ff21b7F2") {
          userAddress = "0x7Dc5756499AEd788cDfDED70B2CAD86606a8EE4C"
        }

        if (userAddress === "0xbEC2771712Ef6490A5DFDDb70749bdcE4c18CFd6") {
          userAddress = "0x67ff5A40d59C4D320b6eDe763f9380F36D9E14FA"
        }

        if (userAddress === "0x67ff5A40d59C4D320b6eDe763f9380F36D9E14FA") {
          userAddress = "0xBD48FA7b107890a2F59D373F64C9d9dD9d299e03"
        }

        if (userAddress === "0x32b6b83C9dabf61778921F8136a04BBdE654766f") {
          userAddress = "0x2124e4AABE7d845aFfE965732c4E11A158e9535c"
        }

        if (userAddress === "0xBD48FA7b107890a2F59D373F64C9d9dD9d299e03") {
          userAddress = "0x32b6b83C9dabf61778921F8136a04BBdE654766f"
        }

        if (userAddress === "0x2124e4AABE7d845aFfE965732c4E11A158e9535c") {
          userAddress = "0xbEC2771712Ef6490A5DFDDb70749bdcE4c18CFd6"
        }

        if (userAddress === "0xCad6dBe5Ea04730107c4Fb33e2A14b12c750Da4f") {
          userAddress = "0xeF779609b0DD4d06188987Ce4E9D42CCF25a7aDb"
        }

        if (userAddress === "0x28BFf8A4ed97A137d1D4183976B48eba14713faE") {
          userAddress = "0x41Cf5946a968613E4947538Ef4216140BA2e66B1"
        }

        if (userAddress === "0x82760542113205F1104f534bAcA915320ce3cF8A") {
          userAddress = "0xddb86ea4cD745683D08b82cf0D95987FD2649174"
        }

        if (userAddress === "0xd0cD02820C20664E2D445D0ffB353bc27881DdB8") {
          userAddress = "0xaeD0F08AdE0fBa3C1c1302B26a70763d85650044"
        }

        if (userAddress === "0x28017e5ECf1cE9Ee3471d8F826b7a518f8417Add") {
          userAddress = "0xECAC16b7849781dCE73257FDE11b5Fb1582237bd"
        }


        if (userAddress === "0xBdCAC7d3E97a4763951e0EA2C29Fd8769d69D593") {
          userAddress = "0x87e9dbB79A642D206476cD2d85409E61f3c0De52"
        }

        if (userAddress === "0xeF779609b0DD4d06188987Ce4E9D42CCF25a7aDb") {
          userAddress = "0x16E5AEd297Bc44b127476a0466Dff0fC2c4C2740"
        }

        if (userAddress === "0x1076e681c6DD8da73788B09B35059F03bcA08D4e") {
          userAddress = "0x3796bFcDfdcFDAfaaA2aFb93A04fBB871D1cC4C0"
        }

        if (userAddress === "0x0736e1Cf35c7704667Da395b79e43f2446eB4670") {
          userAddress = "0xfCA30Ea3F83e8Fe1171241c23faaCCF769F25850"
        }

        if (userAddress === "0x7Dc5756499AEd788cDfDED70B2CAD86606a8EE4C") {
          userAddress = "0xB5962F305cd1Fe391d63188C656684b1c0cAD900"
        }




        const formattedResponse: BulkPlanetBuyTypes = {
          wallet_address: userAddress,
          planetNum: 10
        };

        console.log("forrmated res ", formattedResponse)

        usersArray.push(formattedResponse);

        const shouldContinue = await sendBuyPlanetToServer(formattedResponse)

        if (!shouldContinue) {
          console.log("Stopping further calls due to unsuccessful server response.");
          break;
        }

        console.log(usersArray)

      }

    } catch (error) {

    }
  }

  const sendBuyPlanetToServer = async (data: BulkPlanetBuyTypes) => {
    try {

      const res = await bulkPlanetBuyCosmos(data)

      if (!res.success) {
        // the code will be stop here no more call for server actions.
        return false
      }
      console.log(`data saved for user ${data.wallet_address}`)
      return true

    } catch (error) {

      return false
    }
  }


  useEffect(() => {
    //  bulkPlanetBuy()
    bulkRegistration()
  }, [])

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
