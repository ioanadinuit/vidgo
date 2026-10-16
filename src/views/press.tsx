import { PressCards } from "@/components/press-cards";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHeader } from "@/components/page-header";
import { CtaSection } from "@/components/cta-section";
import { getContent, type Locale } from "@/lib/i18n";
export function PressView({ locale }: { locale: Locale }) {
  const t = getContent(locale).about;
  return <main id="main-content" className="site-page relative">
    <SiteHeader locale={locale} roPath="/presa" />
    <PageHeader eyebrow={t.press.eyebrow} title={t.press.title} description={t.press.description} />
    <section className="pb-16"><div className="mx-auto max-w-6xl px-4 lg:px-8">
      <PressCards locale={locale} />
    </div></section>
    <CtaSection locale={locale} /><SiteFooter locale={locale} roPath="/presa" />
  </main>;
}
