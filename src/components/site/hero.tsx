import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";

interface HeroProps {
  eyebrow: string;
  heading: string;
  subheading: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function Hero({ eyebrow, heading, subheading, primaryCta, secondaryCta }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--secondary)_0%,_transparent_60%)]"
      />
      <Container className="relative py-20 sm:py-28 text-center flex flex-col items-center">
        <p className="brand-eyebrow mb-5">{eyebrow}</p>
        <h1 className="brand-display text-4xl sm:text-5xl lg:text-6xl text-foreground max-w-3xl text-balance">
          {heading}
        </h1>
        <p className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">{subheading}</p>
        <div className="mt-9 flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg">
            <Link href={primaryCta.href}>
              {primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          {secondaryCta && (
            <Button asChild size="lg" variant="outline">
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
