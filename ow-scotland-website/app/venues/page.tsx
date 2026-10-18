import type { Metadata } from "next";
import { Footer, Header } from "@/components/chrome";

export const metadata: Metadata = {
  title: "Venues",
  description:
    "How Onewheel Scotland describes a marshalled ride to landowners, venues, and insurers.",
};

export default function VenuesPage() {
  return (
    <>
      <Header current="/venues" />
      <main id="content" className="page">
        <div className="wrap">
          <p className="kicker" style={{ color: "var(--teal-deep)" }}>
            Landowners, venues, insurers
          </p>
          <h1>A plain account of the riding</h1>
          <p className="lede">
            Onewheel Scotland is a rider-run community. We are preparing a small marshalled
            race at Glentress, and we speak to venues in the open.
          </p>
          <section className="panel">
            <h2>The boards</h2>
            <p>Riders use single-wheeled self-balancing electric boards.</p>
            <p>
              The board drives when the rider is on the footpads. Lifting the nose, or coming
              off the board, cuts the motor.
            </p>
          </section>
          <section className="section">
            <h2>What we are asking to run</h2>
            <ul className="clean">
              <li>Existing mountain-bike trail, ridden in the intended direction.</li>
              <li>One rider on a race trail at a time.</li>
              <li>Helmets and wrist guards for anyone on a board.</li>
              <li>A briefing, marshals, and first aid suited to the hill.</li>
              <li>Supervised demonstrations for people who want a first go.</li>
              <li>Riders give way to other people on the hill.</li>
            </ul>
          </section>
          <section className="section">
            <h2>What a closed course still needs</h2>
            <p>
              We have opened a conversation with Forestry and Land Scotland. Onewheels are
              classed as motorised vehicles. A wider arrangement, so members of a governing
              body could use Forestry land, was discussed as work still to do.
            </p>
            <ul className="clean">
              <li>A Section 11 order from Scottish Borders Council, to close named trails for the race.</li>
              <li>A written risk assessment.</li>
              <li>Public liability insurance.</li>
            </ul>
            <p>
              Enquiries from venues and insurers go to{" "}
              <a href="mailto:onewheelscotland@gmail.com">onewheelscotland@gmail.com</a>.
            </p>
          </section>
          <section className="band">
            <h2>Trail care</h2>
            <p>
              Members already join Forestry and Land Scotland visitor-service days in the Tweed
              Valley. The public list is on{" "}
              <a href="https://www.eventbrite.co.uk/o/forestry-and-land-scotland-visitor-services-tweed-valley-34105789963">
                Eventbrite
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
