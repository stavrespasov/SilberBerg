"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { buyingCategories } from "@/lib/buying";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { HomeSectionLink } from "@/components/HomeSectionLink";

const links = [
  { href: "/#cene", key: "prices" },
  { href: "/#postopek", key: "process" },
  { href: "/#odkup", key: "buy" },
  { href: "/#zaupanje", key: "trust" },
  { href: "/#lokacija", key: "location" },
  { href: "/#faq", key: "faq" },
  { href: "/#kontakt", key: "contact" },
] as const;

/** Portaled beyond the glass header; scrollable on short screens. */
export function MobileMenu() {
  const t = useTranslations("menu");
  const tNav = useTranslations("nav");
  const tBuy = useTranslations("buy");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("overflow-hidden");
    closeButtonRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        openButtonRef.current?.focus();
      }
      if (event.key === "Tab") {
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", onDesktop);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={openButtonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobilni-meni"
        onClick={() => setOpen(true)}
        className="flex size-10 items-center justify-center rounded-full"
      >
        <span className="sr-only">{t("open")}</span>
        <span aria-hidden="true" className="flex w-5 flex-col gap-2">
          <span className="h-px bg-bone" />
          <span className="h-px bg-bone" />
        </span>
      </button>
      {mounted &&
        createPortal(
          <div
            ref={panelRef}
            id="mobilni-meni"
            role="dialog"
            aria-modal={open ? true : undefined}
            aria-label={t("open")}
            inert={!open}
            data-lenis-prevent
            className={`fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-ink/95 px-6 backdrop-blur-xl transition-opacity duration-300 ease-vault lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <div className="mx-auto flex min-h-dvh max-w-xl flex-col pb-[max(2rem,env(safe-area-inset-bottom))]">
              <div className="flex shrink-0 items-center justify-between pt-6">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="font-display text-lg font-medium tracking-wide text-bone"
                >
                  Silberberg
                </Link>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openButtonRef.current?.focus();
                  }}
                  className="flex size-11 items-center justify-center rounded-full border border-line"
                >
                  <span className="sr-only">{t("close")}</span>
                  <span aria-hidden="true" className="text-2xl font-light">
                    ×
                  </span>
                </button>
              </div>
              <nav
                aria-label={tBuy("categoryNav")}
                className="mt-8 border-b border-line pb-6"
              >
                <p className="mb-3 font-mono text-[11px] tracking-[0.16em] text-gold uppercase">
                  {tBuy("eyebrow")}
                </p>
                <ul className="space-y-1">
                  {buyingCategories.map(({ key, href }, index) => (
                    <li key={key}>
                      <Link
                        href={href}
                        aria-current={pathname === href ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className={`flex min-h-12 items-baseline gap-3 py-2 font-display text-[1.7rem] leading-tight font-medium transition-colors hover:text-gold-hi sm:text-3xl ${pathname === href ? "text-gold-hi" : "text-bone"}`}
                      >
                        <span
                          aria-hidden="true"
                          className="font-mono text-[10px] tracking-wider text-gold"
                        >
                          0{index + 1}
                        </span>
                        {tBuy(`${key}.title`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav aria-label={tNav("railLabel")} className="my-5">
                <ul className="grid grid-cols-2 gap-x-4">
                  {links.map(({ href, key }) => (
                    <li key={key}>
                      <HomeSectionLink
                        href={href}
                        onClick={() => setOpen(false)}
                        className="flex min-h-11 items-center py-2 text-sm text-smoke transition-colors hover:text-bone"
                      >
                        {tNav(key)}
                      </HomeSectionLink>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-5">
                <LocaleSwitcher onSwitch={() => setOpen(false)} />
                <p className="font-mono text-[10px] tracking-[0.12em] text-smoke uppercase">
                  Silberberg · Koper
                </p>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
