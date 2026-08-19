# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

Marketing site + CMS for **Iraava Naturals**, an Indian Ayurvedic skincare manufacturer/exporter selling B2B to buyers, importers and distributors (not a consumer storefront, no cart or checkout). 5 public pages (Home, About, Product Range, Work With Us, Contact) plus an admin CMS at `/admin` that edits every page's copy, the product catalog, site settings (logo, contact info, social links), and shows enquiry-form submissions.

Live at https://iraava-website.vercel.app. Repo: `github.com/guptanavya024-droid/iraava-website`, a **different** GitHub account and a **different** Vercel account (`guptanavya024`) than this machine's default. Read "Deployment" below before pushing or deploying.

## Commands

```bash
npm run dev             # start dev server (port 3000)
npm run build            # prisma generate + next build
npm run lint             # eslint
npm test                # vitest (no suite yet, nothing pure-function-heavy to unit test)

npm run db:migrate      # create + apply a new migration from schema changes
npm run db:migrate:deploy  # apply pending migrations without prompting, for CI/prod
npm run db:generate      # regenerate Prisma client after schema changes
npm run db:studio       # open Prisma Studio
npm run db:seed         # run prisma/seed.ts (idempotent, see "Seeding" below)
```

Type-check with `npx tsc --noEmit`.

**After any `prisma/schema.prisma` change**: run `npm run db:migrate`, then **fully restart** `npm run dev` (kill and restart, not just a save-triggered hot reload). The Prisma client singleton in `src/lib/db.ts` is cached per process, and a stale client throws `Cannot read properties of undefined` for the new model or field until the process restarts.

**If the site looks visually broken after a batch of style/component edits** (misaligned layout, missing elements, a `1 Issue` badge in the corner showing a hydration mismatch): it's almost always a stale cached JS chunk in the browser from repeated dev-server restarts during the session, not a real code bug. Hard-refresh (Cmd+Shift+R) before assuming something is broken. If that doesn't fix it, do a full clean rebuild: kill the dev server, `rm -rf .next`, restart.

## Environment

Requires `.env` (not committed):
- `DATABASE_URL`: Neon Postgres (pooled), provisioned via the Vercel Marketplace Neon integration.
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob (public store `iraava-media`), for logo and product image uploads.
- `AUTH_SECRET`: NextAuth secret.
- `AUTH_TRUST_HOST`: needed for local `next start` (production mode) testing only. Vercel sets this implicitly via its own `VERCEL` env var, so it's not required in Vercel's own env vars.
- `ADMIN_EMAIL` / `ADMIN_PASSWORD`: only read by `prisma/seed.ts` to create or update the `AdminUser` row, not used at runtime.
- `VERCEL_TOKEN`: deploy tooling only, not read by the app. See "Deployment" below.

## Architecture

**Next.js 16 App Router**, deployed to Vercel. No test coverage yet (`npm test` runs vitest with zero suites, nothing pure-function-heavy exists to unit test).

### Route groups
- `src/app/(site)/`: the 5 public pages, wrapped by `(site)/layout.tsx` (Header + Footer, fetches `SiteSettings`/`SocialLink` server-side).
- `src/app/admin/login/`: credentials login, **outside** the protected group so its own layout gate doesn't redirect-loop it.
- `src/app/admin/(protected)/`: everything else under `/admin`. Its `layout.tsx` calls `getSession()` and redirects to `/admin/login` if unauthenticated. All authenticated users are admins (single role, no tiers).
- `src/app/api/admin/*`: every route calls `requireAdminSession()` from `src/lib/require-admin.ts` first; page-level gating doesn't cover direct API requests.
- `src/app/api/enquiries` and `src/app/api/auth/[...nextauth]` are the only public API routes.

