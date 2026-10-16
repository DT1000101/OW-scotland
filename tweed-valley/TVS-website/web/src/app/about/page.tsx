import PageHeader from "@/components/PageHeader";
import PoweredBy from "@/components/PoweredBy";
import { EVENT } from "@/lib/event";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About the event" />
      <div className="container-tvs py-12">
        <div className="prose-tvs mx-auto max-w-2xl">
          <p>
            Tweed Valley Senduro is a OneWheel enduro weekend at {EVENT.venue} in
            the {EVENT.region}. A few of us ride these events and wanted to run
            one the way we would want to turn up to.
          </p>
          <p>
            You practice as much as you like over the weekend. On race day you
            get one timed run per trail. All levels are welcome — ride at your
            own pace, whether you&apos;re going for a fast time or just out to enjoy
            it.
          </p>
          <p>
            The waiver, briefing, and your check-in code are all done online
            before you arrive, so race morning is not spent queuing for
            paperwork. That leaves more time to ride and to sit by the fire
            afterwards.
          </p>
          <p>
            We run it as a Community Interest Company. The aim is to break even
            and put on a good weekend for everyone.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-2xl border-t border-white/10 pt-6">
          <PoweredBy size="md" />
        </div>
      </div>
    </>
  );
}
