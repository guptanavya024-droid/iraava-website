"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

interface ProductRangeContentFields {
  headline: string;
  subheading: string;
  introText: string;
}

export function ProductRangeContentForm({ initialContent }: { initialContent: ProductRangeContentFields }) {
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);

  function field<K extends keyof ProductRangeContentFields>(key: K) {
    return {
      value: content[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setContent((c) => ({ ...c, [key]: e.target.value })),
    };
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content/product-range", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error();
      toast.success("Product Range page content saved.");
    } catch {
      toast.error("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-1.5">
            <Label>Headline</Label>
            <Input {...field("headline")} />
          </div>
          <div className="space-y-1.5">
            <Label>Subheading</Label>
            <Textarea rows={2} {...field("subheading")} />
          </div>
          <div className="space-y-1.5">
            <Label>Intro text</Label>
            <Textarea rows={3} {...field("introText")} />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving} size="lg">
        {saving ? "Saving…" : "Save changes"}
      </Button>
    </div>
  );
}
