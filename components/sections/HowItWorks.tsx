import { useTranslations } from "next-intl";
import { ConfirmTag } from "@/components/ui/ConfirmTag";
import { ProcessScene } from "@/components/ProcessScene";

export function HowItWorks() {
  const t = useTranslations("how");

  return (
    <section id="postopek" className="scroll-mt-24 px-4 py-16 md:py-0">
      <ProcessScene />
      <p className="mx-auto mt-6 max-w-6xl pb-4 text-sm text-smoke md:mt-0 md:pb-16">
        {t("mailinNote")}
        <ConfirmTag />
      </p>
    </section>
  );
}
