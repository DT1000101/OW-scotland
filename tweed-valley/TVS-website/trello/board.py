#!/usr/bin/env python3
"""Day-to-day CLI for the TVS - OW scotland Trello board.

Examples:
  .venv/bin/python board.py status
  .venv/bin/python board.py cards
  .venv/bin/python board.py cards --list venue
  .venv/bin/python board.py create "Book the venue" --list todo
  .venv/bin/python board.py move <card_id> todo
  .venv/bin/python board.py comment <card_id> "Need a decision"
  .venv/bin/python board.py archive <card_id>
"""

from __future__ import annotations

import argparse
import json
import sys
from collections import defaultdict

from trello_client import TrelloClient, board_id, env, resolve_list_id


def list_name_lookup(client: TrelloClient) -> dict[str, str]:
    return {lst["id"]: lst["name"] for lst in client.lists() if not lst.get("closed")}


def cmd_status(client: TrelloClient) -> int:
    me = client.me()
    lists = [lst for lst in client.lists() if not lst.get("closed")]
    cards = client.cards()
    by_list: dict[str, int] = defaultdict(int)
    for card in cards:
        by_list[card["idList"]] += 1

    print(f"Auth:  {me.get('fullName')} (@{me.get('username')})")
    print(f"Board: {env('TRELLO_BOARD_URL')}  ({board_id()})")
    print(f"Open cards: {len(cards)}")
    print()
    if not lists:
        print("  (no lists yet — add columns on the board, then run list_boards.py)")
        print()
    for lst in lists:
        print(f"  {lst['name']:<14} {by_list.get(lst['id'], 0):>3}  {lst['id']}")
    print()
    members = client.members()
    print("Members:")
    for member in members:
        print(f"  {member['fullName']} (@{member['username']})  {member['id']}")
    return 0


def cmd_cards(client: TrelloClient, list_filter: str | None) -> int:
    names = list_name_lookup(client)
    list_id = resolve_list_id(list_filter) if list_filter else None
    cards = client.cards(list_id=list_id)

    if list_id:
        print(f"List: {names.get(list_id, list_id)} ({len(cards)} cards)\n")
        for card in cards:
            due = f"  due={card['due'][:10]}" if card.get("due") else ""
            print(f"- {card['name']}")
            print(f"  {card['id']}  {card.get('shortUrl')}{due}")
        return 0

    grouped: dict[str, list] = defaultdict(list)
    for card in cards:
        grouped[card["idList"]].append(card)

    for list_id, list_name in names.items():
        group = grouped.get(list_id, [])
        print(f"## {list_name} ({len(group)})")
        for card in group:
            print(f"- {card['name']}")
            print(f"  {card['id']}  {card.get('shortUrl')}")
        print()
    return 0


def cmd_create(client: TrelloClient, name: str, list_filter: str | None, desc: str | None) -> int:
    card = client.create_card(name=name, id_list=list_filter, desc=desc)
    print(f"Created: {card['name']}")
    print(f"  id:  {card['id']}")
    print(f"  url: {card.get('url')}")
    return 0


def cmd_move(client: TrelloClient, card_id: str, list_filter: str) -> int:
    card = client.move_card(card_id, list_filter)
    client.tag_cursor(card_id)
    print(f"Moved '{card['name']}' → list {card['idList']}")
    print(f"  {card.get('url')}")
    return 0


def cmd_comment(client: TrelloClient, card_id: str, text: str) -> int:
    action = client.comment(card_id, text)
    client.tag_cursor(card_id)
    print(f"Commented on {card_id}")
    print(f"  {action.get('data', {}).get('text', text)}")
    return 0


def cmd_archive(client: TrelloClient, card_id: str) -> int:
    card = client.archive_card(card_id)
    print(f"Archived: {card.get('name')} ({card_id})")
    return 0


def cmd_snapshot(client: TrelloClient) -> int:
    names = list_name_lookup(client)
    cards = client.cards()
    snapshot = {
        "board_id": board_id(),
        "board_url": env("TRELLO_BOARD_URL"),
        "lists": [
            {
                "id": list_id,
                "name": name,
                "cards": [
                    {
                        "id": c["id"],
                        "name": c["name"],
                        "url": c.get("shortUrl") or c.get("url"),
                        "due": c.get("due"),
                        "desc": c.get("desc") or "",
                    }
                    for c in cards
                    if c["idList"] == list_id
                ],
            }
            for list_id, name in names.items()
        ],
    }
    path = "board_snapshot.json"
    with open(path, "w", encoding="utf-8") as f:
        json.dump(snapshot, f, indent=2)
    print(f"Wrote {path} ({len(cards)} open cards)")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="TVS - OW scotland Trello board CLI")
    sub = parser.add_subparsers(dest="command", required=True)

    sub.add_parser("status", help="Auth + board + list counts")
    cards = sub.add_parser("cards", help="List open cards")
    cards.add_argument("--list", dest="list_filter", help="List name or id (todo, venue, legal, ...)")

    create = sub.add_parser("create", help="Create a card")
    create.add_argument("name")
    create.add_argument("--list", dest="list_filter", default=None, help="Default: TRELLO_DEFAULT_LIST_ID")
    create.add_argument("--desc", default=None)

    move = sub.add_parser("move", help="Move a card to another list")
    move.add_argument("card_id")
    move.add_argument("list_filter", help="List name or id")

    comment = sub.add_parser("comment", help="Add a comment to a card")
    comment.add_argument("card_id")
    comment.add_argument("text")

    archive = sub.add_parser("archive", help="Archive a card")
    archive.add_argument("card_id")

    tag = sub.add_parser("tag-cursor", help="Apply the Cursor (AI) label to a card")
    tag.add_argument("card_id")
    tag.add_argument(
        "--comment",
        nargs="?",
        const="Updated via Cursor",
        default=None,
        help="Also leave a short comment (default text if flag present with no value)",
    )

    sub.add_parser("snapshot", help="Write board_snapshot.json")
    return parser


def cmd_tag_cursor(client: TrelloClient, card_id: str, comment: str | None) -> int:
    if comment:
        client.mark_cursor_work(card_id, note=comment)
        print(f"Labeled + commented: {card_id}")
    else:
        client.tag_cursor(card_id)
        print(f"Labeled Cursor: {card_id}")
    return 0


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    client = TrelloClient()

    if args.command == "status":
        return cmd_status(client)
    if args.command == "cards":
        return cmd_cards(client, args.list_filter)
    if args.command == "create":
        return cmd_create(client, args.name, args.list_filter, args.desc)
    if args.command == "move":
        return cmd_move(client, args.card_id, args.list_filter)
    if args.command == "comment":
        return cmd_comment(client, args.card_id, args.text)
    if args.command == "archive":
        return cmd_archive(client, args.card_id)
    if args.command == "tag-cursor":
        return cmd_tag_cursor(client, args.card_id, args.comment)
    if args.command == "snapshot":
        return cmd_snapshot(client)

    parser.error(f"Unknown command: {args.command}")
    return 2


if __name__ == "__main__":
    sys.exit(main())
