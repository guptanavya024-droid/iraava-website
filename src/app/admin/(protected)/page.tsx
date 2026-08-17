import Link from "next/link";
import { FileText, Info, Sparkles, Handshake, Package, Inbox, Settings } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { db } from "@/lib/db";

const QUICK_LINKS = [
  { href: "/admin/content/home", label: "Home page", icon: FileText },
  { href: "/admin/content/about", label: "About page", icon: Info },
  { href: "/admin/content/product-range", label: "Product Range page", icon: Sparkles },
  { href: "/admin/content/work-with-us", label: "Work With Us page", icon: Handshake },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/settings", label: "Site settings", icon: Settings },
];

export default async function AdminDashboardPage() {
  const newEnquiries = await db.enquirySubmission.count({ where: { status: "NEW" } });

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Overview of your site content and enquiries." />

      <Link href="/admin/enquiries" className="block mb-8">
        <Card className="hover:border-primary/40 transition-colors">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <Inbox className="h-4 w-4 text-primary" />
                Enquiries
              </CardTitle>
              <CardDescription>
                {newEnquiries === 0 ? "No new enquiries." : `${newEnquiries} new enquir${newEnquiries === 1 ? "y" : "ies"}.`}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </Link>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {QUICK_LINKS.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="h-full hover:border-primary/40 transition-colors">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <link.icon className="h-4 w-4 text-primary" />
                  {link.label}
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
