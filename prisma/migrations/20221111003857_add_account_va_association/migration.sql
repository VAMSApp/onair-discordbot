/*
  Warnings:

  - You are about to drop the `VAInvitation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ownerId` to the `VirtualAirline` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VAInvitation" DROP CONSTRAINT "VAInvitation_accountId_fkey";

-- DropForeignKey
ALTER TABLE "VAInvitation" DROP CONSTRAINT "VAInvitation_companyId_fkey";

-- DropForeignKey
ALTER TABLE "VAInvitation" DROP CONSTRAINT "VAInvitation_vaId_fkey";

-- AlterTable
ALTER TABLE "VirtualAirline" ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "VAInvitation";

-- AddForeignKey
ALTER TABLE "VirtualAirline" ADD CONSTRAINT "VirtualAirline_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
