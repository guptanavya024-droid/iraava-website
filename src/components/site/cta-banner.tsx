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
    <section className="bg-secondary">
      <Container className="py-16 sm:py-20 text-center flex flex-col items-center">
        <h2 className="brand-display text-3xl sm:text-4xl text-foreground max-w-xl">{heading}</h2>
        <p className="mt-4 max-w-lg text-muted-foreground">{body}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
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
