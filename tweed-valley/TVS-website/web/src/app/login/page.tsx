"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { configured, user, signInGoogle, signInEmail, signUpEmail } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) router.push("/account");
  }, [user, router]);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "in") await signInEmail(email, password);
      else await signUpEmail(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Log in"
        intro="You only need an account to sign your waiver, do the briefing, and get your check-in code. Everything else on the site is open to all."
      />
      <div className="container-tvs py-12">
        <div className="card mx-auto max-w-md">
          {!configured && (
            <p className="mb-4 rounded bg-send/15 p-3 text-sm text-send">
              Sign-in is not connected yet. Add your Firebase keys to enable
              accounts.
            </p>
          )}

          <button
            onClick={() => signInGoogle().catch((e) => setError(e.message))}
            disabled={!configured}
            className="btn-ghost w-full disabled:opacity-50"
          >
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3 text-xs text-sand/40">
            <span className="h-px flex-1 bg-white/10" />
            or
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <form onSubmit={handleEmail} className="space-y-3">
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={!configured || busy}
              className="btn-primary w-full disabled:opacity-50"
            >
              {mode === "in" ? "Log in" : "Create account"}
            </button>
          </form>

          {error && <p className="mt-3 text-sm text-red-300">{error}</p>}

          <button
            onClick={() => setMode((m) => (m === "in" ? "up" : "in"))}
            className="mt-4 text-sm text-send hover:underline"
          >
            {mode === "in"
              ? "Need an account? Sign up"
              : "Already have an account? Log in"}
          </button>
        </div>
      </div>
    </>
  );
}
