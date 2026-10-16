# Master checklist — docs and content to create

Everything the website and event need. Status: **not started** unless noted.

---

## Website content (public pages)

### Home
- [ ] Hero image (trail or Glentress — placeholder OK)
- [ ] One-paragraph event description
- [ ] Date (TBC placeholder)
- [ ] CTAs: Tickets, Schedule, Trail guides

### About
- [ ] What TVS is (2–3 short paragraphs)
- [ ] Organiser bios (optional, short)
- [ ] CIC / non-profit note
- [ ] "Presented by OneWheel Scotland" line

### Schedule
- [ ] Arrival day
- [ ] Practice day × 2
- [ ] Race day
- [ ] Departure day
- [ ] Side activities (bingo, team race, endurance)

### Tickets
- [ ] Ticket types and prices (TBC)
- [ ] What's included
- [ ] Refund policy
- [ ] Minor / guardian policy summary
- [ ] Buy button

### Venue
- [ ] Address and directions
- [ ] Parking
- [ ] Camping options (field, pods, cabins)
- [ ] Shower / toilet info
- [ ] Links to Glentress booking pages

### Maps
- [ ] Venue zone map (hub, skills, food, camping)
- [ ] Trail map with segment markers (placeholder)
- [ ] Peebles route map
- [ ] Charging locations
- [ ] Ride times between key spots

### Trail guides
- [ ] One page per segment (6+ placeholders)
- [ ] Video embed per trail (placeholder)
- [ ] Trail grade, length, notes

### Things to do
- [ ] Peebles pubs and cafes (with "we emailed ahead" note)
- [ ] Go Ape
- [ ] Local walks / attractions
- [ ] Unicorn hunt rules
- [ ] Suggested evening routes

### FAQ
- [ ] What board can I ride?
- [ ] Do I need a helmet?
- [ ] Can kids race?
- [ ] What if it rains?
- [ ] When do I get my times?
- [ ] Can I camp?
- [ ] How does online registration work?

### Contact
- [ ] Event email
- [ ] Social links (OneWheel Scotland, etc.)

---

## Website features (build)

- [ ] Next.js boilerplate
- [ ] TVS branding / theme (green, orange, cream)
- [ ] Firebase auth (Google + email)
- [ ] Admin role + background toggle
- [ ] Stripe Checkout (test mode)
- [ ] Purchase webhook → Firestore
- [ ] Waiver form
- [ ] Briefing video page
- [ ] Quiz component
- [ ] QR code generation
- [ ] My Account dashboard
- [ ] Dependent registration (parent/child)
- [ ] Admin: registration list
- [ ] Admin: todo list
- [ ] Admin: QR scanner
- [ ] Playlist song submission (3 per ticket)
- [ ] Vercel deployment

---

## Legal and operational docs (not on public site)

- [ ] Event waiver (adult) — **legal review**
- [ ] Guardian waiver (minor) — **legal review**
- [ ] Risk assessment (Jess)
- [ ] Event management plan for Glentress
- [ ] Emergency contact list
- [ ] Marshal briefing doc
- [ ] First aid plan
- [ ] Insurance certificate
- [ ] Budget / break-even spreadsheet
- [ ] Sponsor pack (for Fungineers etc.)
- [ ] Volunteer shift rota template
- [ ] Radio channel plan
- [ ] Incident report form
- [ ] Refund / cancellation policy (full version)

---

## Media assets

- [x] Logo WIP (`initialStuff/initalMediaAssets/demo_logo.jpeg`)
- [ ] Final logo (map pin, readable at small size)
- [ ] Favicon
- [ ] Social share image (OG image)
- [ ] Business cards design (Mollie)
- [ ] Trail guide videos (per segment)
- [ ] Briefing video (prerecorded)
- [ ] Venue photos from scoping trip
- [ ] Placeholder images for web (trails, hub, camping)

---

## Briefing video script (outline)

- [ ] Welcome
- [ ] Schedule summary
- [ ] Practice rules
- [ ] Race day rules (one run, hidden times)
- [ ] Safety gear
- [ ] Hub location
- [ ] Injury procedure
- [ ] Charging
- [ ] Unicorn hunt mention
- [ ] Peebles / evening activities

---

## Quiz questions (finalise 5–10)

- [ ] Draft in doc 06
- [ ] Legal/safety questions approved
- [ ] Answer key in admin only

---

## Email templates

- [ ] Ticket purchased — complete registration
- [ ] Waiver/briefing reminder
- [ ] Registration complete — QR attached
- [ ] One week to go
- [ ] See you tomorrow
- [ ] Results published

---

## Physical / on-site materials

- [ ] QR check-in signage
- [ ] Hub briefing loop (tablet/TV)
- [ ] Schedule poster (large format)
- [ ] Segment map poster
- [ ] Marshals: start/finish signs
- [ ] Unicorn hunt cards for businesses
- [ ] Bingo cards and prizes
- [ ] Paper waiver backup copies
- [ ] Race numbers / thigh stickers
- [ ] Merch (shirts, stickers)

---

## Priority order for boilerplate

1. Project index + context docs ✅
2. Next.js site shell with public pages + placeholders
3. Firebase auth
4. Admin mode
5. Stripe test checkout
6. Waiver + briefing + quiz flow
7. Real content as scoping trips happen
