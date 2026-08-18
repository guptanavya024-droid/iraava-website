import { db } from "@/lib/db";
import type { ProductCategory } from "@/generated/prisma/enums";

// Called on every product create/update so a type typed into the admin
// combobox (new or existing) always has a matching ProductType row —
// keeps the reference list authoritative without a separate "create type"
// endpoint.
export async function ensureProductType(category: ProductCategory, name: string) {
  const existing = await db.productType.findUnique({ where: { category_name: { category, name } } });
  if (existing) return;

  const maxOrder = await db.productType.aggregate({ _max: { order: true }, where: { category } });
  await db.productType.create({ data: { category, name, order: (maxOrder._max.order ?? -1) + 1 } });
}
