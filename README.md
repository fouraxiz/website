# 4axiz IT Limited — Corporate Website

The multi-page corporate website for 4axiz IT Limited. It presents ERP and AI solutions, products, services, projects, industries, company information and international offices.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · PostgreSQL 16 + Drizzle ORM · Lucide icons · Framer Motion

## Getting started

```bash
npm install
cp .env.example .env.local      # set DATABASE_URL and SESSION_SECRET
npm run db:migrate              # create tables
npm run db:seed                 # load the initial content from /data
npm run user:create -- you@4axiz.com 'a-strong-password' "Your Name" admin
npm run dev                     # http://localhost:3000 — sign in at /login
```

Without `DATABASE_URL` the site still runs, using `/data` as read-only content (editing is disabled).

| Script | Purpose |
| --- | --- |
| `npm run dev` / `build` / `start` | Next.js development, production build and server |
| `npm run lint` / `typecheck` | ESLint and `tsc --noEmit` |
| `npm run db:generate` | Create a migration after changing `lib/db/schema.ts` |
| `npm run db:migrate` | Apply migrations |
| `npm run db:seed` | Fill empty collections from `/data` |
| `npm run db:seed -- --sync` | Update the database to the latest `/data` content while keeping everything edited on the website (runs on every deploy) |
| `npm run db:seed -- --reset` | Delete all content and load `/data` again (loses website edits) |
| `npm run user:create` | Create a user, or reset an existing user's password |

**Deployment:** see [`deploy/DEPLOY.md`](deploy/DEPLOY.md) (DigitalOcean VPS, Docker Compose, Nginx, HTTPS, backups, auto-deploy).

## Editing content (no admin panel)

Sign in at `/login`. A toolbar appears at the bottom of every page:

- **Edit mode on/off.** When it is on, every editable area shows buttons such as "Slides", "Services", "Heading & visibility" or "Edit this project". They open a side panel with a form.
- **Content.** Lists every content type: menu, slider, section headings, services, products, ERP modules, projects, industries, team, offices, blog posts, client logos, testimonials, jobs and site settings.
- **Editors** (admins only). Add people, change their role, reset passwords or disable access.

In the side panel editors can add, edit, delete and reorder items, upload images, publish or save as a draft (drafts are visible only to signed-in editors), and restore earlier versions. Homepage sections can be reordered or hidden from **Section headings**.

### How it works

- **Content.** All editable content lives in PostgreSQL. One table, `content_items`, stores every collection as JSONB. Each collection's fields are defined in `lib/cms/collections.ts`, and the edit forms are generated from those definitions. To add a field, add it there; no database migration is needed.
- **Versions.** Every save keeps the previous version in `content_versions`.
- **Speed.** Pages read through `lib/cms/content.ts`, which caches published content until the next edit.
- **Uploads.** Images are saved to `UPLOAD_DIR` and served at `/uploads/…`. On the VPS, Nginx serves them directly.
- **Login.** Sessions are signed with `SESSION_SECRET`. Passwords are hashed with bcrypt, and repeated failed sign-ins are throttled.

## Project structure

```
app/                     Routes (App Router); pages render per request from cached database content
  login/                 Sign-in page for editors
  blog/  blog/[slug]     Blog
  solutions/[slug]  solutions/erp/[module]  products/[slug]  services/[slug]  projects/[slug]  industries/[slug]
  api/contact  api/health  uploads/[...path]
components/
  cms/                   Edit mode: provider, toolbar, Editable/Edit wrappers, drawer, field inputs, editors panel
  layout/ ui/ sections/ visuals/ projects/ products/ team/ contact/ blog/ templates/
lib/
  db/                    Drizzle schema and client
  cms/                   Collection definitions, content getters, server actions, seed builder
  auth/                  Sessions, login and user management
data/                    Initial content (seeded into the database) and fixed labels
drizzle/                 SQL migrations
scripts/                 migrate, seed, create-user
deploy/                  DEPLOY.md, Nginx config, backup script
```

