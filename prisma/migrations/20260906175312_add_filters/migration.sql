/*
  Warnings:

  - You are about to drop the column `color_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `colors` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EnumUserRole" AS ENUM ('ADMIN', 'SALER', 'USER');

-- DropForeignKey
ALTER TABLE "colors" DROP CONSTRAINT "colors_store_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_color_id_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "color_id";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "EnumUserRole" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "colors";

-- CreateTable
CREATE TABLE "filters" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "category_id" TEXT,

    CONSTRAINT "filters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filter_values" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "filter_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "filter_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FilterValueToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FilterValueToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FilterValueToProduct_B_index" ON "_FilterValueToProduct"("B");

-- AddForeignKey
ALTER TABLE "filters" ADD CONSTRAINT "filters_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filter_values" ADD CONSTRAINT "filter_values_filter_id_fkey" FOREIGN KEY ("filter_id") REFERENCES "filters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FilterValueToProduct" ADD CONSTRAINT "_FilterValueToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "filter_values"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FilterValueToProduct" ADD CONSTRAINT "_FilterValueToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
