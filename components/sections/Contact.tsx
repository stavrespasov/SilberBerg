import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { PhoneIcon } from "@/components/icons";
import { ConfirmTag } from "@/components/ui/ConfirmTag";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT_PHONE } from "@/lib/siteConfig";

const phoneHref = CONTACT_PHONE
  ? `tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`
  : undefined;

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="kontakt" className="scroll-mt-24 px-4 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <Reveal variant="blur">
          <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} />
          <p className="mt-5 max-w-md leading-relaxed text-smoke">
            {t("lead")}
          </p>
          <div className="engraved mt-8 max-w-md rounded-lg border border-gold-deep/70 p-5 md:p-6">
            <p className="flex items-center gap-3 font-mono text-[10px] tracking-[0.18em] text-gold uppercase">
              <PhoneIcon className="size-4" />
              {t("phoneLabel")}
            </p>
            {phoneHref ? (
              <a
                href={phoneHref}
                className="mt-4 block font-display text-3xl font-medium tracking-tight text-bone transition-colors duration-200 hover:text-gold-hi"
              >
                {CONTACT_PHONE}
              </a>
            ) : (
              <p className="mt-4 font-display text-2xl font-medium tracking-tight text-bone">
                {t("phonePending")} <ConfirmTag />
              </p>
            )}
            <p className="mt-3 text-sm leading-relaxed text-smoke">
              {t("phoneCtaText")}
            </p>
          </div>

        </Reveal>
        <Reveal delay={100}>
          <div className="relative min-h-full overflow-hidden rounded-lg border border-line bg-coal">
            <Image
              src="/media/scale.jpg"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 576px"
              quality={75}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/10" />
            <div className="relative flex min-h-[24rem] flex-col justify-end p-6 md:min-h-[30rem] md:p-8">
              <p className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-gold uppercase">
                <span className="h-px w-6 bg-gold/60" />
                {t("eyebrow")}
              </p>
              <p className="mt-3 max-w-sm font-display text-3xl leading-tight text-bone md:text-4xl">
                {t("phoneCtaText")}
              </p>
              {phoneHref ? (
                <a
                  href={phoneHref}
                  className="mt-6 inline-flex min-h-11 w-fit items-center rounded-full bg-bone px-5 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-gold"
                >
                  {t("callAction")} ↗
                </a>
              ) : (
                <p className="mt-6 text-sm text-smoke">
                  {t("phonePending")} <ConfirmTag />
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