### Data model (`prisma/schema.prisma`)
- **Singleton content tables** (`SiteSettings`, `HomeContent`, `AboutContent`, `ProductRangeContent`, `WorkWithUsContent`): fixed `id: "singleton"`, upserted from the admin forms. One table per page, fields map 1:1 to the source copy doc. Chosen over a generic page-builder or JSON blob so the CMS forms stay labeled and simple for a non-technical admin.
- **Ordered list tables** (`WhyUsPoint`, `ApproachPrinciple`): repeating sections within a page (Home's "why buyers work with us", About's 4 principles). Saved via replace-all (`deleteMany` + `createMany`) in the same transaction as their parent content table, not independent CRUD.
- **`Product`**: the catalog. `type` is a plain string, not a foreign key (see `ProductType` below).
- **`ProductType`**: reference list of type names, scoped by `category` (`FACE_CARE`/`BODY_CARE`), `@@unique([category, name])`. Backs the admin product form's combobox and the customer-facing type filter on `/product-range`. **Not** a real FK on `Product.type`, deliberately kept as a plain string matched by name, so renaming or removing a type here never blocks an existing product from saving. `ensureProductType()` (`src/lib/product-types.ts`) upserts a row on every product create/update, so the reference list can never drift behind what's actually in use, and the admin can add a brand-new type inline from the product form without a separate "manage types" screen.
- **`SocialLink`**: Instagram, Facebook, WhatsApp, LinkedIn, Twitter, YouTube, Other, ordered. Icons are hand-rolled SVGs in `src/components/site/social-icons.tsx` (lucide-react dropped all brand icons years ago).
- **`EnquirySubmission`**: contact form submissions, `status` NEW/READ/ARCHIVED, no email notifications (business email was still TBD as of writing; check `/admin/settings` before assuming it's still unset). `phone` is required at the form and API layer but nullable in the DB column, no migration was done to enforce it there.
- **`AdminUser`**: credentials auth, bcrypt-hashed password. Single role, no `Role` enum.

### `SiteSettings.logoUrl` vs `logoMarkUrl`
Two separate admin-uploadable images: `logoUrl` is the full lockup (leaf mark plus "IRAAVA NATURALS" text), used in the Hero and Footer. `logoMarkUrl` is an icon-only crop (no text), used in the Header, because the full lockup's text becomes illegible at nav-bar size. `Header` falls back to `logoUrl` (rendered bigger, via `Logo`'s `size="lg"` prop) if no mark is set, and falls back further to a text wordmark if neither image exists.

### Content fetchers (`src/lib/content.ts`)
Every `getX()` fetcher falls back to a `DEFAULT_X` constant (verbatim from the source copy doc) when its row doesn't exist yet, so pages never render empty sections pre-seed. These same `DEFAULT_X` constants are imported by `prisma/seed.ts`, so don't duplicate copy between the two files. `getProductTypes()`/`getActiveProducts()` return the full reference list and the active-only catalog respectively; the customer type filter deliberately shows every `ProductType` for a category, not just ones with active products right now.

### Revalidation
The 5 public pages are statically prerendered at build time (`○ Static` in the build output). **Every** admin mutation route (`content/*`, `settings`, `products/*`) calls `revalidatePath()` for whichever public page(s) it affects after a successful write. `settings` busts `revalidatePath("/", "layout")` since logo, contact info, and socials render in the Header/Footer on every page. If you add a new admin mutation route, it needs a `revalidatePath()` call too, or the edit won't show up on the live site until the next deploy.

### Seeding (`prisma/seed.ts` + `prisma/seed-data.ts`)
Idempotent: every step checks whether its data already exists before writing, and it needs to stay that way. `seedSiteSettings()` used to unconditionally re-upload the original white-background logo JPG and overwrite `logoUrl` on every run, silently undoing a later manual background-removal fix the next time someone reseeded for an unrelated reason (backfilling `ProductType`, in that case). It's now skip-if-exists like every other step. If you add a new seed step, make it skip-if-exists too, not just skip-if-empty-string.

