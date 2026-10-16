"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import PageHeader from "@/components/PageHeader";
import RequireAuth from "@/components/RequireAuth";
import { useAuth } from "@/context/AuthContext";
import { getFirebase } from "@/lib/firebase";

const SECTIONS = [
  {
    title: "Risk of the activity",
    body: "Riding a OneWheel on off-road trails carries real risk of injury. I take part at my own risk and am responsible for my own safety.",
  },
  {
    title: "Gear",
    body: "I will wear a certified helmet (EN 1078, CPSC 1203, AS/NZS 2063, or KC) and wrist guards or gloves at all times while riding, as required by the event and the EOL Racing Standard.",
  },
  {
    title: "My condition",
    body: "I am fit to take part and will not ride under the influence of alcohol or drugs.",
  },
  {
    title: "Under-18s",
    body: "If I am signing for a rider under 18, I am their parent or guardian, I consent to their participation, and I will be on site at check-in.",
  },
];

export default function WaiverPage() {
  return (
    <RequireAuth>
      <WaiverInner />
    </RequireAuth>
  );
}

function WaiverInner() {
  const { profile, refreshProfile } = useAuth();
  const router = useRouter();
  const [checks, setChecks] = useState<boolean[]>(SECTIONS.map(() => false));
  const [name, setName] = useState(profile?.displayName ?? "");
  const [saving, setSaving] = useState(false);

  const allChecked = checks.every(Boolean) && name.trim().length > 1;

  async function submit() {
    const fb = getFirebase();
    if (!fb || !profile) return;
    setSaving(true);
    await updateDoc(doc(fb.db, "users", profile.uid), {
      waiverSignedAt: serverTimestamp(),
      waiverSignatureName: name.trim(),
      waiverVersion: 1,
    });
    await refreshProfile();
    router.push("/account");
  }

  return (
    <>
      <PageHeader
        title="Digital waiver"
        intro="Read each part and tick to agree. This is placeholder text — the final wording will be approved by our insurer."
      />
      <div className="container-tvs py-12">
        <div className="mx-auto max-w-2xl space-y-3">
          {SECTIONS.map((s, i) => (
            <label key={s.title} className="card flex cursor-pointer gap-3">
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 accent-send"
                checked={checks[i]}
                onChange={(e) =>
                  setChecks((prev) =>
                    prev.map((c, idx) => (idx === i ? e.target.checked : c))
                  )
                }
              />
              <div>
                <p className="font-semibold text-sand">{s.title}</p>
                <p className="text-sm text-sand/70">{s.body}</p>
              </div>
            </label>
          ))}

          <div className="card">
            <label className="mb-2 block text-sm font-semibold text-sand">
              Type your full name to sign
            </label>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
            />
          </div>

          <button
            onClick={submit}
            disabled={!allChecked || saving}
            className="btn-primary w-full disabled:opacity-50"
          >
            {saving ? "Saving…" : "Sign waiver"}
          </button>
        </div>
      </div>
    </>
  );
}
