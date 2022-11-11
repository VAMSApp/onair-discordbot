/*
  Warnings:

  - You are about to drop the column `MaxLbs` on the `charterType` table. All the data in the column will be lost.
  - You are about to drop the column `MinLbs` on the `charterType` table. All the data in the column will be lost.
  - Added the required column `MaxPAX` to the `charterType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MinPAX` to the `charterType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "charterType" DROP COLUMN "MaxLbs",
DROP COLUMN "MinLbs",
ADD COLUMN     "MaxPAX" INTEGER NOT NULL,
ADD COLUMN     "MinPAX" INTEGER NOT NULL;
