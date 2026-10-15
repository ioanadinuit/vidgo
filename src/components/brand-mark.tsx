import { cn } from "@/lib/utils";

/** The VidGo mark from the brand assets: white blob, cobalt chevrons, orange point. Reads on dark and light. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src="/assets/vidgo-mark.svg"
      alt=""
      aria-hidden="true"
      width={32}
      height={32}
      className={cn("shrink-0 rounded-full", className)}
    />
  );
}
