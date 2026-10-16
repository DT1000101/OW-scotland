import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import VerticalVideo from "@/components/VerticalVideo";
import { SCHEDULE, ONGOING } from "@/lib/event";

export const metadata = { title: "Schedule" };

export default function SchedulePage() {
  return (
    <>
      <PageHeader
        title="Schedule"
        intro="How the weekend runs. Times will shift a bit closer to the date, but this is the plan."
      />
      <div className="container-tvs py-12">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_260px]">
          <div className="space-y-6">
            {SCHEDULE.map((day) => (
              <div key={day.day} className="card">
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-widest text-valley">
                    {day.day}
                  </p>
                  <h2 className="mt-1 text-xl text-sand">{day.title}</h2>
                </div>
                <ul className="space-y-2">
                  {day.items.map((item, i) => (
                    <li key={i} className="flex gap-4 text-sand/80">
                      <span className="w-14 shrink-0 font-semibold text-valley">
                        {item.time ?? ""}
                      </span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <VerticalVideo
            src="/video/v-chan-berms"
            className="lg:sticky lg:top-24"
          />
        </div>

        <section className="mt-12 rounded-xl border border-send/40 bg-send/10 p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-full bg-send px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
              All weekend
            </span>
            <h2 className="text-xl text-sand">Ongoing games</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {ONGOING.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-lg bg-olive-darker/40 p-4"
              >
                <span className="mt-1 text-send">★</span>
                <div>
                  <p className="font-semibold text-sand">{item.title}</p>
                  <p className="text-sm text-sand/75">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-10 text-center text-sm text-sand/60">
          Watch the{" "}
          <Link href="/racing" className="text-send hover:underline">
            segment videos
          </Link>{" "}
          or read the{" "}
          <Link href="/rules" className="text-send hover:underline">
            rules
          </Link>{" "}
          before race day.
        </p>
      </div>
    </>
  );
}
