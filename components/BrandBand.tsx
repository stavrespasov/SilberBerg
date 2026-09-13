import { useTranslations } from "next-intl";

/**
 * A quiet brand rail under the hero. It keeps the visual rhythm of the old
 * ticker without exposing rates or adding another moving element.
 */
export function BrandBand() {
  const t = useTranslations("brandBand");

  return (
    <section aria-label={t("label")} className="border-y border-line bg-ink-2/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-5 sm:flex-row sm:justify-between sm:gap-6">
        <p className="font-display text-2xl font-medium tracking-[0.12em] text-bone uppercase">
          {t("wordmark")}
        </p>
        <div className="flex w-full items-center justify-center gap-3 sm:w-auto sm:justify-end sm:gap-4">
          <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
          <p className="font-mono text-[11px] tracking-[0.18em] text-gold uppercase">
            {t("offer")}
          </p>
          <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
          <p className="font-mono text-[11px] tracking-[0.18em] text-smoke uppercase">
            {t("location")}
          </p>
        </div>
      </div>
    </section>
  );
}
