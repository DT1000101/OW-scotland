"use client";

import Placeholder from "@/components/Placeholder";
import {
  parseYoutubeId,
  youtubeEmbedUrl,
  youtubeThumbnailUrl,
} from "@/lib/youtube";

// Trail walkthrough via YouTube embed (lazy-loaded iframe).
export default function TrailVideo({
  youtubeId,
  title,
  label = "Trail walkthrough — coming soon",
}: {
  /** YouTube video ID or full watch URL. */
  youtubeId?: string;
  title?: string;
  label?: string;
}) {
  if (!youtubeId) return <Placeholder label={label} ratio="aspect-video" />;

  const id = parseYoutubeId(youtubeId);
  if (!id) return <Placeholder label={label} ratio="aspect-video" />;

  const embedUrl = youtubeEmbedUrl(id);
  const thumbUrl = youtubeThumbnailUrl(id);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-black">
      {/* Thumbnail shows instantly while the iframe loads */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbUrl}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <iframe
        src={embedUrl}
        title={title ?? "Trail walkthrough video"}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
