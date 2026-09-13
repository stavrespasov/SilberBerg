import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buyingCategories } from "@/lib/buying";
import { BuyingPhoto } from "@/components/BuyingPhoto";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhatWeBuy() {
  const t = useTranslations("buy");
  return (
    <section id="odkup" className="scroll-mt-24 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal variant="blur">
          <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} />
        </Reveal>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {buyingCategories.map(({ key, href, images, conditional }, index) => (
            <li key={key}>
              <Reveal delay={index * 90} className="h-full">
                <Link
                  href={href}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-coal transition-[border-color,transform] duration-300 ease-vault hover:-translate-y-1 hover:border-line-2"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink-2">
                    <BuyingPhoto
                      image={images[0]}
                      alt={t(`${key}.photos.${images[0].key}.alt`)}
                      sizes="(max-width: 768px) 94vw, (max-width: 1280px) 31vw, 370px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 lg:p-7">
                    <span
                      aria-hidden="true"
                      className="font-mono text-[11px] tracking-[0.18em] text-gold"
                    >
                      0{index + 1}
                    </span>
                    <h3 className="mt-3 font-display text-3xl leading-tight font-medium tracking-tight text-bone">
                      {t(`${key}.title`)}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-smoke">
                      {t(`${key}.preview`)}
                    </p>
                    {conditional && (
                      <p className="mt-5 border-l border-gold-deep pl-3 text-sm leading-relaxed text-gold-hi">
                        {t(`${key}.notice`)}
                      </p>
                    )}
                    <span className="mt-auto flex items-center justify-between gap-3 pt-7 text-sm font-medium text-bone group-hover:text-gold-hi">
                      {t("viewCategory")}
                      <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
