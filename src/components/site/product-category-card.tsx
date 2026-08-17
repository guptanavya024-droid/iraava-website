import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCategoryCardProps {
  imageUrl: string | null;
  title: string;
  body: string;
  href: string;
  className?: string;
}

// A representative product photo instead of an icon-in-a-circle — the
// catalogue already has real photography, so a generic Lucide icon here was
// throwing that away in favour of the default shadcn "feature card" shape.
export function ProductCategoryCard({ imageUrl, title, body, href, className }: ProductCategoryCardProps) {
  return (
    <Link href={href} className={cn("group flex gap-5 rounded-xl bg-card p-4", className)}>
      <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-lg bg-secondary sm:w-28">
        {imageUrl && (
          <Image src={imageUrl} alt={title} fill className="object-cover transition-transform group-hover:scale-105" sizes="112px" />
        )}
      </div>
      <div className="flex flex-1 flex-col py-1">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed flex-1">{body}</p>
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          Explore
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
