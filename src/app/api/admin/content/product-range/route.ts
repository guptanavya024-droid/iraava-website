import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/require-admin";

const bodySchema = z.object({
  headline: z.string().trim().min(1),
  subheading: z.string().trim().min(1),
  introText: z.string().trim().min(1),
});

export async function PUT(request: Request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid submission" }, { status: 400 });

  await db.productRangeContent.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ...parsed.data },
    update: parsed.data,
  });

  return NextResponse.json({ ok: true });
}
