import { useTranslations } from "next-intl";
import { MapPinIcon, PhoneIcon, WatchIcon } from "@/components/icons";
import { ConfirmTag } from "@/components/ui/ConfirmTag";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Koper city centre — placeholder view until the client confirms the address.
const OSM_EMBED_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=13.7195%2C45.5405%2C13.7455%2C45.5525&layer=mapnik";
const OSM_LINK = "https://www.openstreetmap.org/#map=15/45.5469/13.7294";

const rows = [
  { icon: MapPinIcon, label: "addressLabel", value: "addressPlaceholder" },
  { icon: WatchIcon, label: "hoursLabel", value: "hoursPlaceholder" },
  { icon: PhoneIcon, label: "phoneLabel", value: "phonePlaceholder" },
] as const;

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
              into a night map without a tile-server dependency. */}
          <iframe
            src={OSM_EMBED_SRC}
            title={t("mapTitle")}
            loading="lazy"
            className="h-105 w-full [filter:invert(0.92)_hue-rotate(180deg)_saturate(0.25)_brightness(0.92)] transition-transform duration-700 ease-vault group-hover:scale-[1.02] md:h-130"
          />
          {/* Info card floating over the map — dark glass, hairline edge. */}
          <div className="pointer-events-none absolute inset-x-4 bottom-4 md:inset-x-auto md:left-8 md:bottom-8 md:w-96">
            <div className="pointer-events-auto rounded-lg border border-line bg-ink/85 p-6 backdrop-blur-xl">
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
              </dl>
              <a
                href={OSM_LINK}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block text-sm font-medium text-gold transition-colors duration-200 hover:text-gold-hi"
              >
                {t("openMap")} ↗
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
