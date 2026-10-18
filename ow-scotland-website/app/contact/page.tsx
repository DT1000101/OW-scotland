import type { Metadata } from "next";
import { Footer, Header } from "@/components/chrome";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email Onewheel Scotland, or say hello on Instagram.",
};

export default function ContactPage() {
  return (
    <>
      <Header current="/contact" />
      <main id="content" className="page">
        <div className="wrap">
          <p className="kicker" style={{ color: "var(--teal-deep)" }}>
            Say hello
          </p>
          <h1>Get in touch</h1>
          <div className="prose">
            <p>
              Want to come for a ride, ask about boards, share an event or talk to us about
              a venue? Send us a message.
            </p>
          </div>
          <div className="grid-2">
            <article className="panel">
              <h2>Email</h2>
              <p>
                <a href="mailto:onewheelscotland@gmail.com">onewheelscotland@gmail.com</a>
              </p>
              <p>Best for questions, event enquiries and anything that needs a proper reply.</p>
            </article>
            <article className="panel">
              <h2>Instagram</h2>
              <p>
                <a href="https://www.instagram.com/onewheel.scot/">@onewheel.scot</a>
              </p>
              <p>Find ride photos, community updates and a way to say hello.</p>
            </article>
          </div>
          <p className="note" style={{ marginTop: "1.4rem" }}>
            You don&apos;t need a polished introduction. Just tell us what&apos;s on your mind.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
