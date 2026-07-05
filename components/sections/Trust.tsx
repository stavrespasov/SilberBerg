import { useTranslations } from "next-intl";
import type { ComponentType, SVGProps } from "react";
import { HallmarkIcon, ScaleIcon, ShieldIcon } from "@/components/icons";
import { ConfirmTag } from "@/components/ui/ConfirmTag";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Block = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  text: string;
  confirm?: boolean;
};

const blocks: readonly Block[] = [
  { icon: ScaleIcon, title: "appraisalTitle", text: "appraisalText" },
  { icon: ShieldIcon, title: "discretionTitle", text: "discretionText" },
  {
    icon: HallmarkIcon,
    title: "licenseTitle",
    text: "licenseText",
    confirm: true,
  },
];

export function Trust() {
  const t = useTranslations("trust");

  return (
    <section id="zaupanje" className="scroll-mt-24 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal variant="blur">
          <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {blocks.map((block, i) => (
            <Reveal key={block.title} delay={i * 80} variant="scale">
              <article className="group h-full rounded-3xl border border-black/5 bg-stone-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-200">
                <block.icon className="size-6 text-amber-700 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {t(block.title)}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">
                  {t(block.text)}
                  {block.confirm && <ConfirmTag />}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
