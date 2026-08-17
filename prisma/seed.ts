import "dotenv/config";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { hash } from "bcryptjs";
import { put } from "@vercel/blob";
import { db } from "../src/lib/db";
import { SEED_PRODUCTS } from "./seed-data";
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_HOME_CONTENT,
  DEFAULT_WHY_US_POINTS,
  DEFAULT_ABOUT_CONTENT,
  DEFAULT_APPROACH_PRINCIPLES,
  DEFAULT_PRODUCT_RANGE_CONTENT,
  DEFAULT_WORK_WITH_US_CONTENT,
} from "../src/lib/content";

// Source assets live outside the repo, in the sibling "Iraava Website"
// folder the brand handed off (product photos + logo, not committed here).
const ASSETS_DIR = path.resolve(__dirname, "../../Iraava Website/Iraava Naturals");

async function uploadAsset(filename: string, pathnamePrefix: string): Promise<string> {
  const filePath = path.join(ASSETS_DIR, filename);
  const buffer = await readFile(filePath);
  const ext = path.extname(filename);
  const blob = await put(`${pathnamePrefix}/${filename.replace(ext, "")}${ext}`, buffer, {
    access: "public",
    addRandomSuffix: true,
  });
  return blob.url;
}

async function seedAdminUser() {
  const email = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.log("ADMIN_EMAIL/ADMIN_PASSWORD not set, skipping admin user seed.");
    return;
  }

  const passwordHash = await hash(password, 12);
  await db.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });
  console.log(`Admin user ready: ${email}`);
}

async function seedSiteSettings() {
  const logoUrl = await uploadAsset("Iraava - Logo.jpg", "logo").catch((e) => {
    console.warn("Logo upload skipped:", (e as Error).message);
    return null;
  });

  await db.siteSettings.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ...DEFAULT_SITE_SETTINGS, logoUrl },
    update: logoUrl ? { logoUrl } : {},
  });
  console.log("Site settings seeded" + (logoUrl ? " with logo" : ""));
}

async function seedHomeContent() {
  await db.homeContent.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ...DEFAULT_HOME_CONTENT },
    update: {},
  });
  const existing = await db.whyUsPoint.count();
  if (existing === 0) {
    await db.whyUsPoint.createMany({
      data: DEFAULT_WHY_US_POINTS.map(({ title, body, order }) => ({ title, body, order })),
    });
  }
  console.log("Home content seeded");
}

async function seedAboutContent() {
  await db.aboutContent.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ...DEFAULT_ABOUT_CONTENT },
    update: {},
  });
  const existing = await db.approachPrinciple.count();
  if (existing === 0) {
    await db.approachPrinciple.createMany({
      data: DEFAULT_APPROACH_PRINCIPLES.map(({ title, body, order }) => ({ title, body, order })),
    });
  }
  console.log("About content seeded");
}

async function seedProductRangeContent() {
  await db.productRangeContent.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ...DEFAULT_PRODUCT_RANGE_CONTENT },
    update: {},
  });
  console.log("Product Range content seeded");
}

async function seedWorkWithUsContent() {
  await db.workWithUsContent.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ...DEFAULT_WORK_WITH_US_CONTENT },
    update: {},
  });
  console.log("Work With Us content seeded");
}

async function seedProducts() {
  const existing = await db.product.count();
  if (existing > 0) {
    console.log(`Products already seeded (${existing} rows), skipping.`);
    return;
  }

  const orderByCategory: Record<string, number> = {};

  for (const p of SEED_PRODUCTS) {
    const order = orderByCategory[p.category] ?? 0;
    orderByCategory[p.category] = order + 1;

    let imageUrl: string | null = null;
    try {
      imageUrl = await uploadAsset(p.image, "products");
    } catch (e) {
      console.warn(`Image upload skipped for "${p.name}":`, (e as Error).message);
    }

    await db.product.create({
      data: {
        category: p.category,
        type: p.type,
        name: p.name,
        description: p.description,
        otherDetails: p.otherDetails,
        ingredients: p.ingredients,
        referenceLink: p.referenceLink,
        imageUrl,
        order,
      },
    });
    console.log(`Seeded product: ${p.name}`);
  }
}

async function main() {
  await seedAdminUser();
  await seedSiteSettings();
  await seedHomeContent();
  await seedAboutContent();
  await seedProductRangeContent();
  await seedWorkWithUsContent();
  await seedProducts();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
