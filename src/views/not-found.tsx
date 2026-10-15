import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHeader } from "@/components/page-header";
import { getContent, type Locale } from "@/lib/i18n";

/** Branded 404. Romanian one is the global not-found; the English one is exported as /en/404. */
export function NotFoundView({ locale }: { locale: Locale }) {
  const t = getContent(locale).common.notFound;
  return (
    <main className="relative flex min-h-screen flex-col">
      <SiteHeader locale={locale} roPath="/" />
      <div className="flex-1">
        <PageHeader eyebrow={t.eyebrow} title={t.title} description={t.description}>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {t.links.map((link, i) => (
              <Button key={link.href} variant={i === 0 ? "default" : "outline"} asChild>
                <Link href={link.href}>{link.text}</Link>
              </Button>
            ))}
          </div>
        </PageHeader>
      </div>
      <SiteFooter locale={locale} roPath="/" />
    </main>
  );
}
