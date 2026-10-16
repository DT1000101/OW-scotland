"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import PageHeader from "@/components/PageHeader";
import RequireAuth from "@/components/RequireAuth";
import { getFirebase } from "@/lib/firebase";

type Todo = { id: string; text: string; done: boolean };

export default function TodosPage() {
  return (
    <RequireAuth admin>
      <TodosInner />
    </RequireAuth>
  );
}

function TodosInner() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fb = getFirebase();
    if (!fb) return;
    const q = query(collection(fb.db, "todos"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => {
      setTodos(
        snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Todo, "id">) }))
      );
    });
  }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    const fb = getFirebase();
    if (!fb || !text.trim()) return;
    await addDoc(collection(fb.db, "todos"), {
      text: text.trim(),
      done: false,
      createdAt: serverTimestamp(),
    });
    setText("");
  }
  async function toggle(t: Todo) {
    const fb = getFirebase();
    if (!fb) return;
    await updateDoc(doc(fb.db, "todos", t.id), { done: !t.done });
  }
  async function remove(t: Todo) {
    const fb = getFirebase();
    if (!fb) return;
    await deleteDoc(doc(fb.db, "todos", t.id));
  }

  return (
    <>
      <PageHeader title="Crew to-do list" intro="Shared across all organisers." />
      <div className="container-tvs py-12">
        <div className="mx-auto max-w-2xl">
          <form onSubmit={add} className="mb-6 flex gap-2">
            <input
              className="input"
              placeholder="Add a task…"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className="btn-primary shrink-0">Add</button>
          </form>

          <div className="space-y-2">
            {todos.length === 0 && (
              <p className="text-sm text-sand/50">
                No tasks yet. Add the first one above.
              </p>
            )}
            {todos.map((t) => (
              <div
                key={t.id}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3"
              >
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-send"
                  checked={t.done}
                  onChange={() => toggle(t)}
                />
                <span
                  className={`flex-1 ${t.done ? "text-sand/40 line-through" : "text-sand"}`}
                >
                  {t.text}
                </span>
                <button
                  onClick={() => remove(t)}
                  className="text-sand/40 hover:text-red-300"
                  aria-label="Delete"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
