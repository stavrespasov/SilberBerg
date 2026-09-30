"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { getPathname, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher({ onSwitch }: { onSwitch?: () => void }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("header");

  return (
    <nav
      aria-label={t("langLabel")}
      className="flex items-center rounded-full border border-line bg-coal p-1"
    >
      {routing.locales.map((l) => (
        <Link
          key={l}
          // Use canonical paths: the proxy intentionally excludes internal /sl URLs.
          href={getPathname({ locale: l, href: pathname })}
          hrefLang={l}
          prefetch={false}
          onClick={onSwitch}
          aria-current={l === locale ? "true" : undefined}
          className={`rounded-full px-3 py-1.5 font-mono text-xs font-semibold uppercase transition-colors duration-200 ${
            l === locale ? "bg-coal-2 text-gold" : "text-smoke hover:text-bone"
          }`}
        >
          {l}
        </Link>
      ))}
    </nav>
  );
}
