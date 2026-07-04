import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { formatUpdatedDate } from "@/lib/pricing";
import { indicativePrices, pricesUpdatedOn } from "@/lib/pricing.config";
import { AnimatedPrice } from "@/components/ui/AnimatedPrice";
import { ConfirmTag } from "@/components/ui/ConfirmTag";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function PricingTable() {
  const t = useTranslations("pricing");
  const locale = useLocale() as Locale;

  const gold = indicativePrices.filter((r) => r.metal === "gold");
  const silver = indicativePrices.filter((r) => r.metal === "silver");
  const groups = [
    { label: t("gold"), rows: gold },
    { label: t("silver"), rows: silver },
  ];

  return (
    <section
      id="cene"
      className="bg-bone-100 px-6 py-20 text-ink-900 md:px-12 md:py-28"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <ScrollReveal className="col-span-12 md:col-span-4">
          <SectionHeading
            eyebrow={t("eyebrow")}
            heading={t("heading")}
            tone="light"
          />
          <p className="mt-6 max-w-md leading-relaxed text-ink-700">
            {t("lead")}
          </p>
          <p className="mt-6 text-sm text-ink-600">
            {t("updated", {
              date: formatUpdatedDate(pricesUpdatedOn, locale),
            })}
          </p>
        </ScrollReveal>

        <ScrollReveal
          delay={0.1}
          className="col-span-12 md:col-span-7 md:col-start-6"
        >
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-ink-900/30 text-xs uppercase tracking-[0.18em] text-ink-600">
                <th scope="col" className="py-3 pr-4 font-medium">
                  {t("colFineness")}
                </th>
                <th scope="col" className="py-3 pr-4 font-medium">
                  {t("colKarat")}
                </th>
                <th scope="col" className="py-3 text-right font-medium">
                  {t("colPrice")}
                </th>
              </tr>
            </thead>
            {groups.map((group) => (
              <tbody key={group.label}>
                <tr>
                  <th
                    scope="rowgroup"
                    colSpan={3}
                    className="pt-6 pb-2 text-xs font-medium uppercase tracking-[0.22em] text-gold-800"
                  >
                    {group.label}
                  </th>
                </tr>
                {group.rows.map((row) => (
                  <tr
                    key={`${row.metal}-${row.purity}`}
                    className="border-b border-ink-900/10"
                  >
                    <td className="py-3 pr-4 font-display text-xl">
                      {row.purity}
                    </td>
                    <td className="py-3 pr-4 text-ink-700">
                      {row.karat ?? "—"}
                    </td>
                    <td className="py-3 text-right text-lg font-medium">
                      <AnimatedPrice value={row.eurPerGram} locale={locale} />
                      {!row.confirmed && <ConfirmTag />}
                    </td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
          <p className="mt-6 border-l-2 border-gold-600 pl-4 text-sm leading-relaxed text-ink-700">
            {t("disclaimer")}
          </p>
          <a
            href="#kontakt"
            className="mt-6 inline-block text-xs font-medium uppercase tracking-[0.18em] text-gold-800 underline-offset-4 transition-colors duration-200 hover:text-ink-900 hover:underline"
          >
            {t("cta")}
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
