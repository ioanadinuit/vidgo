import { stripDiacritics } from "@/lib/text";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/velora/blur-fade";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}

/** Eyebrow + display title + lead, the one heading rhythm every section uses. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <BlurFade>
      <div className={cn("section-heading", centered && "text-center", className)}>
        {eyebrow && (
          <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {stripDiacritics(eyebrow)}
          </span>
        )}
        <h2
          className={cn(
            "mt-3 text-3xl font-semibold tracking-tight lg:text-5xl",
            centered && "mx-auto",
          )}
        >
          {title}
        </h2>
        {description && (
          <p className={cn("mt-4 text-lg text-muted-foreground", centered && "mx-auto")}>
            {description}
          </p>
        )}
      </div>
    </BlurFade>
  );
}
