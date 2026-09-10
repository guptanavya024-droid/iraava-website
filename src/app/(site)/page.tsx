import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { Hero } from "@/components/site/hero";
import { SectionHeading } from "@/components/site/section-heading";
import { FeatureCard } from "@/components/site/feature-card";
import { CapabilityMarquee } from "@/components/site/capability-marquee";
import { ImageText } from "@/components/site/image-text";
import { FeatureBand } from "@/components/site/feature-band";
import { CtaBanner } from "@/components/site/cta-banner";
import { Reveal } from "@/components/site/reveal";
import { getHomeContent, getWhyUsPoints, getActiveProducts, getSiteSettings } from "@/lib/content";

export default async function HomePage() {
  const [content, whyUsPoints, products, settings] = await Promise.all([
    getHomeContent(),
    getWhyUsPoints(),
    getActiveProducts(),
    getSiteSettings(),
  ]);

  const rangePreview = products.filter((p) => p.imageUrl).slice(0, 4);
  const faceCareCount = products.filter((p) => p.category === "FACE_CARE").length;
  const bodyCareCount = products.filter((p) => p.category === "BODY_CARE").length;

  return (
    <>
      <Hero
        heading={content.heroHeading}
        subheading={content.heroSubheading}
        primaryCta={{ label: "Explore Product Range", href: "/product-range" }}
        secondaryCta={{ label: "Request Catalogue", href: "/contact" }}
        logoUrl={settings.logoUrl}
        siteName={settings.siteName}
      />

      <CapabilityMarquee />

      <ImageText
        image="/images/home-heritage.jpg"
        imageAlt="Hand grinding turmeric and botanicals with a copper mortar and pestle"
        portrait
        heading="Where we come from"
        link={{ label: "Read our story", href: "/about" }}
      >
        <p>{content.whereWeFromText}</p>
      </ImageText>

      <ImageText
        image="/images/process-05-production.jpg"
        imageAlt="Bottles moving along a filling line at the manufacturing facility"
        flip
        heading="What we do"
        link={{ label: "See the product range", href: "/product-range" }}
      >
        <p>{content.whatWeDoText}</p>
      </ImageText>

      <section className="border-y border-border bg-secondary/50 py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="image" className="order-1">
            <div className="relative h-[22rem] w-full overflow-hidden rounded-3xl border border-border bg-secondary lg:h-[26rem]">
              <Image
                src="/images/home-botanicals.jpg"
                alt="Indian botanicals and a serum dropper laid out on a work surface"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 46vw, 100vw"
              />
            </div>
          </Reveal>
          <Reveal className="order-2 lg:max-w-md lg:justify-self-end">
            <h2 className="brand-display text-3xl text-foreground sm:text-4xl">How we approach formulation</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We are a manufacturer first. What ends up in a product, and why, is where the work goes.
            </p>
            <div className="mt-8 space-y-6">
              {whyUsPoints.map((point, i) => (
                <FeatureCard key={point.id} index={i} title={point.title} body={point.body} />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              heading="A focused catalogue, not an endless one"
              subheading={content.productRangeIntro}
            />
          </Reveal>

          {rangePreview.length > 0 && (
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {rangePreview.map((product, i) => (
                <Reveal key={product.id} variant="image" delay={i * 80}>
                  <Link href="/product-range" className="group block">
                    <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-secondary/70">
                      <Image
                        src={product.imageUrl!}
                        alt={product.name}
                        fill
                        className="object-contain p-4 transition-transform duration-700 ease-soft group-hover:scale-105"
                        sizes="(min-width: 640px) 22vw, 45vw"
                      />
                    </div>
                    <p className="mt-3 text-sm font-medium text-foreground">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.type}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal delay={120}>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                {faceCareCount} face care and {bodyCareCount} body care formulations, filterable by type.
              </p>
              <Link
                href="/product-range"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                Browse the full range
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <FeatureBand
        image="/images/home-band.jpg"
        heading="Made in India. Made for your brand."
        body="We handle formulation, production, quality control and export documentation end to end, so you deal with one partner from first brief to shipped order."
        cta={{ label: "How we work", href: "/work-with-us" }}
      />

      <Reveal>
        <CtaBanner
          heading={content.buyerCtaHeading}
          body={content.buyerCtaBody}
          primaryCta={{ label: "Request Catalogue", href: "/contact" }}
          secondaryCta={{ label: "Send an Enquiry", href: "/contact" }}
        />
      </Reveal>
    </>
  );
}
