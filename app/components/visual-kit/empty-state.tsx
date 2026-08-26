import { mutedClass } from "@/lib/visual-kit/styles";

export function EmptyState({
  kicker,
  title,
  text,
}: {
  kicker?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="rounded-[1.75rem] border border-dashed border-ink/12 bg-white px-6 py-14 text-center">
      {kicker ? <p className="text-[11px] uppercase tracking-[0.32em] text-accent">{kicker}</p> : null}
      <p className={`font-display text-2xl text-ink ${kicker ? "mt-3" : ""}`}>{title}</p>
      {text ? <p className={`mx-auto mt-2 max-w-sm ${mutedClass}`}>{text}</p> : null}
    </div>
  );
}
