/*
  Warnings:

  - You are about to drop the `DiscordAccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OnAirCompany" DROP CONSTRAINT "OnAirCompany_ownerId_fkey";

-- DropTable
DROP TABLE "DiscordAccount";

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "discordId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "discriminator" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isEnabled" BOOLEAN DEFAULT false,
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_discordId_key" ON "Account"("discordId");

-- AddForeignKey
ALTER TABLE "OnAirCompany" ADD CONSTRAINT "OnAirCompany_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
