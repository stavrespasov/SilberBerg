import { describe, expect, it } from "vitest";
import { routing } from "./routing";
import sl from "../messages/sl.json";
import en from "../messages/en.json";

describe("i18n routing", () => {
  it("uses Slovenian as the default locale", () => {
    expect(routing.defaultLocale).toBe("sl");
  });

  it("serves Slovenian without a URL prefix for local SEO", () => {
    expect(routing.localePrefix).toBe("as-needed");
  });

  it("ships a message file for every configured locale", () => {
    const messagesByLocale: Record<string, unknown> = { sl, en };
    for (const locale of routing.locales) {
      expect(messagesByLocale[locale], `messages/${locale}.json`).toBeDefined();
    }
  });

  it("keeps message keys in sync across locales", () => {
    const keys = (obj: object, prefix = ""): string[] =>
      Object.entries(obj).flatMap(([k, v]) =>
        typeof v === "object" && v !== null
          ? keys(v, `${prefix}${k}.`)
          : [`${prefix}${k}`],
      );
    expect(keys(en).sort()).toEqual(keys(sl).sort());
  });

  it("communicates nationwide buying while keeping Koper as the shop location", () => {
    expect(sl.meta.description).toContain("po vsej Sloveniji");
    expect(en.meta.description).toContain("across Slovenia");
    expect(sl.hero.heading).toContain("po vsej Sloveniji");
    expect(en.hero.heading).toContain("across Slovenia");
    expect(sl.location.serviceArea).toBe(
      "Odkupujemo po vsej Sloveniji; poslovalnica je v Kopru.",
    );
    expect(en.location.serviceArea).toBe(
      "We buy across Slovenia; our shop is in Koper.",
    );

    for (const key of ["metals", "fur", "other"] as const) {
      expect(sl.buy[key].description).toContain("po vsej Sloveniji");
      expect(en.buy[key].description).toContain("across Slovenia");
    }

    expect(sl.how.step3Text).toContain("Povemo");
    expect(sl.how.step3Text).not.toContain("Poveme");
  });
});
