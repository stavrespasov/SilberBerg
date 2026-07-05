import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { Link } from "@/i18n/navigation";
import { ConfirmTag } from "@/components/ui/ConfirmTag";
import { Reveal } from "@/components/Reveal";

const WORDMARK = "SILBERBERG";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    // pb-28 on mobile clears the fixed action bar.
    <footer className="overflow-hidden px-4 pt-14 pb-28 md:pb-6">
      <div className="mx-auto max-w-6xl border-t border-line pt-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div>
            <p className="font-display text-lg font-medium tracking-wide text-bone">
              Silberberg
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-smoke">
              {t("legalName")}
              <ConfirmTag />
            </p>
            <p className="mt-1.5 text-sm text-smoke">
              {t("regNumber")}: <ConfirmTag />
            </p>
            <p className="mt-1 text-sm text-smoke">
              {t("vatId")}: <ConfirmTag />
            </p>
          </div>
          <Link
            href="/zasebnost"
            className="h-fit text-sm text-smoke transition-colors duration-200 hover:text-gold"
          >
            {t("privacy")}
          </Link>
        </div>
        <p className="mt-10 text-xs text-smoke">
          © {year} Silberberg. {t("rights")}
        </p>
      </div>

      {/* The name, pressed into the metal — letter by letter as it enters. */}
      <Reveal variant="group" className="mx-auto mt-12 max-w-6xl">
        <p
          aria-hidden="true"
          className="letterpress flex justify-between font-display text-[clamp(3rem,12.5vw,11rem)] leading-none font-bold tracking-tight select-none"
        >
          {WORDMARK.split("").map((letter, i) => (
            <span
              key={i}
              className="g"
              style={{ "--g": `${i * 55}ms` } as CSSProperties}
            >
              {letter}
            </span>
          ))}
        </p>
      </Reveal>
    </footer>
  );
}
