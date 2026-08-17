import { PageHeader } from "@/components/ui/page-header";
import { EnquiriesClient } from "@/components/admin/enquiries-client";
import { db } from "@/lib/db";

export default async function AdminEnquiriesPage() {
  const enquiries = await db.enquirySubmission.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <PageHeader title="Enquiries" subtitle="Submissions from the contact form." />
      <EnquiriesClient initialEnquiries={JSON.parse(JSON.stringify(enquiries))} />
    </div>
  );
}
