"use client";

import { useRef, type CSSProperties } from "react";
import { useInView } from "motion/react";
import { CheckIcon, MinusIcon, XIcon } from "lucide-react";

export interface FactRow {
  label: string;
  old: string;
  next: string;
  /** How the old value reads: a problem (default), neutral context, or fine. */
  oldState?: "bad" | "neutral" | "ok";
}

/**
 * Qualitative before/after rows for facts that are not numbers: present vs
 * missing, blocked vs never. Rows slide in one after another.
 */
export function FactCompare({ rows, oldLabel, nextLabel, caption }: {
  rows: FactRow[];
  oldLabel: string;
  nextLabel: string;
  caption?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, amount: 0, margin: "-42% 0px -42% 0px" });
  return (
    <div ref={ref} className="facts" data-active={active ? "" : undefined}>
      <div className="facts-head" aria-hidden="true">
        <span />
        <span className="cmp-legend-old">{oldLabel}</span>
        <span className="cmp-legend-next">{nextLabel}</span>
      </div>
      <dl>
        {rows.map((r, i) => {
          const state = r.oldState ?? "bad";
          const Icon = state === "bad" ? XIcon : state === "ok" ? CheckIcon : MinusIcon;
          return (
            <div className="facts-row" key={r.label} style={{ "--i": i } as CSSProperties}>
              <dt>{r.label}</dt>
              <dd className={`facts-old facts-${state}`}><Icon aria-hidden="true" size={16} /><span><span className="sr-only">{oldLabel}: </span>{r.old}</span></dd>
              <dd className="facts-next"><CheckIcon aria-hidden="true" size={16} /><span><span className="sr-only">{nextLabel}: </span>{r.next}</span></dd>
            </div>
          );
        })}
      </dl>
      {caption && <p className="case-source">{caption}</p>}
    </div>
  );
}
