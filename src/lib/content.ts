import { db } from "@/lib/db";
import type { SiteSettingsData, SocialLinkData } from "@/lib/types";

/* Every fetcher here falls back to the source-copy defaults when its
   singleton row doesn't exist yet (pre-seed, or if an admin clears a
   field) — so the public site never renders empty sections. */

export const DEFAULT_SITE_SETTINGS: SiteSettingsData = {
  logoUrl: null,
  siteName: "Iraava Naturals",
  tagline: "Nourished by India.",
  email: null,
  phone: "+91-9910113248",
  addressLine1: null,
  addressLine2: null,
  city: null,
  state: null,
  pincode: null,
  country: "India",
};

export async function getSiteSettings(): Promise<SiteSettingsData> {
  const row = await db.siteSettings.findUnique({ where: { id: "singleton" } });
  return row ?? DEFAULT_SITE_SETTINGS;
}

export async function getSocialLinks(): Promise<SocialLinkData[]> {
  const rows = await db.socialLink.findMany({ orderBy: { order: "asc" } });
  return rows;
}

export const DEFAULT_HOME_CONTENT = {
  heroHeading: "Nourished by India.",
  heroSubheading:
    "We are an Indian skincare manufacturer and exporter, bringing together the knowledge of Ayurvedic tradition and the standards of modern skincare. Our products are made in India. We thoughtfully curate face and body care that is rooted in Indian ingredients and formulations.",
  whereWeFromText:
    "India has a long tradition of botanical wellness — ingredients like turmeric, neem, saffron, and sandalwood have been used for centuries. We work with that knowledge and bring it into products that meet the expectations of today's customer.",
  whatWeDoText:
    "We manufacture and export skincare products from India, handling formulation, production, and customization to cater to our customer needs.",
  productRangeIntro:
    "Our range covers selected serums, creams, cleansers and washes. Detailed specifications, key ingredients, available pack formats and commercial information are shared directly with buyers.",
  buyerCtaHeading: "Looking to source Indian skincare? We'd love to hear from you.",
  buyerCtaBody:
    "We work with clients who want to bring quality Indian skincare to the world. Get in touch and we can share more about our range, our process, and how we work.",
};

export async function getHomeContent() {
  const row = await db.homeContent.findUnique({ where: { id: "singleton" } });
  return row ?? DEFAULT_HOME_CONTENT;
}

export const DEFAULT_WHY_US_POINTS = [
  {
    id: "default-1",
    title: "Rooted in Indian tradition",
    body: "Our formulations draw on Ayurvedic knowledge — ingredients with a long history of use in Indian skincare, now formulated to modern standards.",
    order: 0,
  },
  {
    id: "default-2",
    title: "Made with care",
    body: "We choose ingredients thoughtfully and formulate with skin concerns in mind — brightening, hydration, anti-aging. We ensure that a product has all that it needs to address the concerns it targets.",
    order: 1,
  },
];

export async function getWhyUsPoints() {
  const rows = await db.whyUsPoint.findMany({ orderBy: { order: "asc" } });
  return rows.length > 0 ? rows : DEFAULT_WHY_US_POINTS;
}

