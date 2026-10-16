import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import VerticalVideo from "@/components/VerticalVideo";

export const metadata = { title: "Thanks" };

export default function SuccessPage() {
  return (
    <>
      <PageHeader title="You're in" />
      <div className="container-tvs py-12">
        <div className="mx-auto grid max-w-3xl items-center gap-8 sm:grid-cols-[240px_1fr]">
          <VerticalVideo src="/video/v-nico-drop" />
          <div className="text-center sm:text-left">
            <p className="text-lg text-sand">Thanks for grabbing your pass.</p>
            <p className="mt-3 text-sand/75">
              Next up: log in, sign the waiver, and watch the briefing. Once you
              pass the quick quiz you will get your check-in QR code by email.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <Link href="/account" className="btn-primary">
                Go to my account
              </Link>
              <Link href="/schedule" className="btn-ghost">
                See the schedule
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
