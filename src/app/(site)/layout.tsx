import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { getSiteSettings, getSocialLinks } from "@/lib/content";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, socialLinks] = await Promise.all([getSiteSettings(), getSocialLinks()]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header logoUrl={settings.logoUrl} siteName={settings.siteName} />
      <div className="flex-1">{children}</div>
      <Footer settings={settings} socialLinks={socialLinks} />
    </div>
  );
}
