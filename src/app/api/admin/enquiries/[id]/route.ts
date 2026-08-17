import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/require-admin";
import { EnquiryStatus } from "@/generated/prisma/enums";

const bodySchema = z.object({ status: z.enum(EnquiryStatus) });

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const { id } = await params;
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid submission" }, { status: 400 });

  const enquiry = await db.enquirySubmission.update({ where: { id }, data: { status: parsed.data.status } });
  return NextResponse.json(enquiry);
}
