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
import { ScrollReveal } from "@/components/ui/ScrollReveal";
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
    <section className="bg-bone-100 px-6 py-20 text-ink-900 md:px-12 md:py-28">
      <ScrollReveal>
        <SectionHeading
          eyebrow={t("eyebrow")}
          heading={t("heading")}
          tone="light"
        />
      </ScrollReveal>
      <ul className="mt-14 grid gap-x-12 md:grid-cols-2">
        {items.map((item, i) => (
          <li key={item.name}>
            <ScrollReveal
              delay={(i % 2) * 0.08}
              className="flex gap-5 border-t border-ink-900/15 py-6"
            >
              <item.icon className="mt-1 size-8 shrink-0 text-gold-700" />
              <div>
                <h3 className="font-display text-xl">{t(item.name)}</h3>
                <p className="mt-1.5 leading-relaxed text-ink-700">
                  {t(item.desc)}
                </p>
              </div>
            </ScrollReveal>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-sm text-ink-600">
        {t("exclusionsNote")}
        <ConfirmTag />
      </p>
    </section>
  );
}
