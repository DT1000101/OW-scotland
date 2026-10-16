"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/** True once the element is near (or inside) the viewport. Disconnects after first hit. */
export function useNearViewport<T extends Element = HTMLDivElement>(
  rootMargin = "240px",
): { ref: RefObject<T>; near: boolean } {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [near, rootMargin]);

  return { ref, near };
}
