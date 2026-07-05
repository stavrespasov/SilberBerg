import { useTranslations } from "next-intl";

/**
 * Thumb-reach actions pinned to the bottom on phones — the header CTA is
 * hidden there and nobody scroll-hunts for a form on mobile. Hidden from
 * md up; safe-area padded for gesture-nav devices.
 */
export function MobileActionBar() {
  const t = useTranslations("actions");

  return (
    <nav
      aria-label={t("barLabel")}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
    >
      <div className="grid grid-cols-2 gap-2 p-3">
        <a
          href="#cene"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-line-2 text-sm font-medium text-bone transition-transform duration-200 active:scale-[0.97]"
        >
          {t("prices")}
        </a>
        <a
          href="#kontakt"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-bone text-sm font-semibold text-ink transition-transform duration-200 active:scale-[0.97]"
        >
          {t("book")}
        </a>
      </div>
    </nav>
  );
}
