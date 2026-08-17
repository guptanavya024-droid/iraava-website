"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { toast } from "sonner";
import { ImagePlus, X, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  aspect?: "square" | "wide";
  label?: string;
}

// Uploads directly browser → Blob (via a short-lived token from
// /api/admin/blob/upload) rather than through this server, since product
// photos regularly run 5-6MB — well past a serverless function's request
// body limit.
export function ImageUpload({ value, onChange, aspect = "square", label = "Image" }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/admin/blob/upload",
      });
      onChange(blob.url);
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border border-dashed border-input bg-muted/40 flex items-center justify-center",
          aspect === "square" ? "aspect-square w-32" : "aspect-video w-full max-w-xs"
        )}
      >
        {value ? (
          <Image src={value} alt={label} fill className="object-contain p-2" />
        ) : (
          <ImagePlus className="h-6 w-6 text-muted-foreground/50" />
        )}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70">
            <LoaderCircle className="h-5 w-5 animate-spin text-primary" />
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      <div className="flex gap-2">
        <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()} disabled={uploading}>
          {value ? "Replace" : "Upload"} {label}
        </Button>
        {value && (
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange(null)}>
            <X className="h-3.5 w-3.5" />
            Remove
          </Button>
        )}
      </div>
    </div>
  );
}
