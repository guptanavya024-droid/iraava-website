import { PageHeader } from "@/components/ui/page-header";
import { SettingsForm } from "@/components/admin/settings-form";
import { getSiteSettings, getSocialLinks } from "@/lib/content";

export default async function AdminSettingsPage() {
  const [settings, socialLinks] = await Promise.all([getSiteSettings(), getSocialLinks()]);

  return (
    <div>
      <PageHeader title="Site settings" subtitle="Logo, brand, contact info and social links used across the site." />
      <SettingsForm initialSettings={settings} initialSocialLinks={socialLinks} />
    </div>
  );
}
