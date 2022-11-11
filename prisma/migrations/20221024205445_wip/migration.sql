/*
  Warnings:

  - Added the required column `AircraftTypeId` to the `aircraft` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aircraft" ADD COLUMN     "AircraftTypeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "cargo" ADD COLUMN     "CurrentAircraftGuid" TEXT,
ADD COLUMN     "CurrentAircraftId" INTEGER;

-- CreateTable
CREATE TABLE "_aircraftTocharter" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_aircraftTocharter_AB_unique" ON "_aircraftTocharter"("A", "B");

-- CreateIndex
CREATE INDEX "_aircraftTocharter_B_index" ON "_aircraftTocharter"("B");

-- AddForeignKey
ALTER TABLE "cargo" ADD CONSTRAINT "cargo_CurrentAircraftId_fkey" FOREIGN KEY ("CurrentAircraftId") REFERENCES "aircraft"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aircraft" ADD CONSTRAINT "aircraft_AircraftTypeId_fkey" FOREIGN KEY ("AircraftTypeId") REFERENCES "aircraftType"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_aircraftTocharter" ADD CONSTRAINT "_aircraftTocharter_A_fkey" FOREIGN KEY ("A") REFERENCES "aircraft"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_aircraftTocharter" ADD CONSTRAINT "_aircraftTocharter_B_fkey" FOREIGN KEY ("B") REFERENCES "charter"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
