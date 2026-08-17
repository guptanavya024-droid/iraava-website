import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/require-admin";
import { ProductCategory } from "@/generated/prisma/enums";

const productSchema = z.object({
  category: z.enum(ProductCategory),
  type: z.string().trim().min(1),
  name: z.string().trim().min(1),
  variant: z.string().trim().nullable().optional(),
  description: z.string().trim().min(1),
  ingredients: z.string().trim().nullable().optional(),
  otherDetails: z.string().trim().nullable().optional(),
  referenceLink: z.string().trim().url().nullable().optional().or(z.literal("").transform(() => null)),
  imageUrl: z.string().trim().url().nullable().optional(),
  isActive: z.boolean().optional(),
});

export async function POST(request: Request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const parsed = productSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid submission" }, { status: 400 });

  const maxOrder = await db.product.aggregate({ _max: { order: true }, where: { category: parsed.data.category } });

  const product = await db.product.create({
    data: { ...parsed.data, order: (maxOrder._max.order ?? -1) + 1 },
  });

  return NextResponse.json(product, { status: 201 });
}
