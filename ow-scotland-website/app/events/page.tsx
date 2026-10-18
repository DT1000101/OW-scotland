import type { Metadata } from "next";
import { Footer, Header } from "@/components/chrome";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Tweed Valley Senduro is a Glentress race Onewheel Scotland is working toward for 2027.",
};

export default function EventsPage() {
  return (
    <>
      <Header current="/events" />
      <main id="content" className="page">
        <div className="wrap">
          <p className="kicker" style={{ color: "var(--teal-deep)" }}>
            Working toward 2027
          </p>
          <h1>Tweed Valley Senduro</h1>
          <p className="lede">
            Onewheel Scotland is working toward a Scottish round of the European Onewheel
            League at Glentress. The event name is Tweed Valley Senduro. The aim is a first
            event in 2027.
          </p>
          <section className="panel">
            <h2>The shape of the race</h2>
            <ul className="clean">
              <li>A small, marshalled field on existing mountain-bike trails.</li>
              <li>One rider on a race trail at a time.</li>
              <li>Riders follow the direction the trails were built.</li>
              <li>The course uses the hill as it is. We are not adding features.</li>
              <li>Anyone on a board wears a helmet and wrist guards.</li>
              <li>A briefing, marshals, and first aid are part of the plan.</li>
              <li>Demonstrations are supervised.</li>
              <li>Riders give way to other people on the hill.</li>
            </ul>
          </section>
          <section className="section">
            <h2>Permission</h2>
            <p>
              We are in conversation with Forestry and Land Scotland. Onewheels are classed as
              motorised vehicles. A national way for members of a governing body to use
              Forestry land was discussed as future work.
            </p>
            <p>
              A closed-trail event still needs a Section 11 order from Scottish Borders Council,
              a written risk assessment, and public liability insurance.
            </p>
          </section>
          <section className="section grid-2">
            <article className="panel">
              <h2>Event site</h2>
              <p>
                Plans for the race are being written up on the event site. The event also has
                its own Instagram, separate from this organisation.
              </p>
              <p>
                <a href="https://tweed-valley-senduro.vercel.app">tweed-valley-senduro.vercel.app</a>
              </p>
              <p>
                <a href="https://www.instagram.com/tweedvalleysenduro/">@tweedvalleysenduro</a>
              </p>
            </article>
            <article className="panel">
              <h2>Other UK events</h2>
              <p>
                Float the Highlands, at Glencoe, and Shred the Shires are neighbouring events
                in the same sport. Onewheel Scotland is its own organisation.
              </p>
            </article>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
