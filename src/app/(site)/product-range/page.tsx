import type { Metadata } from "next";
import { Container } from "@/components/site/container";
import { ProductCatalog } from "@/components/site/product-catalog";
import { CtaBanner } from "@/components/site/cta-banner";
import { getProductRangeContent, getActiveProducts } from "@/lib/content";

export const metadata: Metadata = { title: "Product Range" };

export default async function ProductRangePage() {
  const [content, products] = await Promise.all([getProductRangeContent(), getActiveProducts()]);

  return (
    <>
      <section className="border-b border-border py-16 sm:py-20">
        <Container className="max-w-2xl text-center mx-auto">
          <h1 className="brand-display text-4xl sm:text-5xl text-foreground text-balance">{content.headline}</h1>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed">{content.subheading}</p>
          <p className="mt-3 text-sm text-muted-foreground/80">{content.introText}</p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <ProductCatalog products={products} />
        </Container>
      </section>

      <CtaBanner
        heading="Request the product catalogue"
        body="Full product details — formulations, key ingredients, available formats, and pricing — are available on request. Get in touch and we will send it across."
        primaryCta={{ label: "Request Catalogue", href: "/contact" }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
