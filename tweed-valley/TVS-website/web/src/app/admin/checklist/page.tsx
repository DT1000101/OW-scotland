"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import PageHeader from "@/components/PageHeader";
import RequireAuth from "@/components/RequireAuth";
import { getFirebase } from "@/lib/firebase";
import { checklistBySection, ORG_CHECKLIST } from "@/lib/orgChecklist";

type CheckedMap = Record<string, boolean>;

export default function ChecklistPage() {
  return (
    <RequireAuth admin>
      <ChecklistInner />
    </RequireAuth>
  );
}

function ChecklistInner() {
  const [checked, setChecked] = useState<CheckedMap>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const sections = useMemo(() => checklistBySection(), []);

  useEffect(() => {
    const fb = getFirebase();
    if (!fb) return;
    const unsubs = ORG_CHECKLIST.map((item) =>
      onSnapshot(doc(fb.db, "orgChecklist", item.id), (snap) => {
        if (snap.exists()) {
          const data = snap.data() as { done?: boolean };
          setChecked((prev) => ({ ...prev, [item.id]: Boolean(data.done) }));
        }
      })
    );
    return () => unsubs.forEach((u) => u());
  }, []);

  const total = ORG_CHECKLIST.length;
  const doneCount = ORG_CHECKLIST.filter((i) => checked[i.id]).length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  async function toggle(id: string) {
    const fb = getFirebase();
    if (!fb) return;
    const next = !checked[id];
    setChecked((prev) => ({ ...prev, [id]: next }));
    await setDoc(doc(fb.db, "orgChecklist", id), { done: next }, { merge: true });
  }

  function toggleSection(section: string) {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  }

  return (
    <>
      <PageHeader
        title="Organiser checklist"
        intro="Everything needed for an EOL-compliant Senduro weekend. Derived from the EOL Racing Standard, risk assessment templates, and registration requirements. Tick items off as you go — progress is saved for the whole crew."
      />
      <div className="container-tvs py-12">
        <div className="mx-auto max-w-3xl">
          {/* Progress summary */}
          <div className="card mb-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-3xl font-semibold text-send">{pct}%</p>
                <p className="text-sm text-sand/70">
                  {doneCount} of {total} items complete
                </p>
              </div>
              <Link href="/admin" className="text-sm text-send hover:underline">
                ← Back to organiser tools
              </Link>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-send transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-4">
            {sections.map(({ section, items }) => {
              const sectionDone = items.filter((i) => checked[i.id]).length;
              const sectionPct = Math.round((sectionDone / items.length) * 100);
              const isOpen = expanded[section] !== false; // default open

              return (
                <div key={section} className="card">
                  <button
                    type="button"
                    onClick={() => toggleSection(section)}
                    className="flex w-full items-center justify-between gap-3 text-left"
                  >
                    <div>
                      <h2 className="text-lg text-sand">{section}</h2>
                      <p className="text-xs text-sand/50">
                        {sectionDone}/{items.length} done · {sectionPct}%
                      </p>
                    </div>
                    <span className="text-sand/40">{isOpen ? "▾" : "▸"}</span>
                  </button>

                  {isOpen && (
                    <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                      {items.map((item) => (
                        <li key={item.id}>
                          <label className="flex cursor-pointer gap-3 rounded-lg px-2 py-2 hover:bg-white/5">
                            <input
                              type="checkbox"
                              className="mt-1 h-5 w-5 shrink-0 accent-send"
                              checked={Boolean(checked[item.id])}
                              onChange={() => toggle(item.id)}
                            />
                            <div className="min-w-0">
                              <p
                                className={`text-sm ${
                                  checked[item.id]
                                    ? "text-sand/40 line-through"
                                    : "text-sand"
                                }`}
                              >
                                {item.label}
                              </p>
                              {item.detail && (
                                <p className="mt-1 text-xs text-sand/55">
                                  {item.detail}
                                </p>
                              )}
                              {item.source && (
                                <p className="mt-0.5 text-[10px] uppercase tracking-wide text-sand/35">
                                  Source: {item.source}
                                </p>
                              )}
                            </div>
                          </label>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-xs text-sand/40">
            Checklist items are stored in Firestore (orgChecklist collection) and
            shared across all admins. Add new items in src/lib/orgChecklist.ts.
          </p>
        </div>
      </div>
    </>
  );
}
