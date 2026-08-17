"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WorkWithUsContentFields {
  intro: string;
  catalogueBlurb: string;
  bulletPoints: string[];
  madeInIndiaText: string;
}

export function WorkWithUsContentForm({ initialContent }: { initialContent: WorkWithUsContentFields }) {
  const [intro, setIntro] = useState(initialContent.intro);
  const [catalogueBlurb, setCatalogueBlurb] = useState(initialContent.catalogueBlurb);
  const [bulletPointsText, setBulletPointsText] = useState(initialContent.bulletPoints.join("\n"));
  const [madeInIndiaText, setMadeInIndiaText] = useState(initialContent.madeInIndiaText);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      const bulletPoints = bulletPointsText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const res = await fetch("/api/admin/content/work-with-us", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intro, catalogueBlurb, bulletPoints, madeInIndiaText }),
      });
      if (!res.ok) throw new Error();
      toast.success("Work With Us page content saved.");
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
          <CardTitle className="text-base">Who we work with</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1.5">
            <Label>Intro</Label>
            <Textarea rows={3} value={intro} onChange={(e) => setIntro(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Start with our catalogue</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Blurb</Label>
            <Textarea rows={2} value={catalogueBlurb} onChange={(e) => setCatalogueBlurb(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Bullet points (one per line)</Label>
            <Textarea rows={5} value={bulletPointsText} onChange={(e) => setBulletPointsText(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Made in India. Made for your brand.</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea rows={3} value={madeInIndiaText} onChange={(e) => setMadeInIndiaText(e.target.value)} />
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving} size="lg">
        {saving ? "Saving…" : "Save changes"}
      </Button>
    </div>
  );
}
