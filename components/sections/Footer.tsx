import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ConfirmTag } from "@/components/ui/ConfirmTag";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="hairline overflow-hidden border-t bg-bone-100 px-6 py-14 md:px-12">
      <p
        aria-hidden="true"
        className="text-outline pointer-events-none -mb-4 font-display text-[clamp(4rem,14vw,12rem)] leading-none font-medium select-none"
      >
        Silberberg
      </p>
      <div className="grid grid-cols-12 gap-x-6 gap-y-10 pt-10">
        <div className="col-span-12 md:col-span-5">
          <p className="font-display text-lg tracking-[0.08em] text-ink-900">
            Silberberg
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-600">
            {t("legalName")}
            <ConfirmTag />
          </p>
          <p className="mt-2 text-sm text-ink-600">
            {t("regNumber")}: <ConfirmTag />
          </p>
          <p className="mt-1 text-sm text-ink-600">
            {t("vatId")}: <ConfirmTag />
          </p>
        </div>
        <div className="col-span-12 flex flex-col gap-2 md:col-span-4 md:col-start-9">
          <Link
            href="/zasebnost"
            className="text-sm text-ink-600 underline-offset-4 transition-colors duration-200 hover:text-ink-900 hover:underline"
          >
            {t("privacy")}
          </Link>
        </div>
      </div>
      <p className="hairline mt-12 border-t pt-6 text-xs text-ink-600">
        © {year} Silberberg. {t("rights")}
      </p>
    </footer>
  );
}
