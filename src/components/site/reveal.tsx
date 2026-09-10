"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealVariant = "up" | "fade" | "image";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms: pass index * 80 for grid items. */
  delay?: number;
  /**
   * "up" (default): fade + rise. "fade": opacity only, for large blocks
   * where movement would be distracting. "image": a soft scale-down settle,
   * for photography.
   */
  variant?: RevealVariant;
  /** Fraction of the element visible before it triggers. */
  threshold?: number;
}

// Scroll-triggered entrance, once per element (the observer disconnects after
// the first reveal). Transition utilities rather than keyframes, so it
// degrades to "just visible" if JS is slow to hydrate, and motion-reduce
// turns it off entirely. Every variant shares --ease-out-soft.
export function Reveal({ children, className, delay = 0, variant = "up", threshold = 0.15 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -48px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const hidden =
    variant === "up"
      ? "opacity-0 translate-y-8"
      : variant === "image"
        ? "opacity-0 scale-[1.04]"
        : "opacity-0";
  const shown =
    variant === "image" ? "opacity-100 scale-100" : "opacity-100 translate-y-0";

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: visible ? `${delay}ms` : "0ms",
        transitionTimingFunction: "var(--ease-out-soft)",
      }}
      className={cn(
        "transition-all duration-[800ms]",
        "motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:scale-100",
        visible ? shown : hidden,
        className
      )}
    >
      {children}
    </div>
  );
}
