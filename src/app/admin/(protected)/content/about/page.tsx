import { PageHeader } from "@/components/ui/page-header";
import { AboutContentForm } from "@/components/admin/about-content-form";
import { getAboutContent, getApproachPrinciples } from "@/lib/content";

export default async function AdminAboutContentPage() {
  const [content, principles] = await Promise.all([getAboutContent(), getApproachPrinciples()]);

  return (
    <div>
      <PageHeader title="About page" subtitle="Edit the brand story, principles and closing statement." />
      <AboutContentForm
        initialContent={content}
        initialPrinciples={principles.map((p) => ({ title: p.title, body: p.body }))}
      />
    </div>
  );
}
