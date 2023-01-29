-- CreateEnum
CREATE TYPE "statusType" AS ENUM ('bought', 'on going', 'failed');

-- CreateTable
CREATE TABLE "buyers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "balance" REAL NOT NULL,

    CONSTRAINT "buyers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "houses" (
    "id" SERIAL NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "price" REAL NOT NULL,

    CONSTRAINT "houses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "negotiations" (
    "id" SERIAL NOT NULL,
    "houseId" INTEGER NOT NULL,
    "buyerId" INTEGER NOT NULL,
    "realtorId" INTEGER NOT NULL,
    "status" "statusType" NOT NULL DEFAULT 'on going',
    "rating" TEXT,

    CONSTRAINT "negotiations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "realtors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "salesComission" REAL NOT NULL,

    CONSTRAINT "realtors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "negotiations" ADD CONSTRAINT "negotiations_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "buyers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "negotiations" ADD CONSTRAINT "negotiations_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "houses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "negotiations" ADD CONSTRAINT "negotiations_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "realtors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
