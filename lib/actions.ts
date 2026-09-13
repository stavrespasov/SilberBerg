"use server";

import { contactSchema } from "./contactSchema";
import { deliverLead } from "./leadTransport";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  /** Field-level error keys the form maps to translated messages. */
  fieldErrors?: Partial<
    Record<"name" | "contact" | "message" | "consent", true>
  >;
};

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name") ?? "",
    phone: formData.get("phone") ?? "",
    message: formData.get("message") ?? "",
    category: formData.get("category") || undefined,
    website: formData.get("website") ?? "",
    consent: formData.get("consent") === "on" ? true : undefined,
  });

  if (!parsed.success) {
    const fieldErrors: ContactFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (field === "name") fieldErrors.name = true;
      else if (field === "phone") {
        fieldErrors.contact = true;
      } else if (field === "message") fieldErrors.message = true;
      else if (field === "consent") fieldErrors.consent = true;
      // Anything else (honeypot "website", a manipulated "category") gets no
      // field error on purpose: the form shows a generic failure. Real users
      // can't trigger those paths through the UI.
    }
    return { status: "error", fieldErrors };
  }

  try {
    await deliverLead({
      name: parsed.data.name,
      phone: parsed.data.phone,
      message: parsed.data.message,
      category: parsed.data.category,
    });
  } catch (error) {
    console.error("contact submission delivery failed", { error });
    return { status: "error" };
  }

  return { status: "success" };
}
