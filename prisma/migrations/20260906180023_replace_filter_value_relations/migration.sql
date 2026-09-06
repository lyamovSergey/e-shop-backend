/*
  Warnings:

  - You are about to drop the `_FilterValueToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FilterValueToProduct" DROP CONSTRAINT "_FilterValueToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_FilterValueToProduct" DROP CONSTRAINT "_FilterValueToProduct_B_fkey";

-- DropTable
DROP TABLE "_FilterValueToProduct";

-- CreateTable
CREATE TABLE "product_filter_values" (
    "productId" TEXT NOT NULL,
    "filterValueId" TEXT NOT NULL,

    CONSTRAINT "product_filter_values_pkey" PRIMARY KEY ("productId","filterValueId")
);

-- AddForeignKey
ALTER TABLE "product_filter_values" ADD CONSTRAINT "product_filter_values_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_filter_values" ADD CONSTRAINT "product_filter_values_filterValueId_fkey" FOREIGN KEY ("filterValueId") REFERENCES "filter_values"("id") ON DELETE CASCADE ON UPDATE CASCADE;
