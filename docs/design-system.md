# Silberberg design system — v4 "Midnight Vault"

The site is a lit stage, not a colored theme: one warm light source over
near-black, materials that behave like metal, and motion that tells one
story as the visitor descends the page. Deviations need a reason.

v3 "Clean Counter" (white minimalism) is retired. The /predlog deck still
renders light on purpose — it prints.

## Tokens (`app/globals.css` → `@theme`)

| Token | Value | Role |
|---|---|---|
| `ink` | `#0B0B0D` | page ground — the stage |
| `ink-2` | `#101013` | raised ground (brand rail, boards) |
| `coal` | `#16161A` | panels, cards |
| `coal-2` | `#1C1C21` | hover/active surfaces |
| `line` | `#26262C` | hairline borders |
| `line-2` | `#3A3A41` | hover borders |
| `bone` | `#F2EFE6` | primary type |
| `smoke` | `#A09A8C` | secondary type (AA on ink) |
| `dim` | `#6D685E` | decorative only — fails AA for body text |
| `gold` | `#E2B54B` | the one bold spend |
| `gold-hi` | `#F6E3AC` | gradient highlight, hover type |
| `gold-deep` | `#8A6117` | gradient shadow, quiet gold borders |
| `silver` | `#AEB4BD` | secondary accent, cold |

`--grad-gold` (root custom property) drives `.gild-border` and the
scroll-progress needle — non-interactive metalwork only. **Buttons are
solid fills** (bone → solid gold on hover), no gradients — client
direction, v4.1. Easing: `--ease-vault` = `cubic-bezier(0.16, 1, 0.3, 1)`
(`ease-vault` utility).

## Typography

- **Display — Boska 500/700** (`font-display`, self-hosted woff2 in
  `app/fonts/`, Fontshare/ITF licence). Every `h1/h2/h3`, the wordmark.
- **Body — Geist** (`font-sans`). Unchanged from v3; carried over.
- **Data — Geist Mono** (`font-mono`). Every number: hallmarks, eyebrows, form
  labels. Always `tabular-nums`.
- Eyebrows/labels: mono, uppercase, `tracking-[0.14em]`–`[0.2em]`.

## Surfaces

- `.engraved` — pressed into the metal: coal + inset shadows. Trust
  blocks, the contact form, privacy sections.
- `.gild-border` — 1px gold-gradient edge. Reserved for the single
  highest-value surface per view.
- `.letterpress` — ghost type stamped into the ground (step numerals,
  footer wordmark, 404).
- `.sheen` / `.sheen-soft` — light band sweeping on hover. `sheen` on
  gilded CTAs, `sheen-soft` on dark cards.
- No drop shadows anywhere; depth comes from light and hairlines.

## Motion inventory

| # | Move | Where | Mechanism |
|---|---|---|---|
| 01 | Intro choreography — SILBERBERG letters rise from masks | hero, on load | `.mask`/`.rise` CSS keyframes |
| 02 | Liquid gold — domain-warped molten smoke, pointer parallax | hero backdrop | `GoldCanvas` raw-WebGL fragment shader; CSS glow poster fallback |
| 03 | Pinned process — horizontal glide + gold rail | #postopek | GSAP ScrollTrigger (`ProcessScene`), ≥768px only |
| 04 | Sheen sweeps + lift | CTAs, cards | CSS |
| 05 | Scroll reveals (rise/scale/blur/group-stagger) | sections | one IntersectionObserver (`Reveal`) |
| 06 | Ambient stage — grain, breathing glow, light sweep | global/hero | `body::after` SVG noise, CSS keyframes |
| 07 | Engraved wordmark, letter by letter | footer | `Reveal variant="group"` + `.g` delays |

Rules: GSAP is the only animation runtime beyond CSS (no framer-motion).
Lenis is driven by GSAP's ticker (`SmoothScroll`) so pins don't jitter.
Everything honors `prefers-reduced-motion` — the global kill switch in
`globals.css` plus per-component gates (`gsap.matchMedia`, JS checks).

## Accessibility invariants

- Split-word headline: visual spans are `aria-hidden`, the intact
  sentence sits in `sr-only`.
- `smoke` is the darkest color allowed for meaningful text; `dim` only on
  `aria-hidden` decoration.
- Focus ring: 2px `gold`. Selection: gold on ink.
- Scrollable step strip keeps `tabIndex` + `aria-label`.
- axe target remains 0 violations on every page.

## Do not

- Gradient fills on buttons or other interactive elements — solid only.
- Drop shadows, rounded-3xl softness, centered heroes — that was v3.
- New accent hues. Semantic red for form errors is `red-400`, nothing else.
- Resurrect v1 (flat dark-gold sections) — the stage needs light, grain,
  and materials, or it reads as a colored theme again.
