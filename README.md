# Braxen Tech — Next.js

Marketing site for Braxen Tech, migrated from TanStack Start to Next.js (App Router). No Lovable dependencies.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number in international format (digits only, e.g. `33612345678`) |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run production server locally |
| `npm run lint` | ESLint |

## Deploy on Vercel

1. Import the repository in [Vercel](https://vercel.com/new).
2. Set **Root Directory** to `braxen-next` (if the repo contains `capitolium-clone` and other folders at the root).
3. Framework preset: **Next.js** (auto-detected).
4. Add `NEXT_PUBLIC_WHATSAPP_NUMBER` in Project Settings → Environment Variables.
5. Deploy.

The included [`vercel.json`](vercel.json) documents the framework; Vercel usually does not require extra config for a standard Next.js app.

## Project structure

```
src/
  app/           # App Router (page, layout, error boundaries)
  components/    # HomePage, ContactForm, Portfolio, Leadership
  assets/        # Images (hero video is in public/)
  lib/           # Utilities (cn, imageSrc)
public/          # Static files (hero-city.mp4)
```

## Legacy app

The previous TanStack Start + Lovable stack remains in `../capitolium-clone/` until this project is validated in production.
