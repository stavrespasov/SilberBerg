import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteConfig";
import { buyingCategories } from "@/lib/buying";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      alternates: {
        languages: { sl: SITE_URL, en: `${SITE_URL}/en` },
      },
    },
    {
      url: `${SITE_URL}/zasebnost`,
      lastModified: new Date(),
      alternates: {
        languages: {
          sl: `${SITE_URL}/zasebnost`,
          en: `${SITE_URL}/en/zasebnost`,
        },
      },
    },
    ...buyingCategories.flatMap(({ href }) => {
      const languages = Object.fromEntries(
        routing.locales.map((locale) => [
          locale,
          `${SITE_URL}${getPathname({ locale, href })}`,
        ]),
      );
      return routing.locales.map((locale) => ({
        url: `${SITE_URL}${getPathname({ locale, href })}`,
        alternates: { languages },
      }));
    }),
  ];
}
