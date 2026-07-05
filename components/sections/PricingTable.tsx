import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { formatUpdatedDate } from "@/lib/pricing";
import { CountUp } from "@/components/CountUp";
import { indicativePrices, pricesUpdatedOn } from "@/lib/pricing.config";
import { ConfirmTag } from "@/components/ui/ConfirmTag";
import { Reveal } from "@/components/Reveal";
import { PillLink } from "@/components/ui/PillLink";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * The assay board: a gilded frame around two mono columns, read like a
 * trading desk. Prices count up to value as the board enters view.
 */
export function PricingTable() {
  const t = useTranslations("pricing");
  const locale = useLocale() as Locale;

  const groups = [
    { label: t("gold"), rows: indicativePrices.filter((r) => r.metal === "gold") },
    { label: t("silver"), rows: indicativePrices.filter((r) => r.metal === "silver") },
  ];

  return (
    <section id="cene" className="scroll-mt-24 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal variant="blur">
          <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} />
          <p className="mt-5 max-w-2xl leading-relaxed text-smoke">
            {t("lead")}
          </p>
        </Reveal>

        <Reveal variant="scale" className="mt-12">
          <div className="gild-border rounded-lg p-px">
            <div className="grid gap-x-14 gap-y-10 rounded-lg bg-ink-2 p-5 sm:p-7 md:grid-cols-2 md:p-12">
              {groups.map((group) => (
                <div key={group.label}>
                  <h3 className="flex items-baseline justify-between border-b border-line-2 pb-3">
                    <span className="font-display text-2xl font-medium text-bone">
                      {group.label}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.18em] text-dim uppercase">
                      €/g
                    </span>
                  </h3>
                  <ul className="mt-1">
                    {group.rows.map((row) => (
                      <li
                        key={row.purity}
                        className="group flex items-baseline justify-between gap-4 border-b border-line py-4 transition-colors duration-300 last:border-b-0 hover:bg-coal/50"
                      >
                        <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 font-mono text-sm tabular-nums">
                          <span className="font-medium whitespace-nowrap text-bone">
                            {row.purity}
                          </span>
                          {row.karat && (
                            <span className="whitespace-nowrap text-dim">
                              · {row.karat}
                            </span>
                          )}
                          {!row.confirmed && <ConfirmTag />}
                        </p>
                        <p className="font-mono text-xl font-medium tracking-tight text-gold tabular-nums transition-colors duration-300 group-hover:text-gold-hi md:text-2xl">
                          <CountUp value={row.eurPerGram} locale={locale} />
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-9 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-xs tracking-wide text-smoke">
              {t("updated", {
                date: formatUpdatedDate(pricesUpdatedOn, locale),
              })}
            </p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-smoke">
              {t("disclaimer")}
            </p>
          </div>
          <PillLink href="#kontakt" variant="ghost" className="shrink-0">
            {t("cta")}
          </PillLink>
        </Reveal>
      </div>
    </section>
  );
}
