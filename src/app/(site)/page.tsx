import { Container } from "@/components/site/container";
import { Hero } from "@/components/site/hero";
import { SectionHeading } from "@/components/site/section-heading";
import { FeatureCard } from "@/components/site/feature-card";
import { ProductCategoryCard } from "@/components/site/product-category-card";
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

  const withImages = products.filter((p) => p.imageUrl);
  const heroImages = withImages.slice(0, 3).map((p) => ({ url: p.imageUrl!, alt: p.name }));
  const faceCareImage = products.find((p) => p.category === "FACE_CARE" && p.imageUrl)?.imageUrl ?? null;
  const bodyCareImage = products.find((p) => p.category === "BODY_CARE" && p.imageUrl)?.imageUrl ?? null;
  const faceCareCount = products.filter((p) => p.category === "FACE_CARE").length;
  const bodyCareCount = products.filter((p) => p.category === "BODY_CARE").length;

  return (
    <>
      <Hero
        heading={content.heroHeading}
        subheading={content.heroSubheading}
        primaryCta={{ label: "Explore Product Range", href: "/product-range" }}
        secondaryCta={{ label: "Request Catalogue", href: "/contact" }}
        images={heroImages}
        logoUrl={settings.logoUrl}
        siteName={settings.siteName}
      />

      <div className="border-b border-border">
        <Container className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-6 text-sm text-muted-foreground">
          <span>
            <strong className="text-foreground font-semibold">{products.length}+</strong> formulations
          </span>
          <span className="hidden sm:inline text-border">·</span>
          <span>
            <strong className="text-foreground font-semibold">Face &amp; Body</strong> care ranges
          </span>
          <span className="hidden sm:inline text-border">·</span>
          <span>Formulated &amp; manufactured in India</span>
        </Container>
      </div>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-10 sm:grid-cols-2">
          <Reveal>
            <SectionHeading heading="Where we come from" />
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{content.whereWeFromText}</p>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading heading="What we do" />
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{content.whatWeDoText}</p>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-24 bg-secondary/60">
        <Container>
          <Reveal>
            <SectionHeading heading="Why buyers work with us" />
          </Reveal>
          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 max-w-3xl">
            {whyUsPoints.map((point, i) => (
              <Reveal key={point.id} delay={i * 100}>
                <FeatureCard index={i} title={point.title} body={point.body} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              heading="Face and body care, organised around the way buyers source"
              subheading={content.productRangeIntro}
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-3xl">
            <Reveal delay={0}>
              <ProductCategoryCard
                imageUrl={faceCareImage}
                title={`Face Care${faceCareCount ? ` (${faceCareCount})` : ""}`}
                body="Serums, creams and cleansers across selected formats for daily face-care routines."
                href="/product-range"
              />
            </Reveal>
            <Reveal delay={100}>
              <ProductCategoryCard
                imageUrl={bodyCareImage}
                title={`Body Care${bodyCareCount ? ` (${bodyCareCount})` : ""}`}
                body="Creams, cleansers and washes developed for everyday body-care ranges."
                href="/product-range"
              />
            </Reveal>
          </div>
        </Container>
      </section>

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
