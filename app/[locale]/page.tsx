import { setRequestLocale } from "next-intl/server";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
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
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
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
