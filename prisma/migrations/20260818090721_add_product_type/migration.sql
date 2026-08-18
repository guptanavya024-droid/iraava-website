-- CreateTable
CREATE TABLE "ProductType" (
    "id" TEXT NOT NULL,
    "category" "ProductCategory" NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductType_category_name_key" ON "ProductType"("category", "name");
