import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ConfirmTag } from "@/components/ui/ConfirmTag";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 py-14">
      <div className="mx-auto max-w-6xl border-t border-black/10 pt-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div>
            <p className="text-[15px] font-semibold tracking-tight">
              Silberberg
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-500">
              {t("legalName")}
              <ConfirmTag />
            </p>
            <p className="mt-1.5 text-sm text-neutral-500">
              {t("regNumber")}: <ConfirmTag />
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              {t("vatId")}: <ConfirmTag />
            </p>
          </div>
          <Link
            href="/zasebnost"
            className="h-fit text-sm text-neutral-500 transition-colors duration-200 hover:text-neutral-900"
          >
            {t("privacy")}
          </Link>
        </div>
        <p className="mt-10 text-xs text-neutral-500">
          © {year} Silberberg. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
