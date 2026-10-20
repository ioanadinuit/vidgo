"use client";

import { useEffect, useState, type CSSProperties } from "react";

export interface Chapter {
  id: string;
  label: string;
}

/**
 * Sticky chapter list for the detailed study, with the current chapter
 * highlighted and a progress line that fills as the reader moves through the
 * chapters. A thin progress bar under the site header mirrors it on every
 * screen size.
 */
export function ChapterRail({ chapters, label }: { chapters: Chapter[]; label: string }) {
  const [active, setActive] = useState(chapters[0]?.id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter((el): el is HTMLElement => !!el);
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => { for (const e of entries) if (e.isIntersecting) setActive(e.target.id); },
      { rootMargin: "-25% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));

    let frame = 0;
    const measure = () => {
      frame = 0;
      const first = els[0].getBoundingClientRect();
      const last = els[els.length - 1].getBoundingClientRect();
      const start = first.top + window.scrollY - window.innerHeight * 0.35;
      const end = last.bottom + window.scrollY - window.innerHeight * 0.65;
      const p = (window.scrollY - start) / Math.max(end - start, 1);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, [chapters]);

  const style = { "--p": progress } as CSSProperties;
  return (
    <>
      <div className="chapter-progress" style={style} aria-hidden="true" data-visible={progress > 0 && progress < 1 ? "" : undefined}><i /></div>
      <nav className="chapter-rail" aria-label={label} style={style}>
        <div className="chapter-rail-track" aria-hidden="true"><i /></div>
        <ol>
          {chapters.map((c, i) => (
            <li key={c.id} data-active={active === c.id ? "" : undefined}>
              <a href={`#${c.id}`}><span className="chapter-rail-n">{String(i + 1).padStart(2, "0")}</span>{c.label}</a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
