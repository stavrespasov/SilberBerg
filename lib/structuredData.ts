import { routing, type Locale } from "@/i18n/routing";
import { CONTACT_PHONE_HREF, SITE_NAME, SITE_URL } from "./siteConfig";

/**
 * LocalBusiness JSON-LD. Deliberately limited to facts that are true today:
 * no address or opening hours until the client confirms them —
 * wrong structured data is worse for local SEO than none.
 */
export function localBusinessJsonLd(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    telephone: CONTACT_PHONE_HREF.slice(4),
    description,
    url: locale === "sl" ? SITE_URL : `${SITE_URL}/${locale}`,
    areaServed: {
      "@type": "Country",
      name: "Slovenia",
    },
    knowsLanguage: [...routing.locales],
  };
}

export function faqPageJsonLd(faqs: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
