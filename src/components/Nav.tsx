"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/profile";
import { EASE } from "./motion";

export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "RGMC work" },
  { id: "myhr", label: "MyHR" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

const MENU_MS = 350;

export function Nav() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open ? "border-b border-line bg-bg/95" : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="wrap flex h-16 items-center justify-between" aria-label="Primary">
        <a href="#top" className="group flex items-center gap-3" aria-label="Back to top">
          <span className="grid size-9 place-items-center rounded-lg bg-brass font-display text-sm font-800 tracking-tight text-brass-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-6">
            {profile.initials}
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-tight sm:block">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                data-active={active === s.id}
                className={`underline-grow text-sm font-medium tracking-wide transition-colors ${
                  active === s.id ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn btn-primary hidden !py-2.5 !text-sm md:inline-flex">
          Start a conversation
        </a>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-lg border border-line-strong text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3.5 w-5">
            <span className={`absolute inset-x-0 top-0 h-[2px] bg-current transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`absolute inset-x-0 top-[6px] h-[2px] bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute inset-x-0 bottom-0 h-[2px] bg-current transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="wrap overflow-hidden border-t border-line md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: MENU_MS / 1000, ease: EASE }}
          >
            <ul className="flex flex-col py-3">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => {
                      // Chromium cancels an in-flight smooth scroll while the menu's height collapses,
                      // so close the menu first and start the scroll once that animation has finished.
                      e.preventDefault();
                      setOpen(false);
                      window.history.replaceState(null, "", `#${s.id}`);
                      window.setTimeout(() => {
                        document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, MENU_MS + 40);
                    }}
                    className="flex items-center justify-between py-3 font-display text-lg font-semibold tracking-tight text-ink"
                  >
                    {s.label}
                    <span className="font-mono text-xs text-ink-faint">0{sections.findIndex((x) => x.id === s.id) + 1}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
