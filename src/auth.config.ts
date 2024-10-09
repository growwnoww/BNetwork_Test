import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import { db } from "./db/db";
import { NextRequest } from "next/server";
import { ethers } from "ethers";



function verifyMessage(nonce: string, signedNonce: string): string {
  const messageHash = ethers.utils.hashMessage(nonce);
  const signerAddress = ethers.utils.recoverAddress(messageHash, signedNonce);
  
  console.log("signer", signerAddress);
  return signerAddress;
}


async function authorizeWeb3Wallet(
    credentials: Partial<Record<"publicAddress" | "signedNonce", any>>, 
    req:NextRequest
) {
    console.log("credentials", credentials);
  
    if (!credentials) return null;
  
  
    const { publicAddress, signedNonce } = credentials;

  
    const user = await db.user.findUnique({
      where: {
        wallet_address:publicAddress,
      },
      include: {
        cryptoLoginNonce: true,
      },
    });
  
    if (!user?.cryptoLoginNonce) return null;
  
    const signerAddress = verifyMessage(user.cryptoLoginNonce.nonce, signedNonce);
  
    console.log("signerAddress ", signerAddress);
  
    if (signerAddress !== publicAddress) return null;
  
    if (user.cryptoLoginNonce.expires < new Date()) return null;
  
    const isRegister = await db.user.findFirst({
      where: {
        wallet_address: signerAddress,
      },
    });
  
    return {
      id: user.id,
      wallet_address: user.wallet_address,
      isRegistered: isRegister?.isRegistered,
    };
  }
  

export default {
  providers: [
    Credentials({
        id: "crypto",
        name: "Crypto Wallet Auth",
        credentials: {
          publicAddress: { label: "Public Address", type: "text" },
          signedNonce: { label: "Signed Nonce", type: "text" },
        },
        //@ts-ignore
        authorize:authorizeWeb3Wallet
    }),
  ],
} satisfies NextAuthConfig
