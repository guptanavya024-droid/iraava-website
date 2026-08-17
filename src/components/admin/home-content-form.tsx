"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PointsListEditor, type EditablePoint } from "@/components/admin/points-list-editor";

interface HomeContentFields {
  heroHeading: string;
  heroSubheading: string;
  whereWeFromText: string;
  whatWeDoText: string;
  productRangeIntro: string;
  buyerCtaHeading: string;
  buyerCtaBody: string;
}

export function HomeContentForm({
  initialContent,
  initialWhyUsPoints,
}: {
  initialContent: HomeContentFields;
  initialWhyUsPoints: EditablePoint[];
}) {
  const [content, setContent] = useState(initialContent);
  const [whyUsPoints, setWhyUsPoints] = useState(initialWhyUsPoints);
  const [saving, setSaving] = useState(false);

  function field<K extends keyof HomeContentFields>(key: K) {
    return {
      value: content[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setContent((c) => ({ ...c, [key]: e.target.value })),
    };
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, whyUsPoints }),
      });
      if (!res.ok) throw new Error();
      toast.success("Home page content saved.");
    } catch {
      toast.error("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Hero</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Heading</Label>
            <Input {...field("heroHeading")} />
          </div>
          <div className="space-y-1.5">
            <Label>Subheading</Label>
            <Textarea rows={3} {...field("heroSubheading")} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Where we come from / What we do</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Where we come from</Label>
            <Textarea rows={3} {...field("whereWeFromText")} />
          </div>
          <div className="space-y-1.5">
            <Label>What we do</Label>
            <Textarea rows={3} {...field("whatWeDoText")} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Why buyers work with us</CardTitle>
        </CardHeader>
        <CardContent>
          <PointsListEditor items={whyUsPoints} onChange={setWhyUsPoints} itemLabel="Point" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Product range preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1.5">
            <Label>Intro text</Label>
            <Textarea rows={3} {...field("productRangeIntro")} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Buyer CTA</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Heading</Label>
            <Input {...field("buyerCtaHeading")} />
          </div>
          <div className="space-y-1.5">
            <Label>Body</Label>
            <Textarea rows={3} {...field("buyerCtaBody")} />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving} size="lg">
        {saving ? "Saving…" : "Save changes"}
      </Button>
    </div>
  );
}
