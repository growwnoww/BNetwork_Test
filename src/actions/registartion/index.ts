"use server";
import { db } from "@/db/db";
import { boolean, z } from "zod";
import Web3 from "web3";

export interface ServerActionRes {
  success: boolean;
  msg: string;
  error?: any;
}




const addressSchema = z.string().min(1, "Address cannot be empty");

const web3 = new Web3();

async function isUserRegistered(
  userAddress: string
): Promise<boolean | undefined> {
  try {
    const isUserExist = await db.user.findFirst({
      where: {
        wallet_address: userAddress,
        isRegistered: true,
      },
    });
    console.log("isUserexist", isUserExist);

    if (isUserExist) {
      return true;
    }

    return false;
  } catch (error) {
    console.log("something went wrong in registerUser ", error);
  }
}

export async function verifySponsor(formData: FormData): Promise<{
  status: string;
  message: string;
  redirectUrl?: string;
  address?: string;
}> {
  const address = formData.get("address");

  if (typeof address !== "string") {
    throw new Error("Invalid data type for address.");
  }

  const result = addressSchema.safeParse(address);

  console.log(result);

  if (!result.success) {
    throw new Error(result.error.errors.map((e) => e.message).join(", "));
  }

  const sponsorAddress = result.data;

  const isSponsorExist = await db.user.findFirst({
    where: {
      wallet_address: sponsorAddress,
    },
  });

  console.log("sponser is ", isSponsorExist);
  if (!isSponsorExist) {
    return { status: "failed", message: "sponsor doesn't exist" };
  }

  // await isUserRegistered(sponsorAddress,address);

  return {
    status: "success",
    message: "sponser address verify successfully!",
    address: address,
  };
}

export async function verifyRegisteredUser(
  userAddress: string
): Promise<boolean> {
  try {
    const result = addressSchema.safeParse(userAddress);

    if (!result.success) {
      throw new Error(result.error.errors.map((e) => e.message).join(", "));
    }

    const wallet_address = result.data;

    const isRegister = await isUserRegistered(userAddress);
    console.log("isRegister", isRegister);

    if (!isRegister) {
      return false;
    }

    return true;
  } catch (error) {
    console.log("something went wrong in verifyRegisteredUser", error);
    return false;
  }
}

export async function registerUserInDB(
  userAddress: string,
  referralAddress: string
): Promise<ServerActionRes> {
  try {
    const user = await db.user.findFirst({
      where: {
        wallet_address: userAddress,
      },
    });

    if (user) {
      return { success: true, msg: "user registered through events" };
    }

    const isReferralExist = await db.user.findFirst({
      where: {
        wallet_address: referralAddress,
      },
    });

    if (!isReferralExist) {
      console.log("referral is not exist still we're registering user");
    }

    const BNMaxRewardsCoins = await db.bNCoinConfig.findUnique({
      where: { key: "BNMaxRewardsCoins" },
    });

    if (!BNMaxRewardsCoins) {
      return { success: false, msg: "Configuration not found" };
    }

    let bnCoinRegistration = 0;

    if (
      BNMaxRewardsCoins.BNCoinDistributed! + 0.5 <
      BNMaxRewardsCoins.BNMaxRewardsCoins
    ) {
      bnCoinRegistration = 0.5;
    }

    const last8Characters = userAddress.slice(-8);
    const newBN_ID = "BN" + last8Characters;

    await db.user.create({
      data: {
        wallet_address: userAddress,
        sponser_address: referralAddress,
        bn_id: newBN_ID,
        isRegistered:true,
        bnCoinEarned: {
          create: {
            bn_id: newBN_ID,
            wallet_address: userAddress,
            amount: 0.05,
            timeStamp: new Date(),
          },
        },
      },
    });

    await db.bNCoinConfig.update({
      where: { key: "BNMaxRewardsCoins" },
      data: {
        BNCoinDistributed: {
          increment: bnCoinRegistration, // Adjust based on actual increments
        },
      },
    });

    return { success: true, msg: "user stored successfully in db!" };
  } catch (error) {
    return { success: false, msg: "something went wrong in server" };
  }
}
