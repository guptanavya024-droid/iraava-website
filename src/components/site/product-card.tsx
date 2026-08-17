import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  name: string;
  variant?: string | null;
  type: string;
  description: string;
  imageUrl?: string | null;
}

export function ProductCard({ name, variant, type, description, imageUrl }: ProductCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative aspect-square bg-secondary">
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill className="object-cover" sizes="(min-width: 768px) 33vw, 50vw" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground/40">
            <Sparkles className="h-8 w-8" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <Badge variant="secondary" className="w-fit text-[11px] font-medium">
          {type}
        </Badge>
        <h3 className="mt-3 text-base font-semibold text-foreground leading-snug">
          {name}
          {variant && <span className="text-muted-foreground font-normal"> — {variant}</span>}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">{description}</p>
      </div>
    </div>
  );
}
