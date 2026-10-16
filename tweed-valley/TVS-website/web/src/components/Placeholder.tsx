export default function Placeholder({
  label,
  ratio = "aspect-video",
}: {
  label: string;
  ratio?: string;
}) {
  return (
    <div
      className={`flex ${ratio} w-full items-center justify-center rounded-lg border border-dashed border-sand-muted/30 bg-white/5 text-sm text-sand/50`}
    >
      {label}
    </div>
  );
}
