-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "approvalToken" TEXT,
ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "approvedById" INTEGER;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
