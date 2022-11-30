/*
  Warnings:

  - You are about to drop the column `companyUuid` on the `OnAirCompany` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyId]` on the table `OnAirCompany` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[airlineCode]` on the table `OnAirCompany` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `aircraftRentLevel` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `airlineCode` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkrideLevel` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creationDate` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficultyLevel` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `disableSeatsConfigCheck` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enableCargosAndChartersLoadingTime` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enableEmployeesFlightDutyAndSleep` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enableLandingPenalities` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enableSimFailures` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enableSkillTree` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forceTimeInSimulator` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inSurvival` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastConnection` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastReportDate` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelXP` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paused` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payBonusFactor` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `realisticSimProcedures` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reputation` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transportEmployeeInstant` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transportPlayerInstant` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `travelTokens` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uTCOffsetinHours` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `useOnlyVanillaAirports` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `useSmallAirports` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OnAirCompany" DROP COLUMN "companyUuid",
ADD COLUMN     "aircraftRentLevel" INTEGER NOT NULL,
ADD COLUMN     "airlineCode" TEXT NOT NULL,
ADD COLUMN     "checkrideLevel" INTEGER NOT NULL,
ADD COLUMN     "companyId" TEXT NOT NULL,
ADD COLUMN     "creationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "currentBadgeId" TEXT,
ADD COLUMN     "currentBadgeName" TEXT,
ADD COLUMN     "currentBadgeUrl" TEXT,
ADD COLUMN     "difficultyLevel" INTEGER NOT NULL,
ADD COLUMN     "disableSeatsConfigCheck" BOOLEAN NOT NULL,
ADD COLUMN     "enableCargosAndChartersLoadingTime" BOOLEAN NOT NULL,
ADD COLUMN     "enableEmployeesFlightDutyAndSleep" BOOLEAN NOT NULL,
ADD COLUMN     "enableLandingPenalities" BOOLEAN NOT NULL,
ADD COLUMN     "enableSimFailures" BOOLEAN NOT NULL,
ADD COLUMN     "enableSkillTree" BOOLEAN NOT NULL,
ADD COLUMN     "forceTimeInSimulator" BOOLEAN NOT NULL,
ADD COLUMN     "inSurvival" BOOLEAN NOT NULL,
ADD COLUMN     "lastConnection" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lastReportDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lastWeeklyManagementsPaymentDate" TIMESTAMP(3),
ADD COLUMN     "level" INTEGER NOT NULL,
ADD COLUMN     "levelXP" INTEGER NOT NULL,
ADD COLUMN     "paused" BOOLEAN NOT NULL,
ADD COLUMN     "pausedDate" TIMESTAMP(3),
ADD COLUMN     "payBonusFactor" INTEGER NOT NULL,
ADD COLUMN     "realisticSimProcedures" BOOLEAN NOT NULL,
ADD COLUMN     "reputation" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "transportEmployeeInstant" BOOLEAN NOT NULL,
ADD COLUMN     "transportPlayerInstant" BOOLEAN NOT NULL,
ADD COLUMN     "travelTokens" INTEGER NOT NULL,
ADD COLUMN     "uTCOffsetinHours" INTEGER NOT NULL,
ADD COLUMN     "useOnlyVanillaAirports" BOOLEAN NOT NULL,
ADD COLUMN     "useSmallAirports" BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OnAirCompany_companyId_key" ON "OnAirCompany"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "OnAirCompany_airlineCode_key" ON "OnAirCompany"("airlineCode");
