import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminMobileNav } from "@/components/admin/mobile-nav";

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar adminName={session.user.name ?? session.user.email ?? null} />
      <div className="flex flex-1 flex-col min-w-0">
        <AdminMobileNav />
        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
