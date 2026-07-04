import { useTranslations } from "next-intl";
import { CtaButton } from "@/components/ui/CtaButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const stamps = ["585", "750", "875", "999,9"];

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="grid grid-cols-12 gap-x-6 gap-y-14 px-6 py-20 md:px-12 md:py-28">
      <ScrollReveal className="col-span-12 md:col-span-7">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-gold-400">
          {t("eyebrow")}
        </p>
        <h1
          className="font-display text-(length:--text-display-xl) leading-[0.98] font-medium text-bone-50"
          style={{ fontOpticalSizing: "auto" }}
        >
          {t("heading")}
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-silver-300">
          {t("sub")}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <CtaButton href="#kontakt">{t("ctaPrimary")}</CtaButton>
          <CtaButton href="#cene" variant="outline">
            {t("ctaSecondary")}
          </CtaButton>
        </div>
      </ScrollReveal>

      {/* Hallmark panel — the assay-stamp motif in place of a stock photo. */}
      <ScrollReveal
        delay={0.15}
        className="col-span-12 self-center sm:col-span-8 md:col-span-4 md:col-start-9"
      >
        <div className="hairline border p-6">
          <div className="grid grid-cols-2 gap-px bg-silver-500/20">
            {stamps.map((s) => (
              <div
                key={s}
                className="flex aspect-square items-center justify-center bg-ink-900"
              >
                <span className="font-display text-2xl text-gold-400">
                  {s}
                </span>
              </div>
            ))}
          </div>
          <p className="hairline mt-6 border-t pt-4 text-xs uppercase tracking-[0.18em] text-silver-400">
            {t("hallmarkCaption")}
          </p>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-bone-100">
            {(["point1", "point2", "point3"] as const).map((k) => (
              <li key={k} className="flex gap-3">
                <span aria-hidden="true" className="text-gold-500">
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
