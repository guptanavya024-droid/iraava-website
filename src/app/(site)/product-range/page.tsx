import type { Metadata } from "next";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { ProductCard } from "@/components/site/product-card";
import { CtaBanner } from "@/components/site/cta-banner";
import { EmptyState } from "@/components/ui/empty-state";
import { Sparkles } from "lucide-react";
import { getProductRangeContent, getActiveProducts } from "@/lib/content";

export const metadata: Metadata = { title: "Product Range" };

export default async function ProductRangePage() {
  const [content, products] = await Promise.all([getProductRangeContent(), getActiveProducts()]);

  const faceCare = products.filter((p) => p.category === "FACE_CARE");
  const bodyCare = products.filter((p) => p.category === "BODY_CARE");

  return (
    <>
      <section className="border-b border-border py-16 sm:py-20">
        <Container className="max-w-2xl text-center mx-auto">
          <h1 className="brand-display text-4xl sm:text-5xl text-foreground text-balance">{content.headline}</h1>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed">{content.subheading}</p>
          <p className="mt-3 text-sm text-muted-foreground/80">{content.introText}</p>
        </Container>
      </section>

      {products.length === 0 ? (
        <Container className="py-20">
          <EmptyState icon={Sparkles} title="Catalogue coming soon" description="Product listings will appear here." />
        </Container>
      ) : (
        <>
          {faceCare.length > 0 && (
            <section className="py-16 sm:py-20">
              <Container>
                <SectionHeading eyebrow="01 · Face Care" heading="Face Care" />
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {faceCare.map((p) => (
                    <ProductCard
                      key={p.id}
                      name={p.name}
                      variant={p.variant}
                      type={p.type}
                      description={p.description}
                      imageUrl={p.imageUrl}
                    />
                  ))}
                </div>
              </Container>
            </section>
          )}

          {bodyCare.length > 0 && (
            <section className="py-16 sm:py-20 bg-secondary/60">
              <Container>
                <SectionHeading eyebrow="02 · Body Care" heading="Body Care" />
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {bodyCare.map((p) => (
                    <ProductCard
                      key={p.id}
                      name={p.name}
                      variant={p.variant}
                      type={p.type}
                      description={p.description}
                      imageUrl={p.imageUrl}
                    />
                  ))}
                </div>
              </Container>
            </section>
          )}
        </>
      )}

      <CtaBanner
        heading="Request the product catalogue"
        body="Full product details — formulations, key ingredients, available formats, and pricing — are available on request. Get in touch and we will send it across."
        primaryCta={{ label: "Request Catalogue", href: "/contact" }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
