"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PointsListEditor, type EditablePoint } from "@/components/admin/points-list-editor";

interface AboutContentFields {
  headline: string;
  subheading: string;
  brandStory: string;
  closingStatement: string;
}

export function AboutContentForm({
  initialContent,
  initialPrinciples,
}: {
  initialContent: AboutContentFields;
  initialPrinciples: EditablePoint[];
}) {
  const [content, setContent] = useState(initialContent);
  const [principles, setPrinciples] = useState(initialPrinciples);
  const [saving, setSaving] = useState(false);

  function field<K extends keyof AboutContentFields>(key: K) {
    return {
      value: content[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setContent((c) => ({ ...c, [key]: e.target.value })),
    };
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, principles }),
      });
      if (!res.ok) throw new Error();
      toast.success("About page content saved.");
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
          <CardTitle className="text-base">Page header</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Headline</Label>
            <Input {...field("headline")} />
          </div>
          <div className="space-y-1.5">
            <Label>Subheading</Label>
            <Textarea rows={2} {...field("subheading")} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Brand story</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1.5">
            <Label>Paragraphs (leave a blank line between paragraphs)</Label>
            <Textarea rows={12} {...field("brandStory")} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Our Approach — four principles</CardTitle>
        </CardHeader>
        <CardContent>
          <PointsListEditor items={principles} onChange={setPrinciples} itemLabel="Principle" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Closing statement</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea rows={3} {...field("closingStatement")} />
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving} size="lg">
        {saving ? "Saving…" : "Save changes"}
      </Button>
    </div>
  );
}
