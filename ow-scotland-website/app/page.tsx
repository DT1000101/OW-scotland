import Link from "next/link";
import { Footer, Header } from "@/components/chrome";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="content">
        <section className="hero">
          <div className="hero-grid">
            <img
              src="/logo.jpg"
              alt="Onewheel Scotland logo: a puffin in a helmet on a onewheel, over a saltire."
              width={910}
              height={910}
            />
            <div>
              <p className="kicker">Rider-run community</p>
              <h1>Onewheel Scotland</h1>
              <p className="tagline">No stress, just stoke</p>
              <p className="support">Fungineertech powered adventures through Scotland.</p>
            </div>
          </div>
        </section>
        <div className="page">
          <div className="wrap">
            <p className="lede">
              We ride trail centres and scenic paths across Scotland, help new riders get
              started, and turn up for trail care in the Tweed Valley. This is the public
              face of the community, for riders, venues, and insurers.
            </p>
            <div className="grid-3">
              <article className="card">
                <h2>Riding</h2>
                <p>
                  Informal group rides, with the pace set so new riders and smaller boards
                  can finish the day.
                </p>
                <Link className="more" href="/riding">
                  Where members ride
                </Link>
              </article>
              <article className="card">
                <h2>The race</h2>
                <p>
                  We are working toward Tweed Valley Senduro, a small marshalled race at
                  Glentress, aimed at 2027.
                </p>
                <Link className="more" href="/events">
                  Tweed Valley Senduro
                </Link>
              </article>
              <article className="card">
                <h2>Venues</h2>
                <p>
                  A plain account of the boards, the riding, and the permissions a closed
                  course still needs.
                </p>
                <Link className="more" href="/venues">
                  For landowners and insurers
                </Link>
              </article>
            </div>
            <section className="section">
              <h2>How a day with the group works</h2>
              <p>
                Someone who already rides will slow the day down for a first go, on a beach,
                a cycle path, or an easy trail. On the hill we give way to walkers, cyclists,
                and horses, and we slow down around dogs. Helmets and wrist guards are the
                normal kit.
              </p>
              <p>
                People in the community also build and maintain boards, including VESC boards
                from kits such as Fungineers and Floatwheel. Experienced riders help with
                setup.
              </p>
            </section>
            <section className="band">
              <h2>Write to us</h2>
              <p>
                Riders, venues, and insurers can reach the community at{" "}
                <a href="mailto:onewheelscotland@gmail.com">onewheelscotland@gmail.com</a>.
                Photos and day-to-day news are on{" "}
                <a href="https://www.instagram.com/onewheel.scot/">Instagram</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
