"use client";

import { useRef, type CSSProperties } from "react";
import { useInView } from "motion/react";

export interface CompareRow {
  label: string;
  /** Numeric values drive the bar lengths; the text is what the reader sees. */
  old: number;
  next: number;
  oldText: string;
  nextText: string;
  /** Optional callout on the right, e.g. "3,2×" or "−1,9 s". */
  delta?: string;
}

/**
 * Before/after horizontal bars, one row per metric. The bars fill in when the
 * block scrolls into view; reduced-motion users get the final state at once.
 */
export function CompareBars({ rows, oldLabel, nextLabel, caption }: {
  rows: CompareRow[];
  oldLabel: string;
  nextLabel: string;
  caption?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, amount: 0.3 });
  return (
    <div ref={ref} className="cmp" data-active={active ? "" : undefined}>
      <div className="cmp-legend" aria-hidden="true">
        <span className="cmp-legend-old">{oldLabel}</span>
        <span className="cmp-legend-next">{nextLabel}</span>
      </div>
      <dl className="cmp-rows">
        {rows.map((r, i) => {
          const max = Math.max(r.old, r.next, Number.EPSILON);
          return (
            <div className="cmp-row" key={r.label} style={{ "--i": i } as CSSProperties}>
              <dt className="cmp-label">{r.label}</dt>
              <dd className="cmp-bars">
                <div className="cmp-bar cmp-bar-old">
                  <i style={{ "--w": r.old / max } as CSSProperties} aria-hidden="true" />
                  <span><span className="sr-only">{oldLabel}: </span>{r.oldText}</span>
                </div>
                <div className="cmp-bar cmp-bar-next">
                  <i style={{ "--w": r.next / max } as CSSProperties} aria-hidden="true" />
                  <span><span className="sr-only">{nextLabel}: </span>{r.nextText}</span>
                </div>
              </dd>
              {r.delta && <dd className="cmp-delta">{r.delta}</dd>}
            </div>
          );
        })}
      </dl>
      {caption && <p className="case-source">{caption}</p>}
    </div>
  );
}
