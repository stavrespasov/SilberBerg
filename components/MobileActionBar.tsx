"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { CONTACT_PHONE } from "@/lib/siteConfig";

const phoneHref = CONTACT_PHONE
  ? `tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`
  : "#kontakt";

/**
 * Thumb-reach actions pinned to the bottom on phones. It stays hidden
 * while the hero is on screen (its CTAs are already there, so showing
 * these too would put four competing buttons in one view) and again once
 * the contact section is reached (you've arrived — its phone action takes
 * over). In between it slides up as a floating layer. Hidden from
 * md up; safe-area padded for gesture-nav devices.
 */
export function MobileActionBar() {
  const t = useTranslations("actions");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("vrh");
    const contact = document.getElementById("kontakt");
    if (!hero) return;

    let heroIn = true;
    let contactIn = false;
    const update = () => setVisible(!heroIn && !contactIn);

    const heroObs = new IntersectionObserver(
      ([e]) => {
        heroIn = !!e?.isIntersecting;
        update();
      },
      // A sliver of hero still counts as "in the hero" — reveal only once
      // it is genuinely behind you.
      { rootMargin: "-25% 0px 0px 0px" },
    );
    heroObs.observe(hero);

    let contactObs: IntersectionObserver | undefined;
    if (contact) {
      contactObs = new IntersectionObserver(
        ([e]) => {
          contactIn = !!e?.isIntersecting;
          update();
        },
        { rootMargin: "0px 0px -35% 0px" },
      );
      contactObs.observe(contact);
    }

    return () => {
      heroObs.disconnect();
      contactObs?.disconnect();
    };
  }, []);

  return (
    <nav
      aria-label={t("barLabel")}
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/85 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-[transform,opacity] duration-500 ease-vault md:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="grid grid-cols-2 gap-2 p-3">
        <a
          href="#odkup"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-line-2 text-sm font-medium text-bone transition-transform duration-200 active:scale-[0.97]"
        >
          {t("buy")}
        </a>
        <a
          href={phoneHref}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-bone text-sm font-semibold text-ink transition-transform duration-200 active:scale-[0.97]"
        >
          {CONTACT_PHONE ? t("call") : t("book")}
        </a>
      </div>
    </nav>
  );
}
