"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export interface Chapter {
  id: string;
  label: string;
}

/**
 * Sticky chapter bar under the site header for the detailed study: the
 * current chapter highlighted, the active pill kept in view, and a progress
 * line along the bottom that fills as the reader moves through the chapters.
 * It appears only while the reader is inside the chapters.
 */
export function ChapterRail({ chapters, label }: { chapters: Chapter[]; label: string }) {
  const [active, setActive] = useState(chapters[0]?.id);
  const [progress, setProgress] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter((el): el is HTMLElement => !!el);
    if (els.length === 0) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const first = els[0].getBoundingClientRect();
      const last = els[els.length - 1].getBoundingClientRect();
      const start = first.top + window.scrollY - window.innerHeight * 0.35;
      const end = last.bottom + window.scrollY - window.innerHeight * 0.65;
      const p = (window.scrollY - start) / Math.max(end - start, 1);
      setProgress(Math.min(1, Math.max(0, p)));
      // Current chapter: the last one whose top has passed 35% of the screen.
      const line = window.innerHeight * 0.35;
      let current = els[0].id;
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, [chapters]);

  // Keep the active pill in view when the bar scrolls horizontally.
  useEffect(() => {
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>("li[data-active]");
    if (!list || !item) return;
    const target = item.offsetLeft - list.clientWidth / 2 + item.clientWidth / 2;
    list.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [active]);

  const visible = progress > 0 && progress < 1;
  return (
    <nav className="chapter-rail" aria-label={label} style={{ "--p": progress } as CSSProperties} data-visible={visible ? "" : undefined}>
      <ol ref={listRef}>
        {chapters.map((c, i) => (
          <li key={c.id} data-active={active === c.id ? "" : undefined}>
            <a href={`#${c.id}`}><span className="chapter-rail-n">{String(i + 1).padStart(2, "0")}</span><span className="chapter-rail-label">{c.label}</span></a>
          </li>
        ))}
      </ol>
      <div className="chapter-rail-track" aria-hidden="true"><i /></div>
    </nav>
  );
}
