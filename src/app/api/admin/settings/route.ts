import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/require-admin";
import { SocialPlatform } from "@/generated/prisma/enums";

const socialLinkSchema = z.object({ platform: z.enum(SocialPlatform), url: z.string().trim().url() });

const bodySchema = z.object({
  settings: z.object({
    logoUrl: z.string().trim().url().nullable(),
    siteName: z.string().trim().min(1),
    tagline: z.string().trim().min(1),
    email: z.string().trim().email().nullable().or(z.literal("").transform(() => null)),
    phone: z.string().trim().nullable(),
    addressLine1: z.string().trim().nullable(),
    addressLine2: z.string().trim().nullable(),
    city: z.string().trim().nullable(),
    state: z.string().trim().nullable(),
    pincode: z.string().trim().nullable(),
    country: z.string().trim().nullable(),
  }),
  socialLinks: z.array(socialLinkSchema),
});

export async function PUT(request: Request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid submission", details: parsed.error.flatten() }, { status: 400 });

  const { settings, socialLinks } = parsed.data;

  await db.$transaction([
    db.siteSettings.upsert({ where: { id: "singleton" }, create: { id: "singleton", ...settings }, update: settings }),
    db.socialLink.deleteMany({}),
    ...(socialLinks.length > 0
      ? [db.socialLink.createMany({ data: socialLinks.map((s, order) => ({ ...s, order })) })]
      : []),
  ]);

  // Settings (logo, contact info, socials) render in the Header/Footer and
  // on Work With Us / Contact, so bust every page under the (site) layout.
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
