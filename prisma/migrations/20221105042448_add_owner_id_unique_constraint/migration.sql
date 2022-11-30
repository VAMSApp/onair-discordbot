/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `OnAirCompany` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OnAirCompany_ownerId_key" ON "OnAirCompany"("ownerId");
