/*
  Warnings:

  - Added the required column `virtualAirline_id` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OnAirCompany" ADD COLUMN     "virtualAirline_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "AppConfig" (
    "id" SERIAL NOT NULL,
    "appTitle" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VirtualAirline" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "AirlineCode" TEXT NOT NULL,
    "Id" TEXT NOT NULL,
    "WorldId" TEXT NOT NULL,
    "InitalOwnerEquity" INTEGER,
    "PercentDividendsToDistribute" DOUBLE PRECISION,
    "LastDividendsDistribution" TIMESTAMP(3),
    "ImageName" TEXT,
    "ForceAssignJobsToPilots" BOOLEAN,
    "AutomaticallyAssignJobWhenTaken" BOOLEAN,
    "AutomaticallyAssignJobWhenLoaded" BOOLEAN,
    "RestrictEmployeesUsage" BOOLEAN,
    "RestrictLoadingVAJobsIntoNonVAAircraft" BOOLEAN,
    "RestrictLoadingNonVAJobsIntoVAAircraft" BOOLEAN,
    "MemberCount" INTEGER,
    "LastConnection" TIMESTAMP(3),
    "LastReportDate" TIMESTAMP(3),
    "Reputation" DOUBLE PRECISION,
    "CreationDate" TIMESTAMP(3) NOT NULL,
    "DifficultyLevel" INTEGER,
    "UTCOffsetinHours" DOUBLE PRECISION,
    "Paused" BOOLEAN,
    "Level" INTEGER,
    "LevelXP" INTEGER,
    "TransportEmployeeInstant" BOOLEAN,
    "TransportPlayerInstant" BOOLEAN,
    "ForceTimeInSimulator" BOOLEAN,
    "UseSmallAirports" BOOLEAN,
    "UseOnlyVanillaAirports" BOOLEAN,
    "EnableSkillTree" BOOLEAN,
    "CheckrideLevel" INTEGER,
    "EnableLandingPenalities" BOOLEAN,
    "EnableEmployeesFlightDutyAndSleep" BOOLEAN,
    "AircraftRentLevel" INTEGER,
    "EnableCargosAndChartersLoadingTime" BOOLEAN,
    "InSurvival" BOOLEAN,
    "PayBonusFactor" DOUBLE PRECISION,
    "EnableSimFailures" BOOLEAN,
    "DisableSeatsConfigCheck" BOOLEAN,
    "RealisticSimProcedures" BOOLEAN,
    "TravelTokens" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VirtualAirline_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VirtualAirline_AirlineCode_key" ON "VirtualAirline"("AirlineCode");

-- CreateIndex
CREATE UNIQUE INDEX "VirtualAirline_Id_key" ON "VirtualAirline"("Id");

-- AddForeignKey
ALTER TABLE "OnAirCompany" ADD CONSTRAINT "OnAirCompany_virtualAirline_id_fkey" FOREIGN KEY ("virtualAirline_id") REFERENCES "VirtualAirline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
