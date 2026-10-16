import PageHeader from "@/components/PageHeader";
import VerticalVideo from "@/components/VerticalVideo";
import { FAQS } from "@/lib/event";

export const metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <>
      <PageHeader title="Questions and answers" />
      <div className="container-tvs py-12">
        <div className="mx-auto grid max-w-5xl items-start gap-8 lg:grid-cols-[1fr_260px]">
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="card group transition hover:border-valley/40 open:border-valley/40"
              >
                <summary className="cursor-pointer list-none font-semibold text-sand marker:hidden">
                  <span className="text-valley">Q. </span>
                  {faq.q}
                </summary>
                <p className="mt-3 text-sand/75">{faq.a}</p>
              </details>
            ))}
          </div>
          <VerticalVideo
            src="/video/v-mollie-2"
            className="lg:sticky lg:top-24"
          />
        </div>
      </div>
    </>
  );
}
