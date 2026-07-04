import { useTranslations } from "next-intl";
import { ConfirmTag } from "@/components/ui/ConfirmTag";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  { num: "01", title: "step1Title", text: "step1Text" },
  { num: "02", title: "step2Title", text: "step2Text" },
  { num: "03", title: "step3Title", text: "step3Text" },
  { num: "04", title: "step4Title", text: "step4Text" },
] as const;

export function HowItWorks() {
  const t = useTranslations("how");

  return (
    <section id="postopek" className="px-6 py-20 md:px-12 md:py-28">
      <ScrollReveal>
        <SectionHeading
          eyebrow={t("eyebrow")}
          heading={t("heading")}
          tone="dark"
        />
      </ScrollReveal>
      <ol className="mt-14 grid grid-cols-12 gap-x-6 gap-y-12">
        {steps.map((step, i) => (
          <li
            key={step.num}
            // Editorial offset: steps stagger across the grid instead of a
            // symmetric 4-up card row.
            className={`col-span-12 sm:col-span-6 lg:col-span-5 ${
              i % 2 === 1 ? "lg:col-start-8 lg:translate-y-10" : "lg:col-start-2"
            }`}
          >
            <ScrollReveal delay={i * 0.08} className="hairline border-t pt-5">
              <span className="font-display text-4xl text-gold-500">
                {step.num}
              </span>
              <h3 className="mt-3 font-display text-2xl text-bone-50">
                {t(step.title)}
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-silver-300">
                {t(step.text)}
              </p>
            </ScrollReveal>
          </li>
        ))}
      </ol>
      <p className="mt-16 text-sm text-silver-400">
        {t("mailinNote")}
        <ConfirmTag />
      </p>
    </section>
  );
}
