import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
          {/* Quiet echo of the assay rail keeps the left column alive
              next to the tall form. Decorative. */}
          <ul
            aria-hidden="true"
            className="mt-12 hidden flex-col gap-3 font-mono text-xs tracking-[0.08em] text-dim tabular-nums lg:flex"
          >
            {["999,9", "916", "750", "585"].map((mark) => (
              <li key={mark} className="flex items-center gap-3">
                <span className="h-px w-6 bg-line" />
                {mark}
              </li>
            ))}
          </ul>
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
