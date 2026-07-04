# Silberberg — Visual System

The reference for every screen, and later for the proposition deck. Deviations need a reason.

## Voice

Boutique precious-metals house in Koper. Personal, discreet, exact. The design reads as
*assay certificate meets coastal editorial* — never as a SaaS template.

## Type

| Role | Face | Notes |
|---|---|---|
| Display | **Fraunces** (variable: opsz, SOFT, WONK) | Oversized headlines (`--text-display-*` clamp scale). High optical contrast at large sizes. |
| UI & body | **Archivo** (variable) | Uppercase micro-labels at `tracking-[0.18em]`. `tabular-nums` on all prices. |

Both self-hosted via `next/font`, `latin` + `latin-ext` (č š ž). Inter appears nowhere.

## Color

| Token | Hex | Use |
|---|---|---|
| `ink-900/950` | `#17140F` / `#14110C` | Base surfaces. Warm near-black — never `#000`. |
| `bone-100/50` | `#F4EFE6` / `#FAF7F0` | Light editorial sections (paper). |
| `gold-500` | `#C4A15A` | The accent. CTAs, hairline highlights, price emphasis. Precise, never wallpaper. |
| `gold-300/400` | `#E5C87E` / `#D4B26A` | Gold on dark surfaces (contrast ≥ 4.5:1 on ink). |
| `silver-500` | `#8B9096` | Oxidized-silver secondary: rules, muted labels, the silver product line. |

No gradients as backgrounds. No purple/blue anywhere.

## Layout

- Asymmetric editorial grid: 12-col, content blocks offset (e.g. 7/12 + 4/12 with a gap column).
- Section rhythm alternates ink and bone surfaces.
- Hairline rules (`.hairline`, 35% silver) structure content like an assay certificate.
- Hallmark motif: small bordered marks ("585", "750", "999") as section ornaments.

## Motion

- Library: `motion/react`. Easing `--ease-settle` `cubic-bezier(0.22,1,0.36,1)` — a scale settling.
- `ScrollReveal`: rise 20px + fade, 0.7s, once per element.
- `CtaButton`: presses down like a scale plate taking weight (`whileTap` 0.97).
- UI feedback ≤ 300ms; scroll narratives may run longer.
- Every animated component renders statically under `prefers-reduced-motion`.

## Iconography

Bespoke line-art in `components/icons/` — 24-grid, 1.5px stroke, squared terminals,
engraved-plate character. No icon-pack imports.

## Banned (from the brief — hard constraints)

Centered hero over gradient mesh · default shadcn look · Inter-only · Lucide feature grids ·
stock gold-bar photos · stock-avatar testimonial carousels · purple/blue SaaS palette ·
"Unlock the power of…" copy.
