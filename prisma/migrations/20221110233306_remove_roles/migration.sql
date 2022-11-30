/*
  Warnings:

  - You are about to drop the `AccountRoles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AccountRoles" DROP CONSTRAINT "AccountRoles_accountId_fkey";

-- DropForeignKey
ALTER TABLE "AccountRoles" DROP CONSTRAINT "AccountRoles_roleId_fkey";

-- DropTable
DROP TABLE "AccountRoles";

-- DropTable
DROP TABLE "Role";
