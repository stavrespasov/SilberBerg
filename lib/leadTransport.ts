import type { ContactInput } from "./contactSchema";

export type Lead = Pick<
  ContactInput,
  "name" | "phone" | "message" | "category"
>;

export type DeliveryResult = {
  transport: "resend" | "log";
};

/**
 * Delivers a validated lead to the business.
 *
 * - With RESEND_API_KEY + CONTACT_INBOX set, the lead is emailed via Resend.
 * - Without them (local dev and the client-preview deployment, where no
 *   destination inbox exists yet), the lead is written as a structured
 *   server log line — retrievable from Vercel runtime logs, never silently
 *   dropped. This fallback is a deliberate preview-phase decision; the env
 *   vars flip it to email with no code change.
 */
export async function deliverLead(lead: Lead): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.CONTACT_INBOX;

  if (!apiKey || !inbox) {
    console.info("[lead]", JSON.stringify(lead));
    return { transport: "log" };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Resend's shared onboarding sender works before the client's own
      // domain is verified; swap to a branded sender at launch.
      from: "Silberberg <onboarding@resend.dev>",
      to: [inbox],
      subject: `Povpraševanje: ${lead.name}`,
      text: [
        `Ime: ${lead.name}`,
        `Telefon: ${lead.phone || "—"}`,
        `Kategorija: ${lead.category ?? "—"}`,
        "",
        lead.message,
      ].join("\n"),
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(
      `lead delivery failed: Resend responded ${response.status}`,
    );
  }

  return { transport: "resend" };
}
