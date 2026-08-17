import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/require-admin";

const bodySchema = z.object({
  intro: z.string().trim().min(1),
  catalogueBlurb: z.string().trim().min(1),
  bulletPoints: z.array(z.string().trim().min(1)),
  madeInIndiaText: z.string().trim().min(1),
});

export async function PUT(request: Request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid submission" }, { status: 400 });

  await db.workWithUsContent.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ...parsed.data },
    update: parsed.data,
  });

  revalidatePath("/work-with-us");
  return NextResponse.json({ ok: true });
}
