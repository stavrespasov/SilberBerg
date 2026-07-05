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
    <section id="odkup" className="scroll-mt-24 px-4 py-6">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-stone-100 p-6 md:p-12">
        <Reveal>
          <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} />
        </Reveal>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.name}>
              <Reveal
                delay={(i % 3) * 80}
                className="h-full rounded-3xl bg-white p-6 shadow-sm"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-amber-50">
                  <item.icon className="size-5 text-amber-700" />
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {t(item.name)}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-600">
                  {t(item.desc)}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-neutral-600">
          {t("exclusionsNote")}
          <ConfirmTag />
        </p>
      </div>
    </section>
  );
}
