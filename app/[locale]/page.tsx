import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { faqPageJsonLd, localBusinessJsonLd } from "@/lib/structuredData";
import { Contact } from "@/components/sections/Contact";
import { Faq, faqKeys } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Location } from "@/components/sections/Location";
import { PricingTable } from "@/components/sections/PricingTable";
import { Trust } from "@/components/sections/Trust";
import { WhatWeBuy } from "@/components/sections/WhatWeBuy";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const tMeta = await getTranslations("meta");
  const tFaq = await getTranslations("faq");
  const jsonLd = [
    localBusinessJsonLd(locale, tMeta("description")),
    faqPageJsonLd(faqKeys.map(({ q, a }) => ({ q: tFaq(q), a: tFaq(a) }))),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD from our own message files — no user input. "<" is still
        // escaped so no future copy edit can terminate the script element.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main id="main">
        <Hero />
        <PricingTable />
        <HowItWorks />
        <WhatWeBuy />
        <Trust />
        <Location />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
