"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/admin/image-upload";
import { SOCIAL_LABELS } from "@/components/site/social-icons";
import type { SiteSettingsData, SocialLinkData, SocialPlatform } from "@/lib/types";

const PLATFORMS: SocialPlatform[] = ["INSTAGRAM", "FACEBOOK", "WHATSAPP", "LINKEDIN", "TWITTER", "YOUTUBE", "OTHER"];

interface EditableSocialLink {
  platform: SocialPlatform;
  url: string;
}

export function SettingsForm({
  initialSettings,
  initialSocialLinks,
}: {
  initialSettings: SiteSettingsData;
  initialSocialLinks: SocialLinkData[];
}) {
  const [settings, setSettings] = useState(initialSettings);
  const [socialLinks, setSocialLinks] = useState<EditableSocialLink[]>(
    initialSocialLinks.map((s) => ({ platform: s.platform, url: s.url }))
  );
  const [saving, setSaving] = useState(false);

  function field<K extends keyof SiteSettingsData>(key: K) {
    return {
      value: settings[key] ?? "",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSettings((s) => ({ ...s, [key]: e.target.value })),
    };
  }

  function updateSocial(index: number, patch: Partial<EditableSocialLink>) {
    setSocialLinks((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          settings: {
            ...settings,
            email: settings.email || null,
            phone: settings.phone || null,
            addressLine1: settings.addressLine1 || null,
            addressLine2: settings.addressLine2 || null,
            city: settings.city || null,
            state: settings.state || null,
            pincode: settings.pincode || null,
            country: settings.country || null,
          },
          socialLinks: socialLinks.filter((s) => s.url.trim().length > 0),
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Site settings saved.");
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
          <CardTitle className="text-base">Logo</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Full logo</Label>
            <ImageUpload
              value={settings.logoUrl}
              onChange={(logoUrl) => setSettings((s) => ({ ...s, logoUrl }))}
              aspect="wide"
              label="logo"
            />
            <p className="text-xs text-muted-foreground">
              Used on the homepage and footer. If none is uploaded, the site shows &ldquo;{settings.siteName}&rdquo; as
              text instead.
            </p>
          </div>
          <div className="space-y-2">
            <Label>Icon-only mark</Label>
            <ImageUpload
              value={settings.logoMarkUrl}
              onChange={(logoMarkUrl) => setSettings((s) => ({ ...s, logoMarkUrl }))}
              aspect="square"
              label="mark"
            />
            <p className="text-xs text-muted-foreground">
              Used in the navigation bar, where the full logo&apos;s text is too small to read. Falls back to the full
              logo if none is uploaded.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Brand</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Site name</Label>
            <Input {...field("siteName")} />
          </div>
          <div className="space-y-1.5">
            <Label>Tagline</Label>
            <Input {...field("tagline")} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contact & footer info</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input type="email" {...field("email")} />
          </div>
          <div className="space-y-1.5">
            <Label>Phone</Label>
            <Input {...field("phone")} />
          </div>
          <div className="space-y-1.5">
            <Label>Address line 1</Label>
            <Input {...field("addressLine1")} />
          </div>
          <div className="space-y-1.5">
            <Label>Address line 2</Label>
            <Input {...field("addressLine2")} />
          </div>
          <div className="space-y-1.5">
            <Label>City</Label>
            <Input {...field("city")} />
          </div>
          <div className="space-y-1.5">
            <Label>State</Label>
            <Input {...field("state")} />
          </div>
          <div className="space-y-1.5">
            <Label>Pincode</Label>
            <Input {...field("pincode")} />
          </div>
          <div className="space-y-1.5">
            <Label>Country</Label>
            <Input {...field("country")} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Social links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {socialLinks.map((link, i) => (
            <div key={i} className="flex gap-2 items-center">
              <Select
                value={link.platform}
                onValueChange={(value) => updateSocial(i, { platform: value as SocialPlatform })}
              >
                <SelectTrigger className="w-40 shrink-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PLATFORMS.map((p) => (
                    <SelectItem key={p} value={p}>
                      {SOCIAL_LABELS[p]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="https://…"
                value={link.url}
                onChange={(e) => updateSocial(i, { url: e.target.value })}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setSocialLinks((prev) => prev.filter((_, idx) => idx !== i))}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setSocialLinks((prev) => [...prev, { platform: "INSTAGRAM", url: "" }])}
          >
            <Plus className="h-3.5 w-3.5" />
            Add social link
          </Button>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving} size="lg">
        {saving ? "Saving…" : "Save changes"}
      </Button>
    </div>
  );
}
