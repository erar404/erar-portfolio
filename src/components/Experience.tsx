import { experience } from "@/data/profile";
import { Reveal } from "./motion";
import { SectionHeader } from "./SectionHeader";
import { TechChips } from "./TechChips";

export function Experience() {
  return (
    <section id="experience" className="section border-t border-line bg-bg-sunken/40">
      <div className="wrap">
        <SectionHeader
          index="02"
          label="Work experience"
          title="Three teams, one throughline: systems people depend on every day."
          lede="From an internship on NetSuite and client websites, through five years on a payroll platform, to owning the application stack of a retail group."
        />

        <ol className="mt-16 space-y-0">
          {experience.map((job, i) => (
            <Reveal as="li" key={job.company} className="relative grid gap-6 border-t border-line py-10 lg:grid-cols-12 lg:gap-10 lg:py-14">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <p className="eyebrow">
                    {job.start}
                    <span className="text-ink-faint"> to </span>
                    {job.end}
                  </p>
                  <h3 className="display mt-3 text-2xl">{job.company}</h3>
                  <p className="mt-2 text-base font-medium text-ink-muted">
                    {job.role}
                    {job.location && <span className="text-ink-faint"> · {job.location}</span>}
                  </p>
                  <p className="mt-1 font-mono text-xs text-ink-faint">{job.period}</p>
                </div>
              </div>

              <div className="lg:col-span-8">
                <p className="max-w-[62ch] text-pretty text-base leading-relaxed">{job.summary}</p>
                <ul className="mt-6 max-w-[64ch] space-y-3 text-sm leading-relaxed text-ink-muted">
                  {job.highlights.map((h) => (
                    <li key={h} className="grid grid-cols-[auto_1fr] gap-3">
                      <span className="mt-[0.7em] h-px w-4 bg-brass" aria-hidden />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <TechChips items={job.stack} className="mt-7" />
              </div>

              <span
                aria-hidden
                data-n={`0${i + 1}`}
                className="absolute right-0 top-10 hidden font-display text-[5rem] font-bold leading-none tracking-tighter text-ink/[0.04] before:content-[attr(data-n)] lg:block"
              />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
