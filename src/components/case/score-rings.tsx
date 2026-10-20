"use client";

import { useRef, type CSSProperties } from "react";
import { useInView } from "motion/react";

export interface ScorePair {
  label: string;
  old: number;
  next: number;
}

function Ring({ value, kind, delay }: { value: number; kind: "old" | "next"; delay: number }) {
  return (
    <svg className={`ring ring-${kind}`} viewBox="0 0 64 64" role="img" aria-label={String(value)} style={{ "--v": value, "--d": `${delay}s` } as CSSProperties}>
      <circle className="ring-track" cx="32" cy="32" r="27" pathLength={100} />
      <circle className="ring-value" cx="32" cy="32" r="27" pathLength={100} />
      <text x="32" y="32" textAnchor="middle" dominantBaseline="central">{value}</text>
    </svg>
  );
}

/**
 * Lighthouse-style score pairs: one muted ring for the old store and one
 * primary ring for the new one, per category. The rings draw themselves when
 * the block scrolls into view.
 */
export function ScoreRings({ items, oldLabel, nextLabel, caption }: {
  items: ScorePair[];
  oldLabel: string;
  nextLabel: string;
  caption?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, amount: 0, margin: "-42% 0px -42% 0px" });
  return (
    <div ref={ref} className="rings" data-active={active ? "" : undefined}>
      <div className="cmp-legend" aria-hidden="true">
        <span className="cmp-legend-old">{oldLabel}</span>
        <span className="cmp-legend-next">{nextLabel}</span>
      </div>
      <ul className="rings-list">
        {items.map((it, i) => (
          <li key={it.label} className="rings-item">
            <div className="rings-pair">
              <Ring value={it.old} kind="old" delay={i * 0.12} />
              <Ring value={it.next} kind="next" delay={i * 0.12 + 0.2} />
            </div>
            <p>{it.label}</p>
            <small>{oldLabel} {it.old} → {nextLabel} {it.next}</small>
          </li>
        ))}
      </ul>
      {caption && <p className="case-source">{caption}</p>}
    </div>
  );
}
