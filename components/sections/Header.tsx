import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { Magnetic } from "@/components/Magnetic";
import { MobileMenu } from "@/components/MobileMenu";
import { HomeSectionLink } from "@/components/HomeSectionLink";
import { CONTACT_PHONE } from "@/lib/siteConfig";

const links = [
  { href: "/#postopek", key: "process" },
  { href: "/#odkup", key: "buy" },
  { href: "/#lokacija", key: "location" },
] as const;

const phoneHref = CONTACT_PHONE
  ? `tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`
  : undefined;

const phoneCtaClass =
  "inline-flex min-h-10 items-center rounded-full bg-bone px-4 text-sm font-semibold whitespace-nowrap text-ink transition-colors duration-300 hover:bg-gold";

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
        <Link
          href="/"
          className="font-display text-lg font-medium tracking-wide text-bone"
        >
          Silberberg
        </Link>
        <nav
          aria-label={tNav("railLabel")}
          className="hidden items-center gap-6 lg:flex"
        >
          {links.map(({ href, key }) => (
            <HomeSectionLink
              key={key}
              href={href}
              className="font-mono text-[11px] tracking-[0.16em] text-smoke uppercase transition-colors duration-200 hover:text-gold"
            >
              {tNav(key)}
            </HomeSectionLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <LocaleSwitcher />
          </span>
          <Magnetic className="hidden sm:inline-block">
            {phoneHref ? (
              <a href={phoneHref} className={phoneCtaClass}>
                {t("phoneCta")}
              </a>
            ) : (
              <HomeSectionLink href="/#kontakt" className={phoneCtaClass}>
                {t("phoneCta")}
              </HomeSectionLink>
            )}
          </Magnetic>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
