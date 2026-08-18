import { PageHeader } from "@/components/ui/page-header";
import { ProductsClient } from "@/components/admin/products-client";
import { db } from "@/lib/db";
import { getProductTypes } from "@/lib/content";

export default async function AdminProductsPage() {
  const [products, productTypes] = await Promise.all([
    db.product.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] }),
    getProductTypes(),
  ]);

  return (
    <div>
      <PageHeader title="Products" subtitle="Manage the product catalogue shown on the Product Range page." />
      <ProductsClient initialProducts={products} productTypes={productTypes} />
    </div>
  );
}
