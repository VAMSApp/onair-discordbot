/*
  Warnings:

  - You are about to drop the column `AircraftRentLevel` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `AirlineCode` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `AutomaticallyAssignJobWhenLoaded` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `AutomaticallyAssignJobWhenTaken` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `CheckrideLevel` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `CreationDate` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `DifficultyLevel` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `DisableSeatsConfigCheck` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `EnableCargosAndChartersLoadingTime` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `EnableEmployeesFlightDutyAndSleep` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `EnableLandingPenalities` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `EnableSimFailures` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `EnableSkillTree` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `ForceAssignJobsToPilots` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `ForceTimeInSimulator` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `Guid` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `ImageName` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `InSurvival` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `InitalOwnerEquity` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `LastConnection` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `LastDividendsDistribution` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `LastReportDate` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `Level` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `LevelXP` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `MemberCount` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `Paused` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `PayBonusFactor` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `PercentDividendsToDistribute` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `RealisticSimProcedures` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `Reputation` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `RestrictEmployeesUsage` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `RestrictLoadingNonVAJobsIntoVAAircraft` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `RestrictLoadingVAJobsIntoNonVAAircraft` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `TransportEmployeeInstant` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `TransportPlayerInstant` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `TravelTokens` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `UTCOffsetinHours` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `UseOnlyVanillaAirports` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `UseSmallAirports` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the `OnAirCompany` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[airlineCode]` on the table `VirtualAirline` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[guid]` on the table `VirtualAirline` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[apiKey]` on the table `VirtualAirline` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `airlineCode` to the `VirtualAirline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apiKey` to the `VirtualAirline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creationDate` to the `VirtualAirline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guid` to the `VirtualAirline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `VirtualAirline` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OnAirCompany" DROP CONSTRAINT "OnAirCompany_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "OnAirCompany" DROP CONSTRAINT "OnAirCompany_virtualAirlineId_fkey";

-- DropIndex
DROP INDEX "VirtualAirline_AirlineCode_key";

-- DropIndex
DROP INDEX "VirtualAirline_Guid_key";

-- AlterTable
ALTER TABLE "VirtualAirline" DROP COLUMN "AircraftRentLevel",
DROP COLUMN "AirlineCode",
DROP COLUMN "AutomaticallyAssignJobWhenLoaded",
DROP COLUMN "AutomaticallyAssignJobWhenTaken",
DROP COLUMN "CheckrideLevel",
DROP COLUMN "CreationDate",
DROP COLUMN "DifficultyLevel",
DROP COLUMN "DisableSeatsConfigCheck",
DROP COLUMN "EnableCargosAndChartersLoadingTime",
DROP COLUMN "EnableEmployeesFlightDutyAndSleep",
DROP COLUMN "EnableLandingPenalities",
DROP COLUMN "EnableSimFailures",
DROP COLUMN "EnableSkillTree",
DROP COLUMN "ForceAssignJobsToPilots",
DROP COLUMN "ForceTimeInSimulator",
DROP COLUMN "Guid",
DROP COLUMN "ImageName",
DROP COLUMN "InSurvival",
DROP COLUMN "InitalOwnerEquity",
DROP COLUMN "LastConnection",
DROP COLUMN "LastDividendsDistribution",
DROP COLUMN "LastReportDate",
DROP COLUMN "Level",
DROP COLUMN "LevelXP",
DROP COLUMN "MemberCount",
DROP COLUMN "Name",
DROP COLUMN "Paused",
DROP COLUMN "PayBonusFactor",
DROP COLUMN "PercentDividendsToDistribute",
DROP COLUMN "RealisticSimProcedures",
DROP COLUMN "Reputation",
DROP COLUMN "RestrictEmployeesUsage",
DROP COLUMN "RestrictLoadingNonVAJobsIntoVAAircraft",
DROP COLUMN "RestrictLoadingVAJobsIntoNonVAAircraft",
DROP COLUMN "TransportEmployeeInstant",
DROP COLUMN "TransportPlayerInstant",
DROP COLUMN "TravelTokens",
DROP COLUMN "UTCOffsetinHours",
DROP COLUMN "UseOnlyVanillaAirports",
DROP COLUMN "UseSmallAirports",
ADD COLUMN     "aircraftRentLevel" INTEGER,
ADD COLUMN     "airlineCode" TEXT NOT NULL,
ADD COLUMN     "apiKey" TEXT NOT NULL,
ADD COLUMN     "automaticallyAssignJobWhenLoaded" BOOLEAN,
ADD COLUMN     "automaticallyAssignJobWhenTaken" BOOLEAN,
ADD COLUMN     "checkrideLevel" INTEGER,
ADD COLUMN     "creationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "difficultyLevel" INTEGER,
ADD COLUMN     "disableSeatsConfigCheck" BOOLEAN,
ADD COLUMN     "enableCargosAndChartersLoadingTime" BOOLEAN,
ADD COLUMN     "enableEmployeesFlightDutyAndSleep" BOOLEAN,
ADD COLUMN     "enableLandingPenalities" BOOLEAN,
ADD COLUMN     "enableSimFailures" BOOLEAN,
ADD COLUMN     "enableSkillTree" BOOLEAN,
ADD COLUMN     "forceAssignJobsToPilots" BOOLEAN,
ADD COLUMN     "forceTimeInSimulator" BOOLEAN,
ADD COLUMN     "guid" TEXT NOT NULL,
ADD COLUMN     "imageName" TEXT,
ADD COLUMN     "inSurvival" BOOLEAN,
ADD COLUMN     "initalOwnerEquity" INTEGER,
ADD COLUMN     "lastConnection" TIMESTAMP(3),
ADD COLUMN     "lastDividendsDistribution" TIMESTAMP(3),
ADD COLUMN     "lastReportDate" TIMESTAMP(3),
ADD COLUMN     "level" INTEGER,
ADD COLUMN     "levelXP" INTEGER,
ADD COLUMN     "memberCount" INTEGER,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "paused" BOOLEAN,
ADD COLUMN     "payBonusFactor" DOUBLE PRECISION,
ADD COLUMN     "percentDividendsToDistribute" DOUBLE PRECISION,
ADD COLUMN     "realisticSimProcedures" BOOLEAN,
ADD COLUMN     "reputation" DOUBLE PRECISION,
ADD COLUMN     "restrictEmployeesUsage" BOOLEAN,
ADD COLUMN     "restrictLoadingNonVAJobsIntoVAAircraft" BOOLEAN,
ADD COLUMN     "restrictLoadingVAJobsIntoNonVAAircraft" BOOLEAN,
ADD COLUMN     "transportEmployeeInstant" BOOLEAN,
ADD COLUMN     "transportPlayerInstant" BOOLEAN,
ADD COLUMN     "travelTokens" INTEGER,
ADD COLUMN     "uTCOffsetinHours" DOUBLE PRECISION,
ADD COLUMN     "useOnlyVanillaAirports" BOOLEAN,
ADD COLUMN     "useSmallAirports" BOOLEAN;

-- DropTable
DROP TABLE "OnAirCompany";

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "guid" TEXT NOT NULL,
    "airlineCode" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "lastConnection" TIMESTAMP(3) NOT NULL,
    "lastReportDate" TIMESTAMP(3) NOT NULL,
    "reputation" DOUBLE PRECISION NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,
    "difficultyLevel" INTEGER NOT NULL,
    "uTCOffsetinHours" INTEGER NOT NULL,
    "paused" BOOLEAN NOT NULL,
    "pausedDate" TIMESTAMP(3),
    "level" INTEGER NOT NULL,
    "levelXP" INTEGER NOT NULL,
    "transportEmployeeInstant" BOOLEAN NOT NULL,
    "transportPlayerInstant" BOOLEAN NOT NULL,
    "forceTimeInSimulator" BOOLEAN NOT NULL,
    "useSmallAirports" BOOLEAN NOT NULL,
    "useOnlyVanillaAirports" BOOLEAN NOT NULL,
    "enableSkillTree" BOOLEAN NOT NULL,
    "checkrideLevel" INTEGER NOT NULL,
    "enableLandingPenalities" BOOLEAN NOT NULL,
    "enableEmployeesFlightDutyAndSleep" BOOLEAN NOT NULL,
    "aircraftRentLevel" INTEGER NOT NULL,
    "enableCargosAndChartersLoadingTime" BOOLEAN NOT NULL,
    "inSurvival" BOOLEAN NOT NULL,
    "payBonusFactor" INTEGER NOT NULL,
    "enableSimFailures" BOOLEAN NOT NULL,
    "disableSeatsConfigCheck" BOOLEAN NOT NULL,
    "realisticSimProcedures" BOOLEAN NOT NULL,
    "travelTokens" INTEGER NOT NULL,
    "virtualAirlineId" INTEGER NOT NULL,
    "currentBadgeId" TEXT,
    "currentBadgeUrl" TEXT,
    "currentBadgeName" TEXT,
    "lastWeeklyManagementsPaymentDate" TIMESTAMP(3),
    "onAirSyncedAt" TIMESTAMP(3),
    "ownerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_guid_key" ON "Company"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "Company_airlineCode_key" ON "Company"("airlineCode");

-- CreateIndex
CREATE UNIQUE INDEX "Company_apiKey_key" ON "Company"("apiKey");

-- CreateIndex
CREATE UNIQUE INDEX "Company_ownerId_key" ON "Company"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "VirtualAirline_airlineCode_key" ON "VirtualAirline"("airlineCode");

-- CreateIndex
CREATE UNIQUE INDEX "VirtualAirline_guid_key" ON "VirtualAirline"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "VirtualAirline_apiKey_key" ON "VirtualAirline"("apiKey");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_virtualAirlineId_fkey" FOREIGN KEY ("virtualAirlineId") REFERENCES "VirtualAirline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
