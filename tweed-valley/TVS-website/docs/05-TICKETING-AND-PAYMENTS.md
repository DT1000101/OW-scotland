# Ticketing and payments

> **DECISION (v1): Manual matching.** Event is ~50 people. We do NOT auto-link payments to accounts.
> At checkout, the buyer enters the **name + email of every attendee** they're paying for.
> Organisers reconcile the Stripe attendee list against waiver/briefing completions by hand.
> As long as we have contact details for everyone, we can sort it out. No invite tokens, no
> dependent sub-records, no email-matching logic for v1. The detailed automated model below is
> kept for reference / future scale, but is **not** what we're building first.

## The problem

You need to know:
1. Who paid
2. Who completed waiver + briefing
3. Who showed up and got a chip
4. How parents register kids

And money needs to land in the **CIC bank account** with minimal faff.

---

## Recommended approach: Stripe Checkout + website accounts

**Simplest path that keeps everything linked.**

```
Buy ticket (Stripe) → email captured → create/login account → same email links ticket → waiver → briefing → QR
```

### Why Stripe direct (not Eventbrite etc.)

| Option | Pros | Cons |
|--------|------|------|
| **Stripe Checkout on your site** | Full control, webhook links payment to account, CIC owns Stripe account | You build the UI (minimal with Checkout) |
| **Ticket Tailor / Chobble / Tckt.uk** | Ready-made ticketing, QR check-in app | Harder to link to your waiver/briefing flow; two systems |
| **Eventbrite** | Easy | High fees, money delay, doesn't integrate with your site |

**Recommendation:** Stripe Checkout embedded or redirect. CIC opens a Stripe account, connects to website. Ticket purchase returns to your site to finish registration.

### CIC setup

1. Jess registers CIC (in progress)
2. CIC opens business bank account
3. CIC creates Stripe account (UK)
4. Stripe payouts → CIC bank account
5. Stripe handles VAT/receipts if needed (check with accountant)

No money passes through Dan's account or personal accounts.

---

## Ticket types (draft)

| Ticket | Who | Notes |
|--------|-----|-------|
| **Weekend rider** | Adult racer | Full access, waiver, briefing, chip, playlist |
| **Minor rider** | Under 18 | Parent buys + signs guardian waiver |
| **Spectator / camping only** | Non-racer | No chip; maybe no waiver if not riding |
| **Team entry** | 3–4 riders? | TBC — one payment or individual? |

Keep it to **1–2 ticket types** for v1. Add spectator later.

---

## Payment → account linking

### Important: purchase ≠ ticket ≠ account

One Stripe payment can include **multiple tickets**. Each ticket is a separate slot that must be **assigned** to a person before waiver/briefing/QR.

```
Purchase (1 payment)  →  Tickets (5 slots)  →  Each assigned to a person
                              ├── Mum (her account)
                              ├── Dad (his account, via invite)
                              ├── Kid 1 (dependent on Mum's account)
                              ├── Kid 2 (dependent)
                              └── Kid 3 (dependent)
```

### Flow A (recommended): Buy then register

1. User clicks "Buy ticket" → Stripe Checkout with **quantity selector** (1–10)
2. Stripe collects email, payment, quantity
3. Webhook (`checkout.session.completed`) writes to Firestore:
   ```
   purchases/{purchaseId}:
     buyerEmail, stripeSessionId, quantity: 5, paidAt
     buyerUid: null          // set when purchaser logs in
     ticketIds: [t1..t5]     // one record per ticket

   tickets/{ticketId}:
     purchaseId, status: 'unassigned'
     holderType: null        // 'user' | 'dependent'
     holderUid: null
     dependentId: null
     waiverSignedAt: null
     briefingCompletedAt: null
     qrCode: null
   ```
4. Redirect to `/register?session_id=xxx`
5. Purchaser signs in with Firebase (same email ideally)
6. API sets `purchases.buyerUid` and shows **"Assign your 5 tickets"**
7. Purchaser assigns each ticket (see family flow below)
8. Each person completes their own waiver/briefing path → gets their own QR

### Flow B: Register then buy

1. User creates account first
2. Buy ticket while logged in (quantity still supported)
3. Webhook links purchase directly to `buyerUid`
4. Same assignment step

**Support both.** Some people will do it in either order.

### Email mismatch

Admin dashboard shows unlinked purchases. Admin can manually link. Or user enters "order confirmation code" from Stripe receipt.

---

## Family buys 5 tickets — full flow

**Example:** Mum buys 5 weekend passes in one Stripe checkout for herself, Dad, and 3 kids.

### Step 1 — Payment creates ticket slots

Stripe charges once. Webhook creates **1 purchase** and **5 separate ticket records**. No people linked yet — just 5 empty slots owned by whoever claims the purchase.

### Step 2 — Purchaser claims the order

Mum logs in (Firebase email matches Stripe email). She sees:

> **Your order: 5 tickets**  
> Assign each ticket to who it's for.

### Step 3 — Assign each ticket

For each of the 5 tickets, Mum picks one of three options:

| Option | Who it's for | What happens |
|--------|--------------|--------------|
| **Me** | Mum (or whoever bought) | Ticket links to her account. She does adult waiver + briefing → QR. |
| **My household** | A child / dependent | Mum adds name + DOB. Ticket links to a **dependent** on her account (no login for the kid). Mum signs **guardian waiver** per child. Briefing once on Mum's account covers the household. Each child gets their own QR. |
| **Someone else** | Another adult (Dad, aunt, mate) | System sends an **invite link** to their email. They create their own account, claim that ticket, do their own waiver + briefing → their own QR. |

