"use client";

import { useEffect, useState } from "react";
import { clamp01 } from "./stage";
import { onSiteScroll } from "./scroll-bus";

export function useStageProgress(id: string) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = document.getElementById(id);
    if (!node) return;

    let frame = 0;
    let lastPublished = -1;
    let running = false;
    let cancelled = false;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      const total = node.offsetHeight - window.innerHeight;
      const next = total <= 0 ? 0 : clamp01(-rect.top / total);
      if (Math.abs(next - lastPublished) > 0.004) {
        lastPublished = next;
        setProgress(next);
      }
      return rect.bottom > 0 && rect.top < window.innerHeight;
    };

    const loop = () => {
      if (cancelled) return;
      const inView = measure();
      if (inView) {
        frame = requestAnimationFrame(loop);
      } else {
        running = false;
        frame = 0;
      }
    };

    const start = () => {
      if (cancelled || running) return;
      running = true;
      loop();
    };

    start();
    const off = onSiteScroll(start);
    window.addEventListener("scroll", start, { passive: true });
    window.addEventListener("resize", start);
    return () => {
      cancelled = true;
      running = false;
      cancelAnimationFrame(frame);
      off();
      window.removeEventListener("scroll", start);
      window.removeEventListener("resize", start);
    };
  }, [id]);

  return progress;
}
