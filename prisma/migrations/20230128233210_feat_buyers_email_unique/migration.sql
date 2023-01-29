/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `buyers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "email_unique" ON "buyers"("email");
