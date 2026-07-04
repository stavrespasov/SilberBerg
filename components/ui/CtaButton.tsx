"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  /** "gold" carries the page's single primary action; "outline" is secondary. */
  variant?: "gold" | "outline";
  className?: string;
};

const base =
  "inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 px-8 py-3 " +
  "font-sans text-sm font-medium uppercase tracking-[0.18em] transition-colors duration-200";

const variants = {
  gold: "bg-gold-500 text-ink-950 hover:bg-gold-400",
  outline:
    "border border-silver-500/40 text-bone-100 hover:border-gold-400 hover:text-gold-300",
} as const;

/**
 * The "weighted" CTA: presses down like a scale plate taking weight.
 * Falls back to color-only feedback under reduced motion.
 */
export function CtaButton({
  href,
  children,
  variant = "gold",
  className,
}: CtaButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      className={`${base} ${variants[variant]} ${className ?? ""}`}
      whileTap={reduceMotion ? undefined : { scale: 0.97, y: 1 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.a>
  );
}
