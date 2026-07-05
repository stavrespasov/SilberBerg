"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitContact, type ContactFormState } from "@/lib/actions";
import { Link } from "@/i18n/navigation";
import { itemCategories } from "@/lib/contactSchema";

const initialState: ContactFormState = { status: "idle" };

const inputClass =
  "w-full rounded-md border border-line bg-ink-2 px-4 py-3 text-[15px] " +
  "text-bone placeholder:text-dim transition-colors duration-200 " +
  "focus:border-gold focus:bg-coal-2 focus:outline-none";

const labelClass =
  "mb-2 block font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-smoke";

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
        className="rounded-lg border border-gold-deep bg-gold/10 px-6 py-8 text-lg text-bone"
      >
        {t("success")}
      </p>
    );
  }

  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} noValidate className="flex flex-col gap-4">
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
          <p id="error-name" className="mt-1.5 text-sm text-red-400">
            {t("errorName")}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
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
      <p id="contact-hint" className="-mt-2 text-sm text-smoke">
        {t("contactHint")}
      </p>
      {errors.contact && (
        <p id="error-contact" className="-mt-2 text-sm text-red-400">
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
          className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23a09a8c%22 stroke-width=%221.5%22%3E%3Cpath d=%22m6 9.5 6 6 6-6%22/%3E%3C/svg%3E')] bg-[length:1.25rem] bg-[right_0.9rem_center] bg-no-repeat pr-11`}
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
          rows={4}
          required
          minLength={10}
          maxLength={2000}
          placeholder={t("messagePlaceholder")}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "error-message" : undefined}
          className={inputClass}
        />
        {errors.message && (
          <p id="error-message" className="mt-1.5 text-sm text-red-400">
            {t("errorMessage")}
          </p>
        )}
      </div>

      {/* Honeypot — visually hidden, skipped by keyboard and screen readers. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 overflow-hidden"
      >
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
        <label className="flex cursor-pointer items-start gap-3 text-sm text-smoke">
          <input
            type="checkbox"
            name="consent"
            required
            aria-invalid={errors.consent ? true : undefined}
            className="mt-0.5 size-4 accent-gold"
          />
          <span>
            {t.rich("consentLabel", {
              link: (chunks) => (
                <Link
                  href="/zasebnost"
                  className="font-medium text-bone underline decoration-gold-deep underline-offset-2 transition-colors duration-200 hover:decoration-gold"
                >
                  {chunks}
                </Link>
              ),
            })}
          </span>
        </label>
        {errors.consent && (
          <p className="mt-1.5 text-sm text-red-400">{t("errorConsent")}</p>
        )}
      </div>

      {state.status === "error" && Object.keys(errors).length === 0 && (
        <p role="alert" className="text-sm text-red-400">
          {t("errorGeneric")}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full bg-bone px-7 text-[15px] font-semibold text-ink transition-[background-color,transform] duration-300 ease-vault hover:bg-gold hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
