import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

const links = [
  { href: "#cene", key: "prices" },
  { href: "#postopek", key: "process" },
  { href: "#odkup", key: "buy" },
  { href: "#lokacija", key: "location" },
] as const;

/** Floating dark-glass bar — fixed, hairline-bordered, out of the way. */
export function Header() {
  const t = useTranslations("header");
  const tNav = useTranslations("nav");

  return (
    <header className="fixed inset-x-4 top-4 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
      >
        {t("skip")}
      </a>
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between rounded-full border border-line bg-ink/70 px-2 pl-6 backdrop-blur-xl">
        <p className="font-display text-lg font-medium tracking-wide text-bone">
          Silberberg
        </p>
        <nav
          aria-label={tNav("railLabel")}
          className="hidden items-center gap-6 lg:flex"
        >
          {links.map(({ href, key }) => (
            <a
              key={key}
              href={href}
              className="font-mono text-[11px] tracking-[0.16em] text-smoke uppercase transition-colors duration-200 hover:text-gold"
            >
              {tNav(key)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <a
            href="#kontakt"
            className="gild-bg sheen hidden min-h-10 items-center rounded-full px-4 text-sm font-semibold transition-transform duration-300 ease-vault hover:-translate-y-0.5 sm:inline-flex"
          >
            {t("phoneCta")}
          </a>
        </div>
      </div>
    </header>
  );
}
