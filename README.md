# Gelateria Folini

Website for Gelateria Folini (Piazzale Merizzi 1, Sondrio). Astro on Cloudflare Workers, D1 for content, R2 for photos.

## Run locally

```
npm install
npm run dev
```

The site opens at http://localhost:4321. The database and the photo bucket are emulated locally (`.wrangler/`), and the tables and starter content are created on the first request. On Windows the local Cloudflare runtime needs the Microsoft Visual C++ Redistributable (x64).

The admin area is at `/admin`. Its password and the session secret live in `.dev.vars` (not committed); see `.dev.vars.example`.

## Where things are

- `src/views/` – the public pages (home, menu, contact), shared by the Italian and English routes in `src/pages/`
- `src/pages/admin/` – the admin area: Oggi, Menu, Diario, Orari
- `src/lib/db.ts` – tables and queries; `src/lib/seed.ts` – starter content (samples to confirm with Max)
- `src/lib/season.ts` – open/closed/winter logic, Europe/Rome time
- `src/lib/i18n.ts` – all public copy, Italian and English
- `src/lib/site.ts` – address, phone, links, VAT number
- `src/styles/global.css` – design tokens and public styles; `admin.css` – admin styles

## Deploy

1. `npx wrangler d1 create folini` and paste the id into `wrangler.jsonc`
2. `npx wrangler r2 bucket create folini-media`
3. `npx wrangler secret put ADMIN_PASSWORD` and `npx wrangler secret put SESSION_SECRET`
   - optional, for the "Genera con AI" buttons in the admin: `npx wrangler secret put ANTHROPIC_API_KEY` (locally: add `ANTHROPIC_API_KEY=...` to `.dev.vars`). Without it the buttons show a "not active" message and everything else works.
4. `npm run build` then `npx wrangler deploy`

## Before launch

- Confirm with Max: flavour list and descriptions, season dates, opening hours, his story on the home page
- Put the real VAT number in `src/lib/site.ts`
- Get Max's approval for his portrait (`public/img/max.webp`)
