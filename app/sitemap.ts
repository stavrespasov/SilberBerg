import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteConfig";

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
  ];
}
