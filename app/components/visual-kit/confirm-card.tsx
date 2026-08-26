import type { ReactNode } from "react";

export function ConfirmCard({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white p-6 text-ink">
      <p className="text-[11px] uppercase tracking-[0.32em] text-accent">{kicker}</p>
      <p className="font-display mt-2 text-4xl tracking-[0.2em] text-night">{title}</p>
      <dl className="mt-6 space-y-2 text-sm text-muted">{children}</dl>
    </div>
  );
}

export function ConfirmRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex justify-between gap-4">
      <dt>{label}</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  );
}
