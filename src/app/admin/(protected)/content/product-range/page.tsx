import { PageHeader } from "@/components/ui/page-header";
import { ProductRangeContentForm } from "@/components/admin/product-range-content-form";
import { getProductRangeContent } from "@/lib/content";

export default async function AdminProductRangeContentPage() {
  const content = await getProductRangeContent();

  return (
    <div>
      <PageHeader title="Product Range page" subtitle="Edit the intro copy shown above the product catalogue." />
      <ProductRangeContentForm initialContent={content} />
    </div>
  );
}
