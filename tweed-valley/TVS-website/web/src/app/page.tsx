import Link from "next/link";
import Image from "next/image";
import { EVENT, SPONSORS } from "@/lib/event";
import PoweredBy from "@/components/PoweredBy";
import ClipVideo from "@/components/ClipVideo";
import VideoCarousel from "@/components/VideoCarousel";
import CountdownDays from "@/components/CountdownDays";

const REEL_CLIPS = [
  { src: "/video/v-jess-sun" },
  { src: "/video/v-nico-trees" },
  { src: "/video/v-jess-trees" },
];

export default function Home() {
  return (
    <>
      <p className="text-center text-2xl font-bold text-blue-500">testtttttt</p>
      <section className="relative overflow-hidden">
        <div className="container-tvs grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-send">
              {EVENT.dateLabel}
            </p>
            <h1 className="text-4xl leading-tight text-sand sm:text-5xl lg:text-6xl">
              Tweed Valley <span className="text-send">Senduro</span>
            </h1>
            <p className="mt-4 max-w-lg text-lg text-sand/80">
              A OneWheel enduro weekend at{" "}
              <strong className="font-semibold text-sand">
                {EVENT.venue} in the {EVENT.region}
              </strong>
              . Plenty of practice time, one timed run per trail, food, a fire,
              and somewhere to hang out with everyone else.
            </p>
            <a
              href={EVENT.venueMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-sm text-send hover:underline"
            >
              <span aria-hidden="true">📍</span>
              Glentress mtb resort →
            </a>
            <CountdownDays />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/tickets" className="btn-primary">
                Get tickets
              </Link>
              <Link href="/schedule" className="btn-ghost">
                See the schedule
              </Link>
            </div>
            <PoweredBy size="md" className="mt-8" />
          </div>

          <div className="flex justify-center">
            <Image
              src="/img/senduro-logo.webp"
              alt="Tweed Valley Senduro logo"
              width={360}
              height={360}
              unoptimized
              sizes="(max-width: 640px) 60vw, 360px"
              className="h-auto w-52 max-w-full drop-shadow-2xl sm:w-72 lg:w-[360px]"
              priority
            />
          </div>
        </div>
      </section>

      <section className="container-tvs pt-12">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-olive-darker sm:min-h-[560px] lg:min-h-[620px]">
          <div className="pointer-events-none relative h-56 w-full sm:absolute sm:inset-0 sm:h-auto sm:[clip-path:polygon(74%_0,100%_0,100%_100%,55%_100%)]">
            <ClipVideo
              base="/video/james-flow"
              eagerDesktop
              showLoader={false}
              posterPriority
              posterSizes="(max-width: 768px) 100vw, 50vw"
              containerClassName="h-full w-full sm:absolute sm:inset-y-0 sm:right-0 sm:w-[70%]"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-olive-darker via-olive-darker/40 to-transparent sm:bg-gradient-to-r sm:from-olive-darker sm:via-olive-darker/75 sm:to-olive-darker/20" />
            <div className="absolute inset-0 bg-black/25" />
          </div>

          <div className="relative z-10 p-8 sm:absolute sm:inset-0 sm:flex sm:flex-col sm:justify-center sm:p-12">
            <div className="max-w-md drop-shadow-[0_2px_6px_rgba(0,0,0,0.75)] sm:pr-10">
              <p className="text-xs uppercase tracking-widest text-send">
                Virtual course walkthrough
              </p>
              <h2 className="mt-2 text-3xl leading-tight text-sand sm:text-4xl lg:text-5xl">
                Watch each section before you ride
              </h2>
              <p className="mt-4 text-sand/80">
                We film a looping run-through of every race segment so you know
                exactly what is coming. Watch them all on the segments page —
                great for a lap in your head on the way up the hill.
              </p>
              <Link href="/racing" className="btn-primary mt-6 inline-flex">
                Watch the segments
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-tvs pt-10">
        <div className="card flex flex-col gap-5 border-valley/30 bg-valley/5 sm:flex-row-reverse sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-valley">
              Virtual briefing
            </p>
            <h2 className="mt-1 text-2xl text-sand">
              Log in to complete your virtual briefing
            </h2>
            <p className="mt-2 max-w-xl text-sm text-sand/75">
              Sign your waiver, watch the briefing, and take the quick quiz —
              then your check-in code is ready on the day.
            </p>
          </div>
          <Link
            href="/login"
            className="btn-primary shrink-0 self-start sm:self-auto"
          >
            Log in to get started
          </Link>
        </div>
      </section>

      <section className="container-tvs pt-8">
        <div className="card flex flex-col items-start gap-4 border-send/30 bg-send/5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-send">
              Lend a hand
            </p>
            <h2 className="mt-1 text-2xl text-sand">Volunteer with us</h2>
            <p className="mt-2 max-w-xl text-sm text-sand/75">
              Join the crew and get free entry, a limited edition crew t-shirt, a
              goodie bag, and short rotating shifts so you still get to ride.
            </p>
          </div>
          <Link href="/volunteer" className="btn-primary shrink-0">
            Volunteer with us
          </Link>
        </div>
      </section>

      <section className="container-tvs pt-12">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-send">
              A taste of the weekend
            </p>
            <h2 className="mt-1 text-2xl text-sand">Riding at Glentress</h2>
          </div>
          <Link href="/racing" className="shrink-0 text-sm text-send hover:underline">
            The segments →
          </Link>
        </div>
        <VideoCarousel
          clips={[
            { src: "/video/flow-1" },
            { src: "/video/flow-2" },
            { src: "/video/flow-3" },
          ]}
        />
      </section>

      <section className="relative mt-10 overflow-hidden border-y border-valley/20">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/video/trees-jump-bg.webp"
            alt=""
            fill
            sizes="100vw"
            quality={40}
            className="object-cover opacity-60 [filter:grayscale(0.4)_contrast(0.95)]"
          />
          <div className="absolute inset-0 bg-olive-dark/55" />
          <div className="absolute inset-0 bg-valley/[0.06]" />
        </div>

        <div className="container-tvs relative z-10 py-14">
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-valley">
            <span className="inline-block h-px w-6 bg-valley/60" />
            What to expect
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "One run per trail",
                text: "Practice all weekend. On race day you get one timed run per segment, so it counts.",
              },
              {
                title: "All levels welcome",
                text: "Come as you are and ride at your own pace. Whether you're chasing a fast time or just out for a good weekend, there's a place for you here.",
              },
              {
                title: "Sign your waiver and briefing online",
                text: "Complete your waiver and watch the safety briefing on your phone before you arrive. Then just scan your code on the day to collect your timing chip — no queues.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="card border-valley/15 transition hover:border-valley/50"
              >
                <h3 className="text-lg text-valley">{f.title}</h3>
                <p className="mt-2 text-sm text-sand/75">{f.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-sand/60">
            Full format and rules on the{" "}
            <Link href="/rules" className="text-send hover:underline">
              Rules
            </Link>{" "}
            page.
          </p>
        </div>
      </section>

      <section className="container-tvs pt-14">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-valley">
            More than the trails
          </p>
          <h2 className="mt-1 text-2xl text-sand">
            A cracking place to ride between the trails, too
          </h2>
        </div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible">
          {REEL_CLIPS.map((clip) => (
            <div
              key={clip.src}
              className="min-w-[62%] shrink-0 snap-center sm:min-w-0 sm:shrink"
            >
              <ClipVideo
                base={clip.src}
                posterSizes="260px"
                containerClassName="mx-auto aspect-[9/16] w-full max-w-[260px] overflow-hidden rounded-2xl border border-white/10 bg-black shadow-lg"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t border-white/10">
        <div className="container-tvs py-10">
          <p className="text-center text-xs uppercase tracking-widest text-sand/50">
            Sponsors
          </p>
          {SPONSORS.length > 0 ? (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {SPONSORS.map((s) =>
                s.logo ? (
                  <a
                    key={s.name}
                    href={s.url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.name}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.logo}
                      alt={s.name}
                      className="h-10 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
                    />
                  </a>
                ) : (
                  <a
                    key={s.name}
                    href={s.url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-sand/60 hover:text-send"
                  >
                    {s.name}
                  </a>
                ),
              )}
            </div>
          ) : (
            <p className="mt-4 text-center text-sm text-sand/60">
              Want your brand here?{" "}
              <Link href="/contact" className="text-send hover:underline">
                Get in touch about sponsoring the event.
              </Link>
            </p>
          )}
        </div>
      </section>
    </>
  );
}
