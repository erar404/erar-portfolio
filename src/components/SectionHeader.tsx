import type { ReactNode } from "react";
import { Reveal } from "./motion";

type Props = {
  index: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "split";
};

export function SectionHeader({ index, label, title, lede, align = "split" }: Props) {
  return (
    <Reveal className={`grid gap-6 ${align === "split" ? "lg:grid-cols-12 lg:gap-10" : ""}`}>
      <div className={align === "split" ? "lg:col-span-7" : ""}>
        <p className="eyebrow flex items-center gap-3">
          <span className="text-ink-faint">{index}</span>
          <span className="h-px w-8 bg-brass/60" aria-hidden />
          {label}
        </p>
        <h2 className="display mt-5 text-3xl">{title}</h2>
      </div>
      {lede && <div className={`max-w-[60ch] text-pretty text-base leading-relaxed text-ink-muted ${align === "split" ? "lg:col-span-5 lg:self-end" : ""}`}>{lede}</div>}
    </Reveal>
  );
}
