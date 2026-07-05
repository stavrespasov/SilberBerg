import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { formatUpdatedDate } from "@/lib/pricing";
import { CountUp } from "@/components/CountUp";
import { indicativePrices, pricesUpdatedOn } from "@/lib/pricing.config";
import { ConfirmTag } from "@/components/ui/ConfirmTag";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function PricingTable() {
  const t = useTranslations("pricing");
  const locale = useLocale() as Locale;

  const groups = [
    {
      label: t("gold"),
      rows: indicativePrices.filter((r) => r.metal === "gold"),
      cols: "grid-cols-2",
    },
    {
      label: t("silver"),
      rows: indicativePrices.filter((r) => r.metal === "silver"),
      cols: "grid-cols-2",
    },
  ];

  return (
    <section id="cene" className="scroll-mt-24 px-4 py-6">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-stone-100 p-6 md:p-12">
        <Reveal variant="blur">
          <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} />
          <p className="mt-4 max-w-2xl leading-relaxed text-neutral-600">
            {t("lead")}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {groups.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 100} variant="scale">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold">{group.label}</h3>
                <div className={`mt-5 grid gap-3 ${group.cols}`}>
                  {group.rows.map((row) => (
                    <div
                      key={row.purity}
                      className="rounded-2xl border border-black/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-md hover:shadow-amber-100"
                    >
                      <p className="flex items-baseline gap-2 text-sm text-neutral-500">
                        <span className="font-mono font-medium text-neutral-900">
                          {row.purity}
                        </span>
                        {row.karat && <span>· {row.karat}</span>}
                      </p>
                      <p className="mt-3 font-mono text-2xl font-semibold tracking-tight tabular-nums md:text-3xl">
                        <CountUp value={row.eurPerGram} locale={locale} />
                      </p>
                      {!row.confirmed && (
                        <p className="mt-2">
                          <ConfirmTag />
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-neutral-600">
              {t("updated", {
                date: formatUpdatedDate(pricesUpdatedOn, locale),
              })}
            </p>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-neutral-600">
              {t("disclaimer")}
            </p>
          </div>
          <a
            href="#kontakt"
            className="inline-flex min-h-11 w-fit shrink-0 items-center rounded-full bg-neutral-900 px-5 text-sm font-medium text-white transition-colors duration-200 hover:bg-neutral-700"
          >
            {t("cta")}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
