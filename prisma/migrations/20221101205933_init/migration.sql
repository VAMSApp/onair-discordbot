-- CreateTable
CREATE TABLE "DiscordAccount" (
    "id" SERIAL NOT NULL,
    "discordId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "discriminator" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiscordAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnAirCompany" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "companyUuid" TEXT,
    "companyApiKey" TEXT,
    "onAirSyncedAt" TIMESTAMP(3),
    "ownerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OnAirCompany_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DiscordAccount_discordId_key" ON "DiscordAccount"("discordId");

-- AddForeignKey
ALTER TABLE "OnAirCompany" ADD CONSTRAINT "OnAirCompany_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "DiscordAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