`seed-data.ts` holds the 45-product catalog: 14 have real sourced descriptions, ingredients, and links (cross-referenced from the original spreadsheet's two sheets), the other 31 have concise descriptions written for this catalog since the spreadsheet had no copy for them beyond category, type, and name.

### Design tokens (`src/app/globals.css`)
Palette is deep green (`#1d5327`, sampled directly from the logo file) plus a cool white/sage scale. No warm cream or peach tone: that was tried and explicitly rejected as reading too close to generic AI-generated product chrome. Fonts are Poppins (`--font-display`, headings) and Roboto (`--font-sans`, body). No small-caps "eyebrow" label above headings anywhere (`.brand-eyebrow` was removed), same reasoning, it read as a templated AI-site convention. If asked to touch typography or color again, keep both of these constraints in mind rather than drifting back.

No em dashes anywhere in this repo: not copy, not code comments, not commit messages. This is a standing cross-project rule (see memory), not specific to this repo, but it's been violated and re-swept twice already here (once in the site copy, once in this very file). Grep the whole tree for the em dash character before considering copy or docs work done, don't trust that it's already clean.

### Animations (`src/components/site/reveal.tsx`)
`Reveal` is a client component wrapping content in an `IntersectionObserver`-triggered fade/rise-in (once per element, `motion-reduce`-aware). Used on scroll-triggered section content across all 5 public pages, deliberately **not** used on the Hero (above the fold, and it carries the `priority`-loaded LCP image) or on anything that's the very first thing in the viewport on load.

### Product Range page (`src/components/site/product-catalog.tsx`)
Client component. Category tabs (Face Care/Body Care) plus a type-filter chip row live together in a `sticky` bar pinned under the header (`top-20`, must match the Header's actual height; it's `h-20`/80px, so if the header's height ever changes, update this offset too, or the bar overlaps the nav on scroll). Pagination (9/page) renders both above and below the grid, not bottom-only, so it's reachable regardless of scroll position. Per-tab page and type-filter state are independent: switching Face Care and Body Care doesn't lose the other tab's filter.

### Dropdowns (`src/components/ui/select.tsx`)
Radix-based (`@radix-ui/react-select`), not a native `<select>`. It doesn't participate in native `FormData`, so anything using it (the enquiry form's Buyer Type/Enquiry Type, the admin settings form's social platform picker, the product form's category picker) needs controlled `value`/`onValueChange` state, not `formData.get(...)`.

## Deployment

- **GitHub**: pushes go to `guptanavya024-droid/iraava-website` via a dedicated SSH key and host alias, `git@github-iraava:guptanavya024-droid/iraava-website.git`, configured in `~/.ssh/config` as `Host github-iraava`. The repo-local git identity (`git config user.email`/`user.name`, not global) is set to `guptanavya024@gmail.com` / "Iraava Naturals" so Vercel's git-triggered auto-deploy can match the pusher against the connected account.
- **Vercel**: project `iraava/iraava-website`, under the `guptanavya024` account, different from this machine's default Vercel login and from other client projects worked on in this same environment.
- **Deploying**: the Vercel CLI's default login is a shared, machine-wide session, easy to accidentally clobber by logging into a different client's account in the browser (this happened mid-project and silently broke deploys with a "Not authorized" error until caught). To avoid that entirely, deploy commands use a scoped personal access token stored in `.env` as `VERCEL_TOKEN`, created at vercel.com/account/tokens while logged in as `guptanavya024`, scoped to the `iraava` team. Run deploys like this rather than a bare `vercel` command:
  ```bash
  source .env && VERCEL_TOKEN="$VERCEL_TOKEN" npx vercel@latest deploy --prod
  ```
  This bypasses whatever account happens to be logged into the browser or the global CLI session entirely. Confirm with `VERCEL_TOKEN="$VERCEL_TOKEN" npx vercel@latest whoami` if a deploy behaves unexpectedly. Git-triggered auto-deploy is also connected, but verify it actually fired (check the Vercel dashboard) rather than assuming; do the manual token-based deploy regardless if the change needs to be live immediately.
