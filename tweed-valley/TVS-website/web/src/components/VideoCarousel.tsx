"use client";

import { useEffect, useRef, useState } from "react";
import { useNearViewport } from "@/hooks/useNearViewport";
import {
  useIsMobileViewport,
  usePreferredVideoQuality,
} from "@/hooks/usePreferredVideoQuality";
import { videoSources } from "@/lib/video";
import VideoLoadingIndicator from "@/components/VideoLoadingIndicator";
import VideoPoster from "@/components/VideoPoster";

export type CarouselClip = {
  /** Base path without extension, e.g. "/video/flow-1" */
  src: string;
  poster?: string;
  caption?: string;
};

// Poster always visible; one video loads at a time when the carousel is on screen.
export default function VideoCarousel({
  clips,
  className = "",
}: {
  clips: CarouselClip[];
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const { ref, near } = useNearViewport("200px");
  const isMobile = useIsMobileViewport();
  const quality = usePreferredVideoQuality();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const go = (i: number) => setActive((i + clips.length) % clips.length);
  const clip = clips[active];
  const sources = clip ? videoSources(clip.src, quality) : null;
  const posterSrc = clip?.poster ?? sources?.poster ?? "";

  useEffect(() => {
    setReady(false);
  }, [active, quality, near]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !near) return;
    video.currentTime = 0;
    void video.play().catch(() => {});
  }, [active, near, quality]);

  // Prefetch next clip on fast desktop connections only.
  useEffect(() => {
    if (!near || clips.length < 2 || isMobile || quality === "mobile") return;

    const next = clips[(active + 1) % clips.length];
    const nextSources = videoSources(next.src, quality);
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "video";
    link.href = nextSources.mp4;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [active, clips, isMobile, near, quality]);

  if (clips.length === 0 || !clip || !sources) return null;

  const loading = near && !ready;

  const SWIPE_THRESHOLD = 48;

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const startX = touchStartX.current;
    const endX = e.changedTouches[0]?.clientX;
    touchStartX.current = null;
    if (startX == null || endX == null) return;

    const delta = endX - startX;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    if (delta < 0) go(active + 1);
    else go(active - 1);
  }

  return (
    <div ref={ref} className={className}>
      <div
        className="relative aspect-video w-full touch-pan-y overflow-hidden rounded-2xl border border-white/10 bg-black"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <VideoPoster
          src={posterSrc}
          fallback={sources.posterFallback}
          className={`z-0 transition-opacity duration-500 ${
            ready ? "opacity-0" : "opacity-100"
          }`}
        />

        {near ? (
          <video
            key={`${clip.src}-${quality}`}
            ref={videoRef}
            className={`absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-500 ${
              ready ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            playsInline
            preload="metadata"
            poster={posterSrc}
            onCanPlay={() => setReady(true)}
            onEnded={() => go(active + 1)}
          >
            <source src={sources.mp4} type="video/mp4" />
            {sources.webm ? (
              <source src={sources.webm} type="video/webm" />
            ) : null}
          </video>
        ) : null}

        {loading ? <VideoLoadingIndicator /> : null}

        {clip.caption ? (
          <>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/70 to-transparent" />
            <p className="absolute bottom-4 left-5 z-10 text-sm font-medium text-sand drop-shadow">
              {clip.caption}
            </p>
          </>
        ) : null}

        <button
          type="button"
          aria-label="Previous clip"
          onClick={() => go(active - 1)}
          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 p-2 text-sand backdrop-blur transition hover:bg-black/70"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next clip"
          onClick={() => go(active + 1)}
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 p-2 text-sand backdrop-blur transition hover:bg-black/70"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {clips.map((c, i) => (
          <button
            key={c.src}
            type="button"
            aria-label={`Go to clip ${i + 1}`}
            aria-current={i === active}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-6 bg-send" : "w-2 bg-sand/30 hover:bg-sand/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
