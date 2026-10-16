"use client";

import ClipVideo from "@/components/ClipVideo";

// Sidebar / decorative vertical clip — quality follows connection + viewport.
export default function VerticalVideo({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  return (
    <ClipVideo
      base={src}
      showLoader
      posterSizes="260px"
      containerClassName={`mx-auto aspect-[9/16] w-full max-w-[260px] overflow-hidden rounded-2xl border border-white/10 bg-black shadow-lg ${className}`}
      className="object-cover"
    />
  );
}
