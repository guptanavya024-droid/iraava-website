import type { SVGProps } from "react";
import type { SocialPlatform } from "@/lib/types";

/* lucide-react dropped all brand/trademark icons (Instagram, Facebook,
   LinkedIn, X, YouTube) years ago, so these are small hand-rolled outline
   marks kept visually consistent with lucide's 24x24 stroke style so they
   sit next to lucide icons without looking mismatched. */

type IconProps = SVGProps<SVGSVGElement>;

function baseProps(props: IconProps): IconProps {
  return {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props,
  };
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H6v3.5h2V21h3.5v-7.5h2.7L15 10h-3.5V7.8c0-.94.56-1.3 1.4-1.3H15V3Z" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M6.6 17.4 3 21l3.7-1.5A8.9 8.9 0 1 0 3.5 12a8.8 8.8 0 0 0 1 4.1Z" />
      <path d="M8.5 8.7c.15-.5.55-.8 1-.8h.55c.35 0 .65.25.7.6l.4 2.1c.05.25-.05.5-.25.65l-.7.55c.5 1.05 1.4 1.95 2.45 2.45l.55-.7c.15-.2.4-.3.65-.25l2.1.4c.35.05.6.35.6.7v.55c0 .45-.3.85-.8 1-2.9.8-6.65-2.95-7.4-5.35-.1-.35 0-.6.15-.9Z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="7.5" y1="10" x2="7.5" y2="17" />
      <circle cx="7.5" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
      <path d="M11.5 17v-4.2c0-1.5 1-2.3 2.2-2.3s2.3.8 2.3 2.4V17" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M4.5 4.5 19.5 19.5" />
      <path d="M19.5 4.5 4.5 19.5" />
    </svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="M10.5 9.7v4.6l4-2.3-4-2.3Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M9.5 14.5 14.5 9.5" />
      <path d="M10.8 6.7 12 5.5a3 3 0 1 1 4.2 4.2l-1.5 1.5" />
      <path d="M13.2 17.3 12 18.5a3 3 0 1 1-4.2-4.2l1.5-1.5" />
    </svg>
  );
}

export const SOCIAL_ICONS: Record<SocialPlatform, (props: IconProps) => React.JSX.Element> = {
  INSTAGRAM: InstagramIcon,
  FACEBOOK: FacebookIcon,
  WHATSAPP: WhatsAppIcon,
  LINKEDIN: LinkedInIcon,
  TWITTER: XIcon,
  YOUTUBE: YouTubeIcon,
  OTHER: LinkIcon,
};

export const SOCIAL_LABELS: Record<SocialPlatform, string> = {
  INSTAGRAM: "Instagram",
  FACEBOOK: "Facebook",
  WHATSAPP: "WhatsApp",
  LINKEDIN: "LinkedIn",
  TWITTER: "X (Twitter)",
  YOUTUBE: "YouTube",
  OTHER: "Link",
};
