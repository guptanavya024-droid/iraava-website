import { cn } from "@/lib/utils";

interface FeatureCardProps {
  index?: number;
  title: string;
  body: string;
  className?: string;
}

export function FeatureCard({ index, title, body, className }: FeatureCardProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-6", className)}>
      {index !== undefined && (
        <span className="brand-display text-2xl text-primary/60">{String(index + 1).padStart(2, "0")}</span>
      )}
      <h3 className="mt-3 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}
