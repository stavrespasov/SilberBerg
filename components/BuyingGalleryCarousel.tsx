"use client";

import { useEffect, useState } from "react";
import { BuyingPhoto } from "@/components/BuyingPhoto";
import { Reveal } from "@/components/Reveal";
import type { BuyingImage } from "@/lib/buying";

type GallerySlide = { image: BuyingImage; alt: string };

export type BuyingGalleryPhoto = GallerySlide & {
  caption: string;
  sequence?: readonly GallerySlide[];
};

function greatestCommonDivisor(a: number, b: number): number {
  return b === 0 ? a : greatestCommonDivisor(b, a % b);
}

export function BuyingGalleryCarousel({
  photos,
  labels,
}: {
  photos: readonly BuyingGalleryPhoto[];
  labels: {
    studio: string;
    outdoor: string;
    pause: string;
    resume: string;
    previous: string;
    next: string;
    description: string;
  };
}) {
  const [frame, setFrame] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);
  const hasTreatments = photos.some(({ image }) => Boolean(image.variants));
  const cards = photos.map(({ image, alt, caption, sequence }) => ({
    file: image.file,
    caption,
    slides: sequence?.length
      ? sequence
      : image.variants
        ? (["studio", "outdoor"] as const).map((treatment) => ({
            image: { ...image, src: image.variants![treatment] },
            alt,
          }))
        : [{ image, alt }],
  }));
  // A full cycle accommodates cards with different sequence lengths.
  const cycleLength = cards.reduce(
    (length, { slides }) =>
      (length * slides.length) / greatestCommonDivisor(length, slides.length),
    1,
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion !== false || paused || cycleLength <= 1) return;
    const timer = window.setInterval(() => {
      setFrame((current) => (current + 1) % cycleLength);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, cycleLength]);

  const advance = (direction: number) =>
    setFrame((current) => (current + direction + cycleLength) % cycleLength);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p
          aria-live="off"
          className="font-mono text-[11px] tracking-[0.16em] text-gold uppercase"
        >
          {labels.description}
          {hasTreatments &&
            `: ${frame % 2 === 0 ? labels.studio : labels.outdoor}`}
        </p>
        <div
          className="flex items-center gap-2"
          role="group"
          aria-label={labels.description}
        >
          {hasTreatments ? (
            (["studio", "outdoor"] as const).map((option, index) => (
              <button
                key={option}
                type="button"
                aria-pressed={frame % 2 === index}
                onClick={() => setFrame(index)}
                className={`min-h-9 rounded-full border px-3 font-mono text-[10px] tracking-[0.12em] uppercase transition-colors duration-300 ${frame % 2 === index ? "border-gold-deep bg-gold/10 text-gold-hi" : "border-line text-smoke hover:border-line-2 hover:text-bone"}`}
              >
                {option === "studio" ? labels.studio : labels.outdoor}
              </button>
            ))
          ) : (
            <>
              <button
                type="button"
                aria-label={labels.previous}
                onClick={() => advance(-1)}
                className="flex size-9 items-center justify-center rounded-full border border-line text-smoke transition-colors duration-300 hover:border-line-2 hover:text-bone"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                aria-label={labels.next}
                onClick={() => advance(1)}
                className="flex size-9 items-center justify-center rounded-full border border-line text-smoke transition-colors duration-300 hover:border-line-2 hover:text-bone"
              >
                <span aria-hidden="true">→</span>
              </button>
            </>
          )}
          <button
            type="button"
            aria-pressed={paused}
            aria-label={paused ? labels.resume : labels.pause}
            onClick={() => setPaused((current) => !current)}
            className="flex size-9 items-center justify-center rounded-full border border-line text-smoke transition-colors duration-300 hover:border-line-2 hover:text-bone"
          >
            <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
          </button>
        </div>
      </div>

      <div className="grid min-w-0 grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5">
        {cards.map(({ file, slides, caption }, index) => (
          <Reveal key={file} delay={(index % 2) * 90}>
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line bg-coal">
                {slides.map(({ image, alt }, slideIndex) => {
                  const active = frame % slides.length === slideIndex;
                  return (
                    <div
                      key={`${image.file}-${slideIndex}`}
                      aria-hidden={!active}
                      className={
                        slides.length === 1
                          ? "absolute inset-0"
                          : `absolute inset-0 transition-[opacity,transform,filter] duration-1000 ease-vault motion-reduce:transition-none ${active ? "translate-y-0 scale-100 opacity-100 blur-0" : "translate-y-2 scale-[1.015] opacity-0 blur-[2px]"}`
                      }
                      style={
                        slides.length > 1
                          ? { transitionDelay: `${index * 70}ms` }
                          : undefined
                      }
                    >
                      <BuyingPhoto
                        image={image}
                        alt={active ? alt : ""}
                        sizes="(max-width: 640px) 46vw, (max-width: 1024px) 46vw, 310px"
                        preload={index === 0 && slideIndex === 0}
                      />
                    </div>
                  );
                })}
              </div>
              <figcaption className="mt-3 text-sm leading-relaxed text-smoke">
                {caption}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
