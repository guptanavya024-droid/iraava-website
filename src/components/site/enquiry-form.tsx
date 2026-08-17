"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const BUYER_TYPES = [
  { value: "BRAND", label: "Brand" },
  { value: "IMPORTER", label: "Importer" },
  { value: "DISTRIBUTOR", label: "Distributor" },
  { value: "OTHER", label: "Other" },
];

const ENQUIRY_TYPES = [
  { value: "CATALOGUE_PRICING", label: "Request catalogue and pricing" },
  { value: "PRIVATE_LABEL", label: "Private-label product enquiry" },
  { value: "CUSTOMIZATION", label: "Product or formulation customisation" },
  { value: "EXPORT_DISTRIBUTION", label: "Export or distribution enquiry" },
  { value: "GENERAL", label: "General enquiry" },
];

export function EnquiryForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  function toggleCategory(value: string) {
    setCategories((prev) => (prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot: real visitors never fill a field this hidden from view.
    if (formData.get("website")) return;

    if (categories.length === 0) {
      toast.error("Select at least one product category.");
      return;
    }

    const payload = {
      name: formData.get("name"),
      company: formData.get("company"),
      workEmail: formData.get("workEmail"),
      phone: formData.get("phone") || undefined,
      country: formData.get("country"),
      buyerType: formData.get("buyerType"),
      productCategories: categories,
      enquiryType: formData.get("enquiryType"),
      message: formData.get("message"),
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
      form.reset();
      setCategories([]);
    } catch {
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <h3 className="text-lg font-semibold text-foreground">Thank you, we&apos;ve received your enquiry.</h3>
        <p className="mt-2 text-sm text-muted-foreground">We&apos;ll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="company">Company / Brand</Label>
          <Input id="company" name="company" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="workEmail">Work Email</Label>
          <Input id="workEmail" name="workEmail" type="email" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" name="phone" type="tel" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="country">Country / Target Market</Label>
          <Input id="country" name="country" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="buyerType">Buyer Type</Label>
          <Select id="buyerType" name="buyerType" required defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {BUYER_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Product Categories</Label>
        <div className="flex gap-5">
          {[
            { value: "FACE_CARE", label: "Face care" },
            { value: "BODY_CARE", label: "Body care" },
          ].map((c) => (
            <label key={c.value} className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={categories.includes(c.value)}
                onChange={() => toggleCategory(c.value)}
                className="h-4 w-4 rounded border-input accent-primary"
              />
              {c.label}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="enquiryType">Enquiry Type</Label>
        <Select id="enquiryType" name="enquiryType" required defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          {ENQUIRY_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required rows={5} />
      </div>

      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? "Sending…" : "Send an Enquiry"}
      </Button>
    </form>
  );
}
