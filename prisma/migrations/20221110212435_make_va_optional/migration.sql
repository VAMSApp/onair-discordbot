-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_virtualAirlineId_fkey";

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "virtualAirlineId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_virtualAirlineId_fkey" FOREIGN KEY ("virtualAirlineId") REFERENCES "VirtualAirline"("id") ON DELETE SET NULL ON UPDATE CASCADE;
