import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFoundPage() {
  const t = useTranslations("notFound");

  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm text-neutral-500">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
        {t("heading")}
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-neutral-600">
        {t("text")}
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-12 items-center rounded-full bg-neutral-900 px-7 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-neutral-700"
      >
        {t("back")}
      </Link>
    </main>
  );
}
