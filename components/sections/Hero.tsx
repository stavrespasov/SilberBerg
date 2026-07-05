import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { BanknoteIcon, ScaleIcon, ShieldIcon } from "@/components/icons";
import { PillLink } from "@/components/ui/PillLink";

const points = [
  { icon: ScaleIcon, key: "point2" },
  { icon: BanknoteIcon, key: "point3" },
  { icon: ShieldIcon, key: "point1" },
] as const;

const hallmarks = ["999,9", "916", "750", "585", "375"] as const;

const rise = (ms: number) => ({ "--rise": `${ms}ms` }) as CSSProperties;

/**
 * Splits the headline into word-level clipping masks so each word rises
 * on load. The gilded phrase (a per-locale substring of the heading) gets
 * the gold-gradient treatment. Screen readers get the intact sentence;
 * the visual spans are decoration.
 */
function MaskedHeading({ heading, gild }: { heading: string; gild: string }) {
  const gildStart = gild ? heading.indexOf(gild) : -1;
  const gildEnd = gildStart >= 0 ? gildStart + gild.length : -1;

  const words = heading.split(" ").map((word, i, all) => {
    // Character offset of this word in the heading (words + single spaces).
    const start = all
      .slice(0, i)
      .reduce((length, prev) => length + prev.length + 1, 0);
    return {
      word,
      key: `${i}-${word}`,
      gilded: start >= gildStart && start < gildEnd,
      delay: 120 + i * 70,
    };
  });

  return (
    <h1 className="max-w-4xl font-display text-6xl font-bold tracking-tight text-balance md:text-8xl">
      <span className="sr-only">{heading}</span>
      <span aria-hidden="true">
        {words.map(({ word, key, gilded, delay }) => (
          <span key={key}>
            <span className="mask">
              <span
                className={gilded ? "gild-text" : undefined}
                style={{ "--d": `${delay}ms` } as CSSProperties}
              >
                {word}
              </span>
            </span>{" "}
          </span>
        ))}
      </span>
    </h1>
  );
}

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="vrh"
      className="relative isolate overflow-hidden px-4 pt-40 pb-16 md:pt-52 md:pb-20"
    >
      {/* The stage: one warm light source breathing over black, a slow
          light band, film grain from the global overlay. In Phase 2 the
          glow is replaced by the reactive liquid-gold WebGL surface. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_0%,#191309_0%,#101013_45%,#0b0b0d_100%)]" />
        <div className="glow-breathe absolute -top-40 right-[-12rem] h-[34rem] w-[56rem] rounded-full bg-[radial-gradient(closest-side,rgba(226,181,75,0.26),rgba(226,181,75,0.06)_55%,transparent_75%)] blur-2xl" />
        <div className="light-sweep" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-end gap-12 md:grid-cols-[1fr_auto]">
        <div>
          <p className="rise mb-8 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-gold uppercase" style={rise(0)}>
            <span aria-hidden="true" className="h-px w-7 bg-gold/60" />
            {t("eyebrow")}
          </p>

          <MaskedHeading heading={t("heading")} gild={t("headingGild")} />

          <p
            className="rise mt-7 max-w-xl text-lg leading-relaxed text-pretty text-smoke md:text-xl"
            style={rise(520)}
          >
            {t("sub")}
          </p>
          <div
            className="rise mt-10 flex flex-wrap items-center gap-3"
            style={rise(640)}
          >
            <PillLink href="#kontakt">{t("ctaPrimary")}</PillLink>
            <PillLink href="#cene" variant="ghost">
              {t("ctaSecondary")}
            </PillLink>
          </div>
        </div>

        {/* Assay rail — the standard finenesses, engraved down the edge. */}
        <div className="rise hidden md:block" style={rise(760)}>
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

      <div className="rise mx-auto mt-16 max-w-6xl md:mt-24" style={rise(880)}>
        <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
          {points.map(({ icon: Icon, key }) => (
            <li
              key={key}
              className="group flex items-center gap-4 bg-ink-2 p-5 transition-colors duration-300 hover:bg-coal"
            >
              <Icon className="size-5 shrink-0 text-gold transition-transform duration-300 ease-vault group-hover:scale-110" />
              <span className="text-[15px] font-medium text-bone">
                {t(key)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
