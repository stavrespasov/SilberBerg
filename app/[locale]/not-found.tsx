import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFoundPage() {
  const t = useTranslations("notFound");

  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="letterpress font-mono text-7xl font-semibold select-none">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-bone md:text-5xl">
        {t("heading")}
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-smoke">{t("text")}</p>
      <Link
        href="/"
        className="gild-bg sheen mt-8 inline-flex min-h-12 items-center rounded-full px-7 text-[15px] font-semibold transition-transform duration-300 ease-vault hover:-translate-y-0.5"
      >
        {t("back")}
      </Link>
    </main>
  );
}
