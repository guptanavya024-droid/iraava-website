import { Droplet, Leaf } from "lucide-react";
import { Container } from "@/components/site/container";
import { Hero } from "@/components/site/hero";
import { SectionHeading } from "@/components/site/section-heading";
import { FeatureCard } from "@/components/site/feature-card";
import { ProductCategoryCard } from "@/components/site/product-category-card";
import { CtaBanner } from "@/components/site/cta-banner";
import { getHomeContent, getWhyUsPoints } from "@/lib/content";

export default async function HomePage() {
  const [content, whyUsPoints] = await Promise.all([getHomeContent(), getWhyUsPoints()]);

  return (
    <>
      <Hero
        eyebrow="Iraava Naturals"
        heading={content.heroHeading}
        subheading={content.heroSubheading}
        primaryCta={{ label: "Explore Product Range", href: "/product-range" }}
        secondaryCta={{ label: "Request Catalogue", href: "/contact" }}
      />

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
          <SectionHeading eyebrow="Why Iraava Naturals" heading="Why buyers work with us" align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
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
          <div className="mt-12 grid gap-6 sm:grid-cols-2 max-w-3xl">
            <ProductCategoryCard
              icon={Leaf}
              title="Face Care"
              body="Serums, creams and cleansers across selected formats for daily face-care routines."
              href="/product-range"
            />
            <ProductCategoryCard
              icon={Droplet}
              title="Body Care"
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
