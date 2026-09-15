"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/profile";
import { EASE } from "./motion";
import { ArrowIcon, PinIcon } from "./Icons";
import { socials } from "./socials";

export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 60]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -30]);

  const stagger = { hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : 0.09, delayChildren: 0.15 } } };
  const rise = {
    hidden: { opacity: 0, y: reduced ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: reduced ? 0.2 : 0.8, ease: EASE } },
  };

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      {/* ambient brass wash behind the portrait */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(closest-side, oklch(0.80 0.13 82 / 0.16), transparent 70%)" }}
      />

      <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <motion.div className="lg:col-span-7" style={{ y: textY }} variants={stagger} initial="hidden" animate="show">
          <motion.p variants={rise} className="eyebrow flex items-center gap-3">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-signal" />
            </span>
            {profile.role} at {profile.currently.company}
          </motion.p>

          <motion.h1 variants={rise} className="display mt-6 text-4xl">
            Erwin Roy
            <br />
            <span className="text-brass">Arellano</span>
          </motion.h1>

          <motion.p variants={rise} className="mt-7 max-w-[56ch] text-pretty text-lg leading-relaxed text-ink-muted sm:text-lg">
            I build the software that runs businesses day to day: ERP integrations, field apps, internal portals and the middleware
            in between. Six years across HR tech, retail and manufacturing in the Philippines.
          </motion.p>

          <motion.div variants={rise} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn btn-primary">
              See the work
              <ArrowIcon className="size-4" />
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get in touch
            </a>
            <span className="ml-1 inline-flex items-center gap-1.5 text-sm text-ink-faint">
              <PinIcon className="size-4" />
              {profile.location}
            </span>
          </motion.div>

          <motion.ul variants={rise} className="mt-10 flex flex-wrap gap-x-7 gap-y-3" aria-label="Profiles">
            {socials.map(({ label, href, Icon, handle }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  <span className="grid size-8 place-items-center rounded-full border border-line-strong transition-colors group-hover:border-brass group-hover:text-brass">
                    <Icon className="size-4" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="font-medium">{label}</span>
                    <span className="font-mono text-xs text-ink-faint">{handle}</span>
                  </span>
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[380px] lg:col-span-5 lg:max-w-none"
          style={{ y: portraitY }}
          initial={{ opacity: 0, scale: reduced ? 1 : 0.96, y: reduced ? 0 : 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: reduced ? 0.2 : 1, ease: EASE, delay: 0.3 }}
        >
          <div aria-hidden className="absolute -inset-3 -z-10 translate-x-4 translate-y-4 rounded-[26px] border border-brass/40" />
          <div className="frame aspect-[4/5] rounded-[22px]">
            <Image
              src="/images/arellano-tall.jpg"
              alt="Portrait of Erwin Roy Arellano in a dark suit"
              width={1000}
              height={1499}
              priority
              sizes="(min-width: 1024px) 420px, 80vw"
              className="h-full w-full object-cover object-top"
            />
          </div>
          <div className="absolute -bottom-5 left-5 rounded-xl border border-line-strong bg-bg-raised px-4 py-3 shadow-[0_20px_50px_-20px_oklch(0_0_0/0.8)]">
            <p className="label text-ink-faint">Currently</p>
            <p className="mt-0.5 font-display text-base font-semibold tracking-tight">
              {profile.currently.company}
              <span className="text-ink-faint"> · since {profile.currently.since}</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
