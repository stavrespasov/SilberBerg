import { z } from "zod";

export const itemCategories = [
  "jewelry",
  "coins",
  "bars",
  "dental",
  "watches",
  "other",
] as const;

// Accepts Slovenian national (0xx ...) and international (+386 ...) forms:
// digits, spaces, parentheses and hyphens, 8–16 digits total.
const phonePattern = /^\+?[\d\s()/-]{7,20}$/;
const digitCount = (s: string) => (s.match(/\d/g) ?? []).length;

export const contactSchema = z
  .object({
    name: z.string().trim().min(1).max(100),
    phone: z
      .string()
      .trim()
      .refine(
        (v) =>
          phonePattern.test(v) && digitCount(v) >= 8 && digitCount(v) <= 15,
        { message: "invalid phone number" },
      ),
    message: z.string().trim().min(10).max(2000),
    category: z.enum(itemCategories).optional(),
    /** Honeypot — real visitors never fill this. */
    website: z.literal(""),
    /** GDPR: consent must be explicit, never defaulted. */
    consent: z.literal(true),
  });

export type ContactInput = z.infer<typeof contactSchema>;
