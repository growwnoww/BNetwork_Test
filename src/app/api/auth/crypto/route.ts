// app/api/auth/crypto/route.ts

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from "@/db/db";

interface CryptoNonceResponse {
  nonce: string;
  expires: string;
}

export async function POST(req: NextRequest) {
  console.log("i am called")
  const { publicAddress } = await req.json();


  // Generate a nonce
  const nonce = crypto.randomBytes(32).toString("hex");

  // Set the expiry of the nonce to 1 hour
  const expires = new Date(new Date().getTime() + 1000 * 60 * 60);

  // Create or update the nonce for the given user
  await db.user.upsert({
    where: { wallet_address:publicAddress },
    create: {
      wallet_address:publicAddress,
      cryptoLoginNonce: {
        create: {
          nonce,
          expires,
        },
      },
    },
    update: {
      cryptoLoginNonce: {
        upsert: {
          create: {
            nonce,
            expires,
          },
          update: {
            nonce,
            expires,
          },
        },
      },
    },
  });

  console.log("everything is fine here")

  return NextResponse.json({
    nonce,
    expires: expires.toISOString(),
  });

}
