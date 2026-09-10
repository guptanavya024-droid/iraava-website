import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/site/container";

interface PageHeaderProps {
  title: string;
  intro: string;
  /** Optional supporting image. Without it the header is centred text. */
  image?: string;
  imageAlt?: string;
  /** object-position for the image, e.g. "center 42%". */
  imagePosition?: string;
  /** Extra content under the intro (e.g. a small note or CTA). */
  children?: ReactNode;
}

// No Reveal here on purpose: this is the first thing in the viewport on every
// page, so it renders straight away rather than fading in.
export function PageHeader({ title, intro, image, imageAlt, imagePosition, children }: PageHeaderProps) {
  if (!image) {
    return (
      <section className="border-b border-border py-16 sm:py-24">
        <Container className="mx-auto max-w-2xl text-center">
          <h1 className="brand-display text-4xl text-foreground text-balance sm:text-5xl">{title}</h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{intro}</p>
          {children}
        </Container>
      </section>
    );
  }

  return (
    <section className="border-b border-border py-16 sm:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <h1 className="brand-display text-4xl text-foreground text-balance sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">{intro}</p>
          {children}
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border bg-secondary lg:aspect-auto lg:h-[24rem]">
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            priority
            className={cn("object-cover", !imagePosition && "object-center")}
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
            sizes="(min-width: 1024px) 46vw, 100vw"
          />
        </div>
      </Container>
    </section>
  );
}
