/*
  Warnings:

  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DiscordAccount" DROP CONSTRAINT "DiscordAccount_roleId_fkey";

-- AlterTable
ALTER TABLE "DiscordAccount" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Role";
