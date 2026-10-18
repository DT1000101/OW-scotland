import Link from "next/link";
import { Footer, Header } from "@/components/chrome";

export default function HomePage() {
  return (
    <>
      <Header current="/" />
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
              <p className="kicker">Riders across Scotland</p>
              <h1>Onewheel Scotland</h1>
              <p className="tagline">Good rides. Good people.</p>
            </div>
          </div>
        </section>
        <div className="page">
          <div className="wrap">
            <div className="prose">
              <p>
                We&apos;re a bunch of Onewheel riders from across Scotland who like getting out
                on our boards, finding new places to ride and meeting other people who are
                just as into it.
              </p>
              <p>
                Some of us love technical trails and steep descents. Others are happier
                cruising along and stopping for a coffee. There&apos;s room for both.
              </p>
              <p>
                If you&apos;re already riding, thinking about getting a board, or just wondering
                what on earth those one-wheeled things are, you&apos;re in the right place.
              </p>
            </div>
            <div className="actions">
              <Link className="btn" href="/riding">
                Come ride with us
              </Link>
              <Link className="btn secondary" href="/contact">
                Get in touch
              </Link>
            </div>

            <section className="section prose">
              <h2>Come for a ride</h2>
              <p>
                From the Tweed Valley to other spots around Scotland, we&apos;re always finding
                excuses to get out for a ride. Some days it&apos;s an afternoon on the trails;
                other days it&apos;s a longer session with a food stop and plenty of charging
                breaks.
              </p>
              <p>
                You don&apos;t have to be a racer, or ride the fanciest board. Just say hello and
                find out what&apos;s coming up.
              </p>
              <div className="actions">
                <Link className="btn" href="/riding">
                  Riding in Scotland
                </Link>
              </div>
            </section>

            <section className="section prose">
              <h2>Tweed Valley Senduro</h2>
              <p>We&apos;re looking into putting on a Onewheel enduro event at Glentress in 2027.</p>
              <p>
                It&apos;s a place we ride regularly, and the mix of purpose-built MTB trails and
                on-site facilities makes it an exciting possibility. The idea is a few timed
                stages, a chance to ride with people from across the community, and a good
                weekend in the Tweed Valley.
              </p>
              <p>
                It&apos;s still early days — the event and dates aren&apos;t confirmed — but we&apos;ll
                share updates as things progress.
              </p>
              <div className="actions">
                <Link className="btn" href="/events">
                  The event idea
                </Link>
              </div>
            </section>

            <section className="section prose">
              <h2>More than just riding</h2>
              <p>
                A good day on the trails depends on the people who look after them. We&apos;d like
                Onewheel Scotland to be a positive part of the places we ride, whether
                that&apos;s helping out at trail-care days, joining local clean-ups or simply
                being considerate when we&apos;re out and about.
              </p>
              <p>
                If you organise a community project or look after a venue and fancy chatting,
                we&apos;d love to hear from you.
              </p>
              <div className="actions">
                <Link className="btn" href="/contact">
                  Say hello
                </Link>
              </div>
            </section>

            <section className="band prose">
              <h2>Find us</h2>
              <p>
                For ride photos, updates and the occasional bit of board-related nonsense,
                follow{" "}
                <a href="https://www.instagram.com/onewheel.scot/">@onewheel.scot</a>.
              </p>
              <p>
                For questions, introductions or anything else, email{" "}
                <a href="mailto:onewheelscotland@gmail.com">onewheelscotland@gmail.com</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
