export function CinematicTitle({ lines }: { lines: string[] }) {
  return (
    <h1 className="cinematic-title font-display max-w-3xl break-words text-[clamp(1.7rem,6.2vw,3.15rem)] leading-[1.08] tracking-[-0.03em]">
      {lines.map((line, index) => (
        <span className="block" key={`${line}-${index}`}>
          <span className={index === 1 ? "text-glow" : ""}>{line}</span>
        </span>
      ))}
    </h1>
  );
}
