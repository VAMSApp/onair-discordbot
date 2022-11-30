/*
  Warnings:

  - You are about to drop the column `virtualAirline_id` on the `OnAirCompany` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `WorldId` on the `VirtualAirline` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Guid]` on the table `VirtualAirline` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `virtualAirlineId` to the `OnAirCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Guid` to the `VirtualAirline` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OnAirCompany" DROP CONSTRAINT "OnAirCompany_virtualAirline_id_fkey";

-- DropIndex
DROP INDEX "VirtualAirline_Id_key";

-- AlterTable
ALTER TABLE "OnAirCompany" DROP COLUMN "virtualAirline_id",
ADD COLUMN     "virtualAirlineId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "VirtualAirline" DROP COLUMN "Id",
DROP COLUMN "WorldId",
ADD COLUMN     "Guid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "VirtualAirline_Guid_key" ON "VirtualAirline"("Guid");

-- AddForeignKey
ALTER TABLE "OnAirCompany" ADD CONSTRAINT "OnAirCompany_virtualAirlineId_fkey" FOREIGN KEY ("virtualAirlineId") REFERENCES "VirtualAirline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
