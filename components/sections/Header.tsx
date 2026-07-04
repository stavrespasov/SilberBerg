import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

export function Header() {
  const t = useTranslations("header");

  return (
    <header className="hairline flex items-center justify-between border-b px-6 py-5 md:px-12">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-gold-500 focus:px-4 focus:py-2 focus:text-ink-950"
      >
        {t("skip")}
      </a>
      <p className="font-display text-lg tracking-[0.08em] text-bone-100">
        Silberberg
      </p>
      <div className="flex items-center gap-6">
        <LocaleSwitcher />
        <a
          href="#kontakt"
          className="hidden text-xs font-medium uppercase tracking-[0.18em] text-gold-400 transition-colors duration-200 hover:text-gold-300 sm:block"
        >
          {t("phoneCta")}
        </a>
      </div>
    </header>
  );
}
