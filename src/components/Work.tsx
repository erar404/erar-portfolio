import { profile } from "@/data/profile";
import { featuredWork, rgmcRepos, type Category } from "@/data/projects";
import { FeaturedArticle } from "./FeaturedArticle";
import { Item, Reveal, Stagger } from "./motion";
import { RepoLink } from "./RepoLink";
import { SectionHeader } from "./SectionHeader";
import { TechChips } from "./TechChips";

const categoryOrder: Category[] = ["Backend & integration", "Web & mobile", "ERP (Business Central)", "Automation & AI", "Data"];

export function Work() {
  return (
    <section id="work" className="section border-t border-line">
      <div className="wrap">
        <SectionHeader
          index="03"
          label="RGMC Group Incorporated"
          title="The application stack of a retail and garment group, mostly written by me."
          lede={
            <>
              Since August 2024 I have authored or co-authored 30+ repositories under the company&apos;s{" "}
              <a href={profile.links.companyGithub} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-brass/60 underline-offset-4 hover:decoration-brass">
                rgmc-apps
              </a>{" "}
              GitHub account. Five are shown in depth below, the rest are listed after them. Commit counts are from GitHub.
            </>
          }
        />

        <div className="mt-20 space-y-24 lg:space-y-32">
          {featuredWork.map((p, i) => (
            <FeaturedArticle
              key={p.id}
              kicker={p.kicker}
              title={p.title}
              description={p.description}
              bullets={p.outcomes}
              visual={p.visual}
              flip={i % 2 === 1}
            >
              <TechChips items={p.repo.stack} className="mt-6" />
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                <RepoLink repo={p.repo} />
                {p.repo.commits !== undefined && (
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-ink-faint">
                    {p.repo.commits} commits · {p.repo.role}
                  </span>
                )}
              </div>
            </FeaturedArticle>
          ))}
        </div>

        {/* Every other repository, grouped */}
        <div className="mt-28 border-t border-line pt-14">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">More contributions</p>
              <h3 className="display mt-3 text-[clamp(1.6rem,3vw,2.2rem)]">Everything else under rgmc-apps</h3>
            </div>
            <p className="max-w-[44ch] text-[0.9rem] text-ink-muted">
              Private repositories are named but not linked. Excluded on purpose: legacy systems I did not author.
            </p>
          </Reveal>

          <div className="mt-10 space-y-12">
            {categoryOrder.map((cat) => {
              const repos = rgmcRepos.filter((r) => r.category === cat);
              if (!repos.length) return null;
              return (
                <div key={cat} className="grid gap-6 lg:grid-cols-12">
                  <h4 className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-brass lg:col-span-3 lg:pt-5">{cat}</h4>
                  <Stagger as="ul" className="divide-y divide-line lg:col-span-9">
                    {repos.map((r) => (
                      <Item as="li" key={r.name} className="grid gap-3 py-5 sm:grid-cols-[1fr_auto] sm:gap-6">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <h5 className="font-display text-[1.05rem] font-semibold tracking-tight">{r.name}</h5>
                            {r.commits !== undefined && (
                              <span className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-ink-faint">{r.commits} commits</span>
                            )}
                            {r.role && <span className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-ink-faint">· {r.role}</span>}
                          </div>
                          <p className="mt-1.5 max-w-[62ch] text-[0.9rem] leading-relaxed text-ink-muted">{r.blurb}</p>
                          <TechChips items={r.stack} className="mt-3" limit={7} />
                        </div>
                        <div className="sm:pt-1">
                          <RepoLink repo={r} />
                        </div>
                      </Item>
                    ))}
                  </Stagger>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
