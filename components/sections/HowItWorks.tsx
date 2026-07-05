import { useTranslations } from "next-intl";
import { ConfirmTag } from "@/components/ui/ConfirmTag";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  { num: "1", title: "step1Title", text: "step1Text" },
  { num: "2", title: "step2Title", text: "step2Text" },
  { num: "3", title: "step3Title", text: "step3Text" },
  { num: "4", title: "step4Title", text: "step4Text" },
] as const;

/**
 * Four numbered cards. On phones they snap-scroll horizontally like an
 * app onboarding; on desktop they sit in a row.
 */
export function HowItWorks() {
  const t = useTranslations("how");

  return (
    <section id="postopek" className="scroll-mt-24 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} />
        </Reveal>

        <Reveal className="-mx-4 mt-10 md:mx-0">
          {/* Horizontally scrollable on phones → must be keyboard-reachable */}
          <ol
            tabIndex={0}
            aria-label={t("heading")}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:grid md:grid-cols-4 md:overflow-visible md:px-0"
          >
            {steps.map((step) => (
              <li
                key={step.num}
                className="w-[78%] shrink-0 snap-center rounded-3xl border border-black/5 bg-stone-50 p-6 sm:w-[46%] md:w-auto"
              >
                <span
                  aria-hidden="true"
                  className="flex size-10 items-center justify-center rounded-full bg-neutral-900 font-mono text-sm font-semibold text-white"
                >
                  {step.num}
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {t(step.title)}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">
                  {t(step.text)}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>

        <p className="mt-6 text-sm text-neutral-600">
          {t("mailinNote")}
          <ConfirmTag />
        </p>
      </div>
    </section>
  );
}
