"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "./motion";

type Node = { label: string; sub?: string };

/**
 * An architecture sketch for repositories that have no UI to screenshot.
 * Nodes flow left to right (top to bottom on narrow screens) with a brass connector.
 */
export function Sketch({ title, nodes, notes }: { title: string; nodes: Node[]; notes: string[] }) {
  const reduced = useReducedMotion();
  return (
    <figure className="frame gridpaper p-5 sm:p-7">
      <figcaption className="mb-6 flex items-center justify-between">
        <span className="eyebrow">{title}</span>
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-faint">architecture sketch</span>
      </figcaption>

      <ol className="relative grid gap-3 sm:grid-cols-4 sm:gap-2">
        {/* connector line */}
        <motion.span
          aria-hidden
          className="absolute left-4 top-0 hidden h-px w-[calc(100%-2rem)] origin-left bg-brass/70 sm:top-1/2 sm:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduced ? 0.2 : 1.1, ease: EASE, delay: 0.2 }}
        />
        {nodes.map((n, i) => (
          <motion.li
            key={n.label}
            className="relative z-10 rounded-xl border border-line-strong bg-bg-raised px-4 py-3.5"
            initial={{ opacity: 0, y: reduced ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: reduced ? 0.2 : 0.6, ease: EASE, delay: 0.15 + i * 0.12 }}
          >
            <span className="mb-1.5 block font-mono text-[0.62rem] uppercase tracking-[0.12em] text-brass">0{i + 1}</span>
            <span className="block font-display text-[0.98rem] font-semibold leading-tight tracking-tight">{n.label}</span>
            {n.sub && <span className="mt-1 block text-[0.78rem] leading-snug text-ink-muted">{n.sub}</span>}
          </motion.li>
        ))}
      </ol>

      <ul className="mt-6 grid gap-x-6 gap-y-2 text-[0.85rem] text-ink-muted sm:grid-cols-2">
        {notes.map((t) => (
          <li key={t} className="flex gap-2.5">
            <span className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-brass" aria-hidden />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
