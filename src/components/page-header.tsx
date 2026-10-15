import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/velora/grid-pattern";
import { BlurFade } from "@/components/velora/blur-fade";

interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

/** Shared hero for inner pages — quiet grid backdrop, no heavy effects. */
export function PageHeader({
  eyebrow,
  title,
  description,
  className,
  children,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "page-header relative overflow-hidden",
        className
      )}
    >
      <GridPattern
        width={48}
        height={48}
        className="fill-transparent stroke-border/60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 lg:px-8">
        <BlurFade direction="down">
          <div>
            {eyebrow && (
              <span className="text-sm font-medium text-primary">
                {eyebrow}
              </span>
            )}
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance lg:text-6xl">
              {title}
            </h1>
            {description && (
              <p className="mt-5 max-w-2xl text-lg text-muted-foreground text-pretty">
                {description}
              </p>
            )}
            {children}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
