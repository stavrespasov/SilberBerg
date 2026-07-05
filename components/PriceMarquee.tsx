"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { formatEurPerGram } from "@/lib/pricing";
import { indicativePrices } from "@/lib/pricing.config";

/**
 * Engraved exchange band under the hero — indicative rates gliding in a
 * hairline-bordered strip. Pure CSS loop, pauses on hover, edge-faded
 * with a mask. Screen readers get one plain sentence; reduced motion
 * gets a static centered row.
 */
export function PriceMarquee() {
  const locale = useLocale() as Locale;
  const t = useTranslations("ticker");

  const chips = [
    ...indicativePrices.map((row) => ({
      label: `${row.metal === "gold" ? "Au" : "Ag"} ${row.purity}`,
      value: `${formatEurPerGram(row.eurPerGram, locale)}/g`,
    })),
    { label: "※", value: t("indicative") },
  ];

  return (
    <div className="overflow-hidden border-y border-line bg-ink-2/60 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <p className="sr-only">
        {`${t("indicative")}: ${chips.map((c) => `${c.label} ${c.value}`).join(", ")}`}
      </p>
      <div
        aria-hidden="true"
        className="marquee-track flex w-max motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center"
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className={`flex shrink-0 ${copy === 1 ? "motion-reduce:hidden" : ""}`}
          >
            {chips.map((chip) => (
              <li
                key={`${copy}-${chip.label}`}
                className="flex items-baseline gap-2.5 border-r border-line px-7 py-3.5 font-mono text-[13px] tracking-wide whitespace-nowrap tabular-nums"
              >
                <span className="text-smoke">{chip.label}</span>
                <span className="font-medium text-gold">{chip.value}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
