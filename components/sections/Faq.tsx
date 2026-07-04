import { useTranslations } from "next-intl";
import { ChevronDownIcon } from "@/components/icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const faqKeys = [
  { q: "q1", a: "a1" },
  { q: "q2", a: "a2" },
  { q: "q3", a: "a3" },
  { q: "q4", a: "a4" },
  { q: "q5", a: "a5" },
  { q: "q6", a: "a6" },
] as const;

export function Faq() {
  const t = useTranslations("faq");

  return (
    <section id="faq" className="px-6 py-20 md:px-12 md:py-28">
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <ScrollReveal className="col-span-12 md:col-span-4">
          <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} />
        </ScrollReveal>
        <ScrollReveal
          delay={0.1}
          className="col-span-12 md:col-span-7 md:col-start-6"
        >
          {faqKeys.map(({ q, a }) => (
            <details key={q} className="hairline group border-t py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-xl text-ink-900 transition-colors duration-200 hover:text-gold-800 [&::-webkit-details-marker]:hidden">
                {t(q)}
                <ChevronDownIcon className="size-5 shrink-0 text-gold-600 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="max-w-xl pb-5 leading-relaxed text-ink-700">
                {t(a)}
              </p>
            </details>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
