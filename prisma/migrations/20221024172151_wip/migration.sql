/*
  Warnings:

  - You are about to drop the column `createdAt` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `company` table. All the data in the column will be lost.
  - Added the required column `UpdatedAt` to the `company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MissionTypeId` to the `job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "company" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "job" ADD COLUMN     "MissionTypeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "cargo" (
    "Id" SERIAL NOT NULL,
    "CargoTypeId" INTEGER NOT NULL,
    "CargoTypeGuid" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cargo_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "missionType" (
    "Id" SERIAL NOT NULL,
    "Guid" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "ShortName" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "BaseReputationImpact" DOUBLE PRECISION NOT NULL,
    "BasePayFactor" INTEGER NOT NULL,
    "BasePenalityFactor" INTEGER NOT NULL,

    CONSTRAINT "missionType_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "cargoType" (
    "Id" SERIAL NOT NULL,
    "Guid" TEXT NOT NULL,
    "CargoTypeId" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "CargoTypeCategory" INTEGER NOT NULL,
    "MinLbs" INTEGER NOT NULL,
    "MaxLbs" INTEGER NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cargoType_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "charter" (
    "Id" SERIAL NOT NULL,
    "Guid" TEXT NOT NULL,
    "CharterTypeId" INTEGER NOT NULL,

    CONSTRAINT "charter_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "charterType" (
    "Id" SERIAL NOT NULL,
    "Guid" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "CharterTypeCategory" INTEGER NOT NULL,
    "MinLbs" INTEGER NOT NULL,
    "MaxLbs" INTEGER NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "charterType_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "aircraft" (
    "Id" SERIAL NOT NULL,
    "Guid" TEXT NOT NULL,
    "Identifier" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "WorldId" INTEGER NOT NULL,
    "WorldGuid" TEXT NOT NULL,
    "CompanyId" INTEGER NOT NULL,
    "CompanyGuid" TEXT NOT NULL,
    "CurrentAirportGuid" TEXT NOT NULL,
    "AircraftStatus" INTEGER NOT NULL,
    "LastStatusChange" TIMESTAMP(3),
    "CurrentStatusDurationInMinutes" INTEGER,
    "AllowSell" BOOLEAN,
    "AllowRent" BOOLEAN,
    "AllowLease" BOOLEAN,
    "SellPrice" DOUBLE PRECISION,
    "RentHourPrice" DOUBLE PRECISION,
    "Heading" DOUBLE PRECISION,
    "Longitude" DOUBLE PRECISION,
    "Latitude" DOUBLE PRECISION,
    "fuelTotalGallons" DOUBLE PRECISION,
    "fuelWeight" INTEGER,
    "Altitude" DOUBLE PRECISION,
    "FlightState" INTEGER,
    "loadedWeight" DOUBLE PRECISION,
    "zeroFuelWeight" INTEGER,
    "airframeHours" DOUBLE PRECISION,
    "airframeCondition" DOUBLE PRECISION,
    "AirframeMaxCondition" DOUBLE PRECISION,
    "LastAnnualCheckup" TIMESTAMP(3),
    "Last100hInspection" TIMESTAMP(3),
    "LastWeeklyOwnershipPayment" TIMESTAMP(3),
    "LastParkingFeePayment" TIMESTAMP(3),
    "IsControlledByAI" BOOLEAN,
    "HoursBefore100HInspection" DOUBLE PRECISION,
    "ConfigFirstSeats" INTEGER,
    "ConfigBusSeats" INTEGER,
    "ConfigEcoSeats" INTEGER,
    "SeatsReservedForEmployees" INTEGER,
    "LastMagicTransportationDate" TIMESTAMP(3),
    "CurrentCompanyGuid" TEXT,
    "CurrentCompanyGuidIfAny" TEXT,
    "ExtraWeightCapacity" DOUBLE PRECISION,
    "TotalWeightCapacity" DOUBLE PRECISION,
    "CurrentSeats" INTEGER NOT NULL,
    "MustDoMaintenance" BOOLEAN NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aircraft_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "aircraftType" (
    "Id" SERIAL NOT NULL,
    "Guid" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "CreationDate" TIMESTAMP(3) NOT NULL,
    "LastModerationDate" TIMESTAMP(3) NOT NULL,
    "DisplayName" TEXT NOT NULL,
    "FlightsCount" INTEGER NOT NULL,
    "TimeBetweenOverhaul" INTEGER NOT NULL,
    "HightimeAirframe" INTEGER NOT NULL,
    "AirportMinSize" INTEGER NOT NULL,
    "EmptyWeight" INTEGER NOT NULL,
    "MaximumGrossWeight" INTEGER NOT NULL,
    "EstimatedCruiseFF" INTEGER NOT NULL,
    "Baseprice" DOUBLE PRECISION NOT NULL,
    "FuelTotalCapacityInGallons" DOUBLE PRECISION NOT NULL,
    "EngineType" INTEGER NOT NULL,
    "NumberOfEngines" INTEGER NOT NULL,
    "Seats" INTEGER NOT NULL,
    "NeedsCopilot" BOOLEAN NOT NULL,
    "FuelTypeId" INTEGER NOT NULL,
    "maximumCargoWeight" DOUBLE PRECISION NOT NULL,
    "maximumRangeInHour" DOUBLE PRECISION NOT NULL,
    "maximumRangeInNM" DOUBLE PRECISION NOT NULL,
    "designSpeedVS0" DOUBLE PRECISION NOT NULL,
    "designSpeedVS1" DOUBLE PRECISION NOT NULL,
    "designSpeedVC" DOUBLE PRECISION NOT NULL,
    "IsDisabled" BOOLEAN NOT NULL,
    "LuxeFactor" DOUBLE PRECISION NOT NULL,
    "StandardSeatWeight" DOUBLE PRECISION NOT NULL,
    "IsFighter" BOOLEAN NOT NULL,
    "AircraftClassId" INTEGER NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aircraftType_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "aircraftClass" (
    "Id" SERIAL NOT NULL,
    "Guid" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "ShortName" TEXT NOT NULL,
    "Order" INTEGER NOT NULL,

    CONSTRAINT "aircraftClass_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "fuelType" (
    "Id" SERIAL NOT NULL,
    "OnAirId" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "ShortName" TEXT NOT NULL,

    CONSTRAINT "fuelType_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "missionType_Guid_key" ON "missionType"("Guid");

-- CreateIndex
CREATE UNIQUE INDEX "cargoType_Guid_key" ON "cargoType"("Guid");

-- CreateIndex
CREATE UNIQUE INDEX "charter_Guid_key" ON "charter"("Guid");

-- CreateIndex
CREATE UNIQUE INDEX "charterType_Guid_key" ON "charterType"("Guid");

-- CreateIndex
CREATE UNIQUE INDEX "aircraft_Guid_key" ON "aircraft"("Guid");

-- CreateIndex
CREATE UNIQUE INDEX "aircraft_Identifier_key" ON "aircraft"("Identifier");

-- CreateIndex
CREATE UNIQUE INDEX "aircraftType_Guid_key" ON "aircraftType"("Guid");

-- CreateIndex
CREATE UNIQUE INDEX "aircraftClass_Guid_key" ON "aircraftClass"("Guid");

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_MissionTypeId_fkey" FOREIGN KEY ("MissionTypeId") REFERENCES "missionType"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cargo" ADD CONSTRAINT "cargo_CargoTypeId_fkey" FOREIGN KEY ("CargoTypeId") REFERENCES "cargoType"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charter" ADD CONSTRAINT "charter_CharterTypeId_fkey" FOREIGN KEY ("CharterTypeId") REFERENCES "charterType"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aircraft" ADD CONSTRAINT "aircraft_WorldId_fkey" FOREIGN KEY ("WorldId") REFERENCES "world"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aircraft" ADD CONSTRAINT "aircraft_CompanyId_fkey" FOREIGN KEY ("CompanyId") REFERENCES "company"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aircraftType" ADD CONSTRAINT "aircraftType_AircraftClassId_fkey" FOREIGN KEY ("AircraftClassId") REFERENCES "aircraftClass"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aircraftType" ADD CONSTRAINT "aircraftType_FuelTypeId_fkey" FOREIGN KEY ("FuelTypeId") REFERENCES "fuelType"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
