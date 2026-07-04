"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { ConfirmTag } from "@/components/ui/ConfirmTag";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  { num: "01", title: "step1Title", text: "step1Text" },
  { num: "02", title: "step2Title", text: "step2Text" },
  { num: "03", title: "step3Title", text: "step3Text" },
  { num: "04", title: "step4Title", text: "step4Text" },
] as const;

/**
 * Scrollytelling: on wide screens a giant outlined numeral stays pinned
 * while the four steps pass it, crossfading 01 → 04. On phones the steps
 * read as a plain editorial list — no pinning, no tricks.
 */
export function HowItWorks() {
  const t = useTranslations("how");
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = stepRefs.current.indexOf(
              entry.target as HTMLLIElement,
            );
            if (idx >= 0) setActive(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    for (const el of stepRefs.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const activeStep = steps[active] ?? steps[0];

  return (
    <section id="postopek" className="bg-bone-100 px-6 py-20 md:px-12 md:py-28">
      <ScrollReveal>
        <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} />
      </ScrollReveal>

      <div className="mt-14 grid grid-cols-12 gap-x-6">
        {/* Pinned instrument dial — desktop only */}
        <div className="relative col-span-4 hidden lg:block">
          <div className="sticky top-28 pt-4" aria-hidden="true">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={activeStep.num}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -24 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="text-outline block font-display text-[12rem] leading-none font-medium"
              >
                {activeStep.num}
              </motion.span>
            </AnimatePresence>
            <div className="mt-6 flex items-center gap-3">
              {steps.map((s, i) => (
                <span
                  key={s.num}
                  className={`h-px transition-all duration-300 ${
                    i === active ? "w-10 bg-gold-600" : "w-4 bg-ink-900/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <ol className="col-span-12 flex flex-col lg:col-span-7 lg:col-start-6">
          {steps.map((step, i) => (
            <li
              key={step.num}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="hairline border-t py-10 lg:py-16"
            >
              <ScrollReveal delay={i * 0.05}>
                <span className="font-display text-4xl text-gold-600 lg:hidden">
                  {step.num}
                </span>
                <h3 className="mt-3 font-display text-2xl text-ink-900 lg:mt-0 lg:text-3xl">
                  {t(step.title)}
                </h3>
                <p className="mt-3 max-w-md leading-relaxed text-ink-700">
                  {t(step.text)}
                </p>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-16 text-sm text-ink-600">
        {t("mailinNote")}
        <ConfirmTag />
      </p>
    </section>
  );
}
