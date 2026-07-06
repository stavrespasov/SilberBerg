"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MoltenBand } from "@/components/MoltenBand";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * A widescreen film moment between sections: a live liquid-gold shader
 * (MoltenBand) over a still poster, drifting in parallax as it crosses
 * the viewport. The poster (an OpenArt/Seedream frame) is the fallback —
 * it's what shows under reduced motion or without WebGL, and it holds
 * the frame until the shader paints. Decorative throughout.
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
          {/* Poster: fallback + holds the frame until the shader paints. */}
          <Image
            src="/media/molten.jpg"
            alt=""
            fill
            sizes="(max-width: 1184px) 100vw, 1152px"
            quality={70}
            className="object-cover"
          />
          <MoltenBand />
        </div>
        {/* Desktop: caption over the frame behind a scrim. On phones the
            frame stays clean — the caption moves below it. */}
        <div className="absolute inset-0 hidden bg-gradient-to-t from-ink/80 via-transparent to-ink/20 md:block" />
        <div className="absolute right-9 bottom-7 left-9 hidden flex-wrap items-end justify-between gap-3 md:flex">
          <p className="font-display text-4xl font-medium tracking-tight text-bone">
            {t("line")}
          </p>
          <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-gold uppercase">
            <span className="h-px w-6 bg-gold/60" />
            {t("eyebrow")}
          </p>
        </div>
      </div>

      {/* Mobile subtitle card — the frame speaks, the words sit under it. */}
      <div className="mx-auto mt-5 max-w-6xl md:hidden">
        <p className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-gold uppercase">
          <span className="h-px w-6 bg-gold/60" />
          {t("eyebrow")}
        </p>
        <p className="mt-2 font-display text-[1.7rem] leading-tight font-medium tracking-tight text-balance text-bone">
          {t("line")}
        </p>
      </div>
    </section>
  );
}
