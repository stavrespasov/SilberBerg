"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/routing";
import { formatEurPerGram } from "@/lib/pricing";

type AnimatedPriceProps = {
  value: number;
  locale: Locale;
};

/**
 * Price counter that settles onto its value when scrolled into view — the
 * needle of a scale coming to rest. Server-renders the final value, so
 * SEO and reduced-motion visitors always see the real number.
 */
export function AnimatedPrice({ value, locale }: AnimatedPriceProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(() =>
    formatEurPerGram(value, locale),
  );

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(value * 0.82, value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(formatEurPerGram(v, locale)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, locale]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
