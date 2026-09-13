"use client";

import { useEffect, useState } from "react";
import { BuyingPhoto } from "@/components/BuyingPhoto";
import { Reveal } from "@/components/Reveal";
import type { BuyingImage } from "@/lib/buying";

type Treatment = "studio" | "outdoor";

export type BuyingGalleryPhoto = {
  image: BuyingImage;
  alt: string;
  caption: string;
};

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
    description: string;
  };
}) {
  const [treatment, setTreatment] = useState<Treatment>("studio");
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const timer = window.setInterval(() => {
      setTreatment((current) => (current === "studio" ? "outdoor" : "studio"));
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p
          aria-live="off"
          className="font-mono text-[11px] tracking-[0.16em] text-gold uppercase"
        >
          {labels.description}: {treatment === "studio" ? labels.studio : labels.outdoor}
        </p>
        <div className="flex items-center gap-2" aria-label={labels.description}>
          {(["studio", "outdoor"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={treatment === option}
              onClick={() => setTreatment(option)}
              className={`min-h-9 rounded-full border px-3 font-mono text-[10px] tracking-[0.12em] uppercase transition-colors duration-300 ${treatment === option ? "border-gold-deep bg-gold/10 text-gold-hi" : "border-line text-smoke hover:border-line-2 hover:text-bone"}`}
            >
              {option === "studio" ? labels.studio : labels.outdoor}
            </button>
          ))}
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
        {photos.map(({ image, alt, caption }, index) => (
          <Reveal key={image.file} delay={(index % 2) * 90}>
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line bg-coal">
                {(["studio", "outdoor"] as const).map((option) => {
                  const active = treatment === option;
                  const source = image.variants?.[option] ?? image.src;
                  const variantImage = source ? { ...image, src: source } : image;
                  return (
                    <div
                      key={option}
                      aria-hidden={!active}
                      className={`absolute inset-0 transition-[opacity,transform,filter] duration-1000 ease-vault motion-reduce:transition-none ${active ? "translate-y-0 scale-100 opacity-100 blur-0" : "translate-y-2 scale-[1.015] opacity-0 blur-[2px]"}`}
                      style={{ transitionDelay: `${index * 70}ms` }}
                    >
                      <BuyingPhoto
                        image={variantImage}
                        alt={active ? alt : ""}
                        sizes="(max-width: 640px) 46vw, (max-width: 1024px) 46vw, 310px"
                        preload={index === 0 && option === "studio"}
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
