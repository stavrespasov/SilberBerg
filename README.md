
# SILBERBERG

### Premium Digital Experience for Precious Metals & Luxury Goods

**A modern, multilingual business website built with Next.js, React, and TypeScript.**

[Live Website](https://silberberg.si) · [GitHub Repository](https://github.com/stavrespasov/SilberBerg)

---

## Overview

Silberberg is a premium digital experience designed for a precious-metals and valuable-goods purchasing business based in Koper, Slovenia.

The project transforms a traditional local business concept into a modern, visually distinctive online presence.

Built with a focus on performance, accessibility, responsive design, and search engine optimization, Silberberg combines sophisticated frontend engineering with a cinematic visual identity.

The design follows a minimalist black-and-gold aesthetic, featuring custom WebGL animations, editorial typography, immersive scrolling, and intuitive navigation.

**Live website:** https://silberberg.si

---

## Key Features

### Premium UI/UX Design

- Custom black-and-gold design system
- Cinematic animated hero section
- Responsive mobile-first layouts
- Editorial typography and visual storytelling
- Interactive navigation and content sections
- Smooth scrolling and animated transitions
- Custom hover effects and interactive elements
- Accessibility-conscious motion fallbacks

### Custom WebGL Animation

The homepage features a custom-built molten-gold visual effect implemented using WebGL and GLSL shaders.

Technical highlights:

- Procedural shader-based animation
- Interactive pointer tracking
- GPU-accelerated rendering
- Reduced-resolution rendering for efficiency
- IntersectionObserver-based visibility tracking
- Automatic animation pausing when off-screen
- Reduced-motion accessibility support
- CSS fallback when WebGL is unavailable

The animation is generated in the browser rather than using a large background video.

### Multilingual Support

The website supports three languages:

- Slovenian (default)
- English
- Italian

Internationalization is implemented with `next-intl`.

Features include locale-aware navigation, translated content, localized metadata, and language-specific routes.

### Business Features

- Precious metals purchasing information
- Gold, silver, and other valuable materials
- Fur and leather goods categories
- Watches, designer accessories, and other valuables
- Product imagery and category galleries
- Step-by-step explanation of the buying process
- FAQ section
- Business contact information
- Mobile-friendly click-to-call functionality

### SEO Optimization

The project implements:

- Next.js Metadata API
- Localized page titles and descriptions
- Canonical URLs
- Hreflang and alternate-language metadata
- Open Graph metadata
- Dynamic XML sitemap
- Robots configuration
- Schema.org structured data
- LocalBusiness JSON-LD
- FAQPage JSON-LD
- Semantic HTML

The implementation avoids publishing unverified business details in structured data.

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | Next.js 16 |
| Frontend | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4, Custom CSS |
| Animations | GSAP, Lenis, CSS |
| Graphics | WebGL, GLSL |
| Internationalization | next-intl |
| SEO | Next.js Metadata API, JSON-LD |
| Testing | Vitest |
| Analytics | Vercel Analytics |
| Deployment | Vercel |
| Domain | silberberg.si |

---

## Technical Architecture

The application uses the Next.js App Router with reusable React components and a modular project structure.

Key architectural decisions:

**Component-based development**

Reusable UI elements, navigation, content sections, and category layouts improve maintainability and consistency.

**Internationalization**

Centralized locale configuration provides consistent language routing and translated interfaces.

**Performance-conscious animation**

Custom WebGL effects reduce reliance on video assets, while visibility tracking prevents unnecessary rendering.

**Centralized content management**

Shared TypeScript definitions organize business categories, product imagery, and associated routes.

**Search engine visibility**

Server-rendered content, structured metadata, localized URLs, and sitemap generation provide a foundation for search indexing.

---

## Project Structure

```text
SilberBerg/
├── app/
│   ├── [locale]/
│   ├── fonts/
│   ├── globals.css
│   ├── sitemap.ts
│   └── robots.ts
│
├── components/
│   ├── sections/
│   ├── ui/
│   ├── GoldCanvas.tsx
│   └── Reveal.tsx
│
├── i18n/
│   ├── routing.ts
│   └── navigation.ts
│
├── lib/
│   ├── buying.ts
│   ├── siteConfig.ts
│   ├── structuredData.ts
│   └── fonts.ts
│
├── public/
│
├── package.json
└── next.config.ts
```

---

## Getting Started

### Prerequisites

- Node.js compatible with Next.js 16
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/stavrespasov/SilberBerg.git
```

Navigate to the project:

```bash
cd SilberBerg
```

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Open:

http://localhost:3000

### Environment Configuration

For deployment, configure the public site URL:

```env
NEXT_PUBLIC_SITE_URL=https://silberberg.si
```

This ensures that canonical URLs, sitemap entries, and social metadata reference the correct website.

---

## Available Scripts

```bash
npm run dev
```
Starts the local development server.

```bash
npm run build
```
Creates the production build.

```bash
npm run start
```
Starts the production server.

```bash
npm run lint
```
Runs ESLint.

```bash
npm test
```
Runs the Vitest test suite.

---

## Design Philosophy

Silberberg was designed around three principles:

**01 — Visual Identity**

Create a distinctive premium aesthetic through typography, restrained colors, cinematic motion, and intentional spacing.

**02 — Usability**

Make business information accessible through clear navigation, responsive layouts, and straightforward contact options.

**03 — Engineering Quality**

Build a maintainable application using reusable components, TypeScript, performance-aware animation, and modern web architecture.

---

## Project Status

The website is deployed at:

**https://silberberg.si**

The repository demonstrates a functional frontend implementation.

The project currently focuses on business presentation and direct contact rather than online transactions.

Features such as user accounts, payment processing, administrative dashboards, and transactional backends are not part of the current implementation.

Final business and legal content should be verified with the business owner before operational use.

---

## Developer

**Stavre Spasov**

Full-Stack Developer focused on building modern web applications, interactive digital experiences, and business-oriented software.

**Core technologies:** React, Next.js, TypeScript, Node.js, PostgreSQL, and modern frontend tooling.

[GitHub Profile](https://github.com/stavrespasov)

---

**Designed and developed by Stavre Spasov.**
