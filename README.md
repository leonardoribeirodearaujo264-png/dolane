# Dolane Cleaning Services — Website

Marketing site for **Dolane Cleaning Services** (legal entity: DOLANE DIRHAM, LLC), a
family-owned cleaning company based in Westerville, Ohio, serving Columbus and
surrounding communities.

Built with Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS v4.
Designed to deploy on Vercel from a GitHub repository.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in the values you have
npm run dev                  # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm run images` | Rebuild all optimized images from `/assets-source` |
| `npm run fonts` | Re-download the self-hosted font files (rarely needed) |

---

## ⚠️ Required before launch

1. **Point `NEXT_PUBLIC_SITE_URL` at the real domain.** It drives canonical URLs,
   the sitemap, Open Graph tags and structured data.
2. **Configure at least one quote-form delivery channel** (see below). Without
   one, submitted quote requests are only written to the server log and the
   business will not receive them.
3. **Have a lawyer review the legal pages.** `/privacy-policy`, `/terms` and
   `/cookie-policy` were drafted to reflect how the business actually operates,
   but they are not legal advice.
4. Set `NEXT_PUBLIC_CONTACT_EMAIL` once the business mailbox exists. Until then
   every email affordance on the site stays hidden rather than showing an
   address that would bounce.

---

## Quote form

`components/forms/QuoteForm.tsx` → `POST /api/quote` (`app/api/quote/route.ts`).

- Validated by one shared Zod schema (`lib/quote-schema.ts`) in **both** the
  browser and the server, so the rules can never drift apart.
- Anti-spam: hidden honeypot field, a three-second time trap, and a per-IP rate
  limit of 5 requests per 10 minutes.
- Service cards deep-link as `/#quote?service=Deep+Cleaning`, which preselects
  the matching option in the form.

### Delivery channels

The route tries all configured channels and succeeds if any one works. Configure
at least one:

| Channel | Env vars |
| --- | --- |
| Email (Resend) | `RESEND_API_KEY`, `QUOTE_NOTIFICATION_EMAIL`, `QUOTE_FROM_EMAIL` |
| SMS (Twilio) | `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`, `QUOTE_SMS_TO` |
| Webhook | `QUOTE_WEBHOOK_URL` |

If none succeed the route logs `[quote] No delivery channel succeeded` together
with the full lead, so nothing is lost while you fix the configuration — but
check the Vercel logs, because the customer is told the request went through.

---

## Environment variables

Every variable is documented in [`.env.example`](.env.example). Add the same
keys in **Vercel → Project → Settings → Environment Variables**.

**Security rules:**

- `.env.local` is git-ignored and must never be committed.
- Only public, browser-safe values may use the `NEXT_PUBLIC_` prefix.
- Never add a Firebase Admin service account, private key or API secret to
  `lib/firebase.ts` or anywhere the client can import.

---

## Content — where to change what

Nothing user-visible is hardcoded inside components. Edit these files instead:

| File | Contains |
| --- | --- |
| `lib/site.ts` | Business name, phone, location, languages, service area, navigation |
| `content/services.ts` | The six services, add-ons, the carpet caveat, form options |
| `content/trust.ts` | Trust badges, stats, differentiators, mission and values |
| `content/faq.ts` | FAQ questions and answers (also feeds FAQ structured data) |
| `content/gallery.ts` | Gallery, signature-touch strip, before/after pairs |
| `content/reviews.ts` | Client reviews — **currently empty on purpose** |

### Turning on reviews

`content/reviews.ts` exports an empty array. The owners asked that no fictional
testimonials be published, so while it is empty the Reviews section and its nav
link both hide themselves and no `aggregateRating` is emitted in structured
data. Append real reviews in the documented shape and everything switches on —
no component changes needed.

### Sections that hide themselves

- **Reviews** — hidden while `reviews` is empty.
- **Before & After** — hidden while `beforeAfter` is empty. It currently ships
  with five genuine matched pairs.
