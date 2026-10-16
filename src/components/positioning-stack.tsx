"use client";

import { useRef } from "react";
import { useInView } from "motion/react";

import type { HomeContent } from "@/content/types";

function seededDots(count: number) {
  let seed = 20260929;
  const next = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
  return Array.from({ length: count }, (_, i) => ({ left: 3 + next() * 94, top: 8 + next() * 84, size: 10 + Math.round(next() * 14), opacity: [0.14, 0.2, 0.28, 0.36][i % 4] }));
}
const dots = seededDots(90);

/** Original crowd → rising marker → highlighted upper level sequence. */
export function PositioningStack({ content }: { content: HomeContent["positioning"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <div ref={ref} className="positioning-comparison positioning-animated" data-play={inView ? "" : undefined}>
      <article className="positioning-option positioning-option-primary">
        <div className="positioning-original-copy">
        <p className="positioning-label">{content.above.eyebrow}</p>
        <h3>{content.above.title}</h3>
        <p>{content.above.body}</p>
        <ul>
          {content.above.chips.map(chip => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
        </div>
        <div className="positioning-original-logo">
          <img src="/assets/vidgo-logo-lockup.svg" alt="VidGo Technologies" width={1240} height={230} className="dark:hidden" />
          <img src="/assets/vidgo-logo-lockup-dark.svg" alt="VidGo Technologies" width={1240} height={230} className="hidden dark:block" />
        </div>
      </article>
      <div className="positioning-trail" aria-hidden="true"><span /></div>
      <article className="positioning-option positioning-option-secondary">
        <div>
          <p className="positioning-label">{content.entry.eyebrow}</p>
          <h3>{content.entry.title}</h3>
          <p className="positioning-entry-body">{content.entry.body}</p>
          {content.entry.tag && <p className="positioning-note">{content.entry.tag}</p>}
        </div>
        <div>
          <div className="positioning-crowd" aria-hidden="true">
            {dots.map((dot, i) => <span key={i} style={{ left: dot.left + "%", top: dot.top + "%", width: dot.size, height: dot.size, opacity: dot.opacity, animationDelay: (i * 9) + "ms" }} />)}
          </div>
        </div>
      </article>
    </div>
  );
}
