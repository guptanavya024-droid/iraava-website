import { PageHeader } from "@/components/ui/page-header";
import { ProductsClient } from "@/components/admin/products-client";
import { db } from "@/lib/db";

export default async function AdminProductsPage() {
  const products = await db.product.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });

  return (
    <div>
      <PageHeader title="Products" subtitle="Manage the product catalogue shown on the Product Range page." />
      <ProductsClient initialProducts={products} />
    </div>
  );
}
