import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Iraava Naturals — Nourished by India.",
    template: "%s · Iraava Naturals",
  },
  description:
    "Iraava Naturals is an Indian Ayurvedic skincare manufacturer and exporter, bringing Indian botanical tradition to face and body care for buyers, importers and distributors worldwide.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
