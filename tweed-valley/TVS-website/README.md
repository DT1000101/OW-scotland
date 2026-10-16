# Tweed Valley Senduro

OneWheel enduro weekend at Glentress Mountain Bike Resort.

**Status:** Boilerplate built  
**Target:** 2027

## Project structure

```
TweedValleySenduro/
├── docs/              ← planning docs (start here)
├── initialStuff/      ← WhatsApp chat export, logo, media
└── web/               ← Next.js site (built — see web/README.md)
```

## Run the site

```bash
cd web
npm install
npm run dev   # http://localhost:3000
```

The site works with no keys (public pages). Add Firebase and Stripe keys later
to switch on accounts and payments. See [web/README.md](./web/README.md).

## Start here

Read [docs/00-PROJECT-INDEX.md](./docs/00-PROJECT-INDEX.md) for the full doc list.

Key docs:
- [Context from planning chat](./docs/01-CONTEXT-FROM-CHAT.md)
- [Website plan](./docs/03-WEBSITE-PLAN.md)
- [Ticketing & payments](./docs/05-TICKETING-AND-PAYMENTS.md)
- [Waiver & briefing flow](./docs/06-WAIVER-AND-BRIEFING-FLOW.md)
- [Docs to create checklist](./docs/09-DOCS-TO-CREATE.md)

## Brand

- **Name:** Tweed Valley Senduro (TVS)
- **Colours:** Dark olive green, orange, cream
- **Logo WIP:** `initialStuff/initalMediaAssets/demo_logo.jpeg`

## Next steps

- Add Firebase + Stripe keys to `web/.env.local` (see `web/.env.example`)
- Push to GitHub and import into Vercel (root directory: `web`)
- Fill in real dates, trail list, and media as scoping trips happen
