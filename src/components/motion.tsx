"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

export function useRevealVariants(): { container: Variants; item: Variants } {
  const reduced = useReducedMotion();
  const y = reduced ? 0 : 24;
  return {
    container: {
      hidden: {},
      show: { transition: { staggerChildren: reduced ? 0 : 0.07, delayChildren: 0.05 } },
    },
    item: {
      hidden: { opacity: 0, y },
      show: { opacity: 1, y: 0, transition: { duration: reduced ? 0.2 : 0.7, ease: EASE } },
    },
  };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "ul" | "ol" | "article" | "figure" | "header" | "p";
  amount?: number;
};

/** Fades and lifts children into view once, when they enter the viewport. */
export function Reveal({ children, className, delay = 0, as = "div", amount = 0.2 }: RevealProps) {
  const reduced = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: reduced ? 0.2 : 0.7, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

/** Staggers direct children; pair with <Item>. */
export function Stagger({ children, className, as = "div", amount = 0.15 }: RevealProps) {
  const { container } = useRevealVariants();
  const Comp = motion[as];
  return (
    <Comp className={className} variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount }}>
      {children}
    </Comp>
  );
}

export function Item({ children, className, as = "div" }: Omit<RevealProps, "delay" | "amount">) {
  const { item } = useRevealVariants();
  const Comp = motion[as];
  return (
    <Comp className={className} variants={item}>
      {children}
    </Comp>
  );
}
