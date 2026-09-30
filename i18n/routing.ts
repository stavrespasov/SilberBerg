import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // This order is shared by the desktop and mobile language controls.
  locales: ["sl", "it", "en"],
  defaultLocale: "sl",
  // Slovenian renders at the bare root URL for local SEO strength.
  localePrefix: "as-needed",
  // A local business: the root URL always serves Slovenian. Without this,
  // Accept-Language redirects English browsers (and most crawlers) off the
  // primary URL. Visitors switch language explicitly in the header.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

export const openGraphLocales: Record<Locale, string> = {
  sl: "sl_SI",
  it: "it_IT",
  en: "en_GB",
};
