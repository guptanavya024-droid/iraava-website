import Image from "next/image";
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
  images?: { url: string; alt: string }[];
}

export function Hero({ eyebrow, heading, subheading, primaryCta, secondaryCta, images = [] }: HeroProps) {
  const [big, small1, small2] = images;

  return (
    <section className="border-b border-border bg-secondary/40">
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        <div>
          <p className="brand-eyebrow mb-5">{eyebrow}</p>
          <h1 className="brand-display text-4xl sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05] text-foreground text-balance">
            {heading}
          </h1>
          <p className="mt-6 max-w-lg text-base sm:text-lg text-muted-foreground leading-relaxed">{subheading}</p>
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
        </div>

        {big && (
          <div className="relative hidden sm:block">
            <div className="relative aspect-[4/5] w-full max-w-sm mx-auto overflow-hidden rounded-2xl shadow-lg">
              <Image src={big.url} alt={big.alt} fill className="object-cover" sizes="(min-width: 1024px) 30vw, 40vw" priority />
            </div>
            {small1 && (
              <div className="absolute -left-6 bottom-8 aspect-square w-28 overflow-hidden rounded-xl border-4 border-background shadow-lg sm:w-32 lg:-left-10">
                <Image src={small1.url} alt={small1.alt} fill className="object-cover" sizes="128px" />
              </div>
            )}
            {small2 && (
              <div className="absolute -right-4 top-6 aspect-square w-24 overflow-hidden rounded-xl border-4 border-background shadow-lg sm:w-28 lg:-right-8">
                <Image src={small2.url} alt={small2.alt} fill className="object-cover" sizes="112px" />
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
