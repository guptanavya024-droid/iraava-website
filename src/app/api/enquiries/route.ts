import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { BuyerType, EnquiryType } from "@/generated/prisma/enums";

const enquirySchema = z.object({
  name: z.string().trim().min(1).max(200),
  company: z.string().trim().min(1).max(200),
  workEmail: z.string().trim().email().max(200),
  phone: z.string().trim().min(1).max(50),
  country: z.string().trim().min(1).max(100),
  buyerType: z.enum(BuyerType),
  productCategories: z.array(z.enum(["FACE_CARE", "BODY_CARE"])).min(1),
  enquiryType: z.enum(EnquiryType),
  message: z.string().trim().min(1).max(5000),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request body" }, { status: 400 });

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  await db.enquirySubmission.create({ data: parsed.data });

  return NextResponse.json({ ok: true }, { status: 201 });
}
