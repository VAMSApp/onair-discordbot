/*
  Warnings:

  - A unique constraint covering the columns `[OnAirId]` on the table `fuelType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "fuelType_OnAirId_key" ON "fuelType"("OnAirId");
