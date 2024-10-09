"use server";

import { db } from "@/db/db";
import { GetNFTSTypes, SetNFTBuyResponseTypes } from "./types";
import { tr } from "@faker-js/faker";

export const getUserNFTs = async (
  wallet_address: string
): Promise<GetNFTSTypes[] | undefined> => {
  try {
    const user = await db.user.findFirst({
      where: {
        wallet_address: wallet_address,
      },
      include: {
        currentNFTs: true,
      },
    });

    if (!user) {
      return;
    }

    return user.currentNFTs;
  } catch (error) {
    console.log("something went wrong in the getUserNFts action", error);
  }
};

export const setJustTokenNFTs = async (
  wallet_address: string,
  tokenType: number
): Promise<SetNFTBuyResponseTypes> => {
  try {
    const user = await db.user.findFirst({
      where: {
        wallet_address,
      },
      include: {
        currentNFTs: true,
      },
    });

    if (!user) {
      return { status: false, message: "user not found" };
    }

    const isJustNFTBuy = user?.currentNFTs.find((nft) => nft.tokenType === 0);

    if (isJustNFTBuy) {
      return { status: false, message: "user already have just tokne" };
    }

    const existingRoyaltyNFT = await db.royaltyNFTs.findFirst({
      where: { tokenType },
    });

    let royaltyNFTId;

    if (existingRoyaltyNFT) {
      royaltyNFTId = existingRoyaltyNFT.id;
    } else {
      const newRoyaltyNFT = await db.royaltyNFTs.create({
        data: {
          tokenId: 0,
          tokenType,
        },
      });
      royaltyNFTId = newRoyaltyNFT.id;
    }

    const createJustNFTToken = await db.userNFTs.create({
      data: {
        tokenType: 0,
        mintDate: new Date(),
        tokenId: 0,
        user: { connect: { id: user.id } },
        royaltNFTS: {
          connect: { id: royaltyNFTId },
        },
      },
    });

    return { status: true, message: "user's Just Token is stored" };
  } catch (error) {
    return { status: false, message: "something went wrong", error: error };
  }
};

export const setEarthNFTs = async (
  wallet_address: string,
  tokenType: number,
  tokenId: number
): Promise<SetNFTBuyResponseTypes> => {
  try {
    const user = await db.user.findFirst({
      where: {
        wallet_address,
      },
      include: {
        currentNFTs: true,
      },
    });

    if (!user) {
      return { status: false, message: "user not found" };
    }

    const isTokenIdExist = user.currentNFTs.find(
      (nft) => nft.tokenId === tokenId
    );

    if (isTokenIdExist) {
      return { status: false, message: `User already have ${tokenId}` };
    }

    const existingRoyaltyNFT = await db.royaltyNFTs.findFirst({
      where: { tokenType },
    });

    let royaltyNFTId;

    if (existingRoyaltyNFT) {
      royaltyNFTId = existingRoyaltyNFT.id;
    } else {
      const newRoyaltyNFT = await db.royaltyNFTs.create({
        data: {
          tokenId: tokenId,
          tokenType,
        },
      });
      royaltyNFTId = newRoyaltyNFT.id;
    }

    const createJustNFTToken = await db.userNFTs.create({
      data: {
        tokenType: tokenType,
        mintDate: new Date(),
        tokenId: tokenId,
        user: { connect: { id: user.id } },
        royaltNFTS: {
          connect: { id: royaltyNFTId },
        },
      },
    });

    return { status: true, message: "Earth NFT mint successfully" };
  } catch (error) {
    return {
      status: false,
      message: "something went wrong in the setEarthNFTS ",
      error: error,
    };
  }
};

export const setMergeNFTs = async (
  wallet_address: string,
  currenttokenType: number,
  tokenId1: number,
  tokenId2: number,
  tokenId3: number,
  newTokenId: number
): Promise<SetNFTBuyResponseTypes> => {
  try {
    const user = await db.user.findFirst({
      where: {
        wallet_address,
      },
      include: {
        currentNFTs: true,
      },
    });

    if (!user) {
      return { status: false, message: "user not found" };
    }

    const isNewTokendExist = user.currentNFTs.find(
      (nft) =>
        nft.tokenId === newTokenId && nft.tokenType === currenttokenType + 1
    );

    if (isNewTokendExist) {
      return { status: false, message: "New token id already have it" };
    }

    const nfts = await db.userNFTs.findMany({
      where: {
        userId: user.id,
        tokenId: { in: [tokenId1, tokenId2, tokenId3] },
        tokenType: currenttokenType,
      },
    });

    if (nfts.length !== 3) {
      return { message: "Invalid NFTs provided for merge", status: false };
    }

    const existingRoyaltyNFT = await db.royaltyNFTs.findFirst({
      where: { tokenType: newTokenId },
    });

    let royaltyNFTId;

    if (existingRoyaltyNFT) {
      royaltyNFTId = existingRoyaltyNFT.id;
    } else {
      const newRoyaltyNFT = await db.royaltyNFTs.create({
        data: {
          tokenId: newTokenId,
          tokenType: newTokenId,
        },
      });
      royaltyNFTId = newRoyaltyNFT.id;
    }

    const newNFT = await db.userNFTs.create({
      data: {
        user: { connect: { id: user.id } },
        tokenType: newTokenId,
        tokenId: newTokenId,
        mintDate: new Date(),
        royaltNFTS: {
          connect: { id: royaltyNFTId },
        },
      },
    });

    await db.userNFTs.deleteMany({
      where: {
        tokenType: currenttokenType,
        tokenId: { in: [tokenId1, tokenId2, tokenId3] },
        userId: user.id,
      },
    });

    return { status: true, message: " NFT merge successfully" };
  } catch (error) {
    return {
      status: false,
      message: "something went wrong in the setMergeNFTs ",
      error: error,
    };
  }
};

