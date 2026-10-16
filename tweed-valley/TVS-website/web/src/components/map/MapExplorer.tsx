"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  CATEGORY_META,
  GRADE_META,
  MAP_POINTS,
  type MapPoint,
  type PlaceCategory,
} from "@/lib/mapData";
import type { Basemap } from "./LeafletMap";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-olive-darker/60 text-sm text-sand/50">
      Loading map…
    </div>
  ),
});

function iconFor(point: MapPoint): { color: string; glyph: string; small?: boolean } {
  if (point.kind === "trail") {
    return {
      color: GRADE_META[point.grade].color,
      glyph: point.competition ? "🏁" : "",
      small: !point.competition,
    };
  }
  const meta = CATEGORY_META[point.category];
  return { color: meta.color, glyph: meta.emoji };
}

function subtitle(point: MapPoint): string {
  if (point.kind === "trail") {
    return `${GRADE_META[point.grade].label} trail${
      point.competition ? " · Timed segment" : " · Not raced"
    }`;
  }
  return CATEGORY_META[point.category].label;
}

export default function MapExplorer() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [basemap, setBasemap] = useState<Basemap>("street");
  const [listOpen, setListOpen] = useState(true);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Overlay list hides the non-competition trails (kept subtle on the map only).
  const listPoints = useMemo(
    () => MAP_POINTS.filter((p) => !(p.kind === "trail" && !p.competition)),
    []
  );

  useEffect(() => {
    if (selectedId && itemRefs.current[selectedId]) {
      itemRefs.current[selectedId]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedId]);

  const usedGrades = useMemo(() => {
    const grades = new Set(
      MAP_POINTS.filter((p) => p.kind === "trail").map((p) => p.grade)
    );
    return (Object.keys(GRADE_META) as (keyof typeof GRADE_META)[]).filter(
      (g) => grades.has(g)
    );
  }, []);
  const hasOtherTrails = MAP_POINTS.some(
    (p) => p.kind === "trail" && !p.competition
  );
  const placeCategories = useMemo(() => {
    const cats = new Set(
      MAP_POINTS.filter((p) => p.kind === "place").map((p) => p.category)
    );
    return (Object.keys(CATEGORY_META) as PlaceCategory[]).filter((c) =>
      cats.has(c)
    );
  }, []);

  return (
    <div>
      <div className="relative h-[460px] overflow-hidden rounded-xl border border-white/10 sm:h-[560px]">
        <LeafletMap
          points={MAP_POINTS}
          selectedId={selectedId}
          onSelect={setSelectedId}
          basemap={basemap}
        />

        {/* Compact jump-to list, overlaid on the map (desktop only — on mobile
            it lives below the map as chips to save space) */}
        <div className="pointer-events-none absolute left-3 top-3 z-[1000] hidden w-44 sm:block sm:w-56">
          <div className="pointer-events-auto overflow-hidden rounded-lg border border-white/15 bg-olive-darker/90 shadow-lg backdrop-blur">
            <button
              onClick={() => setListOpen((v) => !v)}
              className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left"
              aria-expanded={listOpen}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-sand/70">
                Jump to
              </span>
              <span className="text-sand/50">{listOpen ? "▾" : "▸"}</span>
            </button>
            {listOpen && (
              <div className="max-h-[280px] space-y-0.5 overflow-y-auto border-t border-white/10 px-1.5 pb-1.5 pt-1.5 sm:max-h-[420px]">
                {listPoints.map((point) => {
                  const { color, glyph } = iconFor(point);
                  const active = point.id === selectedId;
                  return (
                    <button
                      key={point.id}
                      ref={(el) => {
                        itemRefs.current[point.id] = el;
                      }}
                      onClick={() => setSelectedId(point.id)}
                      title={`${point.name} — ${subtitle(point)}`}
                      className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition ${
                        active
                          ? "bg-send/20 text-sand"
                          : "text-sand/85 hover:bg-white/10"
                      }`}
                    >
                      <span
                        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/50 text-[9px] leading-none"
                        style={{ backgroundColor: color }}
                        aria-hidden="true"
                      >
                        {glyph}
                      </span>
                      <span className="truncate text-xs font-medium">
                        {point.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Street / satellite toggle, overlaid top-right */}
        <div className="absolute right-3 top-3 z-[1000]">
          <div className="flex overflow-hidden rounded-lg border border-white/15 bg-olive-darker/90 text-xs font-medium shadow-lg backdrop-blur">
            <button
              onClick={() => setBasemap("street")}
              className={`px-3 py-1.5 transition ${
                basemap === "street"
                  ? "bg-send/25 text-sand"
                  : "text-sand/70 hover:bg-white/10"
              }`}
            >
              Map
            </button>
            <button
              onClick={() => setBasemap("satellite")}
              className={`px-3 py-1.5 transition ${
                basemap === "satellite"
                  ? "bg-send/25 text-sand"
                  : "text-sand/70 hover:bg-white/10"
              }`}
            >
              Satellite
            </button>
          </div>
        </div>
      </div>

      {/* Compact jump-to chips below the map (mobile only) */}
      <div className="mt-3 sm:hidden">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-sand/60">
          Jump to
        </p>
        <div className="flex flex-wrap gap-1.5">
          {listPoints.map((point) => {
            const { color, glyph } = iconFor(point);
            const active = point.id === selectedId;
            return (
              <button
                key={point.id}
                onClick={() => setSelectedId(point.id)}
                className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition ${
                  active
                    ? "border-send bg-send/20 text-sand"
                    : "border-white/15 bg-white/5 text-sand/85"
                }`}
              >
                <span
                  className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-white/50 text-[8px] leading-none"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                >
                  {glyph}
                </span>
                <span>{point.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend below the map */}
      <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sand/60">
          Legend
        </p>
        <div className="mb-4">
          <p className="mb-2 text-xs text-sand/50">Competition trails</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {usedGrades.map((g) => (
              <span
                key={g}
                className="flex items-center gap-1.5 text-xs text-sand/80"
              >
                <span
                  className="inline-block h-3 w-3 rounded-full border border-white/60"
                  style={{ backgroundColor: GRADE_META[g].color }}
                />
                {GRADE_META[g].label}
              </span>
            ))}
            {hasOtherTrails && (
              <span className="flex items-center gap-1.5 text-xs text-sand/50">
                <span className="inline-block h-2 w-2 rounded-full bg-sand/40" />
                Other trails (not raced)
              </span>
            )}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs text-sand/50">Places</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {placeCategories.map((c) => (
              <span
                key={c}
                className="flex items-center gap-1.5 text-xs text-sand/80"
              >
                <span aria-hidden="true">{CATEGORY_META[c].emoji}</span>
                {CATEGORY_META[c].label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
