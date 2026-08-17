import { PageHeader } from "@/components/ui/page-header";
import { WorkWithUsContentForm } from "@/components/admin/work-with-us-content-form";
import { getWorkWithUsContent } from "@/lib/content";

export default async function AdminWorkWithUsContentPage() {
  const content = await getWorkWithUsContent();

  return (
    <div>
      <PageHeader title="Work With Us page" subtitle="Edit the intro, catalogue bullets and closing copy." />
      <WorkWithUsContentForm initialContent={content} />
    </div>
  );
}