Design tokens (brand palette, fonts, radii, shadows) are in `app/globals.css` under `@theme`. The palette is taken from the official logo: orange-red `#e4603a` (`brand-500`), charcoal `#40464b` (`ink-700`) and grey `#98a1a9` (`ink-400`), plus a violet accent. Orange is used as an accent only (buttons, highlights, icons), never as a full-section background. Supporting colours for icons and cards come from `lib/palette.ts`. Headings use Poppins and body text uses Inter. The logo files are in `public/brand/` (`4axiz-logo.png`, plus `4axiz-logo-white.png` for dark backgrounds).

## Contact form

`app/api/contact/route.ts` validates submissions and forwards them to `CONTACT_WEBHOOK_URL` (a CRM, Zapier/Make, Formspree or internal API). If it is not set, the form tells visitors their message was **not** sent. It never shows a fake success message.

## Verified content in use

Content comes from the **4axiz Company Profile 2026** and from screenshots of the existing fouraxiz.com:

- **Company facts:** established 30 June 2010, incorporation C-112349/13, BASIS member A337, trade licence 02-07374, 45 engineers, 2,300 sq ft head office in Mirpur 12, Dhaka. Bank, VAT and TIN details are deliberately **not** published.
- **Contact:** `+880 1718 837 689` (phone / WhatsApp), `admin@4axiz.com`, Microsoft Teams `fouraxiz`.
- **Offices:**
  - Dhaka (head office): Level 4, House 34, Lane 6/2, Road 20/A, Mirpur 12.
  - Auckland: delivery and client hub.
  - Cedar Falls, Iowa: 8120 Jennings Drive.
- **Headline numbers:** 16+ years, 45 engineers, 60+ clients, 180+ countries reached through partner programmes.
- **Company profile:** vision, mission, six core values, six key strengths, four dated milestones, the nine-phase delivery methodology, team composition and five engagement models.
- **Projects:** 20 projects with real client names and scope, including:
  - Handicap International, NGO Forum (UNHCR), UNDP NUPRP, UNFPA Shombhabona Connect;
  - NTP Aspect, MDR TB DOT, SAMCS;
  - KMIX ERP, BazarNao, Smart Hostel, CPD ERP and NITER.
  - Screenshots from the profile are in `public/images/projects/`.
- **Clients:** 31 client and partner logos from the profile, in `public/images/clients/`.
- **Team:** 9 key personnel with roles and bios (no photos yet; cards show initials).
- **Products and services:**
  - 16 ready-to-deploy products, editable as "Ready software".
  - New services: MIS & MEAL, Cyber Security, Digital Marketing & SEO, Managed Hosting & Networking, Business Continuity, Brand Identity.
- **Technology stack:** taken from the "Our tech stack" page of the profile.

## Content still needed from 4axiz

Everything below can be added from the website itself in edit mode, with no code changes.

- [ ] **Kosovo office:** the 2026 profile lists Bangladesh, New Zealand and the USA only. Confirm whether Kosovo stays, and add its details or delete it under **Offices**.
- [ ] **New Zealand office:** street address, phone and email.
- [ ] **Team portraits** and any further team members.
- [ ] **Social profile URLs** (Site settings).
- [ ] **Ready software:** a one-line description for each product.
- [ ] **Testimonials:** only genuine, approved material.
- [ ] **Privacy Policy and Terms of Service:** these are draft templates and need legal review before publication.
- [ ] **Careers:** open roles.
- [ ] **Office and team photos.**

## Quality checks performed

- `npm run lint`, `npm run typecheck` and `npm run build` pass.
- Every internal link (89 pages) was crawled with no broken links, and unknown routes return the custom 404 page.
- Editing was tested end to end in headless Chromium, against both the local server and the production Docker stack:
  - sign in, including a wrong password and the retry;
  - edit and publish a slide, and confirm the public site updates;
  - restore an earlier version;
  - upload an image and publish a blog post;
  - hide and show a homepage section;
  - delete content.
- Blog content was checked against script injection: `<script>`, `javascript:` links and inline event handlers never execute.
- The Docker stack (PostgreSQL + web) starts healthy, uploads persist to the host volume, and the backup script produces a dump that `pg_restore` can read.
