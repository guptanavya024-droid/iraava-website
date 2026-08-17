import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  heading: string;
  subheading?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ heading, subheading, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <h2 className="brand-display text-3xl sm:text-4xl text-foreground">{heading}</h2>
      {subheading && <p className="mt-4 text-base text-muted-foreground leading-relaxed">{subheading}</p>}
    </div>
  );
}
