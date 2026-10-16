# Handoff context — TVS - OW scotland

Packed 2026-10-14 from the Onewheel Algarve tooling in `randomDesktopThings/onewheel-algarve-trello/`.

Dan is setting up a new Onewheel event (Scotland) on his **own** Trello workspace, in a separate project. This zip is so that project can talk to Trello with the same account.

## Keys

No new API key or token is required.

A Trello API key belongs to the Power-Up, and the token belongs to the **user** (`@danturner5`), with scope `read,write,account`. Moving a board between workspaces does not invalidate them. The same `.env` credentials that drive the Onewheel Algarve scripts can read and write this board. That was checked live on 2026-10-14.

The token can also see every other board on the account, including **The team** in The Team Workspace. Scripts here must follow `TRELLO_BOARD_ID` and stay on Scotland.

## What this is

- Trello user: **Dan Turner** (`@danturner5`, id `6a5fc18786c2d7e1cbf0e4d4`)
- Workspace: **Dans workspace** (id `6a665bc81d9283a52f979666`)
- Board: **TVS - OW scotland**

| | Leave alone | This project |
|---|---|---|
| Workspace | The Team Workspace | Dans workspace |
| Board | The team | TVS - OW scotland |
| URL | https://trello.com/b/ofyx5226/the-team | https://trello.com/b/YnZDCT0g/tvs-ow-scotland |
| Board id | `6a5deb679384aa90c5bc7a35` | `6acfad99aba36ddc16ab13b7` |

There is also an earlier empty board, **TVS**, still in The Team Workspace: https://trello.com/b/YVfsqST7/tvs (`6acfacb04a60900e27ce2cd6`). That is not this project. Do not write to it.

## Board state when this was packed

Checked live on 2026-10-14, before the columns existed:

- Board exists, open, in Dans workspace
- No lists and no cards yet
- Only member then: Dan Turner
- No Cursor label yet

That was the handoff. It is not the board now.

## Board state now

Checked live on 2026-10-16. Do not recreate the columns or re-seed the cards.

- 7 lists, left to right: To Do, Venue, Legal / money, Race, Website, Marketing, Waiting
- 28 open cards, matching `board-seed.json`
- Four members: Dan Turner (`danturner5`), Jessica Jones (`jessicajones17`), Mollie Stuart (`molliestuart`), Nico Stuart (`nicostuart1`)
- Sky **Cursor** label already exists. `TRELLO_LABEL_CURSOR` in `.env` is that label. Do not create a second one.

`populate_seed.py` is still the seeder. It aborts when the board already has open cards.

Shortcuts in `trello_client.py`: `todo`, `venue`, `legal`, `race`, `website`, `marketing`, `waiting`. The Algarve names (`designs`, `content`, day columns) are not on this board.

## How the agent is supposed to work

1. Use `trello_client.py` / `board.py`. Don’t hand-roll API calls.
2. Every card the agent creates or meaningfully changes gets the sky **Cursor** label. `create_card(..., tag_cursor=True)` is the default. After other edits, call `tag_cursor(card_id)`.
3. The Cursor label is **per board**. The OWA label id must not be pasted into this `.env`. This board already has its sky “Cursor” label; `TRELLO_LABEL_CURSOR` points at it. `ensure_cursor_label()` only creates one if that id is missing.
4. Non-trivial edits get a short comment: `Updated via Cursor`.
5. Cards stay short and actionable. Checklists, not essays. No theme-manifesto cards.
6. Archive rather than delete, unless Dan says delete.
7. Never commit `.env`.
8. Do not edit The Team boards from this project.

The Cursor rule is installed at `OW-scotland/.cursor/rules/tvs-trello.mdc`. Tooling lives in `tweed-valley/TVS-website/trello/`.

## What was left out of the zip

OWA-only material stayed in the old project:

- `THEME.md` (OWA 2026 theme: Land of the Trails)
- Day-card / chat-gap scripts, the coach chat dump, the prize allocator
- `board_snapshot.json` for The team

Jessica Jones, Mollie Stuart, and Nico Stuart are members of this board. Only Dan’s member id is stored in `.env`. Fabio is on the Algarve board, not this one.

## Auth note

`.env` has a live key and a never-expiring user token. Treat the zip like a password. If it gets shared or committed, revoke the token at https://trello.com/power-ups/admin and issue a new one.
