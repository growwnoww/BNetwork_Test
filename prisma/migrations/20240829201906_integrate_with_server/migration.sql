/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `publicAddress` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[wallet_address]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wallet_address` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EarningType" AS ENUM ('DIRECT_EARNING', 'LEVEL_EARNING', 'UPGRADE_EARNING', 'AUTOPOOL_EARNING');

-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_publicAddress_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "emailVerified",
DROP COLUMN "image",
DROP COLUMN "name",
DROP COLUMN "publicAddress",
ADD COLUMN     "bn_id" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "directEarning" DOUBLE PRECISION DEFAULT 0.0,
ADD COLUMN     "directTeam_Count" INTEGER,
ADD COLUMN     "lastestPlanetName" TEXT,
ADD COLUMN     "levelEarning" DOUBLE PRECISION DEFAULT 0.0,
ADD COLUMN     "myLaps" DOUBLE PRECISION DEFAULT 0.0,
ADD COLUMN     "registrationTranxhash" TEXT,
ADD COLUMN     "sponser_address" TEXT,
ADD COLUMN     "totalBNCoin" INTEGER,
ADD COLUMN     "totalTeam_Count" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "upgradeEarning" DOUBLE PRECISION DEFAULT 0.0,
ADD COLUMN     "wallet_address" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CosmosPlanet" (
    "id" TEXT NOT NULL,
    "planetNum" INTEGER NOT NULL,
    "planetName" TEXT NOT NULL,
    "planetPrice" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "planetId" TEXT NOT NULL,

    CONSTRAINT "CosmosPlanet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Planet" (
    "id" TEXT NOT NULL,
    "planetNum" INTEGER NOT NULL,
    "planetName" TEXT NOT NULL,
    "planetPrice" INTEGER NOT NULL,
    "universalCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Planet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DirectTeam" (
    "id" TEXT NOT NULL,
    "wallet_address" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DirectTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ancestors" (
    "id" TEXT NOT NULL,
    "ancestorsNumber" INTEGER NOT NULL,
    "wallet_address" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ancestors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bnCoinEarned" (
    "id" TEXT NOT NULL,
    "bn_id" TEXT NOT NULL,
    "wallet_address" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "timeStamp" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "bnCoinEarned_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BNCoinConfig" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "BNMaxRewardsCoins" INTEGER NOT NULL DEFAULT 50000,
    "BNMaxAirDropCoins" INTEGER NOT NULL DEFAULT 1000,
    "BNCoinDistributed" INTEGER,
    "BNAirDropCoinDistributed" INTEGER,

    CONSTRAINT "BNCoinConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EarningInfo" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "receiverAddress" TEXT NOT NULL,
    "senderAddress" TEXT NOT NULL,
    "planetName" TEXT NOT NULL,
    "earningType" "EarningType" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "EarningInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AutoPool" (
    "id" SERIAL NOT NULL,
    "bn_id" TEXT NOT NULL,
    "planetName" TEXT,
    "reg_user_address" TEXT NOT NULL,
    "universeSlot" INTEGER,
    "parentId" INTEGER,
    "currentRecycle" INTEGER,
    "currentLevel" INTEGER,
    "currentPosition" INTEGER,
    "autoPoolEarning" DOUBLE PRECISION,
    "isRoot" BOOLEAN NOT NULL DEFAULT false,
    "canHaveMoreChildren" BOOLEAN NOT NULL DEFAULT true,
    "childrenId" INTEGER,

    CONSTRAINT "AutoPool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Children" (
    "id" SERIAL NOT NULL,
    "wallet_address" TEXT NOT NULL,
    "planetName" TEXT NOT NULL,
    "parentId" INTEGER NOT NULL,

    CONSTRAINT "Children_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecycleMapping" (
    "id" SERIAL NOT NULL,
    "recycleCount" INTEGER NOT NULL DEFAULT 0,
    "autoPoolId" INTEGER NOT NULL,

    CONSTRAINT "RecycleMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndexMapping" (
    "id" SERIAL NOT NULL,
    "userLevel" INTEGER NOT NULL,
    "userPosition" INTEGER NOT NULL,
    "recycleMappingId" INTEGER NOT NULL,

    CONSTRAINT "IndexMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EarningHistory" (
    "id" SERIAL NOT NULL,
    "recycleNumber" INTEGER NOT NULL,
    "reg_user_address" TEXT NOT NULL,
    "bn_id" TEXT NOT NULL,
    "planetName" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currentPosition" INTEGER NOT NULL,
    "currentLevel" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "autoPoolId" INTEGER NOT NULL,

    CONSTRAINT "EarningHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TempChild" (
    "id" SERIAL NOT NULL,
    "childId" INTEGER NOT NULL,
    "childAddress" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "universalPlanetCount" INTEGER,
    "temporaryChildrenId" INTEGER NOT NULL,

    CONSTRAINT "TempChild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemporaryChildrenSchema" (
    "id" SERIAL NOT NULL,
    "panrentAddress" TEXT NOT NULL,
    "planetName" TEXT NOT NULL,

    CONSTRAINT "TemporaryChildrenSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_IndexMappingUserIds" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CosmosPlanet_userId_planetNum_key" ON "CosmosPlanet"("userId", "planetNum");

-- CreateIndex
CREATE UNIQUE INDEX "Planet_planetNum_key" ON "Planet"("planetNum");

-- CreateIndex
CREATE UNIQUE INDEX "Planet_planetName_key" ON "Planet"("planetName");

-- CreateIndex
CREATE UNIQUE INDEX "DirectTeam_wallet_address_key" ON "DirectTeam"("wallet_address");

-- CreateIndex
CREATE UNIQUE INDEX "DirectTeam_userId_key" ON "DirectTeam"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Ancestors_userId_wallet_address_key" ON "Ancestors"("userId", "wallet_address");

-- CreateIndex
CREATE UNIQUE INDEX "bnCoinEarned_wallet_address_userId_key" ON "bnCoinEarned"("wallet_address", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "BNCoinConfig_key_key" ON "BNCoinConfig"("key");

-- CreateIndex
CREATE UNIQUE INDEX "AutoPool_bn_id_key" ON "AutoPool"("bn_id");

-- CreateIndex
CREATE UNIQUE INDEX "AutoPool_reg_user_address_key" ON "AutoPool"("reg_user_address");

-- CreateIndex
CREATE UNIQUE INDEX "_IndexMappingUserIds_AB_unique" ON "_IndexMappingUserIds"("A", "B");

-- CreateIndex
CREATE INDEX "_IndexMappingUserIds_B_index" ON "_IndexMappingUserIds"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_wallet_address_key" ON "User"("wallet_address");

-- AddForeignKey
ALTER TABLE "CosmosPlanet" ADD CONSTRAINT "CosmosPlanet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CosmosPlanet" ADD CONSTRAINT "CosmosPlanet_planetId_fkey" FOREIGN KEY ("planetId") REFERENCES "Planet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectTeam" ADD CONSTRAINT "DirectTeam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ancestors" ADD CONSTRAINT "Ancestors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bnCoinEarned" ADD CONSTRAINT "bnCoinEarned_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EarningInfo" ADD CONSTRAINT "EarningInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutoPool" ADD CONSTRAINT "AutoPool_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "AutoPool"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Children" ADD CONSTRAINT "Children_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "AutoPool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecycleMapping" ADD CONSTRAINT "RecycleMapping_autoPoolId_fkey" FOREIGN KEY ("autoPoolId") REFERENCES "AutoPool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndexMapping" ADD CONSTRAINT "IndexMapping_recycleMappingId_fkey" FOREIGN KEY ("recycleMappingId") REFERENCES "RecycleMapping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EarningHistory" ADD CONSTRAINT "EarningHistory_autoPoolId_fkey" FOREIGN KEY ("autoPoolId") REFERENCES "AutoPool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TempChild" ADD CONSTRAINT "TempChild_temporaryChildrenId_fkey" FOREIGN KEY ("temporaryChildrenId") REFERENCES "TemporaryChildrenSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IndexMappingUserIds" ADD CONSTRAINT "_IndexMappingUserIds_A_fkey" FOREIGN KEY ("A") REFERENCES "IndexMapping"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IndexMappingUserIds" ADD CONSTRAINT "_IndexMappingUserIds_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