UI sketch:

```
Ticket 1 of 5  [ Me ▼ ]
Ticket 2 of 5  [ Send invite → dad@email.com ]
Ticket 3 of 5  [ Add dependent: "Coby", age 12 ]
Ticket 4 of 5  [ Add dependent: "Isaac", age 14 ]
Ticket 5 of 5  [ Add dependent: "Lily", age 10 ]
```

Mum can't finish until all 5 are assigned.

### Step 4 — Each person completes registration

| Person | Account | Waiver | Briefing | QR |
|--------|---------|--------|----------|-----|
| Mum | Her login | Adult waiver | Watch + quiz | ✅ |
| Dad | His login (claimed invite) | Adult waiver | Watch + quiz | ✅ |
| Each kid | Dependent on Mum's account | Guardian waiver (Mum signs) | Covered by Mum's briefing* | ✅ each |

\*Kids don't need to watch the video separately if Mum already passed the quiz — but each kid still needs a guardian waiver and their own QR/chip for check-in.

### Step 5 — Check-in on arrival

Mum's phone shows a **family view**: her QR + all dependents' QRs. Dad has his on his phone. Staff scan each one → issue named chip/wristband.

---

## Invite link flow (for other adults in the group)

When Mum assigns a ticket to "Someone else":

1. System creates `inviteTokens/{token}` → `{ ticketId, email, expiresAt }`
2. Email sent: *"Mum Smith sent you a Tweed Valley Senduro ticket. Claim it here."*
3. Link: `tweedvalleysenduro.com/claim/abc123`
4. Dad clicks → create account or log in → ticket attaches to his `uid`
5. Token is burned (one-time use)
6. Dad completes waiver + briefing on his account

If Dad already has an account, he just logs in and claims. If the invite email was wrong, Mum can cancel and re-send from her account, or admin fixes it.

---

## Data model (Firestore)

```
purchases/{purchaseId}
  buyerEmail: string
  buyerUid: string | null
  stripeSessionId: string
  quantity: number
  ticketIds: string[]
  paidAt: timestamp

tickets/{ticketId}
  purchaseId: string
  status: 'unassigned' | 'assigned' | 'checked_in'
  holderType: 'user' | 'dependent' | null
  holderUid: string | null          // purchaser's uid (for dependents too)
  dependentId: string | null         // users/{uid}/dependents/{id}
  inviteEmail: string | null
  waiverSignedAt: timestamp | null
  briefingCompletedAt: timestamp | null
  qrCode: string | null
  checkedInAt: timestamp | null

users/{uid}/dependents/{dependentId}
  name: string
  dateOfBirth: date
  ticketId: string
  guardianWaiverSignedAt: timestamp | null
  qrCode: string | null

inviteTokens/{token}
  ticketId: string
  sentToEmail: string
  createdByUid: string
  expiresAt: timestamp
  claimedAt: timestamp | null
```

---

## Edge cases

| Situation | Handling |
|-----------|----------|
| Mum buys 5, only assigns 3 | Dashboard shows 2 unassigned. Reminder email. Can't check in unassigned slots. |
| Dad never claims invite | Mum can resend or reclaim ticket to reassign |
| Kid turns 18 between purchase and event | Can send invite to kid's own email instead of dependent |
| One person not racing (spectator) | Different ticket type later; for v1 all tickets are rider passes |
| Mum bought tickets, mate pays her back | Irrelevant to system — one purchaser assigns all |
| Refund on 1 of 5 tickets | Admin voids that `ticketId`; partial refund via Stripe |
| Wrong quantity bought | Admin adjusts or Stripe refund + rebuy |

---

## Parent / child — rules

**Under-18 riders:**
- Must be a **dependent** on a guardian's account (or claim invite if 16+ with own email)
- Guardian signs waiver per child
- Guardian should be on site at check-in
- Each child gets own QR/chip regardless of age

**No login for young kids.** The parent's account is the hub. Parent sees all family QRs in one place.

### What we are NOT doing

Parent buys 5, checks in alone, says "my whole family is here" with no per-person waiver/QR. Too messy, no audit trail, insurance nightmare.

---

## Refunds and transfers

Decide early:
- **Refunds:** Before X date, full refund minus Stripe fee? Admin-only via Stripe dashboard.
- **Transfers:** "Can't make it, give my ticket to a mate" — admin reassigns `ticketId` to new uid, or ticket transfer code.

Don't build transfer self-serve for v1.

---

## Pricing notes from chat

- Glentress venue cost is reasonable but first aid, insurance, timing, etc. add up fast
- FLF charged ~$250 — UK probably less but don't underprice
- Limit tickets OR price up to control numbers (chat: "limiting tickets or pricing them up")
- Break-even goal — model costs in a spreadsheet before setting price

---

## Alternative: external ticketing + webhook

If Stripe feels like too much admin for Jess:

Use **Chobble Tickets** (£25/year charity rate) or **Tckt.uk** (5p/ticket):
- Sell tickets there
- Webhook on purchase → your API creates pending registration for that email
- User still logs in on your site for waiver/briefing

This splits payment from registration but is valid if CIC prefers a turnkey ticket shop.

---

## What to build first

1. Stripe Checkout with one "Weekend Pass" product (test mode)
2. Webhook → Firestore purchase record
3. Login → auto-link by email
4. Admin page: list purchases, waiver status, check-in status
5. Dependent form (phase 2)
