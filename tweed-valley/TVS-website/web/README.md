# Tweed Valley Senduro — website

Next.js 14 (App Router) + Tailwind + Firebase Auth/Firestore + Stripe. Deploys on Vercel.

The site runs **without any keys** — public pages work, and auth/payments show a
friendly "not connected yet" message until you add env vars. That means you can
deploy first and wire up integrations later.

## Run locally

```bash
cd web
npm install
cp .env.example .env.local   # fill in when ready (optional to start)
npm run dev                  # http://localhost:3000
```

## What's built

**Public (no login):** Home, About, Schedule, Tickets, Venue, Maps, Trails
(+ per-trail pages), Things to do, FAQ.

**Account (login required):** Dashboard, Waiver, Briefing + quiz, Check-in QR code.

**Admin (role = admin):** Ops dashboard, shared to-do list. The whole site
switches to a darker "admin mode" background when an admin is signed in.

**API:** `/api/checkout` (Stripe Checkout), `/api/webhook` (records purchases).

## Editing content

Almost all copy lives in `src/lib/event.ts` — schedule, trails, FAQ, quiz,
venue zones, things to do. Edit there; no need to touch components.

Brand colours are in `tailwind.config.ts` (olive / send-orange / sand).

## Connecting Firebase

1. Create a Firebase project, add a Web app, enable Google + Email/Password auth.
2. Copy the web config into the `NEXT_PUBLIC_FIREBASE_*` vars.
3. Create a service account key → `FIREBASE_ADMIN_*` vars.
4. Deploy the Firestore rules in `firestore.rules`.
5. To make yourself admin: create your user doc, then set `role: "admin"` in the
   Firestore console (users self-register as `rider` and can't self-promote).

## Connecting Stripe

1. Add `STRIPE_SECRET_KEY` (test key to start).
2. For purchase recording, add a webhook to `/api/webhook` and set
   `STRIPE_WEBHOOK_SECRET`.
3. Ticket price/name is in `src/lib/stripe.ts` (`TICKET`). Placeholder £65.

**v1 ticketing is manual-match:** buyers enter every attendee's name + email at
checkout; these are stored on the Stripe session and in the `purchases`
collection so organisers can reconcile against waivers by hand.

## Deploy to Vercel

1. Push the repo to GitHub.
2. Import in Vercel, set **Root Directory** to `web`.
3. Add the env vars from `.env.example`.
4. Deploy. Auto-builds on push to `main`.
