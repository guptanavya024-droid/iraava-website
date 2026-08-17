"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Info,
  Sparkles,
  Handshake,
  Settings,
  Package,
  Inbox,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/content/home", label: "Home page", icon: FileText },
  { href: "/admin/content/about", label: "About page", icon: Info },
  { href: "/admin/content/product-range", label: "Product Range page", icon: Sparkles },
  { href: "/admin/content/work-with-us", label: "Work With Us page", icon: Handshake },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { href: "/admin/settings", label: "Site settings", icon: Settings },
] as const;

export function AdminSidebar({ adminName }: { adminName: string | null }) {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:border-r md:border-border md:bg-card">
      <div className="px-5 py-5 border-b border-border">
        <p className="brand-display text-lg text-primary">Iraava Naturals</p>
        <p className="text-xs text-muted-foreground mt-0.5">Admin CMS</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active ? "bg-secondary text-primary" : "text-foreground/75 hover:bg-muted"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border px-3 py-3">
        {adminName && <p className="px-3 pb-2 text-xs text-muted-foreground truncate">{adminName}</p>}
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-foreground/75 hover:bg-muted"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
