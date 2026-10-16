# Auth and roles

## Design principle

**Public by default.** Schedule, tickets, maps, and trail info are visible without logging in. Login exists for waiver, briefing, and linking your ticket to you — not to hide basic event info.

---

## Auth provider: Firebase

- **Google sign-in** — fastest for most riders
- **Email + password** — for people without Google
- **Magic link** (optional later) — reduces password friction

### User document (Firestore: `users/{uid}`)

```typescript
{
  uid: string
  email: string
  displayName: string | null
  role: 'rider' | 'admin' | 'marshal'  // default: 'rider'
  createdAt: timestamp
  ticketId: string | null              // linked after purchase
  waiverSignedAt: timestamp | null
  briefingCompletedAt: timestamp | null
  qrCode: string | null                // generated after briefing pass
  dependents: string[]                 // uids of child accounts, if any
  guardianUid: string | null           // if this is a minor account
  playlistSongs: string[]              // max 3
}
```

---

## Roles

| Role | Can see | Can do |
|------|---------|--------|
| **Anonymous** | All public pages | Buy ticket (Stripe), create account |
| **Rider** | Public + My Account, Waiver, Briefing, QR | Sign waiver, complete briefing, add playlist songs |
| **Marshal** | Rider + check-in scanner, segment status | Scan QR codes, mark chip issued (optional phase) |
| **Admin** | Everything + todos, sales dashboard, locked ops notes | Manage todos, view registrations, assign roles |

### Admin mode (UI)

When `role === 'admin'`:
- Page background uses admin theme (e.g. `#2a3328` vs public `#1e2a1f` — subtle but obvious)
- Admin nav link appears: "Ops"
- Admin pages return 404 for non-admins (not just hidden links)

Admins are set manually in Firestore initially. No self-serve admin signup.

---

## Simpler alternative considered

**Single role + feature flags** instead of marshal/admin split:
- `isAdmin: boolean` on user doc
- Marshal check-in is just admin on a phone

**Recommendation:** Start with `rider` and `admin` only. Add `marshal` if you need volunteers to scan QR codes without seeing financials.

---

## Session flow

```
Visitor → Browse site (no auth)
       → Buy ticket on Stripe
       → Redirect back with ?session_id=...
       → Prompt: "Create account or log in to complete registration"
       → Match Stripe customer email to Firebase account
       → Waiver → Briefing → Quiz → QR code unlocked
```

If someone buys a ticket before creating an account:
- Stripe webhook stores `purchases/{sessionId}` with email
- On first login, match email → link `ticketId`
- If emails differ (bought with work email, login with personal): manual fix in admin or "link ticket code" input

---

## Security notes

- Firebase rules: users read/write own doc; admins read all; public read on `events/*` and `trails/*`
- Admin operations (role changes) only via Firebase Admin SDK in API routes
- QR codes: UUID v4, not guessable; store hash if paranoid
- Never expose Stripe secret key client-side

---

## What login is NOT for

- Viewing the schedule
- Seeing ticket prices
- Reading trail guides or maps
- Checking results after event (public leaderboard page, no login)

This matches the chat: "login for public is only to do the digital waiver and digital briefing."
