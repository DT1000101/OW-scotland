"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import PageHeader from "@/components/PageHeader";
import RequireAuth from "@/components/RequireAuth";
import { useAuth } from "@/context/AuthContext";
import { getFirebase } from "@/lib/firebase";
import { ageCategoryFromDob } from "@/lib/event";

export default function DetailsPage() {
  return (
    <RequireAuth>
      <DetailsInner />
    </RequireAuth>
  );
}

function DetailsInner() {
  const { profile, refreshProfile } = useAuth();
  const router = useRouter();

  const [firstName, setFirstName] = useState(profile?.firstName ?? "");
  const [lastName, setLastName] = useState(profile?.lastName ?? "");
  const [dateOfBirth, setDateOfBirth] = useState(profile?.dateOfBirth ?? "");
  const [ecName, setEcName] = useState(profile?.emergencyContactName ?? "");
  const [ecPhone, setEcPhone] = useState(profile?.emergencyContactPhone ?? "");
  const [medicalNotes, setMedicalNotes] = useState(profile?.medicalNotes ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { age, category } = ageCategoryFromDob(dateOfBirth);

  const valid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    Boolean(dateOfBirth) &&
    age !== null &&
    age >= 0 &&
    age < 120 &&
    ecName.trim().length > 0 &&
    ecPhone.trim().length > 0;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const fb = getFirebase();
    if (!fb || !profile) return;
    if (!valid) {
      setError("Please fill in all the required fields.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await updateDoc(doc(fb.db, "users", profile.uid), {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        displayName: `${firstName.trim()} ${lastName.trim()}`,
        dateOfBirth,
        emergencyContactName: ecName.trim(),
        emergencyContactPhone: ecPhone.trim(),
        medicalNotes: medicalNotes.trim(),
        detailsCompletedAt: serverTimestamp(),
      });
      await refreshProfile();
      router.push("/account");
    } catch {
      setError("Could not save your details. Please try again.");
      setSaving(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Your details"
        intro="Just the essentials — who you are, your age for category purposes, and an emergency contact. No address needed."
      />
      <div className="container-tvs py-12">
        <form onSubmit={submit} className="mx-auto max-w-2xl space-y-4">
          <div className="card space-y-4">
            <h2 className="text-lg text-sand">About you</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold text-sand">
                  First name
                </label>
                <input
                  className="input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-sand">
                  Last name
                </label>
                <input
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-sand">
                Date of birth
              </label>
              <input
                type="date"
                className="input"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
              {category && (
                <p className="mt-1 text-xs text-send">
                  Age {age} · {category}
                </p>
              )}
              <p className="mt-1 text-xs text-sand/50">
                Used for age categories in the results.
              </p>
            </div>
          </div>

          <div className="card space-y-4">
            <h2 className="text-lg text-sand">Emergency contact</h2>
            <p className="text-sm text-sand/65">
              Someone we can call if anything happens on the day.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold text-sand">
                  Contact name
                </label>
                <input
                  className="input"
                  value={ecName}
                  onChange={(e) => setEcName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-sand">
                  Contact phone
                </label>
                <input
                  type="tel"
                  className="input"
                  value={ecPhone}
                  onChange={(e) => setEcPhone(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="card space-y-2">
            <h2 className="text-lg text-sand">Medical notes (optional)</h2>
            <p className="text-sm text-sand/65">
              Anything first aiders should know — allergies, conditions,
              medication. Leave blank if not applicable.
            </p>
            <textarea
              className="input min-h-24"
              value={medicalNotes}
              onChange={(e) => setMedicalNotes(e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-red-300">{error}</p>}

          <button
            type="submit"
            disabled={!valid || saving}
            className="btn-primary w-full disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save details"}
          </button>
        </form>
      </div>
    </>
  );
}
