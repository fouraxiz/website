# 4axiz IT Limited — Corporate Website

The multi-page corporate website for 4axiz IT Limited. It presents ERP and AI solutions, products, services, projects, industries, company information and international offices.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Lucide icons · Framer Motion (header menus only)

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — see "Environment"
npm run dev                  # http://localhost:3000
```

| Script              | Purpose                                 |
| ------------------- | --------------------------------------- |
| `npm run dev`       | Development server                      |
| `npm run build`     | Production build (static + SSG pages)   |
| `npm start`         | Serve the production build              |
| `npm run lint`      | ESLint (Next.js core-web-vitals + TS)   |
| `npm run typecheck` | `tsc --noEmit`                          |

## Environment

| Variable               | Purpose                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Base URL for canonical links, sitemap, robots and Open Graph. Defaults to `https://fouraxiz.com`.        |
| `CONTACT_WEBHOOK_URL`  | **Contact form integration point.** Server-side only. Any endpoint that accepts a JSON POST (CRM, Zapier/Make, Formspree, internal API). |

### Contact form

`app/api/contact/route.ts` validates each submission on the server (it shares its rules with the client in `lib/contact.ts`), discards honeypot spam, and forwards valid inquiries to `CONTACT_WEBHOOK_URL`.

- **Not configured:** returns `503 not_configured`. The form tells the visitor plainly that the message **was not sent**. It never shows a fake success message.
- **Webhook fails:** returns `502`, and the form shows an error.
- The form reports success only after the webhook accepts the inquiry.

Forwarded payload: `type, interest, name, email, company, phone, budget, message, consent, context, submittedAt, source`.

## Project structure

```
app/                     Routes (App Router). Dynamic routes use generateStaticParams.
  solutions/[slug]       AI, custom software, web, mobile, process automation, e-commerce
  solutions/erp/[module] Shared ERP module template
  products/[slug]  services/[slug]  projects/[slug]  industries/[slug]
  api/contact            Contact form endpoint
  sitemap.ts robots.ts opengraph-image.tsx not-found.tsx
components/
  layout/                Header (mega menu, mobile menu), Footer, Breadcrumbs, Logo
  ui/                    Button, Badge, Section, IconTile, FeatureGrid, CheckList, PlaceholderNote, JsonLd
  sections/              PageHero, CtaBand, OfficeCards, ProcessTimeline, RelatedProjects, home/*
  visuals/               HeroVisual, ErpEcosystem, AppMockup (illustrative interfaces)
  projects/ products/ team/ contact/ templates/
data/                    All content (typed) — edit here, not in pages
lib/                     metadata helper, icon map, contact validation, utils
types/                   Content models
```

Design tokens (brand palette, fonts, radii, shadows) are in `app/globals.css` under `@theme`. To match the official brand palette, change the `brand-*` scale there.

## Editing content

All repeatable content lives in `/data` and is typed by `types/index.ts`. To add a project, service, ERP module, product or industry, append an object to its data file. The page, sitemap entry, navigation and cross-links are generated automatically.

- **ERP modules** (`data/erp-modules.ts`): set `published: false` to hide a module everywhere. `status` sets the availability badge. Every module starts as `"on-request"`.
- **Projects** (`data/projects.ts`): add screenshots to `public/images/projects/<slug>/` and list them in `images`. The first image replaces the generated cover.
- **Team** (`data/team.ts`): add members, with an optional photo and LinkedIn link. The homepage, About and Team pages switch from placeholders to real portraits automatically.
- **Testimonials** (`data/testimonials.ts`): a testimonial appears only when `approved: true`. The homepage section stays hidden while the list is empty.
- **Client logos** (`data/clients.ts`): the logo strip appears only when the list has entries.
- **Social links** (`data/site.ts`): a link appears only once its `url` is set.

## Content still needed from 4axiz

The original site (fouraxiz.com) could not be reached while this was built. To avoid inventing anything, unverified facts are `null` in `/data` and appear on the site as clearly marked "to be confirmed" placeholders.

- [ ] **Logo:** `components/layout/Logo.tsx`, `app/icon.svg` and `app/opengraph-image.tsx` use an interim wordmark. Replace them with the official assets.
- [ ] **Brand colours:** check the `brand-*` scale in `app/globals.css` against the official palette.
- [ ] **Offices** (`data/site.ts`): city, street address, phone, email, business hours and map link for Bangladesh, New Zealand and Kosovo.
- [ ] **General email and phone** (`site.email`, `site.phone`): also turns on the mailto fallback on the contact page.
- [ ] **Social profile URLs** (`socialLinks`).
- [ ] **Projects:** approved client names, challenge and solution text, technology stack, screenshots and live URLs.
- [ ] **Products:** the confirmed feature list and integrations for each product.
- [ ] **ERP modules:** which modules are available, and their status.
- [ ] **Team:** names, roles, approved portraits and bios.
- [ ] **About:** founding year and dated milestones (the journey section is currently undated).
- [ ] **Testimonials and client logos:** only genuine, approved material.
- [ ] **Privacy Policy and Terms of Service:** these are draft templates and need legal review before publication.
- [ ] **Careers:** open roles (`data/careers.ts`).

## Quality checks performed

- `npm run lint`, `npm run typecheck` and `npm run build` all pass (75 statically generated pages).
- A crawl of every internal link found no broken links. Unknown routes return the custom 404 page.
- Headless Chromium at 1440px and 390px: no console errors and no horizontal overflow on the pages checked.
- Contact form validation, the "not configured" response, the mobile menu, the dropdown (keyboard and Escape) and project filtering were all tested in the browser.
