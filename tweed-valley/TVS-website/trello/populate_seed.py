#!/usr/bin/env python3
"""Create TVS lists (if missing) and apply board-seed.json once."""

from __future__ import annotations

import json
import sys
from pathlib import Path

from trello_client import LIST_ENV, TrelloClient, board_id, env

SEED_PATH = Path(__file__).resolve().parent / "board-seed.json"

LIST_ORDER = [
    "To Do",
    "Venue",
    "Legal / money",
    "Race",
    "Website",
    "Marketing",
    "Waiting",
]

LIST_ENV_KEYS = {
    "To Do": "TRELLO_LIST_TO_DO",
    "Venue": "TRELLO_LIST_VENUE",
    "Legal / money": "TRELLO_LIST_LEGAL_MONEY",
    "Race": "TRELLO_LIST_RACE",
    "Website": "TRELLO_LIST_WEBSITE",
    "Marketing": "TRELLO_LIST_MARKETING",
    "Waiting": "TRELLO_LIST_WAITING",
}


def persist(client: TrelloClient, name: str, value: str) -> None:
    client._persist_env(name, value)


def ensure_lists(client: TrelloClient) -> dict[str, str]:
    existing = {lst["name"]: lst for lst in client.lists() if not lst.get("closed")}
    name_to_id: dict[str, str] = {}

    for i, name in enumerate(LIST_ORDER):
        if name in existing:
            list_id = existing[name]["id"]
            print(f"  list exists: {name}  {list_id}")
        else:
            created = client.create_list(name, pos=i + 1)
            list_id = created["id"]
            print(f"  created list: {name}  {list_id}")
        name_to_id[name] = list_id
        persist(client, LIST_ENV_KEYS[name], list_id)

    persist(client, "TRELLO_DEFAULT_LIST_ID", name_to_id["To Do"])
    persist(client, "TRELLO_DEFAULT_LIST_NAME", "To Do")
    return name_to_id


def ensure_labels(client: TrelloClient, seed_labels: list[dict]) -> dict[str, str]:
    by_name: dict[str, str] = {}
    for spec in seed_labels:
        name = spec["name"]
        color = spec["color"]
        if name.strip().lower() == "cursor":
            label_id = client.ensure_cursor_label()
        else:
            label_id = client.ensure_label(name, color)
        by_name[name] = label_id
        print(f"  label: {name} ({color})  {label_id}")
    return by_name


def main() -> int:
    if board_id() != "6acfad99aba36ddc16ab13b7":
        print(f"Refusing: unexpected board id {board_id()}", file=sys.stderr)
        return 1

    seed = json.loads(SEED_PATH.read_text(encoding="utf-8"))
    client = TrelloClient()

    open_cards = client.cards()
    if open_cards:
        print(f"Board already has {len(open_cards)} open cards — aborting populate.")
        print("Archive/clear first if you really want a fresh seed apply.")
        return 1

    print("Ensuring lists…")
    lists = ensure_lists(client)

    print("Ensuring labels…")
    labels = ensure_labels(client, seed.get("labels") or seed["board"]["labels"])

    print(f"Creating {len(seed['cards'])} cards…")
    for card_spec in seed["cards"]:
        list_name = card_spec["list"]
        list_id = lists[list_name]
        extra_label_ids = [
            labels[n] for n in card_spec.get("labels", []) if n in labels and n.lower() != "cursor"
        ]
        # Cursor applied by create_card; other labels via idLabels
        card = client.create_card(
            name=card_spec["title"],
            id_list=list_id,
            desc=card_spec.get("desc"),
            pos="bottom",
            id_labels=",".join(extra_label_ids) if extra_label_ids else None,
            tag_cursor=True,
        )
        checklist = card_spec.get("checklist") or []
        if checklist:
            client.add_checklist(card["id"], "Checklist", checklist)
        print(f"  + [{list_name}] {card_spec['title']}")

    print("Done.")
    print(f"Default list shortcut keys: {sorted(set(LIST_ENV.values()))}")
    print(f"TRELLO_DEFAULT_LIST_ID={env('TRELLO_DEFAULT_LIST_ID')}")
    print(f"TRELLO_LABEL_CURSOR={env('TRELLO_LABEL_CURSOR')}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
