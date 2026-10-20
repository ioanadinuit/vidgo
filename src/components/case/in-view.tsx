"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "motion/react";

/**
 * Marks its wrapper with data-active once it reaches the middle band of the
 * screen, so CSS can run a one-time sequence on the children.
 */
export function InView({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, amount: 0, margin: "-42% 0px -42% 0px" });
  return <div ref={ref} className={className} data-active={active ? "" : undefined}>{children}</div>;
}
