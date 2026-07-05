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
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
        {t("heading")}
      </h1>
      <p className="mt-5 leading-relaxed text-neutral-600">{t("intro")}</p>
      {sections.map((s) => (
        <section key={s.heading} className="mt-9 rounded-2xl bg-stone-50 p-6">
          <h2 className="text-lg font-semibold tracking-tight">
            {t(s.heading)}
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">
            {t(s.text)}
            {s.confirm && <ConfirmTag />}
          </p>
        </section>
      ))}
      <Link
        href="/"
        className="mt-10 inline-flex min-h-11 items-center rounded-full bg-stone-200 px-5 text-sm font-medium transition-colors duration-200 hover:bg-stone-300"
      >
        {t("backHome")}
      </Link>
    </main>
  );
}
