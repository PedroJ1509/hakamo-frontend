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
    <div className="rounded-3xl border-2 border-dashed border-[#D5DDEC] bg-white px-6 py-14 text-center text-[#0A2342]">
      {kicker ? <p className="text-sm font-semibold text-[#1F5FD6]">{kicker}</p> : null}
      <p className={`font-[family-name:var(--font-space-grotesk)] text-2xl font-extrabold tracking-[-0.03em] ${kicker ? "mt-3" : ""}`}>{title}</p>
      {text ? <p className="mx-auto mt-2 max-w-sm text-[#33466A]">{text}</p> : null}
    </div>
  );
}
