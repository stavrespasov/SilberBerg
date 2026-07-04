"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  /** Stagger offset in seconds for sequenced reveals within a section. */
  delay?: number;
  className?: string;
};

/**
 * Scroll-linked reveal with the "scale settling" character of the brand:
 * content rises a touch and eases into place. Renders children statically
 * when the visitor prefers reduced motion.
 */
export function ScrollReveal({
  children,
  delay = 0,
  className,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
