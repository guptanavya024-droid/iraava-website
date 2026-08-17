import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { getWorkWithUsContent, getSiteSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Work With Us" };

export default async function WorkWithUsPage() {
  const [content, settings] = await Promise.all([getWorkWithUsContent(), getSiteSettings()]);

  const addressLines = [
    settings.addressLine1,
    settings.addressLine2,
    [settings.city, settings.state, settings.pincode].filter(Boolean).join(", "),
    settings.country,
  ].filter(Boolean);

  return (
    <>
      <section className="border-b border-border py-16 sm:py-20">
        <Container className="max-w-2xl mx-auto text-center">
          <h1 className="brand-display text-4xl sm:text-5xl text-foreground text-balance">Who we work with</h1>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed">{content.intro}</p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2 items-start">
          <Reveal>
            <SectionHeading heading="Start with our catalogue." subheading={content.catalogueBlurb} />
            <ul className="mt-6 space-y-3">
              {content.bulletPoints.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/85">
                  <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  {bullet}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-8">
              <Link href="/contact">Request Our Catalogue</Link>
            </Button>
          </Reveal>

          <Reveal delay={150} className="rounded-xl border border-border bg-card p-7 space-y-5">
            <SectionHeading heading="Get in touch" />
            <div className="space-y-3 text-sm">
              {settings.email && (
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <a href={`mailto:${settings.email}`} className="text-foreground font-medium hover:text-primary">
                    {settings.email}
                  </a>
                </div>
              )}
              {settings.phone && (
                <div>
                  <p className="text-muted-foreground">Phone Number</p>
                  <a href={`tel:${settings.phone}`} className="text-foreground font-medium hover:text-primary">
                    {settings.phone}
                  </a>
                </div>
              )}
              {addressLines.length > 0 && (
                <div>
                  <p className="text-muted-foreground">Address</p>
                  <address className="not-italic text-foreground font-medium leading-relaxed">
                    {addressLines.map((line, i) => (
                      <span key={i} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              )}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-secondary/60">
        <Container className="max-w-2xl mx-auto text-center">
          <Reveal>
            <h2 className="brand-display text-3xl sm:text-4xl text-foreground">Made in India. Made for your brand.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{content.madeInIndiaText}</p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
