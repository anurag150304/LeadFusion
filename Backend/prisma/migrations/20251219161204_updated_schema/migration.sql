/*
  Warnings:

  - You are about to drop the column `state` on the `Lead` table. All the data in the column will be lost.
  - Added the required column `city` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "state",
ADD COLUMN     "city" TEXT NOT NULL;

-- DropEnum
DROP TYPE "States";
