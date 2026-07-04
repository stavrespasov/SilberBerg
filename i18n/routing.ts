import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Slovenian is the primary market language; English serves cross-border
  // and tourist traffic. Italian is deliberately deferred until the client
  // confirms scope — adding it here is the only change needed.
  locales: ["sl", "en"],
  defaultLocale: "sl",
  // Slovenian renders at the bare root URL for local SEO strength.
  localePrefix: "as-needed",
  // A local business: the root URL always serves Slovenian. Without this,
  // Accept-Language redirects English browsers (and most crawlers) off the
  // primary URL. Visitors switch language explicitly in the header.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
