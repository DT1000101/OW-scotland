"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import PageHeader from "@/components/PageHeader";
import RequireAuth from "@/components/RequireAuth";
import { useAuth } from "@/context/AuthContext";

export default function QrPage() {
  return (
    <RequireAuth>
      <QrInner />
    </RequireAuth>
  );
}

function QrInner() {
  const { profile } = useAuth();
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const ready =
    Boolean(profile?.detailsCompletedAt) &&
    Boolean(profile?.waiverSignedAt) &&
    Boolean(profile?.briefingCompletedAt) &&
    Boolean(profile?.qrCode);

  useEffect(() => {
    if (ready && profile?.qrCode) {
      QRCode.toDataURL(profile.qrCode, { width: 320, margin: 2 }).then(
        setDataUrl
      );
    }
  }, [ready, profile?.qrCode]);

  return (
    <>
      <PageHeader title="Your check-in code" />
      <div className="container-tvs py-12">
        <div className="card mx-auto max-w-md text-center">
          {ready ? (
            <>
              {dataUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={dataUrl}
                  alt="Check-in QR code"
                  className="mx-auto rounded-lg bg-white p-3"
                  width={280}
                  height={280}
                />
              )}
              <p className="mt-4 font-mono text-lg text-send">
                {profile?.qrCode}
              </p>
              <p className="mt-3 text-sm text-sand/70">
                Show this at the registration desk to collect your timing chip.
                We will also email you a copy.
              </p>
            </>
          ) : (
            <>
              <p className="text-sand/75">
                Your code unlocks once your details, waiver, and briefing are
                complete.
              </p>
              <Link href="/account" className="btn-primary mt-6">
                Back to my account
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
