# Website plan

## Goal

One website for everything: public info for anyone, account features for ticket holders, admin tools for organisers. Deploy on Vercel from the repo. No separate event app.

---

## Recommended stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js** (App Router) | Vercel-native, SSR for SEO, API routes for webhooks |
| Auth | **Firebase Authentication** | Google + email/password, well documented, free tier fine for event scale |
| Database | **Firestore** | Pairs with Firebase; good for users, tickets, waiver status, admin todos |
| Payments | **Stripe Checkout** → CIC bank via Stripe account | Simplest to link payment → email → account (see doc 05) |
| Hosting | **Vercel** | Direct git deploy |
| Maps | Static images + optional Mapbox/Leaflet later | Start with placeholder maps and labelled zones |
| Video | YouTube unlisted or Cloudflare Stream | Trail guides don't need to be on your CDN day one |

Firebase is a good fit. You'll add your Firebase config via environment variables on Vercel — never commit API keys.

---

## Site map

### Public (no login)

| Page | Content |
|------|---------|
| **Home** | Logo, date (TBC), short pitch, CTA to tickets + login |
| **About** | What TVS is, who runs it, CIC note |
| **Schedule** | Day-by-day overview (from doc 02) |
| **Tickets** | Prices, what's included, buy button → Stripe Checkout |
| **Venue** | Glentress info, camping, pods, how to get there |
| **Maps** | Venue zones, trail map (placeholder), Peebles routes, charging spots |
| **Trail guides** | List of segments with placeholder video embeds |
| **Things to do** | Peebles pubs, Go Ape, local walks, unicorn hunt rules |
| **FAQ** | Gear, categories, timing, weather, refunds |
| **Contact** | Email / social links |

### Account (login required)

| Page | Content |
|------|---------|
| **My account** | Profile, ticket status, dependents |
| **Waiver** | Digital waiver form + guardian section for minors |
| **Briefing** | Video + short quiz |
| **My QR code** | Shown after waiver + briefing complete; email copy |
| **Playlist** | Add up to 3 songs (if ticket holder) |

### Admin (role: admin)

| Page | Content |
|------|---------|
| **Dashboard** | Registrations, waiver completion %, ticket sales |
| **Todos** | Shared checklist for organisers |
| **Check-in** | QR scanner view (phone camera) |
| **Locked notes** | Ops info not public (marshal contacts, radio channels, etc.) |

**Admin mode UX:** When logged in as admin, site background shifts (e.g. dark olive → slightly different tint or subtle border). Admin nav items appear. Regular users never see them.

---

## Content guidelines

- Short sentences. Plain language.
- Write like you're telling a mate what to bring, not like a marketing page.
- Avoid: "nestled", "epic adventure awaits", "whether you're a seasoned rider or just starting out".
- OK: "Practice opens at 10:30. Race day is one run per trail. Helmet and wrist guards required."

**Placeholder content:** Use `initialStuff/initalMediaAssets/demo_logo.jpeg` and grey boxes labelled "Trail map coming soon" until real assets exist.

---

## Virtual trail guides

Per segment (when trails are chosen):

- 30–90 second video: start, key features, finish
- Trail name, grade, approximate length
- "Watch before you ride" note
- Released on website when segments are announced (practice morning or a few days before)

Can be filmed on scoping trips. Dan/Nico to shoot; James optional voiceover.

---

## Maps (phased)

**Phase 1 (boilerplate):**
- Static venue zone diagram (hub, camping, skills area, food)
- List of key locations with ride time estimates (placeholder numbers)

**Phase 2:**
- Glentress trail map overlay with segment markers
- Peebles path route map
- Charging location pins

**Phase 3:**
- Interactive map (Mapbox/Leaflet) if needed

---

## Repo structure (proposed)

```
TweedValleySenduro/
├── docs/                    # planning docs (this folder)
├── initialStuff/            # chat export, logo, assets
├── web/                     # Next.js app
│   ├── app/
│   │   ├── (public)/        # public pages
│   │   ├── (account)/       # auth-gated pages
│   │   ├── (admin)/         # admin-gated pages
│   │   └── api/             # Stripe webhooks, etc.
│   ├── components/
│   ├── lib/                 # firebase, stripe helpers
│   └── public/              # static images
├── vercel.json
└── README.md
```

---

## Vercel deployment

1. Push repo to GitHub
2. Import project in Vercel → root directory: `web`
3. Add env vars: `NEXT_PUBLIC_FIREBASE_*`, `FIREBASE_ADMIN_*`, `STRIPE_*`
4. Auto-deploy on push to `main`

---

## Build phases

### Phase 1 — Boilerplate (now)
- Next.js scaffold, TVS branding, all public pages with placeholder content
- Firebase auth (Google + email)
- Admin role flag in Firestore + background toggle
- Deploy to Vercel

### Phase 2 — Registration flow
- Stripe Checkout integration
- Waiver + briefing + quiz
- QR code generation
- Parent/dependent accounts

### Phase 3 — Content
- Real trail videos, maps, schedule dates
- Playlist feature
- Admin check-in scanner

### Phase 4 — Polish
- Email notifications (Firebase Extensions or Resend)
- Ticket transfer / waitlist if needed
