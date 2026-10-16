"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/lib/event";

function daysUntil(isoDate: string, now = new Date()): number {
  // Midnight Europe/London on the event start day — Scotland local.
  const target = new Date(`${isoDate}T00:00:00+01:00`);
  const ms = target.getTime() - now.getTime();
  if (ms <= 0) return 0;
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export default function CountdownDays() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setDays(daysUntil(EVENT.startDate));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const display = days ?? "—";
  const live = days !== null;
  const happened = live && days === 0;

  return (
    <div
      className="countdown-days relative mt-8 max-w-md overflow-hidden rounded-2xl border border-send/25 bg-olive-darker/80 px-5 py-5 sm:px-6"
      aria-live="polite"
    >
      <div
        className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-send/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-valley/15 blur-3xl"
        aria-hidden
      />

      <div className="relative flex items-end gap-4 sm:gap-5">
        <div className="relative">
          <p
            className={`font-display text-6xl leading-none tracking-tight text-send sm:text-7xl ${
              live ? "countdown-pulse" : "opacity-40"
            }`}
          >
            {display}
          </p>
          <span
            className="pointer-events-none absolute inset-x-0 bottom-1 h-px bg-gradient-to-r from-transparent via-send to-transparent opacity-70"
            aria-hidden
          />
        </div>

        <div className="pb-1">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-send">
            {happened ? "It's on" : "Days to go"}
          </p>
          <p className="mt-1 max-w-[14rem] text-sm leading-snug text-sand/80">
            {happened
              ? `${EVENT.dateLabel} — see you at Glentress.`
              : `Until ${EVENT.dateLabel}`}
          </p>
        </div>
      </div>
    </div>
  );
}
