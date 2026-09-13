import Image from "next/image";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/ContactForm";
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

          {/* The appraisal scale (OpenArt still) keeps the left column
              alive next to the form without recreating the removed price board. */}
          <div
            aria-hidden="true"
            className="relative mt-5 hidden aspect-[5/3] max-w-md overflow-hidden rounded-lg border border-line lg:block"
          >
            <Image
              src="/media/scale.jpg"
              alt=""
              fill
              sizes="(max-width: 1024px) 0px, 448px"
              quality={70}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            <p className="absolute bottom-4 left-5 flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-gold uppercase">
              <span className="h-px w-6 bg-gold/60" />
              {t("eyebrow")}
            </p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="engraved relative rounded-lg p-6 md:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
