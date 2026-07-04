import { useTranslations } from "next-intl";
import { HeroHeadline } from "@/components/HeroHeadline";
import { CtaButton } from "@/components/ui/CtaButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const stamps = ["585", "750", "875", "999,9"];

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="vrh"
      className="grid grid-cols-12 gap-x-6 gap-y-14 px-6 py-20 md:px-12 md:py-28"
    >
      <div className="col-span-12 md:col-span-7">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-gold-800">
          {t("eyebrow")}
        </p>
        <HeroHeadline heading={t("heading")} sub={t("sub")} />
        <div className="mt-10 flex flex-wrap gap-4">
          <CtaButton href="#kontakt">{t("ctaPrimary")}</CtaButton>
          <CtaButton href="#cene" variant="outline">
            {t("ctaSecondary")}
          </CtaButton>
        </div>
      </div>

      {/* Hallmark panel — the assay-stamp motif in place of a stock photo. */}
      <ScrollReveal
        delay={0.25}
        className="col-span-12 self-center sm:col-span-8 md:col-span-4 md:col-start-9"
      >
        <div className="hairline border bg-bone-100 p-6">
          <div className="grid grid-cols-2 gap-px bg-ink-900/15">
            {stamps.map((s) => (
              <div
                key={s}
                className="flex aspect-square items-center justify-center bg-bone-50"
              >
                <span className="font-display text-2xl text-gold-700">
                  {s}
                </span>
              </div>
            ))}
          </div>
          <p className="hairline mt-6 border-t pt-4 text-xs uppercase tracking-[0.18em] text-ink-600">
            {t("hallmarkCaption")}
          </p>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-ink-800">
            {(["point1", "point2", "point3"] as const).map((k) => (
              <li key={k} className="flex gap-3">
                <span aria-hidden="true" className="text-gold-600">
                  —
                </span>
                {t(k)}
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </section>
  );
}
