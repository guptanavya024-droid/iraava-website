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
    <footer className="bg-foreground text-background">
      <Container className="py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2 space-y-4">
          <Logo logoUrl={settings.logoUrl} siteName={settings.siteName} />
          <p className="text-sm text-background/70 max-w-sm">{settings.tagline}</p>
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((link) => {
                const Icon = SOCIAL_ICONS[link.platform];
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={SOCIAL_LABELS[link.platform]}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-background/25 text-background/80 transition-colors hover:border-background hover:text-background"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-background/50">Navigate</p>
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-background/80 hover:text-background">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-background/50">Contact</p>
          <div className="flex flex-col gap-2 text-sm text-background/80">
            {settings.email && (
              <a href={`mailto:${settings.email}`} className="hover:text-background">
                {settings.email}
              </a>
            )}
            {settings.phone && (
              <a href={`tel:${settings.phone}`} className="hover:text-background">
                {settings.phone}
              </a>
            )}
            {addressLines.length > 0 && (
              <address className="not-italic text-background/70 leading-relaxed">
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

      <div className="border-t border-background/15">
        <Container className="py-5 text-xs text-background/50">
          © {new Date().getFullYear()} {settings.siteName}. Made in India.
        </Container>
      </div>
    </footer>
  );
}
