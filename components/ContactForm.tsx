"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitContact, type ContactFormState } from "@/lib/actions";
import { Link } from "@/i18n/navigation";
import { itemCategories } from "@/lib/contactSchema";

const initialState: ContactFormState = { status: "idle" };

const inputClass =
  "w-full border border-ink-900/55 bg-bone-50 px-4 py-3 text-ink-900 " +
  "placeholder:text-ink-600/50 transition-colors duration-200 " +
  "focus:border-gold-600 focus:outline-none";

const labelClass =
  "mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-ink-700";

const categoryKey = {
  jewelry: "categoryJewelry",
  coins: "categoryCoins",
  bars: "categoryBars",
  dental: "categoryDental",
  watches: "categoryWatches",
  other: "categoryOther",
} as const;

export function ContactForm() {
  const t = useTranslations("contact");
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );

  if (state.status === "success") {
    return (
      <p
        role="status"
        className="border border-gold-600/40 bg-gold-500/10 px-6 py-8 text-lg text-ink-900"
      >
        {t("success")}
      </p>
    );
  }

  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          {t("nameLabel")}
        </label>
        <input
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          maxLength={100}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "error-name" : undefined}
          className={inputClass}
        />
        {errors.name && (
          <p id="error-name" className="mt-1.5 text-sm text-red-800">
            {t("errorName")}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            {t("emailLabel")}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.contact ? true : undefined}
            aria-describedby={
              errors.contact ? "contact-hint error-contact" : "contact-hint"
            }
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelClass}>
            {t("phoneLabel")}
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={errors.contact ? true : undefined}
            aria-describedby={
              errors.contact ? "contact-hint error-contact" : "contact-hint"
            }
            className={inputClass}
          />
        </div>
      </div>
      <p id="contact-hint" className="-mt-3 text-sm text-ink-600">
        {t("contactHint")}
      </p>
      {errors.contact && (
        <p id="error-contact" className="-mt-3 text-sm text-red-800">
          {t("errorContact")}
        </p>
      )}

      <div>
        <label htmlFor="contact-category" className={labelClass}>
          {t("categoryLabel")}
        </label>
        <select
          id="contact-category"
          name="category"
          defaultValue=""
          className={inputClass}
        >
          <option value="">{t("categoryPlaceholder")}</option>
          {itemCategories.map((c) => (
            <option key={c} value={c}>
              {t(categoryKey[c])}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          {t("messageLabel")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={2000}
          placeholder={t("messagePlaceholder")}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "error-message" : undefined}
          className={inputClass}
        />
        {errors.message && (
          <p id="error-message" className="mt-1.5 text-sm text-red-800">
            {t("errorMessage")}
          </p>
        )}
      </div>

      {/* Honeypot — visually hidden, skipped by keyboard and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-700">
          <input
            type="checkbox"
            name="consent"
            required
            aria-invalid={errors.consent ? true : undefined}
            className="mt-0.5 size-4 accent-gold-600"
          />
          <span>
            {t.rich("consentLabel", {
              link: (chunks) => (
                <Link
                  href="/zasebnost"
                  className="underline decoration-gold-600 underline-offset-2 hover:text-ink-900"
                >
                  {chunks}
                </Link>
              ),
            })}
          </span>
        </label>
        {errors.consent && (
          <p className="mt-1.5 text-sm text-red-800">{t("errorConsent")}</p>
        )}
      </div>

      {state.status === "error" && Object.keys(errors).length === 0 && (
        <p role="alert" className="text-sm text-red-800">
          {t("errorGeneric")}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 cursor-pointer items-center justify-center bg-ink-900 px-8 py-3 text-sm font-medium uppercase tracking-[0.18em] text-bone-100 transition-colors duration-200 hover:bg-ink-700 disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
