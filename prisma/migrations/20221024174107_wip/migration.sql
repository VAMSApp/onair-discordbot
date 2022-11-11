/*
  Warnings:

  - Added the required column `MissionTypeGuid` to the `job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "job" ADD COLUMN     "MissionTypeGuid" TEXT NOT NULL;
