import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import VerticalVideo from "@/components/VerticalVideo";
import { VOLUNTEER } from "@/lib/event";

export const metadata = { title: "Volunteer" };

export default function VolunteerPage() {
  return (
    <>
      <PageHeader
        title="Volunteer with us"
        intro={VOLUNTEER.intro}
      />
      <div className="container-tvs py-12">
        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
          <div className="card">
            <h2 className="text-lg text-sand">What you get</h2>
            <p className="mt-2 text-sm text-sand/70">
              A thank-you for helping us run the weekend.
            </p>
            <ul className="mt-5 space-y-3">
              {VOLUNTEER.perks.map((perk) => (
                <li key={perk} className="flex gap-3 text-sm text-sand/85">
                  <span className="mt-0.5 shrink-0 text-send" aria-hidden="true">
                    ✓
                  </span>
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <VerticalVideo src="/video/v-jess-sun" />
            <div className="card">
              <h2 className="text-lg text-sand">How it works</h2>
              <ul className="mt-4 space-y-3">
                {VOLUNTEER.howItWorks.map((item) => (
                  <li key={item} className="text-sm text-sand/75">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card border-send/30 bg-send/5">
              <h2 className="text-lg text-sand">Can I still race?</h2>
              <p className="mt-2 text-sm text-sand/75">
                {VOLUNTEER.racingNote}{" "}
                <Link href="/rules" className="text-send hover:underline">
                  See the rules
                </Link>
                .
              </p>
            </div>

            <div className="card">
              <h2 className="text-lg text-sand">Want in?</h2>
              <p className="mt-2 text-sm text-sand/75">
                Drop us a message with your name, what you are happy to help
                with, and whether you are planning to ride. We will get back to
                you with a shift plan.
              </p>
              <Link href="/contact" className="btn-primary mt-4 inline-flex">
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
