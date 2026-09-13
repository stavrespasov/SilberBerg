import { useTranslations } from "next-intl";
import { MapPinIcon, PhoneIcon, WatchIcon } from "@/components/icons";
import { ConfirmTag } from "@/components/ui/ConfirmTag";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT_PHONE } from "@/lib/siteConfig";

// Koper city centre — placeholder view until the client confirms the address.
const OSM_EMBED_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=13.7195%2C45.5405%2C13.7455%2C45.5525&layer=mapnik";
const OSM_LINK = "https://www.openstreetmap.org/#map=15/45.5469/13.7294";

const rows = [
  { icon: MapPinIcon, label: "addressLabel", value: "addressPlaceholder" },
  { icon: WatchIcon, label: "hoursLabel", value: "hoursPlaceholder" },
] as const;

const phoneHref = CONTACT_PHONE
  ? `tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`
  : undefined;

/** Address / hours / phone. Rendered twice: floating over the map on
 *  desktop, as its own engraved panel under the map on phones. */
function InfoCard() {
  const t = useTranslations("location");

  return (
    <>
      <dl className="flex flex-col gap-5">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label}>
            <dt className="flex items-center gap-3 font-mono text-[10px] tracking-[0.16em] text-smoke uppercase">
              <Icon className="size-4 shrink-0 text-gold" />
              {t(label)}
            </dt>
            <dd className="mt-1 pl-7 text-[15px] font-medium text-bone">
              {t(value)}
              <ConfirmTag />
            </dd>
          </div>
        ))}
        <div>
          <dt className="flex items-center gap-3 font-mono text-[10px] tracking-[0.16em] text-smoke uppercase">
            <PhoneIcon className="size-4 shrink-0 text-gold" />
            {t("phoneLabel")}
          </dt>
          <dd className="mt-1 pl-7 text-[15px] font-medium text-bone">
            {phoneHref ? (
              <a
                href={phoneHref}
                className="transition-colors duration-200 hover:text-gold-hi"
              >
                {CONTACT_PHONE}
              </a>
            ) : (
              <>
                {t("phonePlaceholder")} <ConfirmTag />
              </>
            )}
          </dd>
        </div>
      </dl>
      <a
        href={OSM_LINK}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-block text-sm font-medium text-gold transition-colors duration-200 hover:text-gold-hi"
      >
        {t("openMap")} ↗
      </a>
    </>
  );
}

export function Location() {
  const t = useTranslations("location");

  return (
    <section id="lokacija" className="scroll-mt-24 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal variant="blur">
          <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} />
        </Reveal>
        <Reveal
          variant="scale"
          className="group relative mt-12 overflow-hidden rounded-lg border border-line"
        >
          {/* OSM tiles are light; the invert/desaturate filter turns them
              into a night map without a tile-server dependency. The map is
              a picture, not a widget: pointer-events off so scrolling the
              page never zooms it — the link in the card opens the real
              thing. */}
          <iframe
            src={OSM_EMBED_SRC}
            title={t("mapTitle")}
            loading="lazy"
            tabIndex={-1}
            aria-hidden="true"
            className="pointer-events-none h-72 w-full [filter:invert(0.92)_hue-rotate(180deg)_saturate(0.25)_brightness(0.92)] transition-transform duration-700 ease-vault select-none group-hover:scale-[1.02] sm:h-105 md:h-130"
          />
          {/* Floating dark-glass card — desktop only. */}
          <div className="absolute left-8 bottom-8 hidden w-96 rounded-lg border border-line bg-ink/85 p-6 backdrop-blur-xl md:block">
            <InfoCard />
          </div>
        </Reveal>

        {/* On phones the card is its own panel with air around it. */}
        <Reveal delay={80} className="mt-4 md:hidden">
          <div className="engraved rounded-lg p-6">
            <InfoCard />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
