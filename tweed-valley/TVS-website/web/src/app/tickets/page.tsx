"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

type Attendee = { name: string; email: string };

export default function TicketsPage() {
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [attendees, setAttendees] = useState<Attendee[]>([{ name: "", email: "" }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateAttendee(i: number, field: keyof Attendee, value: string) {
    setAttendees((prev) =>
      prev.map((a, idx) => (idx === i ? { ...a, [field]: value } : a))
    );
  }
  function addAttendee() {
    setAttendees((prev) => [...prev, { name: "", email: "" }]);
  }
  function removeAttendee(i: number) {
    setAttendees((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function checkout() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buyerName, buyerEmail, attendees }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.message || "Payments are not set up yet.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Tickets"
        intro="One weekend pass covers all three days: practice, racing, and the evenings. Buying for family or friends? Add everyone's details so we can match tickets to people."
      />
      <div className="container-tvs py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="card mb-6">
              <h2 className="text-lg text-sand">Who is buying?</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input
                  className="input"
                  placeholder="Your name"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                />
                <input
                  className="input"
                  placeholder="Your email"
                  type="email"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <h2 className="text-lg text-sand">Who is riding?</h2>
                <span className="text-sm text-sand/60">
                  {attendees.length} ticket{attendees.length > 1 ? "s" : ""}
                </span>
              </div>
              <p className="mt-1 text-sm text-sand/60">
                Add a name and email for each rider. Kids can use a parent&apos;s
                email — just note that in the name (e.g. &quot;Coby (child)&quot;).
              </p>
              <div className="mt-4 space-y-4">
                {attendees.map((a, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/10 p-3 sm:border-0 sm:p-0"
                  >
                    <div className="mb-2 flex items-center justify-between sm:hidden">
                      <span className="text-sm font-semibold text-sand/70">
                        Rider {i + 1}
                      </span>
                      {attendees.length > 1 && (
                        <button
                          onClick={() => removeAttendee(i)}
                          className="text-sm text-sand/50 hover:text-send"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                      <input
                        className="input"
                        placeholder={`Rider ${i + 1} name`}
                        value={a.name}
                        onChange={(e) => updateAttendee(i, "name", e.target.value)}
                      />
                      <input
                        className="input"
                        placeholder="Email"
                        type="email"
                        value={a.email}
                        onChange={(e) => updateAttendee(i, "email", e.target.value)}
                      />
                      {attendees.length > 1 && (
                        <button
                          onClick={() => removeAttendee(i)}
                          className="hidden rounded-md border border-white/10 px-3 text-sand/60 hover:text-send sm:block"
                          aria-label="Remove rider"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={addAttendee} className="mt-4 text-sm text-send hover:underline">
                + Add another rider
              </button>
            </div>
          </div>

          <aside>
            <div className="sticky top-24">
            <div className="card">
              <h2 className="text-lg text-sand">Weekend Pass</h2>
              <p className="mt-1 text-3xl font-display text-send">£65</p>
              <p className="mt-1 text-xs text-sand/50">Placeholder price</p>
              <ul className="mt-4 space-y-2 text-sm text-sand/75">
                <li>✓ All practice and race days</li>
                <li>✓ Timing chip and results</li>
                <li>✓ Bingo, fire, and evenings</li>
                <li>✓ Add three songs to the playlist</li>
              </ul>
              <div className="mt-6 border-t border-white/10 pt-4">
                <div className="flex justify-between text-sand">
                  <span>{attendees.length} × £65</span>
                  <span className="font-semibold">
                    £{(attendees.length * 65).toFixed(0)}
                  </span>
                </div>
              </div>
              <button
                onClick={checkout}
                disabled={loading}
                className="btn-primary mt-4 w-full disabled:opacity-50"
              >
                {loading ? "Redirecting…" : "Continue to payment"}
              </button>
              {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
              <p className="mt-4 text-xs text-sand/50">
                Payments are handled securely by Stripe. Money goes straight to
                the Tweed Valley Senduro CIC. Read the full{" "}
                <Link href="/rules" className="text-send hover:underline">
                  rules
                </Link>{" "}
                before you buy.
              </p>
            </div>
            <div className="card mt-4 border-send/20 bg-send/5">
              <h3 className="text-sm font-semibold text-sand">Volunteer with us?</h3>
              <p className="mt-1 text-xs text-sand/70">
                Free entry, crew t-shirt, goodie bag, and short rotating shifts.
              </p>
              <Link href="/volunteer" className="mt-3 inline-block text-sm text-send hover:underline">
                See what you get →
              </Link>
            </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
