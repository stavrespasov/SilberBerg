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
  /* Engraved into each panel — the fineness marks a counter clerk would
     stamp, echoing the hero's assay rail. Decorative only. */
  mark: string;
  confirm?: boolean;
};

const blocks: readonly Block[] = [
  { icon: ScaleIcon, title: "appraisalTitle", text: "appraisalText", mark: "999,9" },
  { icon: ShieldIcon, title: "discretionTitle", text: "discretionText", mark: "916" },
  {
    icon: HallmarkIcon,
    title: "licenseTitle",
    text: "licenseText",
    mark: "750",
    confirm: true,
  },
];

export function Trust() {
  const t = useTranslations("trust");

  return (
    <section id="zaupanje" className="scroll-mt-24 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal variant="blur">
          <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {blocks.map((block, i) => (
            <Reveal key={block.title} delay={i * 90} variant="scale">
              <article className="engraved group relative h-full overflow-hidden rounded-lg p-7">
                <span
                  aria-hidden="true"
                  className="letterpress pointer-events-none absolute -top-3 -right-2 font-mono text-6xl font-semibold tracking-tight tabular-nums select-none"
                >
                  {block.mark}
                </span>
                <block.icon className="size-6 text-gold transition-transform duration-300 ease-vault group-hover:scale-110" />
                <h3 className="mt-5 font-display text-2xl font-medium tracking-tight text-bone">
                  {t(block.title)}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-smoke">
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
