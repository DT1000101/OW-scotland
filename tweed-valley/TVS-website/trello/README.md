# TVS Trello

Target board: [TVS — OW Scotland](https://trello.com/b/YnZDCT0g/tvs-ow-scotland)  
Board id: `6acfad99aba36ddc16ab13b7`

## For the local agent

1. Pull latest `main`.
2. Ensure this machine has the handoff scripts + secrets (not in git):
   - `trello/.env`
   - `trello/CONTEXT.md`, `AGENTS.md`, `board.py`, `trello_client.py`, `requirements.txt`
   - `.cursor/rules/tvs-trello.mdc`
3. Open `trello/LOCAL-AGENT-PROMPT.md` and paste that prompt into a **local** Cursor agent.

## In git (this folder)

| Path | Purpose |
|------|---------|
| `LOCAL-AGENT-PROMPT.md` | Copy-paste prompt for local agent |
| `board-seed.json` | First-pass lists/cards/checklists (28 cards) |
| `sources/` | Notebook + FLS notes + screenshots |

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
