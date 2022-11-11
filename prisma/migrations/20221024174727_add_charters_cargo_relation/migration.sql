/*
  Warnings:

  - Added the required column `UpdatedAt` to the `charter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "charter" ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "_JobCargo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_JobCharter" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_JobCargo_AB_unique" ON "_JobCargo"("A", "B");

-- CreateIndex
CREATE INDEX "_JobCargo_B_index" ON "_JobCargo"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_JobCharter_AB_unique" ON "_JobCharter"("A", "B");

-- CreateIndex
CREATE INDEX "_JobCharter_B_index" ON "_JobCharter"("B");

-- AddForeignKey
ALTER TABLE "_JobCargo" ADD CONSTRAINT "_JobCargo_A_fkey" FOREIGN KEY ("A") REFERENCES "cargo"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobCargo" ADD CONSTRAINT "_JobCargo_B_fkey" FOREIGN KEY ("B") REFERENCES "job"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobCharter" ADD CONSTRAINT "_JobCharter_A_fkey" FOREIGN KEY ("A") REFERENCES "charter"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobCharter" ADD CONSTRAINT "_JobCharter_B_fkey" FOREIGN KEY ("B") REFERENCES "job"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
