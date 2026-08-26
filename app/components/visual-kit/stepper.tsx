export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="grid grid-cols-3 gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted">
      {steps.map((label, index) => (
        <li
          key={label}
          className={`rounded-full px-3 py-2 text-center ${
            index === current ? "bg-accent text-paper" : "bg-soft text-muted"
          }`}
        >
          {label}
        </li>
      ))}
    </ol>
  );
}
