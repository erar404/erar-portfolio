import { education, languages, profile } from "@/data/profile";
import { Item, Reveal, Stagger } from "./motion";
import { SectionHeader } from "./SectionHeader";

const facts = [
  { k: "Based in", v: profile.location },
  { k: "Experience", v: "6+ years, since 2018" },
  { k: "Focus", v: "Enterprise systems, integrations, field apps" },
  { k: "Open to", v: "Full-time, contract, consulting" },
];

export function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <SectionHeader
          index="01"
          label="Background"
          title={
            <>
              Six years of shipping the software
              <br className="hidden sm:block" /> businesses actually run on.
            </>
          }
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <div className="max-w-[64ch] space-y-5 text-pretty text-base leading-relaxed text-ink-muted">
              <p>
                I am a full-stack software engineer from Quezon City. I started in HR technology at Titanium Systems, where I spent
                five years as a shared developer on MyHR, a payroll and timekeeping platform used by Philippine enterprises. That meant
                payroll rules in FoxPro and SQL one week, Celery middleware and MongoDB analytics the next, and Angular modules after that.
              </p>
              <p>
                Since 2024 I have been the engineer behind most of the in-house systems at RGMC Group, a garment and retail group: a
                FastAPI integration layer over Microsoft Dynamics 365 Business Central, an offline-first consignment app for field
                sales, the internal IT gateway and helpdesk, AL extensions inside the ERP, and a Teams bot that ties them together.
                Along the way I introduced Git-based workflows to the team and helped move on-premises apps onto Google Cloud.
              </p>
              <p>
                Outside work I build products for people I know: a booking platform for a recording studio, a combined site for a cafe
                and music studio, and a cross-platform band scheduling app. They keep me honest about front-end craft and end-to-end
                ownership.
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.k}>
                  <dt className="label text-ink-faint">{f.k}</dt>
                  <dd className="mt-1.5 text-sm font-medium leading-snug">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="lg:col-span-5">
            <Stagger as="div" className="space-y-8">
              <Item>
                <h3 className="eyebrow">Education</h3>
                <ol className="mt-4 space-y-5">
                  {education.map((e) => (
                    <li key={e.school} className="grid grid-cols-[auto_1fr] gap-x-4">
                      <span className="pt-1 font-mono text-xs text-ink-faint">{e.period}</span>
                      <div>
                        <p className="font-display text-base font-semibold leading-tight tracking-tight">{e.degree}</p>
                        <p className="mt-0.5 text-sm text-ink-muted">{e.school}</p>
                        {e.notes.length > 0 && (
                          <ul className="mt-2.5 space-y-1.5 text-sm leading-relaxed text-ink-muted">
                            {e.notes.map((n) => (
                              <li key={n} className="flex gap-2">
                                <span className="mt-[0.6em] size-1 shrink-0 rounded-full bg-brass" aria-hidden />
                                <span>{n}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </Item>

              <Item>
                <h3 className="eyebrow">Languages</h3>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {languages.map((l) => (
                    <li key={l.name} className="text-sm">
                      <span className="font-medium">{l.name}</span>
                      <span className="text-ink-faint"> · {l.level}</span>
                    </li>
                  ))}
                </ul>
              </Item>
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
