import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("hero");

  return (
    <main className="flex flex-1 flex-col items-start justify-center gap-4 p-12">
      <p className="text-sm uppercase tracking-widest">{t("eyebrow")}</p>
      <h1 className="text-4xl font-semibold">{t("heading")}</h1>
      <p>{t("placeholder")}</p>
    </main>
  );
}
