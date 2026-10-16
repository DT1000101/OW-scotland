#!/usr/bin/env python3
"""List boards and lists visible to the configured Trello token."""

from __future__ import annotations

import json
import sys

from trello_client import TrelloClient


def main() -> int:
    client = TrelloClient()
    me = client.me()
    print(f"Authenticated as: {me.get('fullName')} (@{me.get('username')})")
    print()

    boards = [b for b in client.boards() if not b.get("closed")]
    if not boards:
        print("No open boards found.")
        return 1

    for board in boards:
        print(f"Board: {board['name']}")
        print(f"  id:  {board['id']}")
        print(f"  url: {board.get('url')}")
        lists = [lst for lst in client.lists(board["id"]) if not lst.get("closed")]
        for lst in lists:
            print(f"  - list: {lst['name']}  ({lst['id']})")
        print()

    summary = [
        {
            "id": b["id"],
            "name": b["name"],
            "url": b.get("url"),
            "lists": [
                {"id": lst["id"], "name": lst["name"]}
                for lst in client.lists(b["id"])
                if not lst.get("closed")
            ],
        }
        for b in boards
    ]
    out_path = "boards_snapshot.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2)
    print(f"Wrote {out_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
