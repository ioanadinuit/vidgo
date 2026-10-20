"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "motion/react";
import { ChevronDownIcon } from "lucide-react";

/**
 * One chapter of the detailed study: eyebrow, title, a one-line takeaway in
 * large type, the visual, then the prose and sources behind an expander.
 */
export function CaseSection({ id, eyebrow, title, takeaway, children, details, detailsLabel }: {
  id: string;
  eyebrow: string;
  title: string;
  takeaway: ReactNode;
  children?: ReactNode;
  details?: ReactNode;
  detailsLabel: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const active = useInView(ref, { once: true, amount: 0.15 });
  return (
    <section ref={ref} id={id} className="chapter" data-active={active ? "" : undefined}>
      <p className="case-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="chapter-takeaway">{takeaway}</p>
      {children && <div className="chapter-visual">{children}</div>}
      {details && (
        <details className="chapter-details">
          <summary><ChevronDownIcon aria-hidden="true" size={16} />{detailsLabel}</summary>
          <div className="chapter-details-body">{details}</div>
        </details>
      )}
    </section>
  );
}
