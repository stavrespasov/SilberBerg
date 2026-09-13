import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  buyingCategories,
  getBuyingCategory,
  type BuyingCategoryKey,
} from "@/lib/buying";
import { BuyingPhoto } from "@/components/BuyingPhoto";
import { BuyingGalleryCarousel } from "@/components/BuyingGalleryCarousel";
import { Reveal } from "@/components/Reveal";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";

export async function BuyingCategoryPage({
  categoryKey,
  params,
}: {
  categoryKey: BuyingCategoryKey;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("buy");
  const category = getBuyingCategory(categoryKey);
  const prefix = category.key;

  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Header />
      <main
        id="main"
        className="relative overflow-clip px-4 pt-28 pb-8 sm:px-6 md:pt-36"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-60 right-0 -z-0 h-[40rem] w-[40rem] rounded-full bg-gold/5 blur-[120px]"
        />
        <div className="relative mx-auto max-w-6xl">
          <nav
            aria-label={t("categoryNav")}
            className="flex flex-wrap gap-2 border-b border-line pb-7"
          >
            {buyingCategories.map(({ key, href }, index) => (
              <Link
                key={key}
                href={href}
                aria-current={key === categoryKey ? "page" : undefined}
                className={`inline-flex min-h-11 items-center gap-2.5 rounded-full border px-4 py-2 text-sm transition-colors duration-200 sm:px-5 ${key === categoryKey ? "border-gold-deep bg-gold/10 text-gold-hi" : "border-line text-smoke hover:border-line-2 hover:text-bone"}`}
              >
                <span aria-hidden="true" className="font-mono text-[10px]">
                  0{index + 1}
                </span>
                {t(`${key}.title`)}
              </Link>
            ))}
          </nav>

          <div className="py-10 md:py-14">
            <Link
              href="/#odkup"
              className="inline-flex min-h-8 items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-gold uppercase hover:text-gold-hi"
            >
              <span aria-hidden="true">←</span> {t("eyebrow")}
            </Link>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.06] font-medium tracking-tight text-bone sm:text-6xl md:text-7xl">
              {t(`${prefix}.title`)}
            </h1>
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <section aria-labelledby="buying-list-heading">
              <h2
                id="buying-list-heading"
                className="mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-gold uppercase"
              >
                <span aria-hidden="true" className="h-px w-6 bg-gold/60" />
                {t("weBuy")}
              </h2>
              <ul className="divide-y divide-line border-y border-line">
                {category.items.map((key) => (
                  <li
                    key={key}
                    className="flex items-start gap-4 py-4 text-base leading-relaxed text-bone sm:text-lg"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold/70"
                    />
                    {t(`${prefix}.items.${key}`)}
                  </li>
                ))}
              </ul>
              <Link
                href="/#kontakt"
                className="mt-8 inline-flex min-h-12 items-center gap-6 rounded-full bg-bone px-6 text-sm font-semibold text-ink transition-[background-color,transform] duration-300 ease-vault hover:-translate-y-0.5 hover:bg-gold"
              >
                {t("appraisal")}
                <span aria-hidden="true">↗</span>
              </Link>
            </section>

            {categoryKey === "fur" ? (
              <BuyingGalleryCarousel
                photos={category.images.map((photo) => ({
                  image: photo,
                  alt: t(`${prefix}.photos.${photo.key}.alt`),
                  caption: t(`${prefix}.photos.${photo.key}.caption`),
                }))}
                labels={{
                  studio: t("gallery.studio"),
                  outdoor: t("gallery.outdoor"),
                  pause: t("gallery.pause"),
                  resume: t("gallery.resume"),
                  description: t("gallery.description"),
                }}
              />
            ) : (
              <div className="grid min-w-0 grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5">
                {category.images.map((photo, index) => (
                  <Reveal key={photo.file} delay={(index % 2) * 90}>
                    <figure>
                      <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line bg-coal">
                        <BuyingPhoto
                          image={photo}
                          alt={t(`${prefix}.photos.${photo.key}.alt`)}
                          sizes="(max-width: 640px) 46vw, (max-width: 1024px) 46vw, 310px"
                          preload={index === 0}
                        />
                      </div>
                      <figcaption className="mt-3 text-sm leading-relaxed text-smoke">
                        {t(`${prefix}.photos.${photo.key}.caption`)}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            )}
          </div>

          <aside
            aria-labelledby="buying-notice-heading"
            className="engraved mt-12 rounded-lg border-l-2 border-gold-deep px-6 py-7 sm:px-9 md:mt-16"
          >
            <h2
              id="buying-notice-heading"
              className="mb-3 font-mono text-[11px] tracking-[0.16em] text-gold uppercase"
            >
              {t(`${prefix}.noticeHeading`)}
            </h2>
            <p className="max-w-4xl font-display text-2xl leading-snug font-medium text-bone sm:text-3xl">
              {t(`${prefix}.notice`)}
            </p>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
