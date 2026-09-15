export function TechChips({ items, className = "", limit }: { items: readonly string[]; className?: string; limit?: number }) {
  const shown = limit ? items.slice(0, limit) : items;
  const rest = limit ? items.length - shown.length : 0;
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Technology stack">
      {shown.map((t) => (
        <li key={t} className="chip">
          {t}
        </li>
      ))}
      {rest > 0 && <li className="chip border-dashed">+{rest} more</li>}
    </ul>
  );
}
