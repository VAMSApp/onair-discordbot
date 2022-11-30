/*
  Warnings:

  - You are about to drop the column `companyGuid` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `vaGuid` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vaId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_companyId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "companyGuid",
ADD COLUMN     "vaGuid" TEXT NOT NULL,
ADD COLUMN     "vaId" INTEGER NOT NULL,
ALTER COLUMN "companyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_vaId_fkey" FOREIGN KEY ("vaId") REFERENCES "VirtualAirline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
