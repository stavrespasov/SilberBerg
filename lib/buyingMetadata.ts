import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { getBuyingCategory, type BuyingCategoryKey } from "@/lib/buying";
import { SITE_NAME } from "@/lib/siteConfig";

export async function buyingMetadata(
  key: BuyingCategoryKey,
  locale: string,
): Promise<Metadata> {
  if (!hasLocale(routing.locales, locale)) notFound();
  const category = getBuyingCategory(key);
  const t = await getTranslations({ locale, namespace: `buy.${key}` });
  const title = `${t("title")} — ${SITE_NAME}`;
  const description = t("description");
  const path = getPathname({ locale, href: category.href });

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: Object.fromEntries(
        routing.locales.map((language) => [
          language,
          getPathname({ locale: language, href: category.href }),
        ]),
      ),
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      locale: locale === "sl" ? "sl_SI" : "en_GB",
      url: path,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
  };
}
