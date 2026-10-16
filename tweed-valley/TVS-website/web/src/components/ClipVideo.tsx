"use client";

import { useEffect, useRef, useState } from "react";
import { useNearViewport } from "@/hooks/useNearViewport";
import {
  useIsMobileViewport,
  usePreferredVideoQuality,
} from "@/hooks/usePreferredVideoQuality";
import { videoSources, type VideoQuality } from "@/lib/video";
import VideoLoadingIndicator from "@/components/VideoLoadingIndicator";
import VideoPoster from "@/components/VideoPoster";

// Poster-first clip. Pass `loadVideo` when a parent already decided visibility.
export default function ClipVideo({
  base,
  className = "",
  containerClassName = "",
  eagerDesktop = false,
  loop = true,
  onEnded,
  posterPriority = false,
  posterSizes: _posterSizes = "100vw",
  loadVideo,
  showLoader = true,
  qualityOverride,
}: {
  base: string;
  className?: string;
  containerClassName?: string;
  eagerDesktop?: boolean;
  loop?: boolean;
  onEnded?: () => void;
  posterPriority?: boolean;
  posterSizes?: string;
  /** When set, skips the internal viewport check (parent controls loading). */
  loadVideo?: boolean;
  /** Subtle spinner while buffering. Off for james-flow. */
  showLoader?: boolean;
  /** Force a quality tier (sidebar clips use mobile). */
  qualityOverride?: VideoQuality;
}) {
  const isMobile = useIsMobileViewport();
  const detectedQuality = usePreferredVideoQuality();
  const quality = qualityOverride ?? detectedQuality;
  const sources = videoSources(base, quality);
  const { ref, near } = useNearViewport(eagerDesktop ? "480px" : "120px");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);

  const shouldLoad =
    loadVideo ?? (near || (eagerDesktop && !isMobile));

  useEffect(() => {
    setReady(false);
  }, [base, quality, shouldLoad]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;
    void video.play().catch(() => {});
  }, [shouldLoad, base]);

  const loading = shouldLoad && !ready;

  return (
    <div
      ref={loadVideo === undefined ? ref : undefined}
      className={`relative overflow-hidden ${containerClassName}`}
    >
      <VideoPoster
        src={sources.poster}
        fallback={sources.posterFallback}
        eager={posterPriority}
        className={`transition-opacity duration-500 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      />

      {shouldLoad ? (
        <video
          key={`${base}-${quality}`}
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            ready ? "opacity-100" : "opacity-0"
          } ${className}`}
          autoPlay
          loop={loop}
          muted
          playsInline
          preload={eagerDesktop && !isMobile ? "auto" : "metadata"}
          poster={sources.poster}
          onCanPlay={() => setReady(true)}
          onEnded={onEnded}
        >
          <source src={sources.mp4} type="video/mp4" />
          {sources.webm ? (
            <source src={sources.webm} type="video/webm" />
          ) : null}
        </video>
      ) : null}

      {showLoader && loading ? <VideoLoadingIndicator /> : null}
    </div>
  );
}
