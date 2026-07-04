"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { formatEurPerGram } from "@/lib/pricing";
import { indicativePrices } from "@/lib/pricing.config";

/**
 * Exchange-style ticker of indicative rates. The loop is pure CSS
 * (transform only); it pauses on hover and renders as a static, readable
 * line under reduced motion. Screen readers get one plain list.
 */
export function PriceTicker() {
  const locale = useLocale() as Locale;
  const t = useTranslations("ticker");

  const items = indicativePrices.map((row) => {
    const symbol = row.metal === "gold" ? "Au" : "Ag";
    return `${symbol} ${row.purity} — ${formatEurPerGram(row.eurPerGram, locale)}/g`;
  });

  const line = [...items, `※ ${t("indicative")}`];

  return (
    <div className="hairline overflow-hidden border-y bg-white py-3">
      <p className="sr-only">{`${t("indicative")}: ${items.join(", ")}`}</p>
      <div
        aria-hidden="true"
        className="ticker-track flex w-max gap-0 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center"
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className={`flex shrink-0 items-center ${copy === 1 ? "motion-reduce:hidden" : ""}`}
          >
            {line.map((item, i) => (
              <li
                key={`${copy}-${i}`}
                className="flex items-center gap-8 pr-8 font-mono text-xs tracking-wider whitespace-nowrap text-ink-700 tabular-nums"
              >
                <span>{item}</span>
                <span className="size-1 rotate-45 bg-gold-600" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