export const DEFAULT_ABOUT_CONTENT = {
  headline: "Indian skincare, made well and shared with the world.",
  subheading:
    "Iraava Naturals is a skincare manufacturer and exporter based in India. We make face and body care products that are rooted in Indian botanical tradition and modern formulation.",
  brandStory:
    "Iraava comes from the Sanskrit Ira — a word that carries the idea of water that nourishes, earth that sustains, and abundance that flows freely. Iravati was one of the great rivers of ancient India, known for the life it brought to the land around it. This resonates with our core ideology — take what Indian soil and tradition have always given generously and share it with the rest of the world.\n\nIndia's relationship with botanical wellness goes back a very long time. Ayurveda, one of the world's oldest systems of medicine and wellbeing, has shaped the way generations of Indians have thought about skin, health, and the natural world. Ingredients like turmeric, neem, saffron, and ashwagandha are not recent discoveries. They are part of a living tradition, and they genuinely work.\n\nWe started Iraava because we wanted to do something simple yet compelling — manufacture skincare products that draw on this tradition and make them available to those who are looking for something grounded, genuine, and well made. We handle everything from formulation to final product, and we work with clients who want to bring quality Indian skincare to their markets.\n\nWe are proud of where our products come from. India has a lot to offer the world in this space, and we are glad to be one of the people helping make that happen.",
  closingStatement:
    "India has more to offer skincare than a familiar ingredient list or a borrowed aesthetic. Our work is to bring that depth into products that are considered, commercially practical and ready for our clients to make their own.",
};

export async function getAboutContent() {
  const row = await db.aboutContent.findUnique({ where: { id: "singleton" } });
  return row ?? DEFAULT_ABOUT_CONTENT;
}

export const DEFAULT_APPROACH_PRINCIPLES = [
  {
    id: "default-1",
    title: "We start with Indian knowledge",
    body: "Every product we make draws on Ayurvedic tradition — ingredients that have been used in Indian skincare for centuries, chosen because they work, not because they sound interesting.",
    order: 0,
  },
  {
    id: "default-2",
    title: "We formulate thoughtfully.",
    body: "We think carefully about what goes into each product — what each ingredient does, what concern it addresses, and whether it genuinely belongs. We keep things clean and purposeful.",
    order: 1,
  },
  {
    id: "default-3",
    title: "We are honest about what we make.",
    body: "Straightforward ingredient lists, no unnecessary additions. Buyers and their customers should be able to understand what is in a product and why.",
    order: 2,
  },
  {
    id: "default-4",
    title: "Clear from the start",
    body: "We believe good partnerships begin with useful information, practical timelines and direct communication.",
    order: 3,
  },
];

export async function getApproachPrinciples() {
  const rows = await db.approachPrinciple.findMany({ orderBy: { order: "asc" } });
  return rows.length > 0 ? rows : DEFAULT_APPROACH_PRINCIPLES;
}

export const DEFAULT_PRODUCT_RANGE_CONTENT = {
  headline: "Private-label face and body care, made in India.",
  subheading: "A focused range of serums, creams, cleansers and washes for international brands, importers and distributors.",
  introText: "Our range covers face care and body care, with products built around brightening, anti-aging, and hydration.",
};

export async function getProductRangeContent() {
  const row = await db.productRangeContent.findUnique({ where: { id: "singleton" } });
  return row ?? DEFAULT_PRODUCT_RANGE_CONTENT;
}

export const DEFAULT_WORK_WITH_US_CONTENT = {
  intro:
    "We are a manufacturer and exporter, primarily working with buyers who are sourcing products for their customers. We are straightforward to deal with, and we try to make the process of working with us as simple as possible.",
  catalogueBlurb:
    "Our product catalogue covers the full range — formulations, key ingredients, formats, and pricing. Request it and we will send it in your mailbox at the earliest.",
  bulletPoints: [
    "Full product range — Face care and body care",
    "Formulation details — Key ingredients and format per product",
    "Pricing — Tiered by volume",
    "Private label options — Available on request",
  ] as string[],
  madeInIndiaText:
    "All our products are made in India — formulated, produced, and exported from here. We handle the process end to end. Share your brief and we will help you understand the most practical route for your enquiry.",
};

export async function getWorkWithUsContent() {
  const row = await db.workWithUsContent.findUnique({ where: { id: "singleton" } });
  if (!row) return DEFAULT_WORK_WITH_US_CONTENT;
  return { ...row, bulletPoints: row.bulletPoints as string[] };
}

export async function getActiveProducts() {
  return db.product.findMany({ where: { isActive: true }, orderBy: [{ category: "asc" }, { order: "asc" }] });
}
