# TVS Trello

Target board: [TVS — OW Scotland](https://trello.com/b/YnZDCT0g/tvs-ow-scotland)  
Board id: `6acfad99aba36ddc16ab13b7`

## For the local agent

1. Pull latest `main`.
2. On this machine, `trello/.env` must exist (gitignored). It is not in git. The client, `CONTEXT.md`, `AGENTS.md`, and the Cursor rule are.
3. Open `trello/LOCAL-AGENT-PROMPT.md` before changing the board. The board already has its 7 lists and 28 cards. `populate_seed.py` aborts if cards are already there.

## In git (this folder)

| Path | Purpose |
|------|---------|
| `LOCAL-AGENT-PROMPT.md` | Copy-paste prompt for local agent |
| `board-seed.json` | First-pass lists/cards/checklists (28 cards) |
| `board.py`, `trello_client.py`, `list_boards.py`, `populate_seed.py` | Local Trello client |
| `requirements.txt`, `.env.example`, `AGENTS.md`, `CONTEXT.md` | Setup and handoff |
| `sources/` | Notebook + FLS notes + screenshots |

The Cursor rule for this repo is `.cursor/rules/tvs-trello.mdc` at the monorepo root.

## Lists (left → right)

To Do · Venue · Legal / money · Race · Website · Marketing · Waiting

## Seed list counts

| List | Cards |
|------|------:|
| To Do | 3 |
| Venue | 8 |
| Legal / money | 5 |
| Race | 4 |
| Website | 3 |
| Marketing | 3 |
| Waiting | 2 |
| **Total** | **28** |
