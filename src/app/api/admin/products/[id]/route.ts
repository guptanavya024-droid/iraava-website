import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/require-admin";
import { ensureProductType } from "@/lib/product-types";
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

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const { id } = await params;
  const parsed = productSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid submission" }, { status: 400 });

  await ensureProductType(parsed.data.category, parsed.data.type);

  const product = await db.product.update({ where: { id }, data: parsed.data });
  revalidatePath("/product-range");
  return NextResponse.json(product);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const { id } = await params;
  await db.product.delete({ where: { id } });
  revalidatePath("/product-range");
  return NextResponse.json({ ok: true });
}
