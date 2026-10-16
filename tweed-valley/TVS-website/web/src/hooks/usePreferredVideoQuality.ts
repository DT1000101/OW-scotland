"use client";

import { useEffect, useState } from "react";
import type { VideoQuality } from "@/lib/video";

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
};

function pickQuality(
  saveData: boolean,
  slowConnection: boolean,
  isDesktop: boolean,
): VideoQuality {
  if (saveData || slowConnection) return "mobile";
  if (isDesktop) return "full";
  // Keep lite quality on 4G/5G phones; only drop to mobile on save-data / 2G / 3G.
  return "lite";
}

function readQuality(): VideoQuality {
  if (typeof window === "undefined") return "lite";

  const connection = (navigator as Navigator & { connection?: NetworkInformation })
    .connection;
  const slowConnection =
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g" ||
    connection?.effectiveType === "3g";
  const isDesktop = window.matchMedia("(min-width: 768px)").matches;

  return pickQuality(!!connection?.saveData, slowConnection, isDesktop);
}

/** Picks encode quality from connection and viewport width. */
export function usePreferredVideoQuality(): VideoQuality {
  const [quality, setQuality] = useState<VideoQuality>(readQuality);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: NetworkInformation })
      .connection;
    const desktopQuery = window.matchMedia("(min-width: 768px)");

    const update = () => setQuality(readQuality());
    connection?.addEventListener?.("change", update);
    desktopQuery.addEventListener("change", update);
    return () => {
      connection?.removeEventListener?.("change", update);
      desktopQuery.removeEventListener("change", update);
    };
  }, []);

  return quality;
}

/** True below the `sm` breakpoint — used to defer heavy loads on phones. */
export function useIsMobileViewport(): boolean {
  const [mobile, setMobile] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(max-width: 767px)").matches;
  });

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mobileQuery.matches);
    update();
    mobileQuery.addEventListener("change", update);
    return () => mobileQuery.removeEventListener("change", update);
  }, []);

  return mobile;
}
