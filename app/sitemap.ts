import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteConfig";
import { buyingCategories } from "@/lib/buying";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/zasebnost",
    ...buyingCategories.map(({ href }) => href),
  ];

  return paths.flatMap((href) => {
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
  });
}
