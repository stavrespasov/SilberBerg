import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ConfirmTag } from "@/components/ui/ConfirmTag";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/zasebnost">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return { title: t("title") };
}

const sections = [
  { heading: "controllerHeading", text: "controllerText", confirm: true },
  { heading: "collectHeading", text: "collectText", confirm: false },
  { heading: "purposeHeading", text: "purposeText", confirm: false },
  { heading: "retentionHeading", text: "retentionText", confirm: true },
  { heading: "rightsHeading", text: "rightsText", confirm: false },
] as const;

export default async function PrivacyPage({
  params,
}: PageProps<"/[locale]/zasebnost">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  return (
    <main className="mx-auto max-w-2xl px-6 py-20 md:py-28">
      <h1
        className="font-display text-(length:--text-display-md) leading-[1.05] font-medium text-ink-900"
        style={{ fontOpticalSizing: "auto" }}
      >
        {t("heading")}
      </h1>
      <p className="mt-6 leading-relaxed text-ink-700">{t("intro")}</p>
      {sections.map((s) => (
        <section key={s.heading} className="hairline mt-10 border-t pt-6">
          <h2 className="font-display text-2xl text-ink-900">
            {t(s.heading)}
          </h2>
          <p className="mt-3 leading-relaxed text-ink-700">
            {t(s.text)}
            {s.confirm && <ConfirmTag />}
          </p>
        </section>
      ))}
      <Link
        href="/"
        className="mt-12 inline-block text-xs font-medium uppercase tracking-[0.18em] text-gold-800 underline-offset-4 transition-colors duration-200 hover:text-gold-700 hover:underline"
      >
        {t("backHome")}
      </Link>
    </main>
  );
}
