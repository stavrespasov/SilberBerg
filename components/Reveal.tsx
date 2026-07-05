"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Adds `.is-in` when the element enters the viewport; CSS does the rest.
 * The whole animation system of this design is this observer plus two
 * CSS rules — no animation library.
 */
const variants = {
  rise: "reveal",
  scale: "reveal-scale",
  blur: "reveal-blur",
} as const;

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "rise",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: keyof typeof variants;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("is-in");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${variants[variant]} ${className ?? ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
