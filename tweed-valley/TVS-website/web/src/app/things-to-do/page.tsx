import PageHeader from "@/components/PageHeader";
import VerticalVideo from "@/components/VerticalVideo";
import { THINGS_TO_DO } from "@/lib/event";

export const metadata = { title: "Things to do" };

export default function ThingsToDoPage() {
  return (
    <>
      <PageHeader
        title="Things to do"
        intro="Stuff to do when you are not riding. None of it is compulsory, so pick what you fancy."
      />
      <div className="container-tvs py-12">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_260px]">
          <div className="grid gap-4 sm:grid-cols-2">
            {THINGS_TO_DO.map((t) => (
              <div
                key={t.title}
                className="card border-valley/15 transition hover:border-valley/50"
              >
                <h2 className="text-lg text-valley">{t.title}</h2>
                <p className="mt-2 text-sand/75">{t.text}</p>
              </div>
            ))}
          </div>
          <VerticalVideo
            src="/video/v-chan-flow"
            className="lg:sticky lg:top-24"
          />
        </div>
      </div>
    </>
  );
}
