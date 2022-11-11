/*
  Warnings:

  - You are about to drop the column `airframeCondition` on the `aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `airframeHours` on the `aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `fuelTotalGallons` on the `aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `fuelWeight` on the `aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `loadedWeight` on the `aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `zeroFuelWeight` on the `aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `designSpeedVC` on the `aircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `designSpeedVS0` on the `aircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `designSpeedVS1` on the `aircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `maximumCargoWeight` on the `aircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `maximumRangeInHour` on the `aircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `maximumRangeInNM` on the `aircraftType` table. All the data in the column will be lost.
  - Added the required column `DesignSpeedVC` to the `aircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DesignSpeedVS0` to the `aircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DesignSpeedVS1` to the `aircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MaximumCargoWeight` to the `aircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MaximumRangeInHour` to the `aircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MaximumRangeInNM` to the `aircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CompanyGuid` to the `cargo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CompanyId` to the `cargo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Description` to the `cargo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Distance` to the `cargo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Heading` to the `cargo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `HumanOnly` to the `cargo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `InRecyclingPool` to the `cargo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IsInHangar` to the `cargo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RaceValidated` to the `cargo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RescueLate` to the `cargo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RescueValidated` to the `cargo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BoardedPAXSeat` to the `charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CharterTypeGuid` to the `charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CompanyGuid` to the `charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CompanyId` to the `charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Description` to the `charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Distance` to the `charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Heading` to the `charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `HumanOnly` to the `charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `InRecyclingPool` to the `charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MinAircraftTypeLuxe` to the `charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MinPAXSeatConf` to the `charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RescueLate` to the `charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RescueValidated` to the `charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `missionType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aircraft" DROP COLUMN "airframeCondition",
DROP COLUMN "airframeHours",
DROP COLUMN "fuelTotalGallons",
DROP COLUMN "fuelWeight",
DROP COLUMN "loadedWeight",
DROP COLUMN "zeroFuelWeight",
ADD COLUMN     "AirframeCondition" DOUBLE PRECISION,
ADD COLUMN     "AirframeHours" DOUBLE PRECISION,
ADD COLUMN     "FuelTotalGallons" DOUBLE PRECISION,
ADD COLUMN     "FuelWeight" INTEGER,
ADD COLUMN     "LoadedWeight" DOUBLE PRECISION,
ADD COLUMN     "ZeroFuelWeight" INTEGER;

-- AlterTable
ALTER TABLE "aircraftType" DROP COLUMN "designSpeedVC",
DROP COLUMN "designSpeedVS0",
DROP COLUMN "designSpeedVS1",
DROP COLUMN "maximumCargoWeight",
DROP COLUMN "maximumRangeInHour",
DROP COLUMN "maximumRangeInNM",
ADD COLUMN     "DesignSpeedVC" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "DesignSpeedVS0" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "DesignSpeedVS1" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "MaximumCargoWeight" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "MaximumRangeInHour" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "MaximumRangeInNM" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "cargo" ADD COLUMN     "CompanyGuid" TEXT NOT NULL,
ADD COLUMN     "CompanyId" INTEGER NOT NULL,
ADD COLUMN     "Description" TEXT NOT NULL,
ADD COLUMN     "Distance" INTEGER NOT NULL,
ADD COLUMN     "Heading" INTEGER NOT NULL,
ADD COLUMN     "HumanOnly" BOOLEAN NOT NULL,
ADD COLUMN     "InRecyclingPool" BOOLEAN NOT NULL,
ADD COLUMN     "IsInHangar" BOOLEAN NOT NULL,
ADD COLUMN     "RaceValidated" BOOLEAN NOT NULL,
ADD COLUMN     "RescueLate" BOOLEAN NOT NULL,
ADD COLUMN     "RescueValidated" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "charter" ADD COLUMN     "BoardedPAXSeat" INTEGER NOT NULL,
ADD COLUMN     "CharterTypeGuid" TEXT NOT NULL,
ADD COLUMN     "CompanyGuid" TEXT NOT NULL,
ADD COLUMN     "CompanyId" INTEGER NOT NULL,
ADD COLUMN     "Description" TEXT NOT NULL,
ADD COLUMN     "Distance" INTEGER NOT NULL,
ADD COLUMN     "Heading" INTEGER NOT NULL,
ADD COLUMN     "HumanOnly" BOOLEAN NOT NULL,
ADD COLUMN     "InRecyclingPool" BOOLEAN NOT NULL,
ADD COLUMN     "MinAircraftTypeLuxe" INTEGER NOT NULL,
ADD COLUMN     "MinPAXSeatConf" INTEGER NOT NULL,
ADD COLUMN     "RescueLate" BOOLEAN NOT NULL,
ADD COLUMN     "RescueValidated" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "missionType" ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "cargo" ADD CONSTRAINT "cargo_CompanyId_fkey" FOREIGN KEY ("CompanyId") REFERENCES "company"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charter" ADD CONSTRAINT "charter_CompanyId_fkey" FOREIGN KEY ("CompanyId") REFERENCES "company"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
