import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { LangSwitch } from "@/components/lang-switch";
import { getContent, localePath, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter({ locale, roPath }: { locale: Locale; roPath: string }) {
  const { footer } = getContent(locale).common;
  return (
    <footer className="site-footer border-t border-border/40 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Link href={localePath(locale, "/")} className="flex items-center gap-2.5 font-display text-sm font-bold tracking-wide">
            <BrandLogo />
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">{footer.blurb}</p>
          <p className="mt-4 text-xs text-muted-foreground">
            <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">
              {siteConfig.email}
            </a>
            {" · "}
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-foreground">
              {siteConfig.phoneDisplay}
            </a>
          </p>
        </div>
        {footer.groups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h3 className="text-sm font-semibold">{group.title}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {group.links.map((link) => (
                <li key={link.text}>
                  {link.href.startsWith("http") ? (
                    <a
                      href={link.href}
                      rel="noopener"
                      target="_blank"
                      className="transition-colors hover:text-foreground"
                    >
                      {link.text}
                    </a>
                  ) : (
                    <Link href={link.href} className="transition-colors hover:text-foreground">
                      {link.text}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-2 border-t border-border/40 px-4 pt-6 text-xs text-muted-foreground md:flex-row lg:px-8">
        <span>{footer.copyright}</span>
        <span className="inline-flex items-center gap-3">
          {footer.founder}
          <LangSwitch locale={locale} roPath={roPath} />
        </span>
      </div>
    </footer>
  );
}
