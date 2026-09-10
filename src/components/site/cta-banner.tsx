import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";

interface CtaBannerProps {
  heading: string;
  body: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function CtaBanner({ heading, body, primaryCta, secondaryCta }: CtaBannerProps) {
  return (
    <section className="border-t border-border bg-secondary">
      <Container className="py-20 sm:py-28 text-center flex flex-col items-center">
        <h2 className="brand-display text-3xl sm:text-4xl text-foreground max-w-xl">{heading}</h2>
        <p className="mt-5 max-w-lg text-base text-muted-foreground leading-relaxed">{body}</p>
        <div className="mt-9 flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg">
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
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
