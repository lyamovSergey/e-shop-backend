/*
  Warnings:

  - Made the column `category_id` on table `filters` required. This step will fail if there are existing NULL values in that column.
  - Made the column `store_id` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "filters" DROP CONSTRAINT "filters_category_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_store_id_fkey";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "parent_id" TEXT;

-- AlterTable
ALTER TABLE "filters" ALTER COLUMN "category_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "store_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filters" ADD CONSTRAINT "filters_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
