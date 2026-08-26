import type { ReactNode } from "react";

export function StagePanel({
  tone,
  children,
}: {
  tone: "paper" | "night";
  children: ReactNode;
}) {
  const night = tone === "night";
  return (
    <div className={`stage-panel ${night ? "bg-night text-paper" : "bg-paper text-ink"}`}>
      {night ? <div className="lamp-glow" aria-hidden /> : null}
      <div className="relative z-10 mx-auto w-full max-w-6xl">{children}</div>
    </div>
  );
}
