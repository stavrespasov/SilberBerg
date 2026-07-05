import { useTranslations } from "next-intl";
import { BanknoteIcon, ScaleIcon, ShieldIcon } from "@/components/icons";
import { PillLink } from "@/components/ui/PillLink";
import { Reveal } from "@/components/Reveal";

const points = [
  { icon: ScaleIcon, key: "point2" },
  { icon: BanknoteIcon, key: "point3" },
  { icon: ShieldIcon, key: "point1" },
] as const;

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section id="vrh" className="px-4 pt-36 pb-10 text-center md:pt-44">
      <Reveal>
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-medium text-amber-800">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-amber-600" />
          {t("eyebrow")}
        </p>
        <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-semibold tracking-tighter text-balance md:text-7xl">
          {t("heading")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-neutral-600 md:text-xl">
          {t("sub")}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <PillLink href="#kontakt">{t("ctaPrimary")}</PillLink>
          <PillLink href="#cene" variant="light">
            {t("ctaSecondary")}
          </PillLink>
        </div>
      </Reveal>

      <Reveal delay={150} className="mx-auto mt-16 max-w-5xl">
        <ul className="grid gap-3 text-left sm:grid-cols-3">
          {points.map(({ icon: Icon, key }) => (
            <li
              key={key}
              className="flex items-center gap-4 rounded-2xl bg-stone-100 p-5"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                <Icon className="size-5 text-amber-700" />
              </span>
              <span className="text-[15px] font-medium text-neutral-800">
                {t(key)}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
