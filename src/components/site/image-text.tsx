import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";

interface ImageTextProps {
  image: string;
  imageAlt: string;
  /** Portrait sources get a taller frame; landscape ones a 4:3. */
  portrait?: boolean;
  /** object-position for the image, e.g. "center 55%". */
  imagePosition?: string;
  heading: string;
  children: ReactNode;
  link?: { label: string; href: string };
  /** Put the image on the right instead of the left. */
  flip?: boolean;
  className?: string;
}

export function ImageText({ image, imageAlt, portrait, imagePosition, heading, children, link, flip, className }: ImageTextProps) {
  return (
    <section className={cn("py-14 sm:py-20", className)}>
      <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal
          variant="image"
          className={cn("order-1", flip ? "lg:order-2" : "lg:order-1")}
        >
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-3xl border border-border bg-secondary",
              portrait
                ? "aspect-[4/5] sm:aspect-[3/2] lg:aspect-auto lg:h-[26rem]"
                : "aspect-[4/3] lg:aspect-auto lg:h-[26rem]"
            )}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              style={imagePosition ? { objectPosition: imagePosition } : undefined}
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
          </div>
        </Reveal>

        <Reveal className={cn("order-2 lg:max-w-md", flip ? "lg:order-1 lg:justify-self-end" : "lg:order-2")}>
          <h2 className="brand-display text-3xl text-foreground sm:text-4xl">{heading}</h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{children}</div>
          {link && (
            <Link
              href={link.href}
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              {link.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
