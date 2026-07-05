# Silberberg — Visual System v3 ("Clean Counter")

The reference for every screen and for the proposition deck. Deviations need a reason.

## Voice

Boutique precious-metals buyer in Koper. Personal, exact, calm. The design language is
Apple-grade product minimalism: pure white air, floating soft panels, one warm accent.
No animation library — the entire motion system is one IntersectionObserver and CSS.

## Type

| Role | Face | Notes |
|---|---|---|
| Everything | **Geist** | Semibold, `tracking-tight(er)` headlines; 15px body rhythm. |
| Figures | **Geist Mono** | Prices, step numbers, the ConfirmTag. `tabular-nums`. |

Self-hosted via `next/font`, `latin` + `latin-ext` (č š ž).

## Color

| Role | Value | Use |
|---|---|---|
| Base | `#FFFFFF` | Page background. |
| Panels | `stone-100` / `stone-50` | Floating `rounded-[2rem]` section panels and cards. |
| Text | `neutral-900` / `neutral-600` | Headings / body. `neutral-600` is the muted floor (≥4.5:1 everywhere). |
| Accent | `amber-700/800` text, `amber-50/200` fills | Kickers, icons, consent highlights. Never decoration-wallpaper. |
| Action | `neutral-900` pills | Primary buttons are black pills; secondary are `stone-200` pills. |

## Shape & layout

- Everything rounds: pills for actions (`rounded-full`), `rounded-2xl/3xl` cards,
  `rounded-[2rem]` section panels floating inside `px-4` gutters.
- Centered `max-w-6xl` composition; hero is centered statement type (`text-balance`).
- Section anchors use `scroll-mt-24` to clear the fixed nav.

## Signature moves

- **Floating glass nav** — fixed pill, `bg-white/75` + `backdrop-blur`, segmented
  locale switcher, black CTA pill.
- **Bento stat strip** under the hero (three stone cards with icon medallions).
- **Price cards** — white cards on the stone panel; purity tiles with big mono figures.
- **Snap-scroll steps** — numbered black-circle cards; horizontal snap carousel on
  phones (keyboard-focusable region), 4-up grid on desktop.
- **Map sheet** — full-bleed rounded OSM embed (`grayscale-[0.85]`) with a floating
  glass info card, Apple-Maps style.
- **Form** — filled `stone-100` inputs that lift to white with an amber border on focus.
- **Motion** — three reveal variants (rise / scale / blur-focus) on one `Reveal`
  observer; hero load choreography (`.rise` stagger) under two drifting ambient
  glows; price marquee loop; count-up prices (rAF); scroll-progress needle;
  hover physics: cards lift with soft shadows, icon medallions scale, step
  numbers turn amber, the map creeps to color and zooms. Pills lift on hover and
  compress on press. Smooth `<details>` expansion where `interpolate-size` is
  supported. Lenis inertial wheel scrolling. Everything static under
  `prefers-reduced-motion`.

## Iconography

Bespoke line-art in `components/icons/` (24-grid, 1.5px, squared terminals), rendered
in amber inside white/amber-50 medallions. No icon packs, no emojis.

## Guardrails

axe-core 0 violations is the maintained baseline. No gradients, no dark sections,
no serif ornament, no purple/blue SaaS palette, no "Unlock the power of…" copy.
