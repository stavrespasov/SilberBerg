import type { Locale } from "@/i18n/routing";

export type Metal = "gold" | "silver";

export type PriceRow = {
  metal: Metal;
  /** Fineness stamp as displayed: "585", "750", "875", "999.9", "925", "999". */
  purity: string;
  /** Karat label where applicable (gold only), e.g. "14 k". */
  karat?: string;
  /** Indicative purchase price in EUR per gram. */
  eurPerGram: number;
  /** False until the client has signed off the value. Drives the visible tag. */
  confirmed: boolean;
};

/** Site locales map to full ICU locales; English uses day-first European forms. */
const icuLocale: Record<Locale, string> = {
  sl: "sl-SI",
  en: "en-GB",
};

export function formatEurPerGram(value: number, locale: Locale): string {
  if (!Number.isFinite(value)) {
    throw new Error(`price must be a finite number, got ${value}`);
  }
  if (value < 0) {
    throw new Error(`price must not be negative, got ${value}`);
  }
  return new Intl.NumberFormat(icuLocale[locale], {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export function formatUpdatedDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(icuLocale[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
