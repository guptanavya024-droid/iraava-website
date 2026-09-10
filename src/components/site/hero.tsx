import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";

interface HeroProps {
  heading: string;
  subheading: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  logoUrl?: string | null;
  siteName?: string;
}

export function Hero({ heading, subheading, primaryCta, secondaryCta, logoUrl, siteName }: HeroProps) {
  return (
    <section className="relative flex min-h-[calc(100svh_-_5rem)] items-center overflow-hidden border-b border-border">
      {/* Photo layer, slowly panning behind everything. */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-pan absolute inset-0">
          <Image
            src="/images/hero-products.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_60%]"
          />
        </div>
        {/* Warm wash: heavy at the left where the words sit, clearing to the right. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(247,242,233,0.96) 0%, rgba(247,242,233,0.92) 38%, rgba(247,242,233,0.55) 64%, rgba(247,242,233,0.18) 100%)",
          }}
        />
      </div>

      <Container className="py-16 sm:py-24">
        <div className="max-w-2xl">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt={siteName ?? ""}
              width={360}
              height={104}
              className="mb-10 block h-16 w-auto object-contain sm:h-20"
              priority
            />
          )}
          <h1 className="brand-display text-[2.75rem] leading-[1.02] text-foreground text-balance sm:text-6xl lg:text-[4.25rem]">
            {heading}
          </h1>
          <p className="mt-7 max-w-xl text-lg text-foreground/75 leading-relaxed">{subheading}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
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
      </Container>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-7 flex justify-center">
        <div className="scroll-cue flex h-9 w-5 items-start justify-center rounded-full border border-foreground/25 pt-1.5">
          <span className="h-1.5 w-1 rounded-full bg-foreground/40" />
        </div>
      </div>
    </section>
  );
}
