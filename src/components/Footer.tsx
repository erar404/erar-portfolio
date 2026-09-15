import { profile } from "@/data/profile";
import { socials } from "./socials";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-bg-sunken/60">
      <div className="wrap flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-[1.05rem] font-semibold tracking-tight">{profile.name}</p>
          <p className="mt-1 text-[0.82rem] text-ink-faint">
            {profile.role} · {profile.location} · © {year}
          </p>
        </div>
        <ul className="flex items-center gap-3" aria-label="Profiles">
          {socials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-10 place-items-center rounded-full border border-line-strong text-ink-muted transition-colors hover:border-brass hover:text-brass"
              >
                <Icon className="size-4" />
              </a>
            </li>
          ))}
        </ul>
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-ink-faint">Built with Next.js, Tailwind CSS and Framer Motion</p>
      </div>
    </footer>
  );
}
