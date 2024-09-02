/*
  Warnings:

  - The primary key for the `Ancestors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Ancestors` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `DirectTeam` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `DirectTeam` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `EarningInfo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `EarningInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Ancestors" DROP CONSTRAINT "Ancestors_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Ancestors_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "DirectTeam" DROP CONSTRAINT "DirectTeam_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "DirectTeam_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "EarningInfo" DROP CONSTRAINT "EarningInfo_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "EarningInfo_pkey" PRIMARY KEY ("id");
