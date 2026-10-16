"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import PageHeader from "@/components/PageHeader";
import Placeholder from "@/components/Placeholder";
import GearList from "@/components/GearList";
import RequireAuth from "@/components/RequireAuth";
import { useAuth } from "@/context/AuthContext";
import { getFirebase } from "@/lib/firebase";
import { QUIZ } from "@/lib/event";

function makeCode() {
  // Simple unique-enough code for check-in. Swap for a server UUID later.
  return (
    "TVS-" +
    Math.random().toString(36).slice(2, 6).toUpperCase() +
    "-" +
    Math.random().toString(36).slice(2, 6).toUpperCase()
  );
}

export default function BriefingPage() {
  return (
    <RequireAuth>
      <BriefingInner />
    </RequireAuth>
  );
}

function BriefingInner() {
  const { profile, refreshProfile } = useAuth();
  const router = useRouter();
  const [watched, setWatched] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<"none" | "fail" | "pass">("none");
  const [saving, setSaving] = useState(false);

  const allAnswered = QUIZ.every((q) => answers[q.id] !== undefined);

  async function submit() {
    const correct = QUIZ.every((q) => answers[q.id] === q.answerIndex);
    if (!correct) {
      setResult("fail");
      return;
    }
    const fb = getFirebase();
    if (!fb || !profile) return;
    setSaving(true);
    await updateDoc(doc(fb.db, "users", profile.uid), {
      briefingCompletedAt: serverTimestamp(),
      qrCode: profile.qrCode || makeCode(),
    });
    await refreshProfile();
    setResult("pass");
    setSaving(false);
    setTimeout(() => router.push("/account/qr"), 1200);
  }

  return (
    <>
      <PageHeader
        title="Rider briefing"
        intro="Watch the briefing, then answer five quick questions. Pass and your check-in code unlocks."
      />
      <div className="container-tvs py-12">
        <div className="mx-auto max-w-2xl">
          <Placeholder label="Briefing video coming soon" />

          <div className="card mt-6">
            <h2 className="text-lg text-sand">Recommended gear</h2>
            <p className="mt-1 text-sm text-sand/65">
              Helmet and wrist guards are required. The rest is strongly advised
              — it&apos;s a wet, off-road weekend in Scotland.
            </p>
            <GearList className="mt-4" />
          </div>

          <label className="mt-4 flex cursor-pointer items-center gap-3 text-sand">
            <input
              type="checkbox"
              className="h-5 w-5 accent-send"
              checked={watched}
              onChange={(e) => setWatched(e.target.checked)}
            />
            I have watched the briefing
          </label>

          {watched && (
            <div className="mt-8 space-y-4">
              {QUIZ.map((q, qi) => (
                <div key={q.id} className="card">
                  <p className="font-semibold text-sand">
                    {qi + 1}. {q.question}
                  </p>
                  <div className="mt-3 space-y-2">
                    {q.options.map((opt, oi) => (
                      <label
                        key={oi}
                        className="flex cursor-pointer items-center gap-2 text-sm text-sand/80"
                      >
                        <input
                          type="radio"
                          name={q.id}
                          className="accent-send"
                          checked={answers[q.id] === oi}
                          onChange={() =>
                            setAnswers((prev) => ({ ...prev, [q.id]: oi }))
                          }
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {result === "fail" && (
                <p className="rounded bg-red-500/15 p-3 text-sm text-red-300">
                  Not quite — check your answers and try again.
                </p>
              )}
              {result === "pass" && (
                <p className="rounded bg-send/15 p-3 text-sm text-send">
                  Nice one. Taking you to your check-in code…
                </p>
              )}

              <button
                onClick={submit}
                disabled={!allAnswered || saving || result === "pass"}
                className="btn-primary w-full disabled:opacity-50"
              >
                {saving ? "Checking…" : "Submit answers"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
