import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/ContactForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section
      id="kontakt"
      className="bg-bone-100 px-6 py-20 text-ink-900 md:px-12 md:py-28"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <ScrollReveal className="col-span-12 md:col-span-4">
          <SectionHeading
            eyebrow={t("eyebrow")}
            heading={t("heading")}
            tone="light"
          />
          <p className="mt-6 max-w-md leading-relaxed text-ink-700">
            {t("lead")}
          </p>
        </ScrollReveal>
        <ScrollReveal
          delay={0.1}
          className="relative col-span-12 md:col-span-7 md:col-start-6"
        >
          <ContactForm />
        </ScrollReveal>
      </div>
    </section>
  );
}
