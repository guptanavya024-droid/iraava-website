"use client";

import { useEffect, useState } from "react";
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

function Brand({ logoUrl, logoMarkUrl, siteName }: HeaderProps) {
  if (logoMarkUrl) {
    return (
      <Link href="/" className="flex shrink-0 items-center gap-2.5">
        <Image
          src={logoMarkUrl}
          alt=""
          width={48}
          height={48}
          className="h-10 w-10 object-contain sm:h-11 sm:w-11"
          priority
        />
        <span className="text-base font-light tracking-wide text-foreground sm:text-lg">{siteName}</span>
      </Link>
    );
  }
  return <Logo logoUrl={logoUrl} siteName={siteName} size="lg" />;
}

export function Header({ logoUrl, logoMarkUrl, siteName }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Only the homepage has a full-bleed hero to sit transparently over; every
  // other page's content starts at the top, so the bar stays solid there.
  const solid = scrolled || open || pathname !== "/";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        solid
          ? "border-b border-border bg-background/85 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Brand logoUrl={logoUrl} logoMarkUrl={logoMarkUrl} siteName={siteName} />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 text-sm transition-colors",
                  active
                    ? "font-semibold text-foreground"
                    : "font-medium text-foreground/60 hover:text-foreground"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px bg-primary transition-all duration-300",
                    active ? "w-full opacity-100" : "w-0 opacity-0"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm" variant={solid ? "default" : "outline"}>
            <Link href="/contact">Request Catalogue</Link>
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
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
