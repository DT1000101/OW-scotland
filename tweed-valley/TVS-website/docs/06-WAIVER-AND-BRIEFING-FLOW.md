# Waiver and briefing flow

## Overview

```
Ticket purchased → Account created → Waiver signed → Briefing watched → Quiz passed → QR code issued → Check-in on arrival → Chip/band issued
```

Nothing on race morning should require a queue for paperwork if people do their homework online.

---

## Step 1: Ticket confirmed

User sees in My Account:
- ✅ Ticket paid
- ⬜ Waiver
- ⬜ Briefing
- ⬜ QR code

---

## Step 2: Digital waiver

### Adult racer
- Standard event waiver (legal text from insurer — **needs solicitor/insurance template**)
- Scroll-through or section-by-section
- Checkbox per section: "I have read and agree"
- Signature: typed name + date (legally acceptable for many UK event waivers; confirm with insurer)
- Store: `waiverSignedAt`, `waiverVersion`, `signatureName`, IP address

### Minor racer (via guardian)
- Parent logged in
- Select dependent
- Guardian waiver: "I am the parent/guardian of [name], I consent to their participation..."
- Parent signs; minor's record updated
- **Requirement:** Parent/guardian on site at check-in (stated clearly in waiver text)

### Waiver versioning
- If waiver text changes, bump `waiverVersion`
- Users who signed old version prompted to re-sign

---

## Step 3: Digital briefing

### Content (prerecorded video, 5–10 min)
- Welcome, what TVS is
- Weekend schedule overview
- Practice vs race day rules
- One run per segment on Sunday
- Times hidden until prize giving
- Helmet + wrist guards required
- Segment map explanation
- Hub location, charging, what to do if injured
- Emergency contacts

### Delivery
- Hosted on website (YouTube unlisted embed is fine initially)
- Also plays on loop at physical hub every 30 min
- User must watch to end (or minimum time) before quiz unlocks

**Don't** force a new accept button every 5 minutes (chat rejected this). One video + quiz at the end is enough.

---

## Step 4: Quiz (5 questions, example)

Must score 100% (or 4/5 with retry). Questions like:

1. What time do timed segments open on race day? → 10:30
2. How many timed runs do you get per trail on race day? → One
3. When are individual times published? → Prize giving
4. Name one trail used in the enduro → (accept any from list)
5. What safety gear is required? → Helmet and wrist guards

On pass:
- `briefingCompletedAt` set
- Generate unique `qrCode` (UUID)
- Show QR on screen + email PDF/image
- Status: ✅ Ready for check-in

---

## Step 5: Check-in (arrival)

### Option A: Self-serve kiosk
- Scan QR at hub tablet
- Staff verifies ID if needed
- Issue SI card / wristband / race number

### Option B: Staff scanner (admin/marshal page)
- Phone camera scans QR
- Shows: name, ticket type, waiver ✅, briefing ✅, dependents
- Tap "Issue chip" → marks `checkedInAt`

### Night-before check-in
Surrey event did band pickup night before — chat liked this. Offer optional early check-in Friday evening if staff available.

---

## QR code contents

Keep it simple:
```
https://tweedvalleysenduro.com/checkin/{uuid}
```

Or encode UUID only; scanner looks up in Firestore.

**Do not** put personal data in the QR itself.

---

## Edge cases

| Situation | Handling |
|-----------|----------|
| Completed waiver but not briefing | QR blocked; prompt to finish briefing |
| Bought ticket, no account yet | Email reminder with link to register |
| Parent, 2 kids, 1 bought 3 tickets | Link all on parent account as dependents |
| Waiver done, ticket refunded | Admin invalidates QR |
| Someone skips online waiver | Fallback paper waiver at hub (have copies) — but discourage |
| Phone dead at check-in | Look up by name/email in admin |

---

## Email touchpoints

| Trigger | Email |
|---------|-------|
| Ticket purchased | "Complete your registration" + link |
| Waiver done, briefing pending | Reminder (3 days before) |
| All complete | QR code attached |
| 1 week before | Schedule + what to bring |
| Day before | "See you tomorrow" + hub map |

Use Resend, SendGrid, or Firebase Trigger Email extension.

---

## What the chat wanted (checklist)

- [x] Online waiver — not a separate app
- [x] Briefing video — prerecorded, available before arrival
- [x] Short quiz — not annoying tick every 5 min
- [x] QR code after completion — scanned for chip issue
- [x] Register night before or online — reduce race morning queue
- [x] Unique QR per person
- [x] Email confirmation

---

## Legal note

Get waiver text approved for:
- CIC as organiser
- Glentress as landowner (they may have their own participation terms)
- Your public liability insurer

Don't ship waiver text without sign-off. Use placeholder in boilerplate.
