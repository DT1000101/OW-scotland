import type { Metadata } from "next";
import { Footer, Header } from "@/components/chrome";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email Onewheel Scotland at onewheelscotland@gmail.com.",
};

export default function ContactPage() {
  return (
    <>
      <Header current="/contact" />
      <main id="content" className="page">
        <div className="wrap">
          <p className="kicker" style={{ color: "var(--teal-deep)" }}>
            Enquiries
          </p>
          <h1>Contact</h1>
          <p className="lede">
            Write to the community about riding, a venue, or insurance. We read the mail.
          </p>
          <div className="grid-2">
            <article className="panel">
              <h2>Email</h2>
              <p>
                <a href="mailto:onewheelscotland@gmail.com">onewheelscotland@gmail.com</a>
              </p>
              <p>This is the address we use with landowners and venues.</p>
            </article>
            <article className="panel">
              <h2>Instagram</h2>
              <p>
                <a href="https://www.instagram.com/onewheel.scot/">instagram.com/onewheel.scot</a>
              </p>
              <p>Day-to-day photos from the community live there.</p>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
