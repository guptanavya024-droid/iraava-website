import type { Metadata } from "next";
import { Container } from "@/components/site/container";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const addressLines = [
    settings.addressLine1,
    settings.addressLine2,
    [settings.city, settings.state, settings.pincode].filter(Boolean).join(", "),
    settings.country,
  ].filter(Boolean);

  return (
    <section className="py-16 sm:py-20">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div>
          <p className="brand-eyebrow mb-4">Contact</p>
          <h1 className="brand-display text-3xl sm:text-4xl text-foreground text-balance">
            We&apos;d love to hear from you.
          </h1>
          <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
            If you are looking to source Indian skincare, or just want to know more about what we make — drop us a
            message and we will get back to you.
          </p>

          <div className="mt-8 space-y-4 text-sm">
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
                <p className="text-muted-foreground">Our Address</p>
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
        </div>

        <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground mb-6">Send an Enquiry</h2>
          <EnquiryForm />
        </div>
      </Container>
    </section>
  );
}
