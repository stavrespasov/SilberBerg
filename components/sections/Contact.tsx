import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="kontakt" className="scroll-mt-24 px-4 py-6">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-stone-100 p-6 md:p-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal variant="blur">
            <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} />
            <p className="mt-4 max-w-md leading-relaxed text-neutral-600">
              {t("lead")}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="relative rounded-3xl bg-white p-6 shadow-sm md:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
