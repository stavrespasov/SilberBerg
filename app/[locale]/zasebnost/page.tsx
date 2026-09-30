import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, getPathname } from "@/i18n/navigation";
import { openGraphLocales, routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { SITE_NAME } from "@/lib/siteConfig";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/zasebnost">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "privacy" });
  const path = getPathname({ locale, href: "/zasebnost" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: {
      canonical: path,
      languages: Object.fromEntries(
        routing.locales.map((language) => [
          language,
          getPathname({ locale: language, href: "/zasebnost" }),
        ]),
      ),
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: t("title"),
      description: t("intro"),
      locale: openGraphLocales[locale],
      url: path,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
  };
}

const sections = [
  { heading: "collectHeading", text: "collectText" },
  { heading: "purposeHeading", text: "purposeText" },
  { heading: "rightsHeading", text: "rightsText" },
] as const;

export default async function PrivacyPage({
  params,
}: PageProps<"/[locale]/zasebnost">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  return (
    <main className="mx-auto max-w-2xl px-6 py-20 md:py-28">
      <h1 className="font-display text-4xl font-medium tracking-tight text-bone md:text-5xl">
        {t("heading")}
      </h1>
      <p className="mt-5 leading-relaxed text-smoke">{t("intro")}</p>
      {sections.map((s) => (
        <section key={s.heading} className="engraved mt-9 rounded-lg p-6">
          <h2 className="font-display text-xl font-medium tracking-tight text-bone">
            {t(s.heading)}
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-smoke">
            {t(s.text)}
          </p>
        </section>
      ))}
      <Link
        href="/"
        className="mt-10 inline-flex min-h-11 items-center rounded-full border border-line-2 px-5 text-sm font-medium text-bone transition-colors duration-200 hover:border-gold hover:text-gold-hi"
      >
        {t("backHome")}
      </Link>
    </main>
  );
}
