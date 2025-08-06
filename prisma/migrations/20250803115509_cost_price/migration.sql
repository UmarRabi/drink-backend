/*
  Warnings:

  - Added the required column `costPrice` to the `ProductSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `ProductSale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ProductSale" ADD COLUMN     "costPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "predecessorStoreId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."ProductSale" ADD CONSTRAINT "ProductSale_predecessorStoreId_fkey" FOREIGN KEY ("predecessorStoreId") REFERENCES "public"."Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
