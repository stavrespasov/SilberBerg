import { useTranslations } from "next-intl";
import type { ComponentType, SVGProps } from "react";
import { HallmarkIcon, ScaleIcon, ShieldIcon } from "@/components/icons";
import { ConfirmTag } from "@/components/ui/ConfirmTag";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
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
    <section className="px-6 py-20 md:px-12 md:py-28">
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <ScrollReveal className="col-span-12 md:col-span-4">
          <SectionHeading
            eyebrow={t("eyebrow")}
            heading={t("heading")}
            tone="dark"
          />
        </ScrollReveal>
        <div className="col-span-12 flex flex-col md:col-span-7 md:col-start-6">
          {blocks.map((block, i) => (
            <ScrollReveal key={block.title} delay={i * 0.08}>
              <article className="hairline flex gap-6 border-t py-8">
                <block.icon className="mt-1 size-9 shrink-0 text-gold-400" />
                <div>
                  <h3 className="font-display text-2xl text-bone-50">
                    {t(block.title)}
                  </h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-silver-300">
                    {t(block.text)}
                    {block.confirm && <ConfirmTag />}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
