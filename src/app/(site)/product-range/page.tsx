import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { ProductCatalog } from "@/components/site/product-catalog";
import { CtaBanner } from "@/components/site/cta-banner";
import { getProductRangeContent, getActiveProducts, getProductTypes } from "@/lib/content";

export const metadata: Metadata = { title: "Product Range" };

export default async function ProductRangePage() {
  const [content, products, productTypes] = await Promise.all([
    getProductRangeContent(),
    getActiveProducts(),
    getProductTypes(),
  ]);

  return (
    <>
      <PageHeader title={content.headline} intro={content.subheading}>
        <p className="mt-3 text-sm text-muted-foreground/80">{content.introText}</p>
      </PageHeader>

      <section className="pt-10 sm:pt-14">
        <Container>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border bg-secondary sm:aspect-[2/1] lg:aspect-[21/8]">
            <Image
              src="/images/range-strip.jpg"
              alt="Iraava Naturals serums and jars laid out with neem, amla, ashwagandha and turmeric"
              fill
              priority
              className="object-cover"
              style={{ objectPosition: "center 44%" }}
              sizes="100vw"
            />
          </div>
        </Container>
      </section>

      <section className="pt-10 pb-16 sm:pt-14 sm:pb-20">
        <Container>
          <ProductCatalog products={products} productTypes={productTypes} />
        </Container>
      </section>

      <CtaBanner
        heading="Request the product catalogue"
        body="Full product details, including formulations, key ingredients, available formats and pricing, are available on request. Get in touch and we will send it across."
        primaryCta={{ label: "Request Catalogue", href: "/contact" }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
