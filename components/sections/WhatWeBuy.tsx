import { useTranslations } from "next-intl";
import type { ComponentType, SVGProps } from "react";
import {
  CoinIcon,
  DentalIcon,
  HallmarkIcon,
  IngotIcon,
  RingIcon,
  WatchIcon,
} from "@/components/icons";
import { ConfirmTag } from "@/components/ui/ConfirmTag";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Item = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  name: string;
  desc: string;
};

const items: readonly Item[] = [
  { icon: RingIcon, name: "jewelryName", desc: "jewelryDesc" },
  { icon: CoinIcon, name: "coinsName", desc: "coinsDesc" },
  { icon: IngotIcon, name: "barsName", desc: "barsDesc" },
  { icon: DentalIcon, name: "dentalName", desc: "dentalDesc" },
  { icon: WatchIcon, name: "watchesName", desc: "watchesDesc" },
  { icon: HallmarkIcon, name: "scrapName", desc: "scrapDesc" },
];

export function WhatWeBuy() {
  const t = useTranslations("buy");

  return (
    <section id="odkup" className="scroll-mt-24 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal variant="blur">
          <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} />
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.name}>
              <Reveal
                delay={(i % 3) * 90}
                variant="scale"
                className="sheen sheen-soft group h-full rounded-lg border border-line bg-coal p-7 transition-[border-color,transform] duration-300 ease-vault hover:-translate-y-1 hover:border-line-2"
              >
                <item.icon className="size-6 text-gold transition-transform duration-300 ease-vault group-hover:scale-110 group-hover:-rotate-3" />
                <h3 className="mt-5 font-display text-2xl font-medium tracking-tight text-bone">
                  {t(item.name)}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-smoke">
                  {t(item.desc)}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-9 text-sm text-smoke">
          {t("exclusionsNote")}
          <ConfirmTag />
        </p>
      </div>
    </section>
  );
}
