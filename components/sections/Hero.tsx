import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { BanknoteIcon, ScaleIcon, ShieldIcon } from "@/components/icons";
import { GoldCanvas } from "@/components/GoldCanvas";
import { Magnetic } from "@/components/Magnetic";
import { PillLink } from "@/components/ui/PillLink";

const points = [
  { icon: ScaleIcon, key: "point2" },
  { icon: BanknoteIcon, key: "point3" },
  { icon: ShieldIcon, key: "point1" },
] as const;

const hallmarks = ["999,9", "916", "750", "585", "375"] as const;

const WORDMARK = "SILBERBERG";

const rise = (ms: number) => ({ "--rise": `${ms}ms` }) as CSSProperties;

/**
 * Renders the heading with its per-locale key phrase in solid gold.
 * Plain inline spans — contiguous text for screen readers and SEO.
 */
function GildedHeading({ heading, gild }: { heading: string; gild: string }) {
  const start = gild ? heading.indexOf(gild) : -1;
  if (start < 0) return <>{heading}</>;
  return (
    <>
      {heading.slice(0, start)}
      <span className="text-gold">{gild}</span>
      {heading.slice(start + gild.length)}
    </>
  );
}

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="vrh"
      className="relative isolate overflow-hidden px-4 md:pt-44 md:pb-20"
    >
      {/* The cinema: CSS glow poster first paint, molten-gold shader on top
          once it has a frame, slow light band and global grain over both. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_0%,#191309_0%,#101013_45%,#0b0b0d_100%)]" />
        <div className="glow-breathe absolute -top-40 right-[-12rem] h-[34rem] w-[56rem] rounded-full bg-[radial-gradient(closest-side,rgba(226,181,75,0.26),rgba(226,181,75,0.06)_55%,transparent_75%)] blur-2xl" />
        {/* Phones put the light source at reading distance, so the whole
            canvas runs dimmer there and a deep scrim sits over it — the
            smoke still breathes, the type owns the frame. Desktop is
            untouched. */}
        <div className="absolute inset-0 opacity-45 md:opacity-100">
          <GoldCanvas />
        </div>
        <div className="light-sweep" />
        <div className="absolute inset-0 bg-ink/55 md:hidden" />
        {/* The second mobile screen (the three points) settles into near
            solid ink — a calm, minimal stage under the busy first screen. */}
        <div className="absolute inset-x-0 bottom-0 h-[60svh] bg-gradient-to-b from-transparent via-ink/55 to-ink md:hidden" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* SCREEN ONE — the name, the offer, the CTAs, filling the phone. */}
        <div className="flex min-h-svh flex-col justify-center pt-28 pb-10 md:block md:min-h-0 md:pt-0 md:pb-0">
          {/* The name IS the hero — edge to edge, rising letter by letter. */}
          <p
            aria-hidden="true"
            className="flex justify-between font-display text-[clamp(2.6rem,12.2vw,13.5rem)] leading-[0.9] font-bold tracking-tight text-bone uppercase select-none"
          >
            {WORDMARK.split("").map((letter, i) => (
              <span key={i} className="mask">
                <span style={{ "--d": `${80 + i * 55}ms` } as CSSProperties}>
                  {letter}
                </span>
              </span>
            ))}
          </p>

          <div className="mt-4 flex items-center gap-4" aria-hidden="true">
            <span className="h-px flex-1 bg-line" />
            <span className="font-mono text-[11px] tracking-[0.22em] text-gold uppercase">
              {t("eyebrow")}
            </span>
          </div>

          <div className="mt-10 grid grid-cols-1 items-end gap-12 md:mt-16 md:grid-cols-[1fr_auto]">
            <div>
              <h1
                className="rise max-w-2xl font-display text-3xl font-medium tracking-tight text-balance text-bone md:text-5xl"
                style={rise(560)}
              >
                <GildedHeading heading={t("heading")} gild={t("headingGild")} />
              </h1>
              <p
                className="rise mt-5 max-w-xl text-base leading-relaxed text-pretty text-smoke md:text-lg"
                style={rise(680)}
              >
                {t("sub")}
              </p>
              <div
                className="rise mt-8 flex flex-wrap items-center gap-3"
                style={rise(800)}
              >
                <Magnetic className="w-full sm:w-auto">
                  <PillLink href="#kontakt" className="w-full sm:w-auto">
                    {t("ctaPrimary")}
                  </PillLink>
                </Magnetic>
                <Magnetic className="w-full sm:w-auto">
                  <PillLink
                    href="#odkup"
                    variant="ghost"
                    className="w-full sm:w-auto"
                  >
                    {t("ctaSecondary")}
                  </PillLink>
                </Magnetic>
              </div>
            </div>

            {/* Assay rail — the standard finenesses, engraved down the edge. */}
            <div className="rise hidden md:block" style={rise(920)}>
              <ul
                aria-hidden="true"
                className="flex flex-col items-end gap-4 font-mono text-[13px] tracking-[0.08em] tabular-nums"
              >
                {hallmarks.map((mark, i) => (
                  <li key={mark} className="flex items-center gap-3">
                    <span className={i === 0 ? "text-gold" : "text-dim"}>
                      {mark}
                    </span>
                    <span
                      className={`h-px w-7 ${i === 0 ? "bg-gold-deep" : "bg-line"}`}
                    />
                  </li>
                ))}
              </ul>
              <p className="mt-5 max-w-36 text-right font-mono text-[10px] leading-relaxed tracking-[0.14em] text-dim uppercase">
                {t("hallmarkCaption")}
              </p>
            </div>
          </div>

          {/* Scroll cue — signals the second screen below. Mobile only. */}
          <div
            aria-hidden="true"
            className="rise mt-14 flex flex-col items-center gap-2 md:hidden"
            style={rise(940)}
          >
            <span className="font-mono text-[10px] tracking-[0.22em] text-dim uppercase">
              {t("hallmarkCaption")}
            </span>
            <span className="h-9 w-px animate-pulse bg-gradient-to-b from-gold/70 to-transparent" />
          </div>
        </div>

        {/* SCREEN TWO — the three assurances, given their own quiet space
            on phones; on desktop they stay the strip under the hero. */}
        <div className="flex min-h-[52svh] flex-col justify-center pt-6 pb-14 md:mt-20 md:block md:min-h-0 md:pt-0 md:pb-0">
          <ul
            className="rise grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3"
            style={rise(1020)}
          >
            {points.map(({ icon: Icon, key }) => (
              <li
                key={key}
                className="group flex items-center gap-4 bg-ink-2/80 p-6 backdrop-blur-sm transition-colors duration-300 hover:bg-coal md:p-5"
              >
                <Icon className="size-6 shrink-0 text-gold transition-transform duration-300 ease-vault group-hover:scale-110 md:size-5" />
                <span className="text-base font-medium text-bone md:text-[15px]">
                  {t(key)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
