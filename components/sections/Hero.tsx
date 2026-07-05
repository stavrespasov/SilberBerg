import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { BanknoteIcon, ScaleIcon, ShieldIcon } from "@/components/icons";
import { PillLink } from "@/components/ui/PillLink";

const points = [
  { icon: ScaleIcon, key: "point2" },
  { icon: BanknoteIcon, key: "point3" },
  { icon: ShieldIcon, key: "point1" },
] as const;

const rise = (ms: number) => ({ "--rise": `${ms}ms` }) as CSSProperties;

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="vrh"
      className="relative overflow-hidden px-4 pt-36 pb-6 text-center md:pt-44"
    >
      {/* Ambient light — two slow warm glows behind the headline */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="glow-a absolute top-16 left-1/2 h-[26rem] w-[38rem] -translate-x-[70%] rounded-full bg-amber-100/70 blur-3xl" />
        <div className="glow-b absolute top-40 left-1/2 h-[22rem] w-[32rem] -translate-x-[15%] rounded-full bg-stone-200/80 blur-3xl" />
      </div>

      <div className="rise" style={rise(0)}>
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-medium text-amber-800">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-amber-600"
          />
          {t("eyebrow")}
        </p>
      </div>
      <h1
        className="rise mx-auto mt-6 max-w-3xl text-5xl font-semibold tracking-tighter text-balance md:text-7xl"
        style={rise(120)}
      >
        {t("heading")}
      </h1>
      <p
        className="rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-neutral-600 md:text-xl"
        style={rise(240)}
      >
        {t("sub")}
      </p>
      <div
        className="rise mt-9 flex flex-wrap items-center justify-center gap-3"
        style={rise(360)}
      >
        <PillLink href="#kontakt">{t("ctaPrimary")}</PillLink>
        <PillLink href="#cene" variant="light">
          {t("ctaSecondary")}
        </PillLink>
      </div>

      <div className="rise mx-auto mt-16 max-w-5xl" style={rise(500)}>
        <ul className="grid gap-3 text-left sm:grid-cols-3">
          {points.map(({ icon: Icon, key }) => (
            <li
              key={key}
              className="group flex items-center gap-4 rounded-2xl bg-stone-100 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-200"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                <Icon className="size-5 text-amber-700" />
              </span>
              <span className="text-[15px] font-medium text-neutral-800">
                {t(key)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
