"use client";

import { useRef, type CSSProperties } from "react";
import { useInView } from "motion/react";

export interface Outage {
  /** 0-based day index inside the monitored window. */
  day: number;
  label: string;
}

export interface UptimeRow {
  name: string;
  uptime: string;
  summary: string;
  outages: Outage[];
}

/**
 * One strip per store across the monitored window. Documented outages sit on
 * their day as red markers; the rest of the strip is the "store was open" line.
 */
export function UptimeStrip({ days, rows, startLabel, endLabel }: {
  days: number;
  rows: UptimeRow[];
  startLabel: string;
  endLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, amount: 0.4 });
  return (
    <div ref={ref} className="uptime" data-active={active ? "" : undefined}>
      {rows.map((row, r) => (
        <div className="uptime-row" key={row.name} data-clean={row.outages.length === 0 ? "" : undefined} style={{ "--i": r } as CSSProperties}>
          <div className="uptime-head">
            <span className="uptime-name">{row.name}</span>
            <strong className="uptime-value">{row.uptime}</strong>
          </div>
          <div className="uptime-track" role="img" aria-label={`${row.name}: ${row.summary}`}>
            <i className="uptime-line" />
            {row.outages.map((o) => (
              <b key={o.day} className="uptime-outage" style={{ "--x": (o.day + 0.5) / days } as CSSProperties} title={o.label}>
                <span>{o.label}</span>
              </b>
            ))}
          </div>
          <p>{row.summary}</p>
        </div>
      ))}
      <div className="uptime-axis" aria-hidden="true"><span>{startLabel}</span><span>{endLabel}</span></div>
    </div>
  );
}
