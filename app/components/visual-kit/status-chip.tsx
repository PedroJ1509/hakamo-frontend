export function StatusChip({ on, onLabel, offLabel }: { on: boolean; onLabel: string; offLabel: string }) {
  return (
    <span
      className={
        on
          ? "rounded-full bg-glow/25 px-3 py-1 text-xs font-medium text-accent"
          : "rounded-full bg-ink/6 px-3 py-1 text-xs font-medium text-muted"
      }
    >
      {on ? onLabel : offLabel}
    </span>
  );
}
