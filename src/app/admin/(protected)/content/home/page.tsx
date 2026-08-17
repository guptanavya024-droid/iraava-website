import { PageHeader } from "@/components/ui/page-header";
import { HomeContentForm } from "@/components/admin/home-content-form";
import { getHomeContent, getWhyUsPoints } from "@/lib/content";

export default async function AdminHomeContentPage() {
  const [content, whyUsPoints] = await Promise.all([getHomeContent(), getWhyUsPoints()]);

  return (
    <div>
      <PageHeader title="Home page" subtitle="Edit the hero, intro sections and buyer CTA shown on the homepage." />
      <HomeContentForm
        initialContent={content}
        initialWhyUsPoints={whyUsPoints.map((p) => ({ title: p.title, body: p.body }))}
      />
    </div>
  );
}
