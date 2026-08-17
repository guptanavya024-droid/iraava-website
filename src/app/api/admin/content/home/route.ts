import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/require-admin";

const pointSchema = z.object({ title: z.string().trim().min(1), body: z.string().trim().min(1) });

const bodySchema = z.object({
  content: z.object({
    heroHeading: z.string().trim().min(1),
    heroSubheading: z.string().trim().min(1),
    whereWeFromText: z.string().trim().min(1),
    whatWeDoText: z.string().trim().min(1),
    productRangeIntro: z.string().trim().min(1),
    buyerCtaHeading: z.string().trim().min(1),
    buyerCtaBody: z.string().trim().min(1),
  }),
  whyUsPoints: z.array(pointSchema),
});

export async function PUT(request: Request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid submission" }, { status: 400 });

  const { content, whyUsPoints } = parsed.data;

  await db.$transaction([
    db.homeContent.upsert({ where: { id: "singleton" }, create: { id: "singleton", ...content }, update: content }),
    db.whyUsPoint.deleteMany({}),
    ...(whyUsPoints.length > 0
      ? [db.whyUsPoint.createMany({ data: whyUsPoints.map((p, order) => ({ ...p, order })) })]
      : []),
  ]);

  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
