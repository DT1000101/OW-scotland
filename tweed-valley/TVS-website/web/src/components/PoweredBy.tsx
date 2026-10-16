import Image from "next/image";
import { ORGANISER } from "@/lib/event";

type Size = "sm" | "md" | "lg";

const LOGO: Record<Size, number> = { sm: 28, md: 40, lg: 56 };
const TEXT: Record<Size, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export default function PoweredBy({
  size = "md",
  className = "",
}: {
  size?: Size;
  className?: string;
}) {
  const px = LOGO[size];
  return (
    <a
      href={ORGANISER.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label={`Powered by ${ORGANISER.name}`}
    >
      <Image
        src={ORGANISER.logo}
        alt={`${ORGANISER.name} logo`}
        width={px}
        height={px}
        className="rounded-full ring-1 ring-white/10 transition group-hover:ring-send/50"
      />
      <span className="leading-tight">
        <span className={`block uppercase tracking-widest text-sand/45 ${TEXT[size]}`}>
          Powered by
        </span>
        <span className={`block font-semibold text-sand/80 group-hover:text-send ${TEXT[size]}`}>
          {ORGANISER.name}
        </span>
      </span>
    </a>
  );
}