- **Email links** — hidden while `NEXT_PUBLIC_CONTACT_EMAIL` is unset.
- **Social links** — each hidden until its URL env var is set.
- **Business hours** — `site.businessHours` is `null`, so a neutral availability
  note is shown instead. Fill in the array to show a real schedule.

---

## Images

Original client photos live in `assets-source/`. The pipeline in
`scripts/prepare-images.mjs` produces everything under `public/images/`:

```bash
npm run images
```

It resizes, converts to WebP, honors EXIF rotation and then **strips all
metadata** (including any GPS coordinates from phone photos), and writes
`public/images/images-manifest.json` with the real output dimensions.

To add photos: drop the originals in `assets-source/photos/`, add an entry to
the `PHOTOS` array in the script, run `npm run images`, then reference the new
file from `content/gallery.ts` (or `content/services.ts`).

**Every photo on this site is a real photo of the owners' own work.** There is
no stock photography. Services with no photo yet (Commercial, Office,
Post-Construction) deliberately render a deep-green panel with the logo
monogram instead of borrowing an unrelated image.

### The logo

`assets-source/logo/` holds the original artwork as supplied — gold on a flat
dark-green mockup backdrop. The pipeline lifts the artwork off that backdrop
into a transparent PNG and crops the official monogram for the favicon. The
symbol, proportions, typography and composition are never altered; only the
backdrop is removed so the logo can sit on the site's own surfaces.

---

## Design system

Brand tokens live in the `@theme` block of `app/globals.css`.

| Token | Value | Source |
| --- | --- | --- |
| `--color-forest-900` | `#01271A` | Sampled from the logo backdrop |
| `--color-gold-500` | `#E1C277` | Sampled from the logo artwork |

The rest of each ramp is derived from those two anchors. Type is Cormorant
Garamond (display) over Urbanist (UI), both self-hosted from `app/fonts/`.

**Gotcha:** `components/ui/Button.tsx` sets a display value in its base classes.
Passing `hidden` through `className` will not reliably hide a button, because
Tailwind emits display utilities in a fixed order. Wrap it in a
`<span className="hidden sm:block">` instead.

---

## Accessibility & performance

- Skip-to-content link, semantic landmarks, labelled form fields with inline
  errors wired via `aria-invalid` and `role="alert"`.
- Mobile menu and gallery lightbox trap focus, close on `Escape`, and lock
  background scroll. The lightbox also supports arrow-key navigation.
- The before/after slider is driven by a real `<input type="range">`, so it
  works with a keyboard and announces itself to screen readers.
- Scroll reveals are skipped entirely under `prefers-reduced-motion`, and a
  `@media (scripting: none)` rule ensures content is never hidden when
  JavaScript does not run.
- The hero image is preloaded with `priority` + `fetchPriority="high"`;
  everything else is lazy-loaded.
- No animation library and no icon-font — icons are tree-shaken from
  `lucide-react`, with the two brand glyphs drawn inline.

Verified with no horizontal overflow and no console errors at 390px, 820px and
1440px.

---

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, **New Project → Import** the repository. The framework is detected
   automatically; no build settings need changing.
3. Add the environment variables from `.env.example`.
4. Deploy, then add the custom domain and set `NEXT_PUBLIC_SITE_URL` to match.
5. Submit `https://<your-domain>/sitemap.xml` in Google Search Console.

---

## Project structure

```
app/                    Routes, layout, API, sitemap, robots, icons, fonts
  api/quote/route.ts    Quote form endpoint
components/
  layout/               Header, MobileMenu, Footer, WhatsAppButton, PageHeader
  home/                 One file per homepage section
  services/             ServiceCard
  gallery/              GalleryLightbox
  forms/                QuoteForm
  legal/                LegalLayout
  seo/                  StructuredData (LocalBusiness / CleaningService / FAQPage)
  ui/                   Button, Logo, Reveal, SectionHeading, SocialIcons
content/                Editable site content
lib/                    site config, quote schema, firebase, helpers
scripts/                Image pipeline and font fetcher
assets-source/          Original client photos and logo (inputs, not served)
```
