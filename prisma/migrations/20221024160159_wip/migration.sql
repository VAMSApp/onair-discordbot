/*
  Warnings:

  - A unique constraint covering the columns `[AirlineCode]` on the table `company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `WorldGuid` to the `company` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `LastWeeklyManagementsPaymentDate` on the `company` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "company" ADD COLUMN     "WorldGuid" TEXT NOT NULL,
ALTER COLUMN "PausedDate" DROP NOT NULL,
ALTER COLUMN "CurrentBadgeId" DROP NOT NULL,
ALTER COLUMN "CurrentBadgeUrl" DROP NOT NULL,
ALTER COLUMN "CurrentBadgeName" DROP NOT NULL,
DROP COLUMN "LastWeeklyManagementsPaymentDate",
ADD COLUMN     "LastWeeklyManagementsPaymentDate" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "company_AirlineCode_key" ON "company"("AirlineCode");
