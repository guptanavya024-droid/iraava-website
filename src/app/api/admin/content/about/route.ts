import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/require-admin";

const principleSchema = z.object({ title: z.string().trim().min(1), body: z.string().trim().min(1) });

const bodySchema = z.object({
  content: z.object({
    headline: z.string().trim().min(1),
    subheading: z.string().trim().min(1),
    brandStory: z.string().trim().min(1),
    closingStatement: z.string().trim().min(1),
  }),
  principles: z.array(principleSchema),
});

export async function PUT(request: Request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid submission" }, { status: 400 });

  const { content, principles } = parsed.data;

  await db.$transaction([
    db.aboutContent.upsert({ where: { id: "singleton" }, create: { id: "singleton", ...content }, update: content }),
    db.approachPrinciple.deleteMany({}),
    ...(principles.length > 0
      ? [db.approachPrinciple.createMany({ data: principles.map((p, order) => ({ ...p, order })) })]
      : []),
  ]);

  revalidatePath("/about");
  return NextResponse.json({ ok: true });
}
