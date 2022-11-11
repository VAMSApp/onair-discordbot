/*
  Warnings:

  - You are about to drop the column `CargoTypeId` on the `cargoType` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Guid]` on the table `cargo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Guid` to the `cargo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cargo" ADD COLUMN     "Guid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "cargoType" DROP COLUMN "CargoTypeId";

-- CreateIndex
CREATE UNIQUE INDEX "cargo_Guid_key" ON "cargo"("Guid");
