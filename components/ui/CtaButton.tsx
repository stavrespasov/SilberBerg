"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, type ReactNode, type PointerEvent } from "react";

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  /** "gold" carries the page's single primary action; "outline" is secondary. */
  variant?: "gold" | "outline";
  className?: string;
};

const base =
  "group relative inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 " +
  "overflow-hidden px-8 py-3 font-sans text-sm font-medium uppercase tracking-[0.18em] " +
  "transition-colors duration-200";

const variants = {
  gold: "bg-gold-500 text-ink-950 hover:bg-gold-400",
  outline:
    "border border-ink-900/30 text-ink-900 hover:border-gold-700 hover:text-gold-800",
} as const;

/**
 * The "weighted" CTA: presses down like a scale plate taking weight, with a
 * cursor-tracked glint on capable pointers. Color-only feedback under
 * reduced motion.
 */
export function CtaButton({
  href,
  children,
  variant = "gold",
  className,
}: CtaButtonProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  const track = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || reduceMotion) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onPointerMove={track}
      className={`${base} ${variants[variant]} ${className ?? ""}`}
      whileTap={reduceMotion ? undefined : { scale: 0.97, y: 1 }}
      transition={{ duration: 0.15 }}
    >
      {/* Glint that follows the pointer — light catching metal */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.35), transparent 70%)",
        }}
      />
      <span className="relative">{children}</span>
    </motion.a>
  );
}
