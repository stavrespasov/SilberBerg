import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

/** Floating glass pill nav — fixed, centered, out of the content's way. */
export function Header() {
  const t = useTranslations("header");

  return (
    <header className="fixed inset-x-4 top-4 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:rounded-full focus:bg-neutral-900 focus:px-4 focus:py-2 focus:text-white"
      >
        {t("skip")}
      </a>
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between rounded-full border border-black/5 bg-white/75 px-2 pl-5 shadow-sm backdrop-blur-xl">
        <p className="text-[15px] font-semibold tracking-tight">Silberberg</p>
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <a
            href="#kontakt"
            className="hidden min-h-10 items-center rounded-full bg-neutral-900 px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-neutral-700 sm:inline-flex"
          >
            {t("phoneCta")}
          </a>
        </div>
      </div>
    </header>
  );
}
