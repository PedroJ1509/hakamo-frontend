export function Marquee({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  const row = [...items, ...items];

  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {row.map((item, index) => (
          <span key={`${item}-${index}`} className="marquee-item">
            {item}
            <span className="mx-6 text-glow">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
