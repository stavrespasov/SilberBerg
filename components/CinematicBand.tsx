"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * A widescreen film moment between sections: AI-generated molten-gold
 * b-roll (OpenArt/Seedream still) turned into a cinemagraph — the frame
 * drifts and settles in parallax as it crosses the viewport while a slow
 * light band sweeps across it. Decorative throughout; static under
 * reduced motion. Swap the Image for a <video> when real footage lands —
 * the choreography stays the same.
 */
export function CinematicBand() {
  const t = useTranslations("film");
  const wrapRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const media = mediaRef.current;
      if (!wrap || !media) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          media,
          { yPercent: -8, scale: 1.18 },
          {
            yPercent: 8,
            scale: 1.04,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.4,
            },
          },
        );
      });
    },
    { scope: wrapRef },
  );

  return (
    <section aria-hidden="true" className="px-4 py-6">
      <div
        ref={wrapRef}
        className="relative mx-auto aspect-video max-w-6xl overflow-hidden rounded-lg border border-line md:aspect-[21/9]"
      >
        <div ref={mediaRef} className="absolute inset-0 will-change-transform">
          <Image
            src="/media/molten.jpg"
            alt=""
            fill
            sizes="(max-width: 1184px) 100vw, 1152px"
            quality={70}
            className="object-cover"
          />
        </div>
        <div className="light-sweep" />
        {/* Scrim keeps the caption readable over bright frames. */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20" />
        <div className="absolute right-6 bottom-5 left-6 flex flex-wrap items-end justify-between gap-3 md:right-9 md:bottom-7 md:left-9">
          <p className="font-display text-2xl font-medium tracking-tight text-bone md:text-4xl">
            {t("line")}
          </p>
          <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-gold uppercase">
            <span className="h-px w-6 bg-gold/60" />
            {t("eyebrow")}
          </p>
        </div>
      </div>
    </section>
  );
}
