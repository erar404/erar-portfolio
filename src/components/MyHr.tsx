import { myHrModules, myHrTeams } from "@/data/projects";
import { ArrowIcon } from "./Icons";
import { Item, Reveal, Stagger } from "./motion";
import { SectionHeader } from "./SectionHeader";
import { TechChips } from "./TechChips";

export function MyHr() {
  return (
    <section id="myhr" className="section border-t border-line bg-bg-sunken/40">
      <div className="wrap">
        <SectionHeader
          index="04"
          label="Titanium Systems Technologies · 2018 to 2023"
          title="Five years inside MyHR, a payroll and timekeeping platform for Philippine enterprises."
          lede={
            <>
              MyHR, now marketed as TitaniumHR, is a Philippine-built SaaS that unifies payroll, timekeeping, employee records,
              scheduling and movements, with compliance to local labour and tax rules at its core. I was a shared developer moved
              between the teams that built it.{" "}
              <a
                href="https://www.titanium.hr/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-ink underline decoration-brass/60 underline-offset-4 hover:decoration-brass"
              >
                titanium.hr
                <ArrowIcon className="size-3.5" />
              </a>
            </>
          }
        />

        <Reveal className="mt-14">
          <p className="label text-ink-faint">Platform modules I worked around</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {myHrModules.map((m, i) => (
              <li
                key={m}
                className={`rounded-lg border px-3.5 py-2 font-display text-sm font-semibold tracking-tight ${
                  i < 3 ? "border-brass/60 bg-brass-soft text-ink" : "border-line-strong text-ink-muted"
                }`}
              >
                {m}
              </li>
            ))}
          </ul>
        </Reveal>

        <Stagger as="div" className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {myHrTeams.map((t, i) => (
            <Item as="article" key={t.team} className="flex flex-col bg-bg p-7 sm:p-8">
              <p className="eyebrow">0{i + 1}</p>
              <h3 className="display mt-3 text-xl">{t.team}</h3>
              <p className="mt-1 text-sm text-ink-faint">
                {t.size} · {t.role}
              </p>
              <p className="mt-5 flex-1 text-pretty text-sm leading-relaxed text-ink-muted">{t.work}</p>
              <TechChips items={t.stack} className="mt-6" />
            </Item>
          ))}
        </Stagger>

        <Reveal className="mt-10 grid gap-6 rounded-2xl border border-line bg-bg p-7 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10 sm:p-8">
          <p className="label text-ink-faint">Capstone, 2018</p>
          <p className="text-base leading-relaxed text-ink-muted">
            Before MyHR there was <span className="font-medium text-ink">Human Resource Management System 4</span>, my university
            capstone: an HR system for PUP Quezon City faculty with payroll, compensation planning and HR analytics, built by a team of
            five on Java Spring MVC and MS SQL. I was its project manager.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
