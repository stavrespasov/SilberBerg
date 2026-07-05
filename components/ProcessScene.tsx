"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Reveal } from "@/components/Reveal";
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
 * scroll glides the track horizontally: cards sharpen into focus as they
 * arrive, ghost numerals drift in parallax, the gold rail and counter
 * track progress, and the scrub snaps to whole steps. On phones it is a
 * native snap strip; under reduced motion everything is static. The <ol>
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
          const counter = scene.querySelector<HTMLElement>("[data-counter]");
          const cards = gsap.utils.toArray<HTMLElement>("[data-card]", scene);
          if (!track || cards.length === 0) return;
          const distance = () =>
            Math.max(0, track.scrollWidth - track.clientWidth);

          // The container glide — everything else hangs off this tween.
          const trackTween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: scene,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
              // Settle on whole steps so a released wheel never strands
              // a card half-off the edge.
              snap: {
                snapTo: 1 / (cards.length - 1),
                duration: { min: 0.2, max: 0.55 },
                ease: "power1.inOut",
              },
              onUpdate: (self) => {
                if (rail) rail.style.transform = `scaleX(${self.progress})`;
                if (counter) {
                  const i =
                    Math.round(self.progress * (cards.length - 1)) + 1;
                  counter.textContent = `0${i} / 0${cards.length}`;
                }
              },
            },
          });

          // Cards sharpen into focus as they enter from the right and
          // their ghost numerals drift against the travel direction.
          for (const card of cards) {
            gsap.fromTo(
              card,
              { opacity: 0.35, scale: 0.94 },
              {
                opacity: 1,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: trackTween,
                  start: "left 92%",
                  end: "left 48%",
                  scrub: true,
                },
              },
            );
            const ghost = card.querySelector<HTMLElement>("[data-ghost]");
            if (ghost) {
              gsap.fromTo(
                ghost,
                { xPercent: 30 },
                {
                  xPercent: -14,
                  ease: "none",
                  scrollTrigger: {
                    trigger: card,
                    containerAnimation: trackTween,
                    start: "left 110%",
                    end: "left -30%",
                    scrub: true,
                  },
                },
              );
            }
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
        <Reveal variant="blur">
          <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} />
        </Reveal>

        <div className="mt-10 flex items-center gap-5">
          <div aria-hidden="true" className="h-px flex-1 bg-line">
            <div
              data-rail
              className="h-px origin-left scale-x-0 [background:var(--grad-gold)]"
            />
          </div>
          <span
            data-counter
            aria-hidden="true"
            className="hidden font-mono text-xs tracking-[0.18em] text-gold tabular-nums md:inline"
          >
            01 / 04
          </span>
        </div>

        {/* Full-bleed to the right viewport edge on desktop so later steps
            genuinely enter from off-screen; the wrapper clips the glide. */}
        <div className="md:mr-[calc(50%-50vw)] md:overflow-hidden">
          {/* Horizontally scrollable on phones → must be keyboard-reachable */}
          <ol
            data-track
            tabIndex={0}
            aria-label={t("heading")}
            className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 will-change-transform [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:snap-none md:overflow-x-visible md:px-0 md:pb-0"
          >
          {steps.map((step) => (
            <li
              key={step.num}
              data-card
              className="relative w-[82%] shrink-0 snap-center overflow-hidden rounded-lg border border-line bg-coal p-6 sm:w-[46%] sm:p-7 md:w-[460px] md:p-9 lg:w-[520px]"
            >
              <span
                data-ghost
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
    </div>
  );
}
