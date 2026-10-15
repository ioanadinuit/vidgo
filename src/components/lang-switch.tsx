import Link from "next/link";

import { getContent, htmlLang, localePath, otherLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * "EN" on Romanian pages, "RO" on English ones: a link to the same page in the
 * other language. `roPath` is the page's Romanian path, the canonical key.
 */
export function LangSwitch({ locale, roPath, className }: { locale: Locale; roPath: string; className?: string }) {
  const target = otherLocale(locale);
  const { switchTo } = getContent(locale).common;
  return (
    <Link
      href={localePath(target, roPath)}
      hrefLang={htmlLang[target]}
      lang={htmlLang[target]}
      aria-label={switchTo.label}
      title={switchTo.label}
      className={cn(
        "inline-flex h-8 items-center rounded-md border border-border/60 px-2 font-mono text-xs font-medium text-muted-foreground transition-colors hover:text-foreground",
        className,
      )}
    >
      {switchTo.code}
    </Link>
  );
}
