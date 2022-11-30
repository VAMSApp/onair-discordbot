-- DropForeignKey
ALTER TABLE "VirtualAirline" DROP CONSTRAINT "VirtualAirline_ownerId_fkey";

-- AlterTable
ALTER TABLE "VirtualAirline" ALTER COLUMN "ownerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "VirtualAirline" ADD CONSTRAINT "VirtualAirline_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
