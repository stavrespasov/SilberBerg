import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

/**
 * The client-facing "10x proposition" deck, served as part of the product
 * it argues for. Slovenian only by design (internal sales artifact), not
 * indexed, printable to PDF. Content mirrors the approved outline and the
 * verified competitive research — no invented facts.
 */
export const metadata: Metadata = {
  title: "Silberberg — predlog za potrditev 2. faze",
  robots: { index: false, follow: false },
};

const LIVE_URL = "silberberg.vercel.app";
const CONTACT = "stavrespasov5@gmail.com";

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-medium text-amber-800">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-amber-600" />
      {children}
    </p>
  );
}

function Slide({
  n,
  children,
  tone = "white",
}: {
  n: string;
  children: React.ReactNode;
  tone?: "white" | "stone";
}) {
  return (
    <section
      className={`slide relative flex min-h-svh snap-start flex-col justify-center px-6 py-16 md:px-16 ${
        tone === "stone" ? "bg-stone-100" : "bg-white"
      }`}
    >
      <span className="absolute top-8 right-8 font-mono text-sm text-neutral-400">
        {n} / 07
      </span>
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">
        {children}
      </p>
    </div>
  );
}

export default async function PredlogPage({
  params,
}: PageProps<"/[locale]/predlog">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="snap-y snap-proximity">
      {/* 1 — Cover */}
      <Slide n="01">
        <div className="text-center">
          <Kicker>Predlog · julij 2026</Kicker>
          <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-semibold tracking-tighter text-balance md:text-7xl">
            Silberberg — nova digitalna prisotnost
          </h1>
          <p className="mt-6 text-lg text-neutral-600 md:text-xl">
            Predstavitev za potrditev 2. faze
          </p>
          <p className="mt-10 font-mono text-sm text-neutral-500">
            {LIVE_URL}
          </p>
        </div>
      </Slide>

      {/* 2 — Izhodišče */}
      <Slide n="02" tone="stone">
        <p className="text-sm font-medium text-amber-700">Izhodišče</p>
        <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Danes vas kupec ne najde
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            "Silberberg nima spletne strani, profilov ali vpisov v imenike.",
            "Vsak, ki išče »odkup zlata Koper«, pristane pri konkurenci.",
            "Odločitev o prodaji zlata se začne s telefonom v roki — mobilni splet je prva vitrina.",
          ].map((x) => (
            <li
              key={x}
              className="rounded-3xl bg-white p-6 text-[17px] leading-relaxed text-neutral-700 shadow-sm"
            >
              {x}
            </li>
          ))}
        </ul>
      </Slide>

      {/* 3 — Kaj je že zgrajeno */}
      <Slide n="03">
        <p className="text-sm font-medium text-amber-700">1. faza — končana</p>
        <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Živa stran, pripravljena na predstavitev
        </h2>
        <ul className="mt-10 grid gap-x-10 gap-y-4 text-[17px] leading-relaxed text-neutral-700 md:grid-cols-2">
          <li>— Dvojezično: slovensko na korenu, angleško na /en; italijanščina pripravljena na vklop</li>
          <li>— Okvirni cenik po čistinah, postopek v štirih korakih, FAQ, obrazec z GDPR soglasjem</li>
          <li>— Dostopnost brez napak (WCAG 2.1 AA, axe-core) in takojšnje nalaganje (statične strani)</li>
          <li>— Strukturirani podatki LocalBusiness + FAQ že oddajajo signale Googlu</li>
        </ul>
        <p className="mt-10 inline-flex items-center gap-3 rounded-full bg-neutral-900 px-6 py-3 font-mono text-sm text-white">
          Demo v živo → {LIVE_URL}
        </p>
      </Slide>

      {/* 4 — Konkurenca */}
      <Slide n="04" tone="stone">
        <p className="text-sm font-medium text-amber-700">Konkurenca</p>
        <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Kje je prostor
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Card title="GOLD Store">
            Agencijsko izdelana stran, dnevne cene, 5 jezikov, 11 poslovalnic —
            a korporativno in brezosebno, brez lokalne zgodbe.
          </Card>
          <Card title="Edisongold (Koper)">
            Uveljavljen lokalni ponudnik, a zastarela statična enostranska
            stran.
          </Card>
          <Card title="Odkup-zlata.net">
            Samo poštno poslovanje — brez lokalnega zaupanja in osebnega stika.
          </Card>
        </div>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-neutral-700">
          Prazen prostor na trgu: <strong>butično osebno zaupanje</strong> +{" "}
          <strong>vrhunska digitalna izvedba</strong>. Točno tam stoji
          Silberberg.
        </p>
      </Slide>

      {/* 5 — SEO */}
      <Slide n="05">
        <p className="text-sm font-medium text-amber-700">Lokalni SEO</p>
        <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          »Odkup zlata Koper«
        </h2>
        <ul className="mt-10 grid gap-x-10 gap-y-4 text-[17px] leading-relaxed text-neutral-700 md:grid-cols-2">
          <li>— Domena silberberg.si je prosta (registracija prek ARNES registrarja)</li>
          <li>— Hreflang, sitemap in strukturirani podatki so že aktivni</li>
          <li>— Statične strani se naložijo takoj — Google to nagradi</li>
          <li>— Ključne besede: odkup zlata Koper, odkup srebra, cenitev zlata</li>
        </ul>
      </Slide>

      {/* 6 — Faza 2 */}
      <Slide n="06" tone="stone">
        <p className="text-sm font-medium text-amber-700">2. faza</p>
        <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Orodja za vsakdanje delo
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card title="Cene brez razvijalca">
            Cene posodobite sami — sprememba je vidna takoj.
          </Card>
          <Card title="Urejen predal povpraševanj">
            Povpraševanja in naročila na cenitev na enem mestu, ne po e-pošti.
          </Card>
          <Card title="Evidenca odkupov">
            Zasnovana za zakonske zahteve — identifikacija strank in revizijska
            sled.
          </Card>
          <Card title="Vloge za osebje">
            Kdo lahko vidi poročila in kdo samo vnaša.
          </Card>
          <Card title="Poročila">
            Dnevni in mesečni pregledi za računovodstvo.
          </Card>
          <Card title="Varnostne kopije">
            Samodejno in preverljivo — podatki nikoli ne izginejo.
          </Card>
        </div>
      </Slide>

      {/* 7 — Naslednji korak */}
      <Slide n="07">
        <div className="text-center">
          <Kicker>Naslednji korak</Kicker>
          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tighter text-balance md:text-6xl">
            Potrdite 2. fazo ali rezervirajte termin za pogovor
          </h2>
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 text-left md:grid-cols-3">
            <Card title="1. faza">Končana — živa stran čaka le še vaše podatke.</Card>
            <Card title="2. faza">Po potrditvi, po mejnikih: najprej cene in povpraševanja.</Card>
            <Card title="Investicija">Uskladimo na sestanku. [USKLADITI S STRANKO]</Card>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${CONTACT}`}
              className="inline-flex min-h-12 items-center rounded-full bg-neutral-900 px-7 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-neutral-700"
            >
              {CONTACT}
            </a>
            <span className="font-mono text-sm text-neutral-500">
              {LIVE_URL}
            </span>
          </div>
        </div>
      </Slide>
    </main>
  );
}
