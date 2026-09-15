const items = [
  "Python",
  "FastAPI",
  "Flask",
  "ASP.NET Core",
  "C#",
  "Angular",
  "Vue 3",
  "Ionic",
  "TypeScript",
  "Kotlin",
  "Business Central AL",
  "LS Central",
  "MS SQL Server",
  "PostgreSQL",
  "Supabase",
  "MongoDB",
  "BigQuery",
  "Google Cloud Run",
  "Docker",
  "OData v4",
  "Celery",
  "Next.js",
];

export function Ticker() {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line bg-bg-sunken/60 py-3.5" aria-label="Technologies I work with">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
      <ul className="flex w-max animate-ticker gap-8 whitespace-nowrap label text-ink-muted motion-reduce:animate-none">
        {loop.map((t, i) => (
          <li key={`${t}-${i}`} className="flex items-center gap-8" aria-hidden={i >= items.length}>
            {t}
            <span className="size-1 rounded-full bg-brass/70" />
          </li>
        ))}
      </ul>
    </div>
  );
}
