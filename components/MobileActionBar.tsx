"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

/**
 * App-like bottom action bar on phones: slides in once the hero scrolls
 * away, keeping the two conversion paths one thumb-tap away.
 */
export function MobileActionBar() {
  const t = useTranslations("actions");
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const hero = document.getElementById("vrh");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry ? !entry.isIntersecting : false),
      { rootMargin: "-80px 0px 0px 0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label={t("barLabel")}
          initial={reduceMotion ? false : { y: "110%" }}
          animate={{ y: 0 }}
          exit={reduceMotion ? undefined : { y: "110%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="hairline fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t bg-bone-50/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden"
        >
          <a
            href="#cene"
            className="flex min-h-12 flex-1 items-center justify-center border border-ink-900/30 text-xs font-medium uppercase tracking-[0.14em] text-ink-900"
          >
            {t("prices")}
          </a>
          <a
            href="#kontakt"
            className="flex min-h-12 flex-1 items-center justify-center bg-gold-500 text-xs font-medium uppercase tracking-[0.14em] text-ink-950"
          >
            {t("book")}
          </a>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
