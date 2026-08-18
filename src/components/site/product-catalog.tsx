"use client";

import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { ProductCard } from "@/components/site/product-card";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

interface CatalogProduct {
  id: string;
  category: "FACE_CARE" | "BODY_CARE";
  type: string;
  name: string;
  variant: string | null;
  description: string;
  imageUrl: string | null;
}

interface ProductTypeOption {
  category: "FACE_CARE" | "BODY_CARE";
  name: string;
}

const PAGE_SIZE = 9;
const ALL_TYPES = "ALL";

const CATEGORIES = [
  { value: "FACE_CARE", label: "Face Care" },
  { value: "BODY_CARE", label: "Body Care" },
] as const;

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
        active ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/70 hover:bg-accent hover:text-accent-foreground"
      )}
    >
      {children}
    </button>
  );
}

export function ProductCatalog({ products, productTypes }: { products: CatalogProduct[]; productTypes: ProductTypeOption[] }) {
  const [tab, setTab] = useState<string>("FACE_CARE");
  const [pageByTab, setPageByTab] = useState<Record<string, number>>({ FACE_CARE: 1, BODY_CARE: 1 });
  const [typeByTab, setTypeByTab] = useState<Record<string, string>>({ FACE_CARE: ALL_TYPES, BODY_CARE: ALL_TYPES });

  const byCategory = useMemo(() => {
    return {
      FACE_CARE: products.filter((p) => p.category === "FACE_CARE"),
      BODY_CARE: products.filter((p) => p.category === "BODY_CARE"),
    };
  }, [products]);

  // Every type for the active category, not just ones with products right
  // now, so the filter always shows the full reference list.
  const typesForActiveTab = useMemo(
    () => productTypes.filter((t) => t.category === tab).map((t) => t.name),
    [productTypes, tab]
  );

  function setTypeFilter(category: string, type: string) {
    setTypeByTab((prev) => ({ ...prev, [category]: type }));
    setPageByTab((prev) => ({ ...prev, [category]: 1 }));
  }

  if (products.length === 0) {
    return <EmptyState icon={Sparkles} title="Catalogue coming soon" description="Product listings will appear here." />;
  }

  return (
    <Tabs value={tab} onValueChange={setTab}>
      <div className="sticky top-20 z-30 -mx-4 space-y-4 border-b border-border bg-background/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <TabsList className="h-auto p-1">
          {CATEGORIES.map((c) => (
            <TabsTrigger key={c.value} value={c.value} className="px-5 py-2 text-sm">
              {c.label}
              <span className="ml-1.5 text-xs text-muted-foreground">({byCategory[c.value].length})</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {typesForActiveTab.length > 0 && (
          <div className="flex items-center gap-2.5 overflow-x-auto py-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <FilterChip active={(typeByTab[tab] ?? ALL_TYPES) === ALL_TYPES} onClick={() => setTypeFilter(tab, ALL_TYPES)}>
              All types
            </FilterChip>
            {typesForActiveTab.map((name) => (
              <FilterChip key={name} active={typeByTab[tab] === name} onClick={() => setTypeFilter(tab, name)}>
                {name}
              </FilterChip>
            ))}
          </div>
        )}
      </div>

      {CATEGORIES.map((c) => {
        const typeFilter = typeByTab[c.value] ?? ALL_TYPES;
        const items = byCategory[c.value].filter((p) => typeFilter === ALL_TYPES || p.type === typeFilter);
        const page = pageByTab[c.value] ?? 1;
        const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
        const pageItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
        const onPageChange = (next: number) => setPageByTab((prev) => ({ ...prev, [c.value]: next }));

        return (
          <TabsContent key={c.value} value={c.value} className="mt-5">
            {items.length === 0 ? (
              <EmptyState
                icon={Sparkles}
                title={
                  typeFilter === ALL_TYPES
                    ? `No ${c.label.toLowerCase()} products yet`
                    : `No ${typeFilter.toLowerCase()} products yet`
                }
              />
            ) : (
              <>
                {pageCount > 1 && (
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="text-xs text-muted-foreground">
                      Showing {(page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, items.length)} of {items.length}
                    </p>
                    <Pagination page={page} pageCount={pageCount} onPageChange={onPageChange} />
                  </div>
                )}

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {pageItems.map((p, i) => (
                    <Reveal key={p.id} delay={(i % PAGE_SIZE) * 60}>
                      <ProductCard
                        name={p.name}
                        variant={p.variant}
                        type={p.type}
                        description={p.description}
                        imageUrl={p.imageUrl}
                      />
                    </Reveal>
                  ))}
                </div>

                <Pagination page={page} pageCount={pageCount} onPageChange={onPageChange} className="mt-10" />
              </>
            )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
