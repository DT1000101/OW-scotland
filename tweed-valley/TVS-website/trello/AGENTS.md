# TVS — OW scotland — agent notes

Trello board tooling lives in this folder. Credentials and IDs are in `.env` (gitignored). Full handoff context is in `CONTEXT.md`.

Board: https://trello.com/b/YnZDCT0g/tvs-ow-scotland
Workspace: **Dans workspace** (Dan’s own org). The token is the same one used for Onewheel Algarve, so it can also see The Team boards. **Only edit this board** unless Dan explicitly names another one.

## AI / Cursor marking

Cards created or changed by an agent **must** have the sky **Cursor** label (`TRELLO_LABEL_CURSOR` in `.env`).

```bash
# create (auto-labels; needs a list id in .env)
.venv/bin/python board.py create "My card" --list todo

# after editing an existing card in Python
from trello_client import TrelloClient
TrelloClient().tag_cursor("<card_id>")
```

`ensure_cursor_label()` creates the sky Cursor label on **this** board and writes the id back into `.env`. Do not reuse the Onewheel Algarve label id.

## Ownership

Dan owns this board. Four people are members: Dan Turner, Jessica Jones, Mollie Stuart, and Nico Stuart. Do not remove them. Do not edit The Team / Onewheel Algarve cards from this project.

Keep cards short and actionable (checklist, not essays).

Prefer archive over delete unless Dan asks to delete.

For a non-trivial edit on an existing card, add a short comment: `Updated via Cursor`.
