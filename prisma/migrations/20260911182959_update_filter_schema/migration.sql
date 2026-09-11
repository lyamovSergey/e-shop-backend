/*
  Warnings:

  - Added the required column `name` to the `filter_values` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "filter_values" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "value" DROP NOT NULL;
