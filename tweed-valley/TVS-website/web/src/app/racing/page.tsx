import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import TrailVideo from "@/components/TrailVideo";
import { TRAILS } from "@/lib/event";

export const metadata = { title: "Segments" };

const gradeColor: Record<string, string> = {
  Blue: "text-blue-300 border-blue-300/40",
  Red: "text-red-300 border-red-300/40",
  Black: "text-sand border-sand/40",
};

export default function RacingPage() {
  return (
    <>
      <PageHeader
        title="Race segments"
        intro="Looping run-throughs of every timed segment at Glentress. Watch them before you ride — great for a lap in your head on the way up the hill. Final list confirmed after scoping."
      />

      <div className="container-tvs py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TRAILS.map((t) => (
            <div key={t.slug} className="card">
              <TrailVideo
                youtubeId={t.youtubeId}
                title={`${t.name} walkthrough`}
                label={`${t.name} walkthrough — coming soon`}
              />
              <div className="mt-3 flex items-start justify-between gap-3">
                <h2 className="text-lg text-sand">{t.name}</h2>
                <span
                  className={`shrink-0 rounded border px-2 py-0.5 text-xs ${gradeColor[t.grade]}`}
                >
                  {t.grade}
                </span>
              </div>
              <p className="mt-1 text-xs text-sand/50">{t.lengthLabel}</p>
              <p className="mt-2 text-sm text-sand/75">{t.blurb}</p>
              {t.isRaceSegment ? (
                <p className="mt-3 inline-block rounded bg-send/15 px-2.5 py-1 text-xs text-send">
                  Timed race segment
                </p>
              ) : null}
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-sand/60">
          Format, categories, safety gear, and on-course rules are on the{" "}
          <Link href="/rules" className="text-send hover:underline">
            Rules
          </Link>{" "}
          page.
        </p>
      </div>
    </>
  );
}
