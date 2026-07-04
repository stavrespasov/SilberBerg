import { useTranslations } from "next-intl";
import { MapPinIcon, PhoneIcon } from "@/components/icons";
import { ConfirmTag } from "@/components/ui/ConfirmTag";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Koper city centre — placeholder view until the client confirms the address.
const OSM_EMBED_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=13.7195%2C45.5405%2C13.7455%2C45.5525&layer=mapnik";

export function Location() {
  const t = useTranslations("location");

  return (
    <section className="bg-bone-100 px-6 py-20 text-ink-900 md:px-12 md:py-28">
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <ScrollReveal className="col-span-12 md:col-span-4">
          <SectionHeading
            eyebrow={t("eyebrow")}
            heading={t("heading")}
            tone="light"
          />
          <dl className="mt-10 flex flex-col gap-6">
            <div className="flex gap-4">
              <MapPinIcon className="mt-0.5 size-6 shrink-0 text-gold-700" />
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.18em] text-ink-600">
                  {t("addressLabel")}
                </dt>
                <dd className="mt-1">
                  {t("addressPlaceholder")}
                  <ConfirmTag />
                </dd>
              </div>
            </div>
            <div className="flex gap-4">
              <PhoneIcon className="mt-0.5 size-6 shrink-0 text-gold-700" />
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.18em] text-ink-600">
                  {t("phoneLabel")}
                </dt>
                <dd className="mt-1">
                  {t("phonePlaceholder")}
                  <ConfirmTag />
                </dd>
              </div>
            </div>
            <div className="flex gap-4">
              <span aria-hidden="true" className="w-6" />
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.18em] text-ink-600">
                  {t("hoursLabel")}
                </dt>
                <dd className="mt-1">
                  {t("hoursPlaceholder")}
                  <ConfirmTag />
                </dd>
              </div>
            </div>
          </dl>
        </ScrollReveal>
        <ScrollReveal
          delay={0.1}
          className="col-span-12 md:col-span-7 md:col-start-6"
        >
          <iframe
            src={OSM_EMBED_SRC}
            title={t("mapTitle")}
            loading="lazy"
            className="h-80 w-full border border-ink-900/20 md:h-[26rem]"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
