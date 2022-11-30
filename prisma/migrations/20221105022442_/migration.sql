/*
  Warnings:

  - You are about to drop the column `isActive` on the `DiscordAccount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DiscordAccount" DROP COLUMN "isActive",
ADD COLUMN     "isEnabled" BOOLEAN DEFAULT false;
