"""Thin Trello REST client for Dans workspace (TVS - OW scotland)."""

from __future__ import annotations

import os
from pathlib import Path
from typing import Any

import requests
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent / ".env")

BASE_URL = "https://api.trello.com/1"

LIST_ENV = {
    "todo": "TRELLO_LIST_TO_DO",
    "to do": "TRELLO_LIST_TO_DO",
    "venue": "TRELLO_LIST_VENUE",
    "legal": "TRELLO_LIST_LEGAL_MONEY",
    "legal / money": "TRELLO_LIST_LEGAL_MONEY",
    "money": "TRELLO_LIST_LEGAL_MONEY",
    "race": "TRELLO_LIST_RACE",
    "website": "TRELLO_LIST_WEBSITE",
    "web": "TRELLO_LIST_WEBSITE",
    "marketing": "TRELLO_LIST_MARKETING",
    "waiting": "TRELLO_LIST_WAITING",
}


def env(name: str, default: str | None = None) -> str | None:
    return os.environ.get(name, default)


def board_id() -> str:
    value = env("TRELLO_BOARD_ID")
    if not value:
        raise RuntimeError("TRELLO_BOARD_ID missing from .env")
    return value


def resolve_list_id(name_or_id: str | None = None) -> str:
    """Resolve a list by id, friendly name, or fall back to default."""
    if not name_or_id:
        value = env("TRELLO_DEFAULT_LIST_ID")
        if not value:
            raise RuntimeError(
                "TRELLO_DEFAULT_LIST_ID missing from .env. "
                "The To Do list already exists — copy its id into .env "
                "(list_boards.py prints it)."
            )
        return value

    if len(name_or_id) == 24 and name_or_id.isalnum():
        return name_or_id

    key = LIST_ENV.get(name_or_id.lower().strip())
    if key:
        value = env(key)
        if value:
            return value

    raise RuntimeError(
        f"Unknown list '{name_or_id}'. Try: todo, venue, legal, race, website, "
        "marketing, waiting — or a raw list id. "
        "If the shortcut is empty, fill the matching TRELLO_LIST_* id in .env."
    )


