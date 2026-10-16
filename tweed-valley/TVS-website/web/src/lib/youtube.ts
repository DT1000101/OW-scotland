/** Placeholder until real segment walkthroughs are uploaded. Glentress red route POV. */
export const DEFAULT_TRAIL_YOUTUBE_ID = "2ym-9hdgZfI";

/** Accepts an 11-char ID or a full YouTube / youtu.be URL. */
export function parseYoutubeId(input: string): string | null {
  const trimmed = input.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(
      trimmed.startsWith("http") ? trimmed : `https://${trimmed}`,
    );
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.slice(1).split("/")[0] ?? null;
    }
    const v = url.searchParams.get("v");
    if (v) return v;
    const embed = url.pathname.match(/\/embed\/([\w-]{11})/);
    if (embed) return embed[1];
  } catch {
    return null;
  }

  return null;
}

export function youtubeEmbedUrl(id: string): string {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${params}`;
}

export function youtubeThumbnailUrl(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
