"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeading } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = [
  { num: "01", title: "step1Title", text: "step1Text" },
  { num: "02", title: "step2Title", text: "step2Text" },
  { num: "03", title: "step3Title", text: "step3Text" },
  { num: "04", title: "step4Title", text: "step4Text" },
] as const;

/**
 * The four steps as one continuous scene. On desktop the section pins and
 * scroll glides the track horizontally while the gold rail fills — the
 * visitor walks the counter, not a card grid. On phones it stays a native
 * snap-scroll strip; under reduced motion everything is static. The <ol>
 * semantics survive every mode.
 */
export function ProcessScene() {
  const t = useTranslations("how");
  const sceneRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scene = sceneRef.current;
      if (!scene) return;
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = scene.querySelector<HTMLElement>("[data-track]");
          const rail = scene.querySelector<HTMLElement>("[data-rail]");
          if (!track) return;
          const distance = () =>
            Math.max(0, track.scrollWidth - track.clientWidth);

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: scene,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });
          tl.to(track, { x: () => -distance() }, 0);
          if (rail) {
            tl.fromTo(rail, { scaleX: 0 }, { scaleX: 1 }, 0);
          }
        },
      );
    },
    { scope: sceneRef },
  );

  return (
    <div
      ref={sceneRef}
      className="flex flex-col justify-center overflow-hidden py-4 md:h-svh md:py-0"
    >
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} />

        <div aria-hidden="true" className="mt-10 h-px w-full bg-line">
          <div
            data-rail
            className="h-px origin-left scale-x-0 [background:var(--grad-gold)]"
          />
        </div>

        {/* Horizontally scrollable on phones → must be keyboard-reachable */}
        <ol
          data-track
          tabIndex={0}
          aria-label={t("heading")}
          className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:snap-none md:overflow-x-visible md:px-0 md:pb-0"
        >
          {steps.map((step) => (
            <li
              key={step.num}
              className="relative w-[80%] shrink-0 snap-center overflow-hidden rounded-lg border border-line bg-coal p-7 sm:w-[46%] md:w-[34%] md:p-9"
            >
              <span
                aria-hidden="true"
                className="letterpress pointer-events-none absolute -top-5 -right-2 font-mono text-8xl font-semibold select-none"
              >
                {step.num}
              </span>
              <span className="font-mono text-xs tracking-[0.18em] text-gold">
                {step.num}
              </span>
              <h3 className="mt-4 font-display text-2xl font-medium tracking-tight text-bone md:text-3xl">
                {t(step.title)}
              </h3>
              <p className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-smoke">
                {t(step.text)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
