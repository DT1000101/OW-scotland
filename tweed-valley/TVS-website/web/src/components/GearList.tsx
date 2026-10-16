import { GEAR } from "@/lib/event";

export default function GearList({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <ul className="space-y-3">
        {GEAR.map((g) => (
          <li key={g.item} className="flex gap-3">
            <span
              className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                g.required
                  ? "bg-send/20 text-send"
                  : "bg-white/5 text-sand/50"
              }`}
            >
              {g.required ? "Required" : "Advised"}
            </span>
            <div>
              <p className="text-sm font-semibold text-sand">{g.item}</p>
              <p className="text-sm text-sand/70">{g.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
