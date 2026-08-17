"use client";

import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { ProductCard } from "@/components/site/product-card";

interface CatalogProduct {
  id: string;
  category: "FACE_CARE" | "BODY_CARE";
  type: string;
  name: string;
  variant: string | null;
  description: string;
  imageUrl: string | null;
}

const PAGE_SIZE = 9;

const CATEGORIES = [
  { value: "FACE_CARE", label: "Face Care" },
  { value: "BODY_CARE", label: "Body Care" },
] as const;

export function ProductCatalog({ products }: { products: CatalogProduct[] }) {
  const [tab, setTab] = useState<string>("FACE_CARE");
  const [pageByTab, setPageByTab] = useState<Record<string, number>>({ FACE_CARE: 1, BODY_CARE: 1 });

  const byCategory = useMemo(() => {
    return {
      FACE_CARE: products.filter((p) => p.category === "FACE_CARE"),
      BODY_CARE: products.filter((p) => p.category === "BODY_CARE"),
    };
  }, [products]);

  if (products.length === 0) {
    return <EmptyState icon={Sparkles} title="Catalogue coming soon" description="Product listings will appear here." />;
  }

  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList className="h-auto p-1">
        {CATEGORIES.map((c) => (
          <TabsTrigger key={c.value} value={c.value} className="px-5 py-2 text-sm">
            {c.label}
            <span className="ml-1.5 text-xs text-muted-foreground">({byCategory[c.value].length})</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {CATEGORIES.map((c) => {
        const items = byCategory[c.value];
        const page = pageByTab[c.value] ?? 1;
        const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
        const pageItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

        return (
          <TabsContent key={c.value} value={c.value} className="mt-8">
            {items.length === 0 ? (
              <EmptyState icon={Sparkles} title={`No ${c.label.toLowerCase()} products yet`} />
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {pageItems.map((p) => (
                    <ProductCard
                      key={p.id}
                      name={p.name}
                      variant={p.variant}
                      type={p.type}
                      description={p.description}
                      imageUrl={p.imageUrl}
                    />
                  ))}
                </div>
                <Pagination
                  page={page}
                  pageCount={pageCount}
                  onPageChange={(next) => setPageByTab((prev) => ({ ...prev, [c.value]: next }))}
                  className="mt-10"
                />
              </>
            )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
