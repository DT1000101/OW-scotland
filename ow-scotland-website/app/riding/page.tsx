import type { Metadata } from "next";
import { Footer, Header } from "@/components/chrome";

export const metadata: Metadata = {
  title: "Riding",
  description:
    "Informal group rides with Onewheel Scotland, and the places members already ride.",
};

const trails = [
  "Glentress, Tweed Valley",
  "Innerleithen",
  "Beecraigs",
  "Canada Wood",
  "Carron Valley",
  "Comrie Croft",
  "Forest of Ae",
  "Glencoe",
  "Tarland",
];

const paths = [
  "Fife coast",
  "Monifieth to Dundee cycle path",
  "Deeside",
  "Stonehaven",
  "Portobello beach",
  "Leith, Granton, and Cramond",
];

export default function RidingPage() {
  return (
    <>
      <Header current="/riding" />
      <main id="content" className="page">
        <div className="wrap">
          <p className="kicker" style={{ color: "var(--teal-deep)" }}>
            The community
          </p>
          <h1>Riding</h1>
          <p className="lede">
            Group rides are informal. The pace is set so new riders and smaller boards can
            finish the day. A usual shape is a session, food and a charge, then another
            session.
          </p>
          <div className="grid-2">
            <section className="panel">
              <h2>Trail centres</h2>
              <p>Places members ride. Glentress is the one the group uses most.</p>
              <ul className="places">
                {trails.map((place) => (
                  <li key={place}>{place}</li>
                ))}
              </ul>
            </section>
            <section className="panel">
              <h2>Coasts and paths</h2>
              <p>Scenic days, when the weather suits them.</p>
              <ul className="places">
                {paths.map((place) => (
                  <li key={place}>{place}</li>
                ))}
              </ul>
            </section>
          </div>
          <section className="section">
            <h2>On a shared path</h2>
            <ul className="clean">
              <li>Riders give way to walkers, cyclists, and horses.</li>
              <li>We slow down around dogs.</li>
              <li>Helmets and wrist guards are the normal kit on trails and organised riding.</li>
              <li>Knee protection is common on steeper trails.</li>
              <li>A first go is supervised by someone who already rides.</li>
            </ul>
            <p className="note">
              Plans are shared inside the community. Write to us if you want to ride along.
            </p>
          </section>
          <section className="section">
            <h2>Boards</h2>
            <p>
              The community includes people who build and maintain their own boards, including
              VESC boards from kits such as Fungineers and Floatwheel. Experienced riders help
              a new owner choose a board and set it up. Trail days are planned around a charge
              at lunch.
            </p>
          </section>
          <section className="band">
            <h2>Trail care</h2>
            <p>
              Members join Forestry and Land Scotland visitor-service trail days in the Tweed
              Valley. Days are booked through{" "}
              <a href="https://www.eventbrite.co.uk/o/forestry-and-land-scotland-visitor-services-tweed-valley-34105789963">
                their Eventbrite page
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
