import { cn } from "@/lib/utils";

/**
 * The official VidGo Technologies lockup. Light theme shows the navy original;
 * dark theme swaps to the light variant (white wordmark, pale-blue arrow, same orange).
 */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex shrink-0 items-center", className)}>
      <img
        src="/assets/vidgo-logo-lockup.svg"
        alt="VidGo Technologies"
        width={1240}
        height={230}
        className="h-8 w-auto dark:hidden"
      />
      <img
        src="/assets/vidgo-logo-lockup-dark.svg"
        alt="VidGo Technologies"
        width={1240}
        height={230}
        className="hidden h-8 w-auto dark:block"
      />
    </span>
  );
}
