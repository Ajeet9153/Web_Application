/*
  Warnings:

  - Added the required column `approvedAt` to the `ShopProfile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MASTER_ADMIN', 'SUB_ADMIN', 'CUSTOMER');

-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "shopId" TEXT;

-- AlterTable
ALTER TABLE "ShopProfile" ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "approvedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
ADD COLUMN     "shopId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "ShopProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "ShopProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
