"use client";

import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import RequireAuth from "@/components/RequireAuth";
import { useAuth } from "@/context/AuthContext";

function Step({
  done,
  title,
  desc,
  href,
  cta,
}: {
  done: boolean;
  title: string;
  desc: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="card flex items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full text-xs ${
            done ? "bg-send text-white" : "border border-sand/30 text-sand/50"
          }`}
        >
          {done ? "✓" : ""}
        </span>
        <div>
          <p className="font-semibold text-sand">{title}</p>
          <p className="text-sm text-sand/65">{desc}</p>
        </div>
      </div>
      <Link href={href} className="btn-ghost shrink-0 text-sm">
        {done ? "Review" : cta}
      </Link>
    </div>
  );
}

export default function AccountPage() {
  return (
    <RequireAuth>
      <AccountInner />
    </RequireAuth>
  );
}

function AccountInner() {
  const { profile } = useAuth();
  const detailsDone = Boolean(profile?.detailsCompletedAt);
  const waiverDone = Boolean(profile?.waiverSignedAt);
  const briefingDone = Boolean(profile?.briefingCompletedAt);
  const ready = detailsDone && waiverDone && briefingDone;

  return (
    <>
      <PageHeader
        title={`Hi${profile?.displayName ? `, ${profile.displayName}` : ""}`}
        intro="Get these done before you arrive and check-in takes seconds."
      />
      <div className="container-tvs py-12">
        <div className="mx-auto max-w-2xl space-y-4">
          <Step
            done={detailsDone}
            title="Add your details"
            desc="Name, age for category, and an emergency contact."
            href="/account/details"
            cta="Start"
          />
          <Step
            done={waiverDone}
            title="Sign the waiver"
            desc="Quick digital waiver. Parents sign for under-18s."
            href="/account/waiver"
            cta="Start"
          />
          <Step
            done={briefingDone}
            title="Watch the briefing"
            desc="Short video and a five-question quiz."
            href="/account/briefing"
            cta="Start"
          />
          <div className="card flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                  ready ? "bg-send text-white" : "border border-sand/30 text-sand/50"
                }`}
              >
                {ready ? "✓" : ""}
              </span>
              <div>
                <p className="font-semibold text-sand">Your check-in code</p>
                <p className="text-sm text-sand/65">
                  {ready
                    ? "Ready. Show this at the desk to get your chip."
                    : "Unlocks once your details, waiver, and briefing are done."}
                </p>
              </div>
            </div>
            <Link
              href="/account/qr"
              className={`shrink-0 text-sm ${ready ? "btn-primary" : "btn-ghost pointer-events-none opacity-50"}`}
            >
              View code
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
