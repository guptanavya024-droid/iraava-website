import { cn } from "@/lib/utils";

interface FeatureCardProps {
  index?: number;
  title: string;
  body: string;
  className?: string;
}

// Editorial list-row treatment (numeral + hairline rule) instead of a boxed
// icon-in-a-circle card: the latter is the default shadcn "feature card"
// shape and reads as templated at a glance.
export function FeatureCard({ index, title, body, className }: FeatureCardProps) {
  return (
    <div className={cn("flex gap-5 border-t border-border pt-6", className)}>
      {index !== undefined && (
        <span className="brand-display shrink-0 text-2xl text-primary/50">{String(index + 1).padStart(2, "0")}</span>
      )}
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
