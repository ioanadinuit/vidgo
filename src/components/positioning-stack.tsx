"use client";

import { useRef } from "react";

import { stripDiacritics } from "@/lib/text";
import type { HomeContent } from "@/content/types";

/**
 * "Where we stand": the crowded entry level (a field of dots) and the layer above,
 * where VidGo plays. Without JS or with reduced motion it renders the finished picture;
 * otherwise the dots pop in, a marker rises along the trail and the top band lights up.
 */

// Seeded, so the server render and the client render place the same dots.
function seededDots(count: number) {
  let seed = 20260929;
  const next = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const dots = [];
  for (let i = 0; i < count; i++) {
    dots.push({
      left: 3 + next() * 94,
      top: 8 + next() * 84,
      size: 10 + Math.round(next() * 14),
      opacity: [0.14, 0.2, 0.28, 0.36][i % 4],
      delay: i * 9,
    });
  }
  return dots;
}

const dots = seededDots(90);

export function PositioningStack({ content }: { content: HomeContent["positioning"] }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="positioning relative mx-auto mt-16 max-w-5xl"
    >
      {/* The layer above */}
      <div className="pos-above relative rounded-2xl border bg-card/40 p-6 lg:mx-16 lg:p-8">
        <div aria-hidden className="pos-glow pointer-events-none absolute -inset-px rounded-2xl border-2 border-primary/70 bg-primary/10 shadow-[0_24px_80px_-12px] shadow-primary/40" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="pos-text flex flex-col gap-2">
            <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {stripDiacritics(content.above.eyebrow)}
            </span>
            <h3 className="text-2xl font-semibold tracking-tight lg:text-3xl">{content.above.title}</h3>
            <p className="text-muted-foreground">{content.above.body}</p>
            <ul className="mt-2 flex flex-wrap gap-2 text-xs">
              {content.above.chips.map((chip) => (
                <li key={chip} className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 font-medium">
                  {chip}
                </li>
              ))}
            </ul>
          </div>
          <div className="pos-badge flex shrink-0 items-center justify-center self-start rounded-2xl border border-primary/30 bg-primary/5 px-8 py-6 md:self-auto">
            <img src="/assets/vidgo-logo-lockup.svg" alt="VidGo Technologies" width={1240} height={230} loading="lazy" className="h-10 w-auto dark:hidden lg:h-12" />
            <img src="/assets/vidgo-logo-lockup-dark.svg" alt="VidGo Technologies" width={1240} height={230} loading="lazy" className="hidden h-10 w-auto dark:block lg:h-12" />
          </div>
        </div>
      </div>

      {/* The trail between the two levels */}
      <div aria-hidden className="relative h-16 lg:h-20">
        <div className="pos-trail absolute inset-y-0 left-1/2 border-l-2 border-dashed border-primary/70 md:left-[72%]" />
        <div className="pos-riser absolute left-1/2 size-4 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_0_6px] shadow-primary/25 md:left-[72%]" />
      </div>

      {/* The crowded entry level */}
      <div className="relative rounded-2xl border bg-muted/40 p-6 lg:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-stretch">
          <div className="pos-text flex flex-col gap-2 md:w-2/5">
            <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {stripDiacritics(content.entry.eyebrow)}
            </span>
            <h3 className="text-2xl font-semibold tracking-tight lg:text-3xl">{content.entry.title}</h3>
            <p className="text-muted-foreground">{content.entry.body}</p>
            <span className="pos-tag mt-2 w-fit rounded-full border border-dashed border-muted-foreground/60 px-3 py-1.5 text-xs text-muted-foreground">
              {content.entry.tag}
            </span>
          </div>
          <div aria-hidden className="relative min-h-40 flex-1">
            {dots.map((dot) => (
              <span
                key={dot.delay}
                className="pos-dot absolute rounded-full bg-muted-foreground"
                style={
                  {
                    left: `${dot.left}%`,
                    top: `${dot.top}%`,
                    width: dot.size,
                    height: dot.size,
                    "--o": dot.opacity,
                    "--d": `${dot.delay}ms`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
