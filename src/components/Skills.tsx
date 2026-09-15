import { skillGroups, type SkillLevel } from "@/data/profile";
import { Item, Stagger } from "./motion";
import { SectionHeader } from "./SectionHeader";

const levelStyle: Record<SkillLevel, string> = {
  Advanced: "bg-brass text-brass-ink border-brass",
  Intermediate: "border-brass/50 text-brass",
  Working: "border-line-strong text-ink-faint",
};

export function Skills() {
  return (
    <section id="skills" className="section border-t border-line bg-bg-sunken/40">
      <div className="wrap">
        <SectionHeader
          index="06"
          label="Skills"
          title="What I reach for, and how deep it goes."
          lede={
            <>
              Levels are honest self-ratings. <span className="text-ink">Advanced</span> means I have owned production systems with it for
              years, <span className="text-ink">Intermediate</span> means I ship with it regularly, <span className="text-ink">Working</span>{" "}
              means I have delivered at least one real thing with it.
            </>
          }
        />

        <Stagger as="div" className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Item as="article" key={g.title} className={`bg-bg p-7 sm:p-8 ${i === 0 ? "xl:row-span-2" : ""}`}>
              <p className="eyebrow">0{i + 1}</p>
              <h3 className="display mt-3 text-xl">{g.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{g.blurb}</p>
              <ul className="mt-6 divide-y divide-line">
                {g.items.map((s) => (
                  <li key={s.name} className="flex items-center justify-between gap-4 py-2.5">
                    <span className="text-sm">
                      {s.name}
                      {s.note && <span className="block text-xs text-ink-faint">{s.note}</span>}
                    </span>
                    {s.level && (
                      <span className={`shrink-0 rounded-full border px-2 py-0.5 label ${levelStyle[s.level]}`}>
                        {s.level}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
