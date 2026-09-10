import Link from "next/link";
import { Container } from "@/components/site/container";
import { Logo } from "@/components/site/logo";
import { SOCIAL_ICONS, SOCIAL_LABELS } from "@/components/site/social-icons";
import { NAV_LINKS, type SiteSettingsData, type SocialLinkData } from "@/lib/types";

interface FooterProps {
  settings: SiteSettingsData;
  socialLinks: SocialLinkData[];
}

export function Footer({ settings, socialLinks }: FooterProps) {
  const addressLines = [
    settings.addressLine1,
    settings.addressLine2,
    [settings.city, settings.state, settings.pincode].filter(Boolean).join(", "),
    settings.country,
  ].filter(Boolean);

  return (
    <footer className="bg-primary text-primary-foreground">
      <Container className="py-14 grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-4">
          <span className="inline-flex rounded-lg bg-white px-3 py-2">
            <Logo logoUrl={settings.logoUrl} siteName={settings.siteName} />
          </span>
          <p className="text-sm text-primary-foreground/70 max-w-sm leading-relaxed">{settings.tagline}</p>
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map((link) => {
                const Icon = SOCIAL_ICONS[link.platform];
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={SOCIAL_LABELS[link.platform]}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-primary-foreground/80 transition-colors hover:bg-white/10 hover:text-primary-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-primary-foreground">Navigate</p>
          <nav className="flex flex-col gap-2.5">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-primary-foreground/75 hover:text-primary-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-primary-foreground">Contact</p>
          <div className="flex flex-col gap-2.5 text-sm">
            {settings.email && (
              <a href={`mailto:${settings.email}`} className="text-primary-foreground/75 hover:text-primary-foreground">
                {settings.email}
              </a>
            )}
            {settings.phone && (
              <a href={`tel:${settings.phone}`} className="text-primary-foreground/75 hover:text-primary-foreground">
                {settings.phone}
              </a>
            )}
            {addressLines.length > 0 && (
              <address className="not-italic text-primary-foreground/60 leading-relaxed">
                {addressLines.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </address>
            )}
          </div>
        </div>
      </Container>

      <div className="border-t border-white/15">
        <Container className="py-5 text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} {settings.siteName}. Made in India.
        </Container>
      </div>
    </footer>
  );
}
