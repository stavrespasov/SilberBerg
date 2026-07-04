# Silberberg — Visual System ("The Assay Instrument")

The reference for every screen, and later for the proposition deck. Deviations need a reason.

## Voice

Boutique precious-metals house in Koper. Personal, discreet, exact. The page behaves like a
**precision instrument on paper** — light, editorial, kinetic — never like a SaaS template
and never like a dark "vault" cliché.

## Type

| Role | Face | Notes |
|---|---|---|
| Display | **Fraunces** (variable: opsz, SOFT, WONK) | Oversized ink headlines; outlined watermark treatment (`.text-outline`) for Au·Ag, step numerals, footer wordmark. |
| UI & body | **Archivo** (variable) | Uppercase micro-labels at `tracking-[0.18em]`; `font-mono` + `tabular-nums` for the ticker and rail numerals. |

Both self-hosted via `next/font`, `latin` + `latin-ext` (č š ž). Inter appears nowhere.

## Color — light theme

| Token | Hex | Use |
|---|---|---|
| `bone-50` | `#FAF7F0` | Page base (warm white). |
| `bone-100` / `white` | `#F4EFE6` / `#FFF` | Section rhythm: bone-50 → white → bone-100. |
| `ink-900/950` | `#17140F` / `#14110C` | Type. Warm near-black — never `#000`. |
| `gold-500/600` | `#C4A15A` / `#A98842` | Primary CTA fill; graphics, ticks, needles. |
| `gold-700/800` | `#8A6D33` / `#6E5626` | Icons (≥3:1) and small text (≥4.5:1) on light. |
| `ink-600/700` | muted text | Replaces the old silver text roles on light surfaces. |

No gradients as backgrounds. No purple/blue anywhere. No dark sections.

## Signature interactions

- **Lenis inertial scroll** (`SmoothScroll`) — wheel only, destroyed under reduced motion.
- **Instrument rail** (`SectionRail`, xl+) — fixed graduated index 01–07, gold progress
  needle via `useScroll` + spring.
- **Hero** (`HeroHeadline`) — word-by-word rise, parallax outlined `Au·Ag` watermark,
  scale-beam that settles level (the brand gesture).
- **Price ticker** (`PriceTicker`) — CSS transform loop of Au/Ag rates, pauses on hover,
  static readable line under reduced motion, sr-only plain list.
- **Scrollytelling process** (`HowItWorks`, lg+) — sticky outlined numeral crossfades
  01→04 while steps pass; plain editorial list on phones.
- **CTA glint** (`CtaButton`) — cursor-tracked radial highlight + weighted `whileTap` press.
- **Mobile action bar** (`MobileActionBar`, <md) — slides in after the hero; Cene +
  Naročite cenitev always one thumb-tap away; safe-area padded.
- `ScrollReveal` for everything else: rise 20px + fade, once, `--ease-settle`.

Every animated element is transform/opacity-only and renders statically under
`prefers-reduced-motion`. axe (WCAG 2.1 AA): 0 violations is the maintained baseline.

## Iconography

Bespoke line-art in `components/icons/` — 24-grid, 1.5px stroke, squared terminals,
engraved-plate character. No icon-pack imports.

## Banned (from the brief — hard constraints)

Centered hero over gradient mesh · default shadcn look · Inter-only · Lucide feature grids ·
stock gold-bar photos · stock-avatar testimonial carousels · purple/blue SaaS palette ·
dark-theme gold clichés · "Unlock the power of…" copy.
