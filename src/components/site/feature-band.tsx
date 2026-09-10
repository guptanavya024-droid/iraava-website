import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

interface FeatureBandProps {
  image: string;
  heading: string;
  body: string;
  cta?: { label: string; href: string };
}

// Full-bleed photo band, deep-green scrim, one line of copy. A breather
// between the reading-heavy sections.
export function FeatureBand({ image, heading, body, cta }: FeatureBandProps) {
  return (
    <section className="relative overflow-hidden">
      <Image src={image} alt="" fill className="absolute inset-0 object-cover object-center" sizes="100vw" />
      <div className="absolute inset-0 bg-primary/80" />
      <Container className="relative z-10 py-24 sm:py-32">
        <Reveal className="max-w-xl">
          <h2 className="brand-display text-3xl text-primary-foreground sm:text-4xl">{heading}</h2>
          <p className="mt-4 text-base leading-relaxed text-primary-foreground/80">{body}</p>
          {cta && (
            <Button asChild size="lg" variant="secondary" className="mt-8">
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
