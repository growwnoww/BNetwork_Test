/*
  Warnings:

  - Made the column `planetName` on table `AutoPool` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "AutoPool_reg_user_address_key";

-- AlterTable
ALTER TABLE "AutoPool" ALTER COLUMN "planetName" SET NOT NULL;

-- CreateTable
CREATE TABLE "NFTBonusHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenId" INTEGER NOT NULL,
    "tokenType" INTEGER NOT NULL,
    "bonusAmount" DOUBLE PRECISION NOT NULL,
    "claminedDate" TIMESTAMP(3) NOT NULL,
    "bonusLaunchDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NFTBonusHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserNFTs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenType" INTEGER NOT NULL,
    "tokenId" INTEGER NOT NULL,
    "mintDate" TIMESTAMP(3) NOT NULL,
    "royaltNFTId" TEXT NOT NULL,

    CONSTRAINT "UserNFTs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoyaltyNFTs" (
    "id" TEXT NOT NULL,
    "tokenType" INTEGER NOT NULL,
    "tokenId" INTEGER NOT NULL,
    "tokenCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "RoyaltyNFTs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NFTTransferHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenType" INTEGER NOT NULL,
    "tokenId" INTEGER NOT NULL,
    "receiver_wallet_address" TEXT NOT NULL,

    CONSTRAINT "NFTTransferHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NFTBonusHistory" ADD CONSTRAINT "NFTBonusHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNFTs" ADD CONSTRAINT "UserNFTs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNFTs" ADD CONSTRAINT "UserNFTs_royaltNFTId_fkey" FOREIGN KEY ("royaltNFTId") REFERENCES "RoyaltyNFTs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFTTransferHistory" ADD CONSTRAINT "NFTTransferHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
