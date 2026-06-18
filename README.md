# Artlyo

Art marketplace MVP — born in Latvia, built for artists and collectors across Europe.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS 4**
- **next-intl** — EN, LV, RU, DE, NO
- **Supabase** (optional) — stores inquiries and seller applications
- **Vercel** — free hosting with custom domain

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en)

## Environment variables

Copy `.env.example` to `.env.local` and fill in Supabase keys when ready:

```bash
cp .env.example .env.local
```

Without Supabase, inquiry and seller forms still work — submissions are logged server-side.

### Supabase setup

1. Create a free project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL Editor
3. Add URL and `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`

## Deploy to artlyo.com (Vercel)

1. Push this repo to GitHub
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Add environment variables from `.env.example`
4. Deploy
5. In Vercel → Settings → Domains → add `artlyo.com` and `www.artlyo.com`
6. At your domain registrar, set DNS per Vercel instructions:
   - `www` → CNAME `cname.vercel-dns.com`
   - apex → A record `76.76.21.21` (or use Vercel nameservers)

## MVP scope

| Working | Demo / coming soon |
|---------|-------------------|
| Browse artworks, filters, search | Live auctions (preview UI) |
| Artist profiles | Stripe checkout |
| Purchase inquiry form | Seller dashboard |
| Seller application form | Real-time chat |
| 5 languages, EUR pricing | Admin panel (use Supabase dashboard) |

## Locales

- `/en` English (default)
- `/lv` Latviešu
- `/ru` Русский
- `/de` Deutsch
- `/no` Norsk

## License

Private — Artlyo
