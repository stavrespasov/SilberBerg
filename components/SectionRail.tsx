"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const sections = [
  { id: "cene", key: "prices" },
  { id: "postopek", key: "process" },
  { id: "odkup", key: "buy" },
  { id: "zaupanje", key: "trust" },
  { id: "lokacija", key: "location" },
  { id: "faq", key: "faq" },
  { id: "kontakt", key: "contact" },
] as const;

/**
 * The instrument rail: a fixed, graduated section index on wide screens.
 * A gold line fills with scroll progress — the needle of the page.
 */
export function SectionRail() {
  const t = useTranslations("nav");
  const [active, setActive] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label={t("railLabel")}
      className="fixed inset-y-0 left-0 z-40 hidden w-16 xl:flex"
    >
      <div className="relative flex flex-1 flex-col items-center justify-center">
        {/* Graduation track + progress needle */}
        <div className="absolute inset-y-10 left-1/2 w-px -translate-x-1/2 bg-ink-900/10" />
        <motion.div
          aria-hidden="true"
          className="absolute inset-y-10 left-1/2 w-px origin-top -translate-x-1/2 bg-gold-600"
          style={{ scaleY: reduceMotion ? scrollYProgress : progress }}
        />
        <ol className="relative flex flex-col gap-7">
          {sections.map(({ id, key }, i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`group flex items-center gap-2 bg-bone-50 py-1 font-mono text-[10px] tracking-widest transition-colors duration-200 ${
                  active === id
                    ? "text-gold-800"
                    : "text-ink-600 hover:text-ink-900"
                }`}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span className="sr-only">{t(key)}</span>
                <span
                  aria-hidden="true"
                  className={`h-px transition-all duration-300 ${
                    active === id
                      ? "w-4 bg-gold-600"
                      : "w-2 bg-ink-900/25 group-hover:w-3"
                  }`}
                />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
