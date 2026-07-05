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

/** Hairline accordion — engraved lines, no cards. */
export function Faq() {
  const t = useTranslations("faq");

  return (
    <section id="faq" className="scroll-mt-24 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal variant="blur">
          <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} center />
        </Reveal>
        <Reveal className="mt-12 border-y border-line">
          {faqKeys.map(({ q, a }) => (
            <details
              key={q}
              className="group border-b border-line last:border-b-0"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-medium text-bone transition-colors duration-200 hover:text-gold-hi [&::-webkit-details-marker]:hidden">
                {t(q)}
                <ChevronDownIcon className="size-5 shrink-0 text-dim transition-[transform,color] duration-300 ease-vault group-open:rotate-180 group-open:text-gold" />
              </summary>
              <p className="pb-6 text-[15px] leading-relaxed text-smoke">
                {t(a)}
              </p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
