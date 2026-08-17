import { Container } from "@/components/site/container";
import { Hero } from "@/components/site/hero";
import { SectionHeading } from "@/components/site/section-heading";
import { FeatureCard } from "@/components/site/feature-card";
import { ProductCategoryCard } from "@/components/site/product-category-card";
import { CtaBanner } from "@/components/site/cta-banner";
import { getHomeContent, getWhyUsPoints, getActiveProducts } from "@/lib/content";

export default async function HomePage() {
  const [content, whyUsPoints, products] = await Promise.all([getHomeContent(), getWhyUsPoints(), getActiveProducts()]);

  const withImages = products.filter((p) => p.imageUrl);
  const heroImages = withImages.slice(0, 3).map((p) => ({ url: p.imageUrl!, alt: p.name }));
  const faceCareImage = products.find((p) => p.category === "FACE_CARE" && p.imageUrl)?.imageUrl ?? null;
  const bodyCareImage = products.find((p) => p.category === "BODY_CARE" && p.imageUrl)?.imageUrl ?? null;
  const faceCareCount = products.filter((p) => p.category === "FACE_CARE").length;
  const bodyCareCount = products.filter((p) => p.category === "BODY_CARE").length;

  return (
    <>
      <Hero
        eyebrow="Iraava Naturals"
        heading={content.heroHeading}
        subheading={content.heroSubheading}
        primaryCta={{ label: "Explore Product Range", href: "/product-range" }}
        secondaryCta={{ label: "Request Catalogue", href: "/contact" }}
        images={heroImages}
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
          <div>
            <SectionHeading eyebrow="Where we come from" heading="A tradition of botanical wellness" />
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{content.whereWeFromText}</p>
          </div>
          <div>
            <SectionHeading eyebrow="What we do" heading="Formulation to final product" />
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{content.whatWeDoText}</p>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24 bg-secondary/60">
        <Container>
          <SectionHeading eyebrow="Why Iraava Naturals" heading="Why buyers work with us" />
          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 max-w-3xl">
            {whyUsPoints.map((point, i) => (
              <FeatureCard key={point.id} index={i} title={point.title} body={point.body} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Product Range"
            heading="Face and body care, organised around the way buyers source"
            subheading={content.productRangeIntro}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-3xl">
            <ProductCategoryCard
              imageUrl={faceCareImage}
              title={`Face Care${faceCareCount ? ` (${faceCareCount})` : ""}`}
              body="Serums, creams and cleansers across selected formats for daily face-care routines."
              href="/product-range"
            />
            <ProductCategoryCard
              imageUrl={bodyCareImage}
              title={`Body Care${bodyCareCount ? ` (${bodyCareCount})` : ""}`}
              body="Creams, cleansers and washes developed for everyday body-care ranges."
              href="/product-range"
            />
          </div>
        </Container>
      </section>

      <CtaBanner
        heading={content.buyerCtaHeading}
        body={content.buyerCtaBody}
        primaryCta={{ label: "Request Catalogue", href: "/contact" }}
        secondaryCta={{ label: "Send an Enquiry", href: "/contact" }}
      />
    </>
  );
}
