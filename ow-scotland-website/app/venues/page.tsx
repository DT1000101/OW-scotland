import type { Metadata } from "next";
import { Footer, Header } from "@/components/chrome";

export const metadata: Metadata = {
  title: "Venues & enquiries",
  description:
    "Questions for Onewheel Scotland about group rides, a proposed event, or access to a venue.",
};

export default function VenuesPage() {
  return (
    <>
      <Header current="/venues" />
      <main id="content" className="page">
        <div className="wrap">
          <p className="kicker" style={{ color: "var(--teal-deep)" }}>
            For venues, landowners and organisers
          </p>
          <h1>Working with Onewheel Scotland</h1>
          <div className="prose">
            <p>
              Seen someone riding a board with a single wheel and wondered what it is? Or
              had a question about a group ride, an event or access to your venue?
              You&apos;re welcome to get in touch.
            </p>
            <p>
              We&apos;re a community of riders, not a commercial tour operator. We want to build
              good relationships with the people who manage the places we visit and be clear
              about what we&apos;re doing.
            </p>
          </div>

          <section className="section prose">
            <h2>What&apos;s a Onewheel?</h2>
            <p>
              It&apos;s a self-balancing electric board with one large wheel in the middle. You
              stand sideways, a bit like a snowboard, and control your speed by shifting
              your weight.
            </p>
            <p>
              Boards vary: some are standard production models and others are custom-built.
              They&apos;re powered vehicles, and we don&apos;t assume that permission to ride a
              bicycle means permission to ride a Onewheel.
            </p>
          </section>

          <section className="section prose">
            <h2>Rides and events</h2>
            <p>
              An informal group ride and a timed competition are very different things. If
              we&apos;re looking to organise something at a venue, we&apos;d discuss the route,
              access, safety measures, insurance and any permissions needed before making
              plans public.
            </p>
            <p>
              We&apos;re currently exploring the possibility of Tweed Valley Senduro, a small
              enduro-style event at Glentress in 2027. It remains a proposal, not a
              confirmed booking.
            </p>
          </section>

          <section className="section prose">
            <h2>Looking after places we ride</h2>
            <p>
              We understand that good trails take a lot of work. We&apos;re interested in
              getting involved in litter picks, trail-care opportunities and other practical
              ways to support local riding areas, where organisers and land managers are
              happy for us to help.
            </p>
          </section>

          <section className="band prose">
            <h2>Let&apos;s talk</h2>
            <p>
              If you manage a venue, represent a local organisation, provide event services
              or have a question about Onewheels, email us. We&apos;re happy to explain the
              boards and talk through any ideas.
            </p>
            <p>
              <a href="mailto:onewheelscotland@gmail.com">onewheelscotland@gmail.com</a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
