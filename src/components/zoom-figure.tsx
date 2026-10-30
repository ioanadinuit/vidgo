"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { XIcon, ZoomInIcon } from "lucide-react";

/**
 * A figure whose image opens full size in an overlay on click.
 * Used for the Search Console screenshots on the case study page.
 */
export function ZoomFigure({ src, alt, caption, width, height, zoomLabel, title, accent }: {
  src: string; alt: string; caption: string; width: number; height: number; zoomLabel: string;
  /** Heading above the image; `accent` is the highlighted part, e.g. the period. */
  title?: string; accent?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const active = useInView(ref, { once: true, amount: 0, margin: "-25% 0px -25% 0px" });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open]);

  return (
    <figure ref={ref} data-active={active ? "" : undefined}>
      {title && <h3 className="zoom-title">{title} {accent && <span className="zoom-accent">{accent}</span>}</h3>}
      <button type="button" className="zoom-trigger" onClick={() => setOpen(true)} aria-label={zoomLabel} title={zoomLabel}>
        <img src={src} alt={alt} loading="lazy" width={width} height={height} />
        <span className="zoom-badge" aria-hidden="true"><ZoomInIcon /></span>
      </button>
      <figcaption>{caption}</figcaption>
      {open && (
        <div className="zoom-overlay" role="dialog" aria-modal="true" aria-label={alt} onClick={() => setOpen(false)}>
          <button type="button" className="zoom-close" aria-label="Close" onClick={() => setOpen(false)}><XIcon /></button>
          <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} />
          <p>{caption}</p>
        </div>
      )}
    </figure>
  );
}
