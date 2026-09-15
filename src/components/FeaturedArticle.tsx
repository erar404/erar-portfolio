import type { ReactNode } from "react";
import type { Visual } from "@/data/projects";
import { Reveal } from "./motion";
import { ProjectVisual } from "./ProjectVisual";

type Props = {
  kicker: string;
  title: string;
  description: string[];
  bullets: string[];
  visual: Visual;
  /** Put the visual on the right instead of the left (desktop only). */
  flip: boolean;
  children?: ReactNode;
};

/** Shared layout for a featured project: visual on one side, copy on the other, alternating per row. */
export function FeaturedArticle({ kicker, title, description, bullets, visual, flip, children }: Props) {
  return (
    <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
      <div className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}>
        <ProjectVisual visual={visual} />
      </div>
      <Reveal className={`lg:col-span-6 ${flip ? "lg:order-1" : ""}`}>
        <p className="eyebrow">{kicker}</p>
        <h3 className="display mt-3 text-2xl">{title}</h3>
        <div className="mt-5 max-w-[58ch] space-y-4 text-pretty text-base leading-relaxed text-ink-muted">
          {description.map((d) => (
            <p key={d}>{d}</p>
          ))}
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-[0.5em] size-1.5 shrink-0 rounded-full bg-brass" aria-hidden />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        {children}
      </Reveal>
    </article>
  );
}
