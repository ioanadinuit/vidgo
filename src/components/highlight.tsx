import { Fragment } from "react";

/**
 * Renders a dictionary title with `**phrase**` marks as the accent span the
 * section headings use, e.g. "Stores running on **VidGo**.".
 */
export function Highlight({ text }: { text: string }) {
  const parts = text.split("**");
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-primary">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
