"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { Logo } from "@/components/site/logo";
import { NAV_LINKS } from "@/lib/types";
import { cn } from "@/lib/utils";

interface HeaderProps {
  logoUrl: string | null;
  logoMarkUrl: string | null;
  siteName: string;
}

function HeaderMark({ logoUrl, logoMarkUrl, siteName }: HeaderProps) {
  if (logoMarkUrl) {
    return (
      <Link href="/" className="flex shrink-0 items-center">
        <Image src={logoMarkUrl} alt={siteName} width={56} height={56} className="h-11 w-11 object-contain sm:h-12 sm:w-12" priority />
      </Link>
    );
  }
  return <Logo logoUrl={logoUrl} siteName={siteName} size="lg" />;
}

export function Header({ logoUrl, logoMarkUrl, siteName }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <HeaderMark logoUrl={logoUrl} logoMarkUrl={logoMarkUrl} siteName={siteName} />

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/75 hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm">
            <Link href="/contact">Request Catalogue</Link>
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2.5 text-sm font-medium",
                  pathname === link.href
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/80 hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild size="sm" className="mt-2">
              <Link href="/contact" onClick={() => setOpen(false)}>
                Request Catalogue
              </Link>
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
