import type { ReactNode } from "react";

export function ChoiceCard({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-4 text-left transition ${
        active
          ? "border-accent bg-white shadow-[0_8px_30px_color-mix(in_srgb,var(--accent)_12%,transparent)]"
          : "border-transparent bg-soft hover:border-accent/25"
      }`}
    >
      {children}
    </button>
  );
}

export function ChipButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-3 py-2 text-sm ${
        active ? "bg-accent text-paper" : "bg-soft text-ink hover:bg-white"
      }`}
    >
      {children}
    </button>
  );
}
