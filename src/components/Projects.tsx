import { personalProjects } from "@/data/projects";
import { FeaturedArticle } from "./FeaturedArticle";
import { RepoLink } from "./RepoLink";
import { SectionHeader } from "./SectionHeader";
import { TechChips } from "./TechChips";

export function Projects() {
  return (
    <section id="projects" className="section border-t border-line">
      <div className="wrap">
        <SectionHeader
          index="05"
          label="Personal products"
          title="Things I built for people I know, end to end."
          lede="A recording studio, a cafe with a music studio, and the bands that use both. Each one is a real deployment with an admin behind it, not a demo."
        />

        <div className="mt-20 space-y-24 lg:space-y-32">
          {personalProjects.map((p, i) => (
            <FeaturedArticle
              key={p.id}
              kicker={p.kicker}
              title={p.title}
              description={p.description}
              bullets={p.highlights}
              visual={p.visual}
              flip={i % 2 === 0}
            >
              <div className="mt-7 space-y-4">
                {p.repos.map((r) => (
                  <div key={r.name} className="border-t border-line pt-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <RepoLink repo={r} tone="ink" />
                      {r.commits !== undefined && (
                        <span className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-ink-faint">{r.commits} commits</span>
                      )}
                    </div>
                    <TechChips items={r.stack} className="mt-3" />
                  </div>
                ))}
              </div>
            </FeaturedArticle>
          ))}
        </div>
      </div>
    </section>
  );
}
