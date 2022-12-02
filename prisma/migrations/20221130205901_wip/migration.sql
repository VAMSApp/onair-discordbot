/*
  Warnings:

  - You are about to drop the column `employeeGuid` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[personId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_employeeId_fkey";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "personId" INTEGER;

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "employeeGuid",
DROP COLUMN "employeeId",
ADD COLUMN     "personGuid" TEXT,
ADD COLUMN     "personId" INTEGER;

-- DropTable
DROP TABLE "Employee";

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "guid" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "companyGuid" TEXT NOT NULL,
    "flightHoursTotalBeforeHiring" DOUBLE PRECISION,
    "flightHoursInCompany" DOUBLE PRECISION,
    "category" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "lastStatusChange" TIMESTAMP(3) NOT NULL,
    "onAirSyncedAt" TIMESTAMP(3),
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "flightHoursGrandTotal" DOUBLE PRECISION,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_guid_key" ON "Person"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "Account_personId_key" ON "Account"("personId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
