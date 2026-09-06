/*
  Warnings:

  - You are about to drop the `product_filter_values` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_filter_values" DROP CONSTRAINT "product_filter_values_filterValueId_fkey";

-- DropForeignKey
ALTER TABLE "product_filter_values" DROP CONSTRAINT "product_filter_values_productId_fkey";

-- DropTable
DROP TABLE "product_filter_values";

-- CreateTable
CREATE TABLE "product_filters" (
    "productId" TEXT NOT NULL,
    "filterValueId" TEXT NOT NULL,

    CONSTRAINT "product_filters_pkey" PRIMARY KEY ("productId","filterValueId")
);

-- AddForeignKey
ALTER TABLE "product_filters" ADD CONSTRAINT "product_filters_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_filters" ADD CONSTRAINT "product_filters_filterValueId_fkey" FOREIGN KEY ("filterValueId") REFERENCES "filter_values"("id") ON DELETE CASCADE ON UPDATE CASCADE;
