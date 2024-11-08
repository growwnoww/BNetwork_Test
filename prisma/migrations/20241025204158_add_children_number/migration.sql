-- DropIndex
DROP INDEX "bnCoinEarned_wallet_address_userId_key";

-- AlterTable
ALTER TABLE "Children" ADD COLUMN     "childrenNumber" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "universeDirectEarning" DOUBLE PRECISION DEFAULT 0.0,
ADD COLUMN     "universePlanetCount" INTEGER,
ADD COLUMN     "universeUpgradeEarning" DOUBLE PRECISION DEFAULT 0.0;

-- AlterTable
ALTER TABLE "bnCoinEarned" ADD COLUMN     "coinEarnType" TEXT;

-- CreateTable
CREATE TABLE "UniverseUsersPlanet" (
    "id" TEXT NOT NULL,
    "planetNum" INTEGER NOT NULL,
    "planetName" TEXT NOT NULL,
    "planetPrice" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "planetId" TEXT NOT NULL,

    CONSTRAINT "UniverseUsersPlanet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UniversePlanets" (
    "id" TEXT NOT NULL,
    "planetNum" INTEGER NOT NULL,
    "planetName" TEXT NOT NULL,
    "planetPrice" INTEGER NOT NULL,
    "universalCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UniversePlanets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UniverseEarningInfo" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "receiverAddress" TEXT NOT NULL,
    "senderAddress" TEXT NOT NULL,
    "planetName" TEXT NOT NULL,
    "earningType" "EarningType" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UniverseEarningInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UniverseUpgradeEarningTree" (
    "id" TEXT NOT NULL,
    "wallet_address" TEXT NOT NULL,
    "upline_address" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "currentPlanet" INTEGER NOT NULL,

    CONSTRAINT "UniverseUpgradeEarningTree_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UniverseUpgradeTreeChildren" (
    "id" TEXT NOT NULL,
    "wallet_address" TEXT NOT NULL,
    "universeUpgradeEarningTreeId" TEXT NOT NULL,
    "upline_address" TEXT NOT NULL,

    CONSTRAINT "UniverseUpgradeTreeChildren_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UpgradeUniverseEarningHistory" (
    "id" TEXT NOT NULL,
    "wallet_address" TEXT NOT NULL,
    "currentPlanet" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "level" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "universeUpgradeEarningTreeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UpgradeUniverseEarningHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UniversePlanets_planetNum_key" ON "UniversePlanets"("planetNum");

-- CreateIndex
CREATE UNIQUE INDEX "UniversePlanets_planetName_key" ON "UniversePlanets"("planetName");

-- CreateIndex
CREATE INDEX "UniverseUpgradeEarningTree_wallet_address_idx" ON "UniverseUpgradeEarningTree"("wallet_address");

-- CreateIndex
CREATE INDEX "UniverseUpgradeTreeChildren_wallet_address_idx" ON "UniverseUpgradeTreeChildren"("wallet_address");

-- CreateIndex
CREATE INDEX "UpgradeUniverseEarningHistory_wallet_address_idx" ON "UpgradeUniverseEarningHistory"("wallet_address");

-- AddForeignKey
ALTER TABLE "UniverseUsersPlanet" ADD CONSTRAINT "UniverseUsersPlanet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniverseUsersPlanet" ADD CONSTRAINT "UniverseUsersPlanet_planetId_fkey" FOREIGN KEY ("planetId") REFERENCES "UniversePlanets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniverseEarningInfo" ADD CONSTRAINT "UniverseEarningInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniverseUpgradeTreeChildren" ADD CONSTRAINT "UniverseUpgradeTreeChildren_universeUpgradeEarningTreeId_fkey" FOREIGN KEY ("universeUpgradeEarningTreeId") REFERENCES "UniverseUpgradeEarningTree"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UpgradeUniverseEarningHistory" ADD CONSTRAINT "UpgradeUniverseEarningHistory_universeUpgradeEarningTreeId_fkey" FOREIGN KEY ("universeUpgradeEarningTreeId") REFERENCES "UniverseUpgradeEarningTree"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
