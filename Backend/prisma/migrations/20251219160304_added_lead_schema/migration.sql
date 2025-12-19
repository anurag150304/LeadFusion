/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "States" AS ENUM ('Delhi', 'Haryana', 'Punjab', 'Rajasthan', 'UttarPradesh', 'Bihar', 'MadhyaPradesh', 'Gujarat', 'Maharashtra', 'WestBengal', 'TamilNadu', 'Karnataka', 'AndhraPradesh', 'Odisha', 'Telangana', 'Assam', 'Jharkhand', 'Chhattisgarh', 'Uttarakhand', 'HimachalPradesh', 'JammuAndKashmir', 'Goa', 'Sikkim', 'Arunachal', 'Nagaland', 'Manipur', 'Mizoram', 'Tripura', 'Meghalaya');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST');

-- CreateEnum
CREATE TYPE "LeadSource" AS ENUM ('WEBSITE', 'META_ADS', 'GOOGLE_ADS');

-- CreateEnum
CREATE TYPE "VechicleType" AS ENUM ('AC', 'NON_AC');

-- CreateEnum
CREATE TYPE "TripType" AS ENUM ('ONE_WAY', 'ROUND_TRIP');

-- CreateEnum
CREATE TYPE "Vechicle" AS ENUM ('Cars', 'SUVs', 'LuxuryCars', 'TempoTraveller', 'MiniBus', 'LuxuryBus');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
ADD COLUMN     "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Lead" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "pickupAddress" TEXT NOT NULL,
    "dropAddress" TEXT NOT NULL,
    "pickupDateTime" TIMESTAMP(3) NOT NULL,
    "dropDateTime" TIMESTAMP(3) NOT NULL,
    "passengers" INTEGER NOT NULL,
    "Luggage" INTEGER NOT NULL,
    "vechicle" "Vechicle" NOT NULL,
    "vechicleType" "VechicleType" NOT NULL DEFAULT 'AC',
    "tripType" "TripType" NOT NULL DEFAULT 'ONE_WAY',
    "state" "States" NOT NULL,
    "source" "LeadSource" NOT NULL,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "note" TEXT,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedOn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);
