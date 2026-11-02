import { CheckIcon } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHeader } from "@/components/page-header";
import { CtaSection } from "@/components/cta-section";
import { PricingCalculator } from "@/components/pricing-calculator";
import { getContent, localePath, type Locale } from "@/lib/i18n";
import { JsonLd, breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";

const RO_PATH = "/preturi";

export function PricingView({ locale }: { locale: Locale }) {
  const t = getContent(locale).pricing;
  const path = localePath(locale, RO_PATH);

  return (
    <main id="main-content" className="site-page relative">
      <JsonLd
        data={[
          webPageJsonLd(locale, "WebPage", t.meta.title, path, t.meta.description),
          breadcrumbJsonLd(locale, [{ name: t.breadcrumb, path }]),
        ]}
      />
      <SiteHeader locale={locale} roPath={RO_PATH} />
      <PageHeader eyebrow={t.header.eyebrow} title={t.header.title} description={t.header.description}>
        <ul className="mt-8 grid max-w-3xl gap-2.5">
          {t.rules.map((rule) => (
            <li key={rule} className="flex gap-2.5 text-base">
              <CheckIcon className="mt-1 size-4 shrink-0 text-primary" />
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </PageHeader>
      <section className="pb-16 pt-4">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <PricingCalculator t={t.calc} />
        </div>
      </section>
      <CtaSection locale={locale} />
      <SiteFooter locale={locale} roPath={RO_PATH} />
    </main>
  );
}
