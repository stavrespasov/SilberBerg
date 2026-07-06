"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

const links = [
  { href: "#cene", key: "prices" },
  { href: "#postopek", key: "process" },
  { href: "#odkup", key: "buy" },
  { href: "#zaupanje", key: "trust" },
  { href: "#lokacija", key: "location" },
  { href: "#faq", key: "faq" },
  { href: "#kontakt", key: "contact" },
] as const;

/**
 * The mobile navigation: a hamburger that opens a full-screen ink
 * overlay with the section links staged like the hero — each line rising
 * out of its own mask. The overlay is portaled to <body>: the header
 * pill's backdrop-filter makes it the containing block for fixed
 * descendants, which would trap the overlay inside the pill. Scroll
 * locks behind it; Escape, the close button, and any link close it.
 * Hidden from lg up where the inline nav row exists.
 */
export function MobileMenu() {
  const t = useTranslations("menu");
  const tNav = useTranslations("nav");
  const [open, setOpen] = useState(false);
  // True after hydration only — the portal can't render during SSR.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("overflow-hidden");
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        openButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const burger = (openState: boolean) => (
    <span aria-hidden="true" className="relative block h-3 w-5">
      <span
        className={`absolute left-0 block h-px w-5 bg-bone transition-transform duration-300 ease-vault ${
          openState ? "top-1/2 -rotate-45" : "top-0"
        }`}
      />
      <span
        className={`absolute left-0 block h-px w-5 bg-bone transition-transform duration-300 ease-vault ${
          openState ? "top-1/2 rotate-45" : "top-full"
        }`}
      />
    </span>
  );

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
        {burger(false)}
      </button>

      {mounted &&
        createPortal(
          <div
            id="mobilni-meni"
            data-lenis-prevent
            className={`fixed inset-0 z-[70] flex flex-col justify-between bg-ink/95 px-6 pb-8 backdrop-blur-xl transition-opacity duration-400 ease-vault lg:hidden ${
              open ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div className="flex h-14 items-center justify-between pt-8">
              <p className="font-display text-lg font-medium tracking-wide text-bone">
                Silberberg
              </p>
              <button
                ref={closeButtonRef}
                type="button"
                tabIndex={open ? 0 : -1}
                onClick={() => {
                  setOpen(false);
                  openButtonRef.current?.focus();
                }}
                className="flex size-10 items-center justify-center rounded-full border border-line"
              >
                <span className="sr-only">{t("close")}</span>
                {burger(true)}
              </button>
            </div>

            <nav aria-label={tNav("railLabel")}>
              <ol className="flex flex-col gap-1">
                {links.map(({ href, key }, i) => (
                  <li key={key} className="overflow-clip">
                    <a
                      href={href}
                      tabIndex={open ? 0 : -1}
                      onClick={() => setOpen(false)}
                      className={`flex items-baseline gap-4 py-2 font-display text-4xl font-medium tracking-tight text-bone transition-[translate,color] duration-700 ease-vault hover:text-gold-hi ${
                        open ? "translate-y-0" : "translate-y-[120%]"
                      }`}
                      style={
                        {
                          transitionDelay: open ? `${80 + i * 45}ms` : "0ms",
                        } as CSSProperties
                      }
                    >
                      <span className="font-mono text-xs tracking-[0.18em] text-gold tabular-nums">
                        0{i + 1}
                      </span>
                      {tNav(key)}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div
              className={`flex items-center justify-between gap-4 border-t border-line pt-6 transition-opacity duration-500 ease-vault ${
                open ? "opacity-100 delay-400" : "opacity-0"
              }`}
            >
              <LocaleSwitcher />
              <p className="font-mono text-[11px] tracking-[0.2em] text-dim uppercase">
                Silberberg · Koper
              </p>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
