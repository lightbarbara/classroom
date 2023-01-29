/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `buyers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `realtors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `buyers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `realtors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "buyers" ADD COLUMN     "cpf" VARCHAR(11) NOT NULL;

-- AlterTable
ALTER TABLE "realtors" ADD COLUMN     "cpf" VARCHAR(11) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "buyers_cpf_key" ON "buyers"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "realtors_cpf_key" ON "realtors"("cpf");