class TrelloClient:
    def __init__(self, api_key: str | None = None, token: str | None = None) -> None:
        self.api_key = api_key or os.environ["TRELLO_API_KEY"]
        self.token = token or os.environ["TRELLO_TOKEN"]

    def _params(self, **extra: Any) -> dict[str, Any]:
        params: dict[str, Any] = {"key": self.api_key, "token": self.token}
        params.update({k: v for k, v in extra.items() if v is not None})
        return params

    def get(self, path: str, **params: Any) -> Any:
        response = requests.get(f"{BASE_URL}{path}", params=self._params(**params), timeout=30)
        response.raise_for_status()
        return response.json()

    def post(self, path: str, **params: Any) -> Any:
        response = requests.post(f"{BASE_URL}{path}", params=self._params(**params), timeout=30)
        response.raise_for_status()
        return response.json()

    def put(self, path: str, **params: Any) -> Any:
        response = requests.put(f"{BASE_URL}{path}", params=self._params(**params), timeout=30)
        response.raise_for_status()
        return response.json()

    def delete(self, path: str, **params: Any) -> Any:
        response = requests.delete(f"{BASE_URL}{path}", params=self._params(**params), timeout=30)
        response.raise_for_status()
        if response.content:
            return response.json()
        return None

    def me(self) -> Any:
        return self.get("/members/me")

    def boards(self) -> Any:
        return self.get("/members/me/boards", fields="name,url,closed,shortLink")

    def lists(self, board: str | None = None) -> Any:
        return self.get(f"/boards/{board or board_id()}/lists", fields="name,closed")

    def members(self, board: str | None = None) -> Any:
        return self.get(f"/boards/{board or board_id()}/members", fields="fullName,username")

    def cards(self, board: str | None = None, list_id: str | None = None) -> Any:
        if list_id:
            return self.get(
                f"/lists/{list_id}/cards",
                fields="name,desc,url,shortUrl,idList,due,idMembers,labels",
            )
        return self.get(
            f"/boards/{board or board_id()}/cards",
            fields="name,desc,url,shortUrl,idList,due,idMembers,labels",
            filter="open",
        )

    def cursor_label_id(self) -> str | None:
        return env("TRELLO_LABEL_CURSOR")

    def tag_cursor(self, card_id: str) -> None:
        """Ensure the sky 'Cursor' label is on a card (AI-created/edited marker)."""
        label_id = self.cursor_label_id()
        if not label_id:
            label_id = self.ensure_cursor_label()
        try:
            self.post(f"/cards/{card_id}/idLabels", value=label_id)
        except requests.HTTPError as exc:
            # Already labeled → Trello may 400; ignore duplicate
            if exc.response is None or exc.response.status_code not in (400, 409):
                raise

    def ensure_cursor_label(self) -> str:
        """Find or create the board's Cursor label; persist id into .env."""
        existing = env("TRELLO_LABEL_CURSOR")
        if existing:
            return existing
        labels = self.get(f"/boards/{board_id()}/labels")
        for label in labels:
            if (label.get("name") or "").strip().lower() == "cursor":
                self._persist_env("TRELLO_LABEL_CURSOR", label["id"])
                return label["id"]
        created = self.post("/labels", name="Cursor", color="sky", idBoard=board_id())
        self._persist_env("TRELLO_LABEL_CURSOR", created["id"])
        return created["id"]

    def _persist_env(self, name: str, value: str) -> None:
        os.environ[name] = value
        path = Path(__file__).resolve().parent / ".env"
        lines = path.read_text(encoding="utf-8").splitlines() if path.exists() else []
        prefix = f"{name}="
        found = False
        new_lines: list[str] = []
        for line in lines:
            if line.startswith(prefix):
                new_lines.append(f"{name}={value}")
                found = True
            else:
                new_lines.append(line)
        if not found:
            new_lines.append(f"{name}={value}")
        path.write_text("\n".join(new_lines) + "\n", encoding="utf-8")

    def mark_cursor_work(self, card_id: str, note: str | None = "Updated via Cursor") -> None:
        """Label a card as AI-touched; optionally leave a short comment."""
        self.tag_cursor(card_id)
        if note:
            self.comment(card_id, note)

    def create_card(
        self,
        name: str,
        id_list: str | None = None,
        desc: str | None = None,
        pos: str = "bottom",
        id_members: str | None = None,
        id_labels: str | None = None,
        tag_cursor: bool = True,
    ) -> Any:
        card = self.post(
            "/cards",
            idList=resolve_list_id(id_list),
            name=name,
            desc=desc,
            pos=pos,
            idMembers=id_members,
            idLabels=id_labels,
        )
        if tag_cursor:
            self.tag_cursor(card["id"])
        return card

    def create_list(self, name: str, pos: str | float = "bottom") -> Any:
        return self.post("/lists", name=name, idBoard=board_id(), pos=pos)

    def ensure_label(self, name: str, color: str) -> str:
        """Find or create a board label by name; return its id."""
        labels = self.get(f"/boards/{board_id()}/labels")
        needle = name.strip().lower()
        for label in labels:
            if (label.get("name") or "").strip().lower() == needle:
                return label["id"]
        created = self.post("/labels", name=name, color=color, idBoard=board_id())
        return created["id"]

    def add_checklist(self, card_id: str, name: str, items: list[str]) -> Any:
        checklist = self.post("/checklists", idCard=card_id, name=name)
        for item in items:
            self.post(f"/checklists/{checklist['id']}/checkItems", name=item, pos="bottom")
        return checklist

    def update_card(self, card_id: str, **fields: Any) -> Any:
        return self.put(f"/cards/{card_id}", **fields)

    def move_card(self, card_id: str, list_name_or_id: str) -> Any:
        return self.update_card(card_id, idList=resolve_list_id(list_name_or_id))

    def comment(self, card_id: str, text: str) -> Any:
        return self.post(f"/cards/{card_id}/actions/comments", text=text)

    def archive_card(self, card_id: str) -> Any:
        return self.update_card(card_id, closed="true")

    def delete_card(self, card_id: str) -> Any:
        return self.delete(f"/cards/{card_id}")
