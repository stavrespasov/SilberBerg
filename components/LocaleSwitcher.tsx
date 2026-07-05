"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("header");

  return (
    <nav
      aria-label={t("langLabel")}
      className="flex items-center rounded-full bg-stone-100 p-1"
    >
      {routing.locales.map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          aria-current={l === locale ? "true" : undefined}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase transition-colors duration-200 ${
            l === locale
              ? "bg-white text-neutral-900 shadow-sm"
              : "text-neutral-600 hover:text-neutral-900"
          }`}
        >
          {l}
        </Link>
      ))}
    </nav>
  );
}
