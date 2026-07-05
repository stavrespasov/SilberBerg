"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/i18n/routing";
import { formatEurPerGram } from "@/lib/pricing";

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts a price up to its value when scrolled into view. Server-renders
 * the final figure, so SEO and reduced-motion visitors always see the
 * real number. Plain requestAnimationFrame — no animation library.
 */
export function CountUp({ value, locale }: { value: number; locale: Locale }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 950;
        const from = value * 0.4;
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          el.textContent = formatEurPerGram(
            from + (value - from) * easeOut(t),
            locale,
          );
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "-10% 0px" },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, locale]);

  return (
    <span ref={ref} className="tabular-nums">
      {formatEurPerGram(value, locale)}
    </span>
  );
}
