/*
  Warnings:

  - You are about to drop the column `email` on the `buyers` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `buyers` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `realtors` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `realtors` table. All the data in the column will be lost.
  - You are about to drop the column `salesComission` on the `realtors` table. All the data in the column will be lost.
  - Added the required column `salesCommission` to the `realtors` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "email_unique";

-- AlterTable
ALTER TABLE "buyers" DROP COLUMN "email",
DROP COLUMN "password";

-- AlterTable
ALTER TABLE "realtors" DROP COLUMN "email",
DROP COLUMN "password",
DROP COLUMN "salesComission",
ADD COLUMN     "salesCommission" REAL NOT NULL;
