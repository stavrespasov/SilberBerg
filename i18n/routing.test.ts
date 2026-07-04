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
});
