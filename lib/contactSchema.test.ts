import { describe, expect, it } from "vitest";
import { contactSchema } from "./contactSchema";

const valid = {
  name: "Ana Novak",
  email: "ana@example.com",
  phone: "",
  message: "Rada bi cenitev za zlato verižico, podedovano po babici.",
  category: "jewelry",
  website: "", // honeypot
  consent: true,
} as const;

describe("contactSchema", () => {
  it("accepts a complete valid submission", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("accepts phone-only contact (Slovenian formats)", () => {
    for (const phone of ["+386 40 123 456", "040 123 456", "+386(0)40123456"]) {
      const r = contactSchema.safeParse({ ...valid, email: "", phone });
      expect(r.success, phone).toBe(true);
    }
  });

  it("rejects submissions with neither email nor phone", () => {
    const r = contactSchema.safeParse({ ...valid, email: "", phone: "" });
    expect(r.success).toBe(false);
  });

  it("rejects malformed email", () => {
    expect(
      contactSchema.safeParse({ ...valid, email: "not-an-email" }).success,
    ).toBe(false);
  });

  it("rejects junk phone strings", () => {
    for (const phone of ["abc", "12", "call me maybe"]) {
      expect(
        contactSchema.safeParse({ ...valid, email: "", phone }).success,
        phone,
      ).toBe(false);
    }
  });

  it("rejects empty and whitespace-only names", () => {
    expect(contactSchema.safeParse({ ...valid, name: "" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, name: "   " }).success).toBe(
      false,
    );
  });

  it("accepts Slovenian diacritics and Unicode in text fields", () => {
    const r = contactSchema.safeParse({
      ...valid,
      name: "Živa Šušteršič",
      message: "Imam zlatnike — 3× cekin Franc Jožef, čisto ohranjeni.",
    });
    expect(r.success).toBe(true);
  });

  it("rejects messages that are too short or too long", () => {
    expect(
      contactSchema.safeParse({ ...valid, message: "kratko" }).success,
    ).toBe(false);
    expect(
      contactSchema.safeParse({ ...valid, message: "x".repeat(2001) }).success,
    ).toBe(false);
  });

  it("caps name length at 100 characters", () => {
    expect(
      contactSchema.safeParse({ ...valid, name: "a".repeat(101) }).success,
    ).toBe(false);
  });

  it("passes script content through as inert text (escaping is the renderer's job)", () => {
    const r = contactSchema.safeParse({
      ...valid,
      message: "<script>alert(1)</script> imam star nakit za cenitev",
    });
    expect(r.success).toBe(true);
  });

  it("rejects unknown categories but allows omission", () => {
    expect(
      contactSchema.safeParse({ ...valid, category: "yachts" }).success,
    ).toBe(false);
    expect(
      contactSchema.safeParse({ ...valid, category: undefined }).success,
    ).toBe(true);
  });

  it("rejects a filled honeypot field", () => {
    expect(
      contactSchema.safeParse({ ...valid, website: "spam.example" }).success,
    ).toBe(false);
  });

  it("requires explicit GDPR consent", () => {
    expect(contactSchema.safeParse({ ...valid, consent: false }).success).toBe(
      false,
    );
    expect(
      contactSchema.safeParse({ ...valid, consent: undefined }).success,
    ).toBe(false);
  });
});
