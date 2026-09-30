import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getBuyingCategory } from "./buying";
import { localBusinessJsonLd } from "./structuredData";
import { CONTACT_PHONE_HREF, SITE_URL } from "./siteConfig";
import { routing } from "../i18n/routing";

describe("approved site content", () => {
  it("uses Patek on the homepage and the requested order within four gallery cards", () => {
    const category = getBuyingCategory("other");
    expect(category.cover?.key).toBe("patek");
    expect(category.images).toHaveLength(4);
    expect(category.images[0]?.sequence?.map(({ key }) => key)).toEqual([
      "rolex",
      "patek",
      "watch",
    ]);
    expect(category.images[1]?.sequence?.map(({ key }) => key)).toEqual([
      "louisVuitton",
      "handbag",
    ]);
    expect(category.images.slice(2).map(({ key }) => key)).toEqual([
      "camera",
      "sewing",
    ]);
  });

  it("ships every cover and gallery image as a public asset", () => {
    for (const key of ["metals", "fur", "other"] as const) {
      const category = getBuyingCategory(key);
      const sources = [
        category.cover?.src,
        ...category.images.flatMap((image) => [
          image.src,
          ...Object.values(image.variants ?? {}),
          ...(image.sequence?.map(({ src }) => src) ?? []),
        ]),
      ];
      for (const src of sources) {
        if (src)
          expect(existsSync(join(process.cwd(), "public", src)), src).toBe(
            true,
          );
      }
    }
  });

  it("publishes the confirmed telephone and languages without invented address or hours", () => {
    expect(CONTACT_PHONE_HREF).toBe("tel:+38630757533");
    for (const locale of routing.locales) {
      const business = localBusinessJsonLd(locale, "Description");
      expect(business.telephone).toBe("+38630757533");
      expect(business.knowsLanguage).toEqual(["sl", "it", "en"]);
      expect(business.url).toBe(
        locale === "sl" ? SITE_URL : `${SITE_URL}/${locale}`,
      );
      expect(business).not.toHaveProperty("address");
      expect(business).not.toHaveProperty("openingHours");
    }
  });
});
