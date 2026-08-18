export type SocialPlatform =
  | "INSTAGRAM"
  | "FACEBOOK"
  | "WHATSAPP"
  | "LINKEDIN"
  | "TWITTER"
  | "YOUTUBE"
  | "OTHER";

export interface SiteSettingsData {
  logoUrl: string | null;
  logoMarkUrl: string | null;
  siteName: string;
  tagline: string;
  email: string | null;
  phone: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  country: string | null;
}

export interface SocialLinkData {
  id: string;
  platform: SocialPlatform;
  url: string;
}

export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/product-range", label: "Product Range" },
  { href: "/work-with-us", label: "Work With Us" },
  { href: "/contact", label: "Contact" },
] as const;
