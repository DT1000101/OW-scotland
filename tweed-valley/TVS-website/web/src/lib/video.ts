export type VideoQuality = "mobile" | "lite" | "full";

/** Paths for a base clip under /public/video (no extension). */
export function videoSources(base: string, quality: VideoQuality = "lite") {
  const suffix =
    quality === "full" ? "" : quality === "mobile" ? "-mobile" : "-lite";

  return {
    mp4: `${base}${suffix}.mp4`,
    webm: quality === "mobile" ? undefined : `${base}${suffix}.webm`,
    poster: `${base}-poster-sm.webp`,
    posterFallback: `${base}-poster.jpg`,
  };
}
