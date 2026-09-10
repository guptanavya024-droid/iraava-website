import Image from "next/image";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";

const STEPS = [
  {
    num: "01",
    title: "Tell us what you're looking for",
    body: "Category, market, volume, positioning.",
    image: "/images/process-01-brief.jpg",
  },
  {
    num: "02",
    title: "Shortlist formulations",
    body: "Choose from the existing catalogue or discuss customization.",
    image: "/images/process-02-shortlist.jpg",
  },
  {
    num: "03",
    title: "Evaluate samples",
    body: "Review texture, fragrance, performance and packaging.",
    image: "/images/process-03-samples.jpg",
  },
  {
    num: "04",
    title: "Finalize commercial details",
    body: "MOQ, pricing, packaging, artwork and documentation.",
    image: "/images/process-04-commercial.jpg",
  },
  {
    num: "05",
    title: "Production and export",
    body: "Manufacture, QC, packing and shipment.",
    image: "/images/process-05-production.jpg",
  },
];

export function ProcessSteps() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            heading="How we work"
            subheading="A simple path from first enquiry to a shipped order."
          />
        </Reveal>

        <div className="mt-14 space-y-14 sm:space-y-20">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 80}>
              <div
                className={`grid items-center gap-8 sm:grid-cols-2 sm:gap-12 ${
                  i % 2 === 1 ? "sm:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div
                  className="relative overflow-hidden rounded-2xl border border-border"
                  style={{ aspectRatio: "3 / 2" }}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 45vw, 100vw"
                  />
                </div>
                <div className="flex gap-5">
                  <span className="brand-display text-4xl leading-none text-primary/25 sm:text-5xl">{step.num}</span>
                  <div className="pt-1">
                    <h3 className="brand-display text-xl text-foreground sm:text-2xl">{step.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">{step.body}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
