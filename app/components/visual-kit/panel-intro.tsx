import type { ReactNode } from "react";
import { panelCard } from "@/lib/visual-kit/styles";

export function PanelIntro({
  kicker,
  title,
  children,
  stats,
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
  stats?: { label: string; value: string | number }[];
}) {
  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-night px-6 py-7 text-paper">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full bg-glow/18 blur-3xl"
        />
        <p className="relative text-[11px] uppercase tracking-[0.32em] text-glow">{kicker}</p>
        <h1 className="font-display relative mt-2 text-3xl leading-[0.95] sm:text-4xl">{title}</h1>
        {children ? <div className="relative mt-3 max-w-2xl text-sm leading-6 text-paper/60">{children}</div> : null}
      </div>
      {stats && stats.length > 0 ? (
        <div className={`grid gap-3 ${stats.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
          {stats.map((stat) => (
            <div key={stat.label} className={`${panelCard} py-4`}>
              <p className="text-[11px] uppercase tracking-[0.22em] text-accent">{stat.label}</p>
              <p className="font-display mt-1 text-3xl text-ink">{stat.value}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
