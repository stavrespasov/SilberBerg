# Silberberg — Launch Notes

Working checklist for taking the preview to production. Companion to `docs/design-system.md`.

## Environment variables (Vercel → Project Settings)

| Var | Purpose | State |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap, JSON-LD | Set to preview URL now; switch to production domain at launch |
| `RESEND_API_KEY` | Email delivery of contact-form leads | **Unset by design.** Until set, leads are written as structured `[lead]` lines in Vercel runtime logs (never dropped) |
| `CONTACT_INBOX` | Destination inbox for leads | Client must supply — see open questions |

## Deliberate decisions

- **No cookie banner.** The site sets no tracking cookies; the only cookie is next-intl's
  functional language preference (exempt under ePrivacy as strictly necessary/preference).
  Disclosed on the privacy page. Vercel Analytics is cookieless and aggregate-only.
  If any marketing/tracking script is ever added, a consent banner becomes mandatory.
- **No public price display.** The client requested that the homepage avoid
  published rates; visitors are directed to an appraisal and phone contact instead.
- **JSON-LD carries only true facts** — no address/phone/hours in structured data until
  the client confirms them.
- **`/` always serves Slovenian** (`localeDetection: false`) for local SEO; language
  switching is explicit.

## Before launch (blockers)

- [ ] Replace every `[CONFIRM WITH CLIENT]` tag — grep `CONFIRM WITH CLIENT` must return
      only `ConfirmTag.tsx` itself
- [ ] Client confirms the public phone number in `lib/siteConfig.ts`
- [ ] Legal entity, reg. number, VAT ID in footer; controller + retention in privacy policy
- [ ] Address/hours/phone in Location section **and** then add them to LocalBusiness JSON-LD
- [ ] `RESEND_API_KEY` + `CONTACT_INBOX` set; branded sender domain verified in Resend
- [ ] `.si` domain registered (ARNES-accredited registrar; see 1D check) and
      `NEXT_PUBLIC_SITE_URL` updated
- [ ] Confirm mail-in offer (HowItWorks note) and category exclusions (WhatWeBuy note)
- [ ] Decide Italian locale (one-line change in `i18n/routing.ts` + `messages/it.json`)

## Audit status

- **WCAG 2.1 AA — PASS (2026-07-04).** axe-core 4.10.2 (wcag2a/aa + wcag21a/aa rulesets):
  0 violations on `/`, `/en`, `/zasebnost` after fixes (list/dl structure under
  ScrollReveal, gold-800 for small text on bone, solid ConfirmTag chip, 55% input
  borders, surface-aware focus ring, skip link). Manual checks: keyboard-only
  navigation, native `<details>` FAQ, honeypot hidden from AT.
- **Contact flow — verified end-to-end (2026-07-04):** submit → zod validation →
  structured `[lead]` log line → translated success status.
- Core Web Vitals: fully static prerender (9/9 pages SSG), self-hosted fonts via
  next/font, no render-blocking third parties — re-check PageSpeed once the URL is public.

## Deployment (2026-07-04)

- Preview deployed and verified: `silberberg-3xi2x001k-stavrespasovs-projects.vercel.app`
  (behind Vercel preview protection; 23-hour share links available on demand).
- **Client-URL decision needed:** either promote to production → public stable
  `silberberg.vercel.app`, or disable preview deployment protection in project
  settings. The proposition deck should carry whichever becomes the durable URL.

## Domain check (2026-07-04, via Vercel registrar API)

| Domain | Status |
|---|---|
| **silberberg.si** | **Available** — .si not sold by Vercel; register via an ARNES-accredited registrar |
| silberberg-koper.si / odkup-zlata-koper.si | Available (same ARNES route; keyword domain useful as redirect) |
| silberberg.eu / silberberg.com | Taken |
| silberberg.gold | Available, $9.99/yr (novelty; not recommended as primary) |
