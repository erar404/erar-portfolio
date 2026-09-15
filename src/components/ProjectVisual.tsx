"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Visual } from "@/data/projects";
import { Sketch } from "./Sketch";
import { EASE } from "./motion";

export function ProjectVisual({ visual, priority = false }: { visual: Visual; priority?: boolean }) {
  const reduced = useReducedMotion();
  if (visual.kind === "sketch") {
    return <Sketch title={visual.title} nodes={visual.nodes} notes={visual.notes} />;
  }

  const portraitSecondary = visual.secondary && visual.secondary.height > visual.secondary.width;

  return (
    <div className="relative">
      <motion.figure
        className="frame"
        initial={{ opacity: 0, y: reduced ? 0 : 30, scale: reduced ? 1 : 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduced ? 0.2 : 0.9, ease: EASE }}
      >
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2" aria-hidden>
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
        </div>
        <Image
          src={visual.src}
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          priority={priority}
          sizes="(min-width: 1024px) 620px, 100vw"
          className="block h-auto w-full"
        />
      </motion.figure>

      {visual.secondary && (
        <motion.figure
          className={`frame absolute shadow-[0_30px_60px_-24px_oklch(0_0_0/0.9)] ${
            portraitSecondary ? "-bottom-6 -right-3 w-[26%] sm:-right-6" : "-bottom-8 -right-3 w-[52%] sm:-right-8"
          }`}
          initial={{ opacity: 0, y: reduced ? 0 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduced ? 0.2 : 0.9, ease: EASE, delay: 0.25 }}
        >
          <Image
            src={visual.secondary.src}
            alt={visual.secondary.alt}
            width={visual.secondary.width}
            height={visual.secondary.height}
            sizes="(min-width: 1024px) 320px, 50vw"
            className="block h-auto w-full"
          />
        </motion.figure>
      )}
    </div>
  );
}
