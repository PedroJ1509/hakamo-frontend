"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { onSiteScroll } from "./landing/scroll-bus";

export function Reveal({
  children,
  className = "",
  delay = 0,
  from = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "up" | "right" | "left" | "wipe";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("is-visible");
      return;
    }
    if (typeof CSS !== "undefined" && CSS.supports("animation-timeline: view()")) return;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const visible = rect.top < vh * 1.22 && rect.bottom > vh * 0.1;
      node.style.transitionDelay = visible ? `${delay}ms` : "0ms";
      node.classList.toggle("is-visible", visible);
    };

    measure();
    const off = onSiteScroll(measure);
    window.addEventListener("resize", measure);
    return () => {
      off();
      window.removeEventListener("resize", measure);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`reveal reveal-${from} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
