import Link from "next/link";
import { CalendarClockIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { BrandLogo } from "@/components/brand-logo";
import { LangSwitch } from "@/components/lang-switch";
import { getContent, localePath, otherLocale, startUrl, type Locale } from "@/lib/i18n";

/** `roPath` is the Romanian path of the current page; the language switch maps it. */
export function SiteHeader({ locale, roPath }: { locale: Locale; roPath: string }) {
  const { nav, header, mobile, switchTo } = getContent(locale).common;
  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <a className="skip-link" href="#main-content">{locale === "ro" ? "Sari la conținut" : "Skip to content"}</a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8">
        <Link href={localePath(locale, "/")} className="flex shrink-0 items-center font-display text-sm font-bold tracking-wide" aria-label={header.homeLabel}>
          <BrandLogo />
        </Link>
        {/* Navigation switches to the mobile menu below xl to accommodate the case study. */}
        <nav className="hidden items-center gap-4 text-sm text-muted-foreground xl:flex xl:gap-5" aria-label={header.menuLabel}>
          {nav.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.text}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LangSwitch locale={locale} roPath={roPath} className="hidden xl:inline-flex" />
          <ThemeToggle />
          <Button size="sm" className="hidden sm:max-xl:inline-flex 2xl:inline-flex" asChild>
            <a href={startUrl(locale)} rel="noopener" target="_blank">
              <CalendarClockIcon />
              {header.bookDemo}
            </a>
          </Button>
          <MobileNav
            links={nav}
            labels={{ ...mobile, menu: header.menuLabel }}
            startHref={startUrl(locale)}
            langSwitch={{ href: localePath(otherLocale(locale), roPath), code: switchTo.code, label: switchTo.label }}
          />
        </div>
      </div>
    </header>
  );
}
