"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("header");

  return (
    <nav aria-label={t("langLabel")} className="flex items-center gap-1">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && (
            <span aria-hidden="true" className="text-ink-600">
              /
            </span>
          )}
          <Link
            href={pathname}
            locale={l}
            aria-current={l === locale ? "true" : undefined}
            className={`px-1.5 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-200 ${
              l === locale
                ? "text-gold-800"
                : "text-ink-600 hover:text-ink-900"
            }`}
          >
            {l}
          </Link>
        </span>
      ))}
    </nav>
  );
}
