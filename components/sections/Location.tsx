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
    <section id="lokacija" className="scroll-mt-24 px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} />
        </Reveal>
        <Reveal className="relative mt-10 overflow-hidden rounded-[2rem] border border-black/5">
          <iframe
            src={OSM_EMBED_SRC}
            title={t("mapTitle")}
            loading="lazy"
            className="h-105 w-full grayscale-[0.85] md:h-130"
          />
          {/* Info card floating over the map, Apple-Maps style */}
          <div className="pointer-events-none absolute inset-x-4 bottom-4 md:inset-x-auto md:left-8 md:bottom-8 md:w-96">
            <div className="pointer-events-auto rounded-3xl bg-white/90 p-6 shadow-lg backdrop-blur-xl">
              <dl className="flex flex-col gap-4">
                {rows.map(({ icon: Icon, label, value }) => (
                  <div key={label}>
                    <dt className="flex items-center gap-3 text-xs font-medium text-neutral-600">
                      <Icon className="size-5 shrink-0 text-amber-700" />
                      {t(label)}
                    </dt>
                    <dd className="mt-0.5 pl-8 text-[15px] font-medium">
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
                className="mt-4 inline-block text-sm font-medium text-amber-800 hover:underline"
              >
                {t("openMap")}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
