"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const settle = [0.22, 1, 0.36, 1] as const;

/**
 * The hero's kinetic core: the headline rises word by word, a scale beam
 * settles level beneath it, and the Au·Ag watermark drifts slower than the
 * page — depth without a single image. Fully static under reduced motion.
 */
export function HeroHeadline({
  heading,
  sub,
}: {
  heading: string;
  sub: string;
}) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const drift = useTransform(scrollY, [0, 900], [0, 140]);
  const words = heading.split(" ");

  return (
    <div className="relative">
      {/* Watermark — assay shorthand for gold and silver */}
      <motion.span
        aria-hidden="true"
        style={reduceMotion ? undefined : { y: drift }}
        className="text-outline pointer-events-none absolute -top-24 right-0 -z-10 font-display text-[clamp(8rem,22vw,20rem)] leading-none font-medium select-none max-md:hidden"
      >
        Au·Ag
      </motion.span>

      <h1
        className="font-display text-(length:--text-display-xl) leading-[0.98] font-medium text-ink-900"
        style={{ fontOpticalSizing: "auto" }}
      >
        {reduceMotion
          ? heading
          : words.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="inline-block overflow-hidden pb-[0.08em] align-bottom"
              >
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.08 * i,
                    ease: settle,
                  }}
                >
                  {word}
                </motion.span>
                {i < words.length - 1 && " "}
              </span>
            ))}
      </h1>

      {/* Scale beam settling level — the brand gesture */}
      <motion.div
        aria-hidden="true"
        className="mt-8 flex max-w-xl items-center gap-0"
        initial={reduceMotion ? false : { rotate: -3 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 1.4, delay: 0.5, ease: settle }}
        style={{ transformOrigin: "50% 50%" }}
      >
        <span className="h-px flex-1 bg-ink-900/25" />
        <span className="size-1.5 rotate-45 bg-gold-600" />
        <span className="h-px flex-1 bg-ink-900/25" />
      </motion.div>

      <motion.p
        className="mt-8 max-w-xl text-lg leading-relaxed text-ink-700"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: settle }}
      >
        {sub}
      </motion.p>
    </div>
  );
}
