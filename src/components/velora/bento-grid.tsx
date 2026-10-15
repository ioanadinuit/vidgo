import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function BentoGrid({ className, children, ...props }: BentoGridProps) {
  return (
    <div
      data-slot="bento-grid"
      className={cn(
        "grid w-full grid-cols-1 gap-4 md:auto-rows-fr md:grid-cols-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  description: string;
  /** Visual filling the card behind the text (chart, image, animation…) */
  background?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  cta?: string;
  /** Short capability chips under the description, so the card is filled by content, not empty space. */
  points?: string[];
}

export function BentoCard({
  name,
  description,
  background,
  icon,
  href,
  cta = "Learn more",
  points,
  className,
  ...props
}: BentoCardProps) {
  return (
    <div
      data-slot="bento-card"
      className={cn(
        "group relative flex h-full flex-col justify-start overflow-hidden rounded-2xl border bg-card transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/5",
        className
      )}
      {...props}
    >
      {background && (
        <div className="absolute inset-0 overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none">
          {background}
        </div>
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent"
      />
      <div
        className={cn(
          "relative z-10 flex flex-1 flex-col gap-2 p-6",
          href && "pb-4"
        )}
      >
        {icon && (
          <div className="mb-2 w-fit text-primary [&_svg]:size-8">{icon}</div>
        )}
        <h3 className="text-lg font-semibold text-card-foreground">{name}</h3>
        <p className="text-base text-muted-foreground">{description}</p>
        {points && points.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {points.map((point) => (
              <li
                key={point}
                className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {point}
              </li>
            ))}
          </ul>
        )}
      </div>
      {href && (
        <div className="relative z-10 mt-auto px-6 pb-6 pt-2">
          <a
            href={href}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {cta}
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      )}
    </div>
  );
}
