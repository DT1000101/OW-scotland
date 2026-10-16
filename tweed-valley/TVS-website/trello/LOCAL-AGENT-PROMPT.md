# Prompt for local TVS agent (copy everything below the line)

---

Set up the TVS Trello board and do the first populate. Read `trello/CONTEXT.md`, `trello/AGENTS.md`, and `.cursor/rules/tvs-trello.mdc` before you touch the API.

**Board (only this one):** https://trello.com/b/YnZDCT0g/tvs-ow-scotland  
Credentials are already in `trello/.env`. Do not edit The team (Onewheel Algarve) or the empty TVS board in The Team Workspace. Do not commit `.env`.

A first-pass board plan is already in the repo — use it, then improve it from the sources:

- `trello/board-seed.json` — proposed lists + 28 cards with checklists (starting point; merge/move/rewrite freely)
- `trello/sources/NOTEBOOK-NOTES.md` + images in `trello/sources/images/`
- `trello/sources/FLS-MEETING-NOTES.md`
- `docs/01-CONTEXT-FROM-CHAT.md`, `docs/02-EVENT-OVERVIEW.md`, `docs/08-OPEN-QUESTIONS.md`, `docs/09-DOCS-TO-CREATE.md`

### Setup

1. From `trello/`: create `.venv`, `pip install -r requirements.txt`, run `board.py status`. Confirm the board id is `6acfad99aba36ddc16ab13b7` and that you are Dan Turner.
2. The board may be empty. Create these columns, left to right: **To Do, Venue, Legal / money, Race, Website, Marketing, Waiting**. To Do is the default.
3. Write each list id into `trello/.env` (`TRELLO_DEFAULT_LIST_ID` = To Do). Add matching shortcuts in `trello/trello_client.py` `LIST_ENV` so `board.py --list` works. Skip the old Algarve day columns (Thu–Sun); this event has no locked multi-day columns yet.
4. Let the client create the sky **Cursor** label on this board and save `TRELLO_LABEL_CURSOR`. Never paste the Algarve label id.

### Populate

- Prefer applying / adapting `trello/board-seed.json` rather than inventing a second plan from scratch.
- From `docs/08-OPEN-QUESTIONS.md`: one short card per open checkbox (or merge into seed cards), matching list. Title = action. Description = one line of context + doc source. Decisions in the “don’t re-litigate” table are **not** cards.
- From `docs/09-DOCS-TO-CREATE.md`: only items that need a person soon (domain, CIC, insurance, logo, Glentress date, SportIdent quote). Do not mirror every website section as a card.
- From notebook + FLS notes: fold costs into checklists (not 17 cost cards); put FLS-owned items in **Waiting**.
- Use `docs/01` + `docs/02` so wording matches decisions already made. Do not reopen those decisions.
- Feel free to move cards, join duplicates, and keep the board scannable — not overwhelming.

### Rules

- Every card you create gets the Cursor label.
- Checklists, not essays.
- No theme manifesto card.
- Archive rather than delete.
- No “Updated via Cursor” comment on a brand-new card.

### When finished

Run `board.py status` and `board.py cards` and reply with the list counts plus anything you skipped because the docs disagreed (e.g. site date Sat 1–Sun 2 May 2027 vs docs still saying date TBC; Twitcher may be unavailable).
