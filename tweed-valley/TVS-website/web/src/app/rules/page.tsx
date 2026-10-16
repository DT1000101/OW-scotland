import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import GearList from "@/components/GearList";
import {
  EOL,
  RACE_FORMAT,
  CHICKEN_LINES,
  CATEGORIES,
  SAFETY,
  RACE_RULES,
  JURY,
  CODE_OF_CONDUCT,
  COMPLAINTS,
} from "@/lib/racing";

export const metadata = { title: "Rules" };

const SECTIONS = [
  { id: "format", label: "How it works" },
  { id: "categories", label: "Categories" },
  { id: "safety", label: "Safety & gear" },
  { id: "rules", label: "On-course rules" },
  { id: "jury", label: "Race jury" },
  { id: "conduct", label: "Code of conduct" },
  { id: "complaints", label: "Complaints" },
];

export default function RulesPage() {
  return (
    <>
      <PageHeader
        title="Rules"
        intro="How the Senduro works, what gear you need, and how we keep everyone safe. We run to the European Onewheel League (EOL) Racing Standard for safety and conduct."
      />

      <div className="container-tvs py-12">
        <nav className="mb-10 flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-sand/80 hover:border-send/50 hover:text-send"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="mx-auto max-w-3xl space-y-16">
          <section id="format" className="scroll-mt-24">
            <h2 className="text-2xl text-sand">How the enduro works</h2>
            <p className="mt-3 text-sand/80">{RACE_FORMAT.intro}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {RACE_FORMAT.points.map((p) => (
                <div key={p.title} className="card">
                  <h3 className="text-lg text-send">{p.title}</h3>
                  <p className="mt-2 text-sm text-sand/75">{p.text}</p>
                </div>
              ))}
            </div>

            <div className="card mt-4 border-send/20 bg-send/5">
              <h3 className="text-sm font-semibold text-sand">
                {CHICKEN_LINES.title}
              </h3>
              {CHICKEN_LINES.body.map((b) => (
                <p key={b} className="mt-2 text-sm text-sand/75">
                  {b}
                </p>
              ))}
            </div>

            <p className="mt-4 text-xs text-sand/50">{RACE_FORMAT.eolNote}</p>
          </section>

          <section id="categories" className="scroll-mt-24">
            <h2 className="text-2xl text-sand">Categories</h2>
            <p className="mt-3 text-sand/80">{CATEGORIES.intro}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {CATEGORIES.list.map((c) => (
                <div key={c.name} className="card">
                  <h3 className="text-lg text-send">{c.name}</h3>
                  <p className="mt-2 text-sm text-sand/75">{c.detail}</p>
                </div>
              ))}
            </div>
            <ul className="mt-4 space-y-2">
              {CATEGORIES.notes.map((n) => (
                <li key={n} className="flex gap-2 text-sm text-sand/70">
                  <span className="mt-0.5 text-send" aria-hidden="true">
                    •
                  </span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="safety" className="scroll-mt-24">
            <h2 className="text-2xl text-sand">Safety &amp; gear</h2>
            <p className="mt-3 text-sand/80">{SAFETY.intro}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="card border-send/30 bg-send/5">
                <h3 className="text-lg text-sand">Required</h3>
                <ul className="mt-3 space-y-2">
                  {SAFETY.required.map((r) => (
                    <li key={r} className="flex gap-2 text-sm text-sand/85">
                      <span className="mt-0.5 shrink-0 text-send">✓</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card">
                <h3 className="text-lg text-sand">Recommended</h3>
                <ul className="mt-3 space-y-2">
                  {SAFETY.recommended.map((r) => (
                    <li key={r} className="flex gap-2 text-sm text-sand/75">
                      <span className="mt-0.5 shrink-0 text-sand/40">+</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card mt-4">
              <h3 className="text-lg text-sand">{SAFETY.helmet.title}</h3>
              <ul className="mt-3 space-y-2">
                {SAFETY.helmet.body.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-sand/75">
                    <span className="mt-0.5 shrink-0 text-send" aria-hidden>
                      •
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card mt-4">
              <h3 className="text-lg text-sand">What to bring</h3>
              <GearList className="mt-4" />
            </div>

            <p className="mt-4 rounded bg-white/5 p-3 text-sm text-sand/75">
              {SAFETY.substances}
            </p>
          </section>

          <section id="rules" className="scroll-mt-24">
            <h2 className="text-2xl text-sand">{RACE_RULES.title}</h2>
            <p className="mt-3 text-sand/80">{RACE_RULES.intro}</p>
            <ul className="mt-6 space-y-3">
              {RACE_RULES.rules.map((r) => (
                <li key={r} className="card flex gap-3 text-sm text-sand/80">
                  <span className="mt-0.5 shrink-0 text-red-300" aria-hidden>
                    ✕
                  </span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <div className="card mt-4 border-send/20 bg-send/5">
              <h3 className="text-sm font-semibold text-sand">Overtaking</h3>
              <p className="mt-2 text-sm text-sand/75">
                {RACE_RULES.overtaking}
              </p>
            </div>
          </section>

          <section id="jury" className="scroll-mt-24">
            <h2 className="text-2xl text-sand">{JURY.title}</h2>
            <div className="mt-4 space-y-3">
              {JURY.body.map((b) => (
                <p key={b} className="text-sand/80">
                  {b}
                </p>
              ))}
            </div>
          </section>

          <section id="conduct" className="scroll-mt-24">
            <h2 className="text-2xl text-sand">{CODE_OF_CONDUCT.title}</h2>
            <p className="mt-3 text-sand/80">{CODE_OF_CONDUCT.intro}</p>
            <ul className="mt-4 space-y-2">
              {CODE_OF_CONDUCT.points.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-sand/75">
                  <span className="mt-0.5 text-send" aria-hidden>
                    •
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-lg text-sand">Trail etiquette</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {CODE_OF_CONDUCT.etiquette.map((e) => (
                <div key={e.title} className="card">
                  <h4 className="text-send">{e.title}</h4>
                  <p className="mt-2 text-sm text-sand/75">{e.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="complaints" className="scroll-mt-24">
            <h2 className="text-2xl text-sand">{COMPLAINTS.title}</h2>
            <div className="mt-4 space-y-4">
              <div className="card">
                <h3 className="text-sm font-semibold text-sand">
                  During the event
                </h3>
                <p className="mt-2 text-sm text-sand/75">{COMPLAINTS.atEvent}</p>
              </div>
              <div className="card">
                <h3 className="text-sm font-semibold text-sand">
                  After the event
                </h3>
                <p className="mt-2 text-sm text-sand/75">
                  {COMPLAINTS.afterEvent}
                </p>
              </div>
              <p className="text-xs text-sand/50">{COMPLAINTS.authority}</p>
            </div>
          </section>

          <section className="border-t border-white/10 pt-8">
            <p className="text-sm text-sand/60">
              Safety and conduct rules on this page are summarised from the{" "}
              <a
                href={EOL.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-send hover:underline"
              >
                {EOL.name}
              </a>{" "}
              {EOL.standardVersion}. The full standard is the property of the EOL
              Board of Directors. In any conflict, the official EOL Standard and
              event officials take precedence.
            </p>
            <p className="mt-4 text-sm text-sand/60">
              Course walkthrough videos are on{" "}
              <Link href="/racing" className="text-send hover:underline">
                Race segments
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
