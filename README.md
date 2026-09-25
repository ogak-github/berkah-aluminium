# Berkah Aluminium

Company profile + 3D configurator website for an aluminium & glass workshop.

**Stack:** SolidStart v2 · Bun · Tailwind CSS v4 · Three.js

## Commands

```bash
bun install
bun dev          # dev server
bun run build    # production build (static pages are prerendered)
bun start        # run the production server on Bun
bun run typecheck
```

## Structure

```
src/
├─ lib/
│  ├─ site.ts               # business info (name, WA number, address) ← EDIT THIS
│  ├─ content.ts            # services, portfolio, testimonials ← EDIT THIS
│  └─ configurator/
│     ├─ pricing.ts         # price list for estimates ← EDIT THIS
│     ├─ builder.ts         # builds 3D meshes + bill of materials at the same time
│     ├─ types.ts
│     ├─ index.ts           # product registry
│     └─ products/          # lemari, jendela, kanopi, aquarium
├─ components/              # Header, Footer, Seo, WhatsAppFab, configurator/Viewer
└─ routes/                  # /, /layanan, /portofolio, /kontak, /desain
```

## Adding a new configurator product

1. Create `src/lib/configurator/products/<name>.ts` exporting a `ProductDef`
   (params for the UI panel + a `build(b, values)` function).
2. Use `b.profile()`, `b.glass()`, `b.roof()`, `b.hardware()` for billable parts and
   `b.decor()` for visual-only parts. The estimate is derived automatically.
3. Register it in `src/lib/configurator/index.ts`.

## Before going live

- [ ] Fill in real data in `src/lib/site.ts` (domain, WhatsApp number, address, Maps embed)
- [ ] Replace the stock photos in `public/portofolio/` with real project photos and remove `stock: true` in `src/lib/content.ts` (credits: `public/portofolio/CREDITS.md`)
- [ ] Replace placeholder testimonials and stats in `src/lib/content.ts`
- [ ] Adjust prices in `src/lib/configurator/pricing.ts`
- [ ] Replace `public/favicon.ico` and add an Open Graph image
- [ ] Register a Google Business Profile and link it to the website
- [ ] Submit the site to Google Search Console
