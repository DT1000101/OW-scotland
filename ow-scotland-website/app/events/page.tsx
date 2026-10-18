import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/chrome";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Tweed Valley Senduro is a proposed Onewheel enduro at Glentress, aiming for 2027. Nothing is booked yet.",
};

export default function EventsPage() {
  return (
    <>
      <Header current="/events" />
      <main id="content" className="page">
        <div className="wrap">
          <p className="kicker" style={{ color: "var(--teal-deep)" }}>
            What&apos;s happening
          </p>
          <h1>Events</h1>
          <div className="prose">
            <p>
              Most of what we do is just getting together to ride. We&apos;re also hoping to
              bring something a bit bigger to Scotland.
            </p>
          </div>

          <section className="section prose">
            <h2>Tweed Valley Senduro</h2>
            <h3>A Onewheel enduro in the Tweed Valley — hopefully in 2027</h3>
            <p>
              Every time we ride at Glentress, someone says it would make a brilliant venue
              for a Onewheel event. There are loads of purpose-built MTB trails, a great
              setting and the sort of facilities that could make a full weekend of it.
            </p>
            <p>So we&apos;ve started exploring the idea of Tweed Valley Senduro.</p>
            <p>
              The plan we&apos;re looking at is an enduro-style race with several timed stages on
              existing trails. Riders would tackle each stage individually, with an
              opportunity to practise beforehand if the final arrangements allow it.
              We&apos;d love it to be a weekend where people come for the riding and stay for
              the company.
            </p>
            <p>
              Nothing&apos;s booked or officially confirmed yet. We&apos;re speaking to the relevant
              people about routes, permissions and how the event could work safely.
              We&apos;ll share proper details once there&apos;s something definite to announce.
            </p>
            <p className="status">
              Proposed event · Aiming for 2027 · Glentress, Tweed Valley
            </p>
            <div className="actions">
              <a className="btn" href="https://tweed-valley-senduro.vercel.app/">
                Visit the Senduro site
              </a>
              <a className="btn secondary" href="https://www.instagram.com/tweedvalleysenduro/">
                @tweedvalleysenduro
              </a>
            </div>
          </section>

          <section className="section prose">
            <h2>Other events</h2>
            <p>
              There&apos;s already a brilliant Onewheel event scene around the UK and Europe,
              including events such as Float the Highlands and Shred the Shires. We love
              seeing people make the effort to bring riders together.
            </p>
            <p>If you&apos;re organising something you&apos;d like us to share, get in touch.</p>
            <div className="actions">
              <Link className="btn" href="/contact">
                Get in touch
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
