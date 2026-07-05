import { useTranslations } from "next-intl";
import { ChevronDownIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
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
    <section id="faq" className="scroll-mt-24 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal variant="blur">
          <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} center />
        </Reveal>
        <Reveal className="mt-10 flex flex-col gap-3">
          {faqKeys.map(({ q, a }) => (
            <details
              key={q}
              className="group rounded-2xl border border-black/5 bg-stone-50 px-5 transition-colors duration-200 hover:border-amber-300 open:border-amber-300 open:bg-white open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 font-medium [&::-webkit-details-marker]:hidden">
                {t(q)}
                <ChevronDownIcon className="size-5 shrink-0 text-neutral-600 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="pb-5 text-[15px] leading-relaxed text-neutral-600">
                {t(a)}
              </p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
