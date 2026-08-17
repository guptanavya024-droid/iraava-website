"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { signOut } from "next-auth/react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/content/home", label: "Home page" },
  { href: "/admin/content/about", label: "About page" },
  { href: "/admin/content/product-range", label: "Product Range page" },
  { href: "/admin/content/work-with-us", label: "Work With Us page" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/settings", label: "Site settings" },
];

export function AdminMobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center justify-between border-b border-border bg-card px-4 h-14">
      <p className="brand-display text-base text-primary">Iraava Naturals</p>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="rounded-md p-2 hover:bg-muted"
      >
        <Menu className="h-5 w-5" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xs left-4 right-4 top-4 translate-x-0 translate-y-0">
          <DialogTitle className="text-base">Menu</DialogTitle>
          <nav className="flex flex-col gap-1 mt-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="text-left rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-muted"
            >
              Sign out
            </button>
          </nav>
        </DialogContent>
      </Dialog>
    </div>
  );
}
