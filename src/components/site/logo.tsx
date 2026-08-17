import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  logoUrl: string | null;
  siteName: string;
  className?: string;
}

export function Logo({ logoUrl, siteName, className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 shrink-0", className)}>
      {logoUrl ? (
        <Image src={logoUrl} alt={siteName} width={140} height={40} className="h-9 w-auto object-contain" priority />
      ) : (
        <span className="brand-display text-xl text-current">{siteName}</span>
      )}
    </Link>
  );
}
