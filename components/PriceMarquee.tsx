"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { formatEurPerGram } from "@/lib/pricing";
import { indicativePrices } from "@/lib/pricing.config";

/**
 * Slow-scrolling strip of indicative rates under the hero — an exchange
 * board in the v3 language. Pure CSS loop, pauses on hover, edge-faded
 * with a mask. Screen readers get one plain sentence; reduced motion
 * gets a static centered row.
 */
export function PriceMarquee() {
  const locale = useLocale() as Locale;
  const t = useTranslations("ticker");

  const chips = [
    ...indicativePrices.map((row) => {
      const symbol = row.metal === "gold" ? "Au" : "Ag";
      return `${symbol} ${row.purity} · ${formatEurPerGram(row.eurPerGram, locale)}/g`;
    }),
    `※ ${t("indicative")}`,
  ];

  return (
    <div className="overflow-hidden px-4 py-6 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <p className="sr-only">{`${t("indicative")}: ${chips.join(", ")}`}</p>
      <div
        aria-hidden="true"
        className="marquee-track flex w-max gap-3 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center"
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className={`flex shrink-0 gap-3 pr-3 ${copy === 1 ? "motion-reduce:hidden" : ""}`}
          >
            {chips.map((chip) => (
              <li
                key={`${copy}-${chip}`}
                className="rounded-full bg-stone-100 px-4 py-2 font-mono text-sm whitespace-nowrap text-neutral-700 tabular-nums"
              >
                {chip}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
