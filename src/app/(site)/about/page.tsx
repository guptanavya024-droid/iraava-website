import type { Metadata } from "next";
import { Container } from "@/components/site/container";
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
      <section className="border-b border-border py-16 sm:py-20">
        <Container className="max-w-2xl text-center mx-auto">
          <h1 className="brand-display text-4xl sm:text-5xl text-foreground text-balance">{content.headline}</h1>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed">{content.subheading}</p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-2xl mx-auto space-y-5">
          {storyParagraphs.map((para, i) => (
            <Reveal key={i} delay={i * 100}>
              <p className="text-base text-foreground/85 leading-relaxed">{para}</p>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-secondary/60">
        <Container>
          <Reveal>
            <SectionHeading heading="Four principles that guide the work" align="center" />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <FeatureCard index={i} title={p.title} body={p.body} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-2xl mx-auto text-center">
          <Reveal>
            <p className="brand-display text-2xl sm:text-3xl text-foreground leading-snug">{content.closingStatement}</p>
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
