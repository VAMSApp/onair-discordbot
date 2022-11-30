-- CreateTable
CREATE TABLE "VAInvitation" (
    "id" SERIAL NOT NULL,
    "vaId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,
    "isPending" BOOLEAN NOT NULL DEFAULT true,
    "token" TEXT NOT NULL,
    "emailId" INTEGER NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VAInvitation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VAInvitation" ADD CONSTRAINT "VAInvitation_vaId_fkey" FOREIGN KEY ("vaId") REFERENCES "VirtualAirline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VAInvitation" ADD CONSTRAINT "VAInvitation_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VAInvitation" ADD CONSTRAINT "VAInvitation_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VAInvitation" ADD CONSTRAINT "VAInvitation_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "Email"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
