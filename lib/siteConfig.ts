/**
 * Canonical site origin. NEXT_PUBLIC_SITE_URL is set per environment on
 * Vercel; the fallback keeps local builds working. The production domain
 * is a client decision (see the .si domain check in the launch notes).
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE_NAME = "Silberberg";

/** Client-confirmed public contact number. */
export const CONTACT_PHONE = "+386 30 757 533";
export const CONTACT_PHONE_HREF = `tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`;
