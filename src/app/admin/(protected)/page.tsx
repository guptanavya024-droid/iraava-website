import { PageHeader } from "@/components/ui/page-header";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Overview of your site content and enquiries." />
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Welcome</CardTitle>
          <CardDescription>
            Use the sidebar to edit page content, manage products, update site settings, or read enquiries.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
