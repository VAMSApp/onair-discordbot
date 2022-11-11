-- DropForeignKey
ALTER TABLE "cargo" DROP CONSTRAINT "cargo_CargoTypeId_fkey";

-- AlterTable
ALTER TABLE "cargo" ALTER COLUMN "CargoTypeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "cargo" ADD CONSTRAINT "cargo_CargoTypeId_fkey" FOREIGN KEY ("CargoTypeId") REFERENCES "cargoType"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
