import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/chrome";

export const metadata: Metadata = {
  title: "Riding",
  description:
    "Riding in Scotland with Onewheel Scotland. Trail centres, coasts, and how to come along.",
};

const places = [
  "Glentress and Innerleithen",
  "Beecraigs and Canada Wood",
  "Carron Valley and Comrie Croft",
  "Forest of Ae and Glencoe",
  "Tarland",
  "Coastal and scenic spots around Fife, Dundee, Aberdeenshire and Edinburgh",
];

export default function RidingPage() {
  return (
    <>
      <Header current="/riding" />
      <main id="content" className="page">
        <div className="wrap">
          <p className="kicker" style={{ color: "var(--teal-deep)" }}>
            Out on the boards
          </p>
          <h1>Riding in Scotland</h1>
          <div className="prose">
            <p>
              We ride for the same reason most people do: it&apos;s fun. Scotland&apos;s got some
              incredible places to explore, and riding with other people makes a good day
              even better.
            </p>
            <p>
              Rides aren&apos;t all the same. Sometimes it&apos;s a relaxed cruise and a catch-up.
              Sometimes it&apos;s a proper day out on the trails. If you&apos;re interested in joining
              us, get in touch and we&apos;ll help you find something that suits you.
            </p>
          </div>

          <section className="section prose">
            <h2>Where we ride</h2>
            <p>
              The Tweed Valley is a favourite, especially Glentress, but people in the
              community ride all over Scotland.
            </p>
            <p>Places riders have mentioned include:</p>
            <ul className="clean">
              {places.map((place) => (
                <li key={place}>{place}</li>
              ))}
            </ul>
            <p className="note">
              This isn&apos;t a list of official Onewheel routes or permissions. Access rules
              vary from place to place, so check what&apos;s allowed before riding.
            </p>
          </section>

          <section className="section prose">
            <h2>New to Onewheels?</h2>
            <p>
              Curious about getting started? Come say hello. Most of us have spent far too
              much time talking about boards, tyres, batteries and setups, and we&apos;re usually
              happy to help someone work out where to begin.
            </p>
            <p>
              If you&apos;re joining a ride for the first time, let us know what you&apos;ve ridden
              before and what sort of day you&apos;re after. No one needs to prove anything.
            </p>
            <div className="actions">
              <Link className="btn" href="/contact">
                Ask us a question
              </Link>
            </div>
          </section>

          <section className="section prose">
            <h2>Riding together</h2>
            <p>A few things we try to keep simple:</p>
            <ul className="clean">
              <li>
                Ride within your ability and wear appropriate protective gear — helmets and
                wrist guards are strongly recommended.
              </li>
              <li>Slow down around other people, give them space and be courteous.</li>
              <li>Respect trail closures, landowner rules and any local restrictions.</li>
              <li>Look after the places we ride and take your rubbish home.</li>
              <li>Keep an eye on each other, particularly on longer trail days.</li>
            </ul>
          </section>

          <section className="section prose">
            <h2>Boards, builds and fixes</h2>
            <p>
              You&apos;ll find all sorts of boards in the community, including stock Onewheels and
              custom VESC builds. If you like tinkering, you&apos;ve found your people. If you
              don&apos;t, that&apos;s fine too.
            </p>
          </section>

          <section className="band prose">
            <h2>Want to join in?</h2>
            <p>
              We share plans and ride updates through the community rather than publishing a
              fixed schedule here. Drop us a message or follow Instagram to find out
              what&apos;s happening.
            </p>
            <div className="actions">
              <Link className="btn" href="/contact">
                Contact us
              </Link>
              <a className="btn secondary" href="https://www.instagram.com/onewheel.scot/">
                @onewheel.scot
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
