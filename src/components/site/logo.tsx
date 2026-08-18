import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  logoUrl: string | null;
  siteName: string;
  className?: string;
  size?: "default" | "lg";
}

export function Logo({ logoUrl, siteName, className, size = "default" }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 shrink-0", className)}>
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt={siteName}
          width={size === "lg" ? 220 : 140}
          height={size === "lg" ? 64 : 40}
          className={cn("w-auto object-contain", size === "lg" ? "h-14 sm:h-16" : "h-9")}
          priority
        />
      ) : (
        <span className={cn("brand-display text-current", size === "lg" ? "text-3xl sm:text-4xl" : "text-xl")}>
          {siteName}
        </span>
      )}
    </Link>
  );
}
