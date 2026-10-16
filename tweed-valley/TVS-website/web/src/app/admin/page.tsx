"use client";

import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import RequireAuth from "@/components/RequireAuth";
import { useAuth } from "@/context/AuthContext";

export default function AdminPage() {
  return (
    <RequireAuth admin>
      <AdminInner />
    </RequireAuth>
  );
}

function AdminInner() {
  const { profile } = useAuth();
  return (
    <>
      <PageHeader
        title="Organiser tools"
        intro="You're in admin mode — notice the different background. Only admins can see this."
      />
      <div className="container-tvs py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/admin/checklist" className="card hover:border-send/50">
            <h2 className="text-lg text-send">EOL readiness checklist</h2>
            <p className="mt-2 text-sm text-sand/70">
              Everything needed for an EOL-compliant event — risk assessment,
              timing, jury, medical, and more. Tick off as you go.
            </p>
          </Link>
          <Link href="/admin/todos" className="card hover:border-send/50">
            <h2 className="text-lg text-send">To-do list</h2>
            <p className="mt-2 text-sm text-sand/70">
              Shared checklist for the crew.
            </p>
          </Link>
          <div className="card opacity-70">
            <h2 className="text-lg text-send">Registrations</h2>
            <p className="mt-2 text-sm text-sand/70">
              Who has paid, signed, and briefed. Wire up once Firebase is
              connected.
            </p>
          </div>
          <div className="card opacity-70">
            <h2 className="text-lg text-send">Check-in scanner</h2>
            <p className="mt-2 text-sm text-sand/70">
              Scan rider QR codes to issue chips. Coming soon.
            </p>
          </div>
          <div className="card opacity-70">
            <h2 className="text-lg text-send">Locked notes</h2>
            <p className="mt-2 text-sm text-sand/70">
              Marshal contacts, radio channels, ops info.
            </p>
          </div>
        </div>
        <p className="mt-8 text-xs text-sand/40">
          Signed in as {profile?.email} · role: {profile?.role}
        </p>
      </div>
    </>
  );
}
