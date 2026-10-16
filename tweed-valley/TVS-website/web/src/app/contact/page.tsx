"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Socials from "@/components/Socials";
import { SOCIALS } from "@/lib/event";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not send your message");
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <>
      <PageHeader
        title="Contact"
        intro="Questions about the event, sponsorship, or anything else? Send us a message and we will get back to you."
      />
      <div className="container-tvs py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            {status === "sent" ? (
              <div className="card">
                <p className="text-lg text-sand">Thanks, message received.</p>
                <p className="mt-2 text-sand/75">
                  We will reply to the email you gave us. Give us a few days.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-sm text-send hover:underline"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="card space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-sand">
                    Your name
                  </label>
                  <input
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-sand">
                    Your email
                  </label>
                  <input
                    className="input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-sand">
                    Message
                  </label>
                  <textarea
                    className="input min-h-32"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary w-full disabled:opacity-50"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
                {error && <p className="text-sm text-red-300">{error}</p>}
              </form>
            )}
          </div>

          <aside className="space-y-6">
            <div className="card">
              <h2 className="text-lg text-sand">Email</h2>
              <a
                href={`mailto:${SOCIALS.email}`}
                className="mt-1 block break-all text-send hover:underline"
              >
                {SOCIALS.email}
              </a>
            </div>
            <div className="card">
              <h2 className="text-lg text-sand">Socials</h2>
              <p className="mt-1 text-sm text-sand/70">Follow OneWheel Scotland.</p>
              <Socials className="mt-3" />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
