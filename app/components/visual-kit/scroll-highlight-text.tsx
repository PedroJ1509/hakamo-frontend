"use client";

import { useEffect, useRef, useState } from "react";

function splitWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean);
}

export function ScrollHighlightText({
  kicker,
  text,
  hint = "Sigue abajo",
  nextHref = "#siguiente",
  tone = "night",
}: {
  kicker?: string;
  text: string;
  hint?: string;
  nextHref?: string;
  tone?: "night" | "paper";
}) {
  const rootRef = useRef<HTMLElement>(null);
  const words = splitWords(text);
  const [activeCount, setActiveCount] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const total = root.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setActiveCount(words.length);
        setComplete(true);
        return;
      }
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = scrolled / total;
      // Hold a bit at start/end so the last words and hint feel intentional
      const mapped = Math.min(1, Math.max(0, (progress - 0.05) / 0.82));
      const count = Math.round(mapped * words.length);
      setActiveCount(count);
      setComplete(mapped >= 0.98);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [words.length]);

  const night = tone === "night";

  return (
    <section
      ref={rootRef}
      className={`scroll-highlight ${night ? "scroll-highlight--night" : "scroll-highlight--paper"}`}
      aria-label={kicker ?? "Declaración"}
    >
      <div className="scroll-highlight-sticky">
        <div className="scroll-highlight-inner">
          {kicker ? <p className="scroll-highlight-kicker">{kicker}</p> : null}
          <p className="scroll-highlight-text">
            {words.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className={`scroll-highlight-word ${index < activeCount ? "is-on" : ""} ${
                  index === activeCount - 1 ? "is-current" : ""
                }`}
              >
                {word}{" "}
              </span>
            ))}
          </p>

          <a
            href={nextHref}
            className={`scroll-highlight-hint ${complete ? "is-visible" : ""}`}
            aria-hidden={!complete}
            tabIndex={complete ? 0 : -1}
          >
            <span>{hint}</span>
            <span className="scroll-highlight-hint-arrow" aria-hidden>
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
