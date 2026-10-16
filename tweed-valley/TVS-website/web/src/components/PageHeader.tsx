export default function PageHeader({
  title,
  intro,
}: {
  title: string;
  intro?: string;
}) {
  return (
    <div className="border-b border-white/10 bg-olive-darker/60">
      <div className="container-tvs py-12">
        <h1 className="text-3xl text-sand sm:text-4xl">{title}</h1>
        <div className="mt-3 h-1 w-12 rounded-full bg-valley" />
        {intro && <p className="mt-4 max-w-2xl text-sand/70">{intro}</p>}
      </div>
    </div>
  );
}
