import type { Metadata } from "next";
import { Container } from "@/components/site/container";
import { PageHeader } from "@/components/site/page-header";
import { SectionHeading } from "@/components/site/section-heading";
import { FeatureCard } from "@/components/site/feature-card";
import { CtaBanner } from "@/components/site/cta-banner";
import { Reveal } from "@/components/site/reveal";
import { getAboutContent, getApproachPrinciples } from "@/lib/content";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const [content, principles] = await Promise.all([getAboutContent(), getApproachPrinciples()]);
  const storyParagraphs = content.brandStory.split("\n\n").filter(Boolean);

  return (
    <>
      <PageHeader
        title={content.headline}
        intro={content.subheading}
        image="/images/about-header.jpg"
        imageAlt="Hands placing saffron threads on a stone slab beside a copper mortar of turmeric"
        imagePosition="center 55%"
      />

      <section className="py-20 sm:py-28">
        <Container className="max-w-2xl mx-auto space-y-5">
          {storyParagraphs.map((para, i) => (
            <Reveal key={i} delay={i * 100}>
              <p className="text-base text-foreground/85 leading-relaxed">{para}</p>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="border-y border-border bg-secondary/60 py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading heading="Four principles that guide the work" align="center" />
          </Reveal>
          <div className="mx-auto mt-14 grid max-w-4xl gap-x-12 gap-y-8 sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <FeatureCard index={i} title={p.title} body={p.body} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="max-w-2xl mx-auto text-center">
          <Reveal>
            <p className="brand-display text-lg sm:text-xl text-foreground leading-relaxed">{content.closingStatement}</p>
          </Reveal>
        </Container>
      </section>

      <CtaBanner
        heading="For buyers looking to source Indian skincare"
        body="Get in touch and we can share more about our range, our process, and how we work."
        primaryCta={{ label: "For Buyers", href: "/work-with-us" }}
        secondaryCta={{ label: "Send an Enquiry", href: "/contact" }}
      />
    </>
  );
}
