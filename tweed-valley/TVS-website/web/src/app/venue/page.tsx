import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import VerticalVideo from "@/components/VerticalVideo";
import { EVENT, VENUE_ZONES } from "@/lib/event";

export const metadata = { title: "Venue" };

export default function VenuePage() {
  return (
    <>
      <PageHeader
        title="Venue"
        intro={`${EVENT.venue} in the ${EVENT.region}. It is a busy trail centre that already handles big mountain bike events, so there is plenty of room and the basics are sorted.`}
      />
      <div className="container-tvs py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-3 text-xl text-sand">Getting there</h2>
            <div className="prose-tvs">
              <p>
                Glentress is near Peebles, about an hour south of Edinburgh.
                There is parking on site. Full directions and travel tips will
                be added closer to the date.
              </p>
              <p>
                <Link href="/maps" className="text-send hover:underline">
                  See the venue map
                </Link>{" "}
                or browse{" "}
                <Link href="/things-to-do" className="text-send hover:underline">
                  things to do
                </Link>{" "}
                around the weekend.
              </p>
            </div>
            <h2 className="mb-3 mt-8 text-xl text-sand">Staying over</h2>
            <div className="prose-tvs">
              <p>
                There is a free camping field, a lower camping field, and a main
                campsite. Toilet blocks are marked on the map. At the top of
                the hill there are hot tub lodges and a cafe, and there is
                another cafe lower down. Book your own accommodation early.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <VerticalVideo src="/video/v-jess-trees" />
          </div>
        </div>

        <h2 className="mb-4 mt-12 text-xl text-sand">How the site is laid out</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {VENUE_ZONES.map((z) => (
            <div
              key={z.name}
              className="card border-valley/15 transition hover:border-valley/50"
            >
              <p className="font-semibold text-valley">{z.name}</p>
              <p className="mt-1 text-sm text-sand/70">{z.note}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
