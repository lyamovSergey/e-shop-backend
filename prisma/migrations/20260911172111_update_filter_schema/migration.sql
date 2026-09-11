/*
  Warnings:

  - You are about to drop the column `value` on the `filters` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[category_id,name]` on the table `filters` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `filter_values` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "filter_values" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "filters" DROP COLUMN "value";

-- CreateIndex
CREATE UNIQUE INDEX "filters_category_id_name_key" ON "filters"("category_id", "name");
