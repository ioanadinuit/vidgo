import Link from "next/link";
import {
  ArrowRightIcon,
  CheckIcon,
  CreditCardIcon,
  DatabaseZapIcon,
  FingerprintIcon,
  KeyRoundIcon,
  ServerCogIcon,
  ShieldCheckIcon,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { CtaSection } from "@/components/cta-section";
import { Highlight } from "@/components/highlight";
import { BlurFade } from "@/components/velora/blur-fade";
import { SpotlightCard } from "@/components/velora/spotlight-card";
import { getContent, localePath, type Locale } from "@/lib/i18n";
import { JsonLd, breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";

const RO_PATH = "/securitate";

const principleIcons = [
  <FingerprintIcon key="auth" className="size-6" />,
  <CreditCardIcon key="cards" className="size-6" />,
  <KeyRoundIcon key="tokens" className="size-6" />,
  <ShieldCheckIcon key="transitions" className="size-6" />,
  <ServerCogIcon key="server" className="size-6" />,
  <DatabaseZapIcon key="gdpr" className="size-6" />,
];

export function SecurityView({ locale }: { locale: Locale }) {
  const t = getContent(locale).security;
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
      <PageHeader eyebrow={t.header.eyebrow} title={t.header.title} description={t.header.description} />

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeading
            eyebrow={t.incidents.eyebrow}
            title={<Highlight text={t.incidents.title} />}
            description={t.incidents.description}
          />
          <div className="mt-10 lg:mt-12 grid gap-6 lg:grid-cols-2">
            {t.incidents.items.map((incident, i) => (
              <BlurFade key={incident.what} delay={i * 0.12}>
                <SpotlightCard className="flex h-full flex-col p-8">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full bg-destructive/10 px-3 py-1 font-medium text-destructive">
                      {incident.severity}
                    </span>
                    <span className="text-muted-foreground">{incident.when}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{incident.what}</h3>
                  <p className="mt-3 flex-1 text-muted-foreground">{incident.body}</p>
                  <a
                    href={incident.href}
                    rel="noopener nofollow"
                    target="_blank"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    {t.incidents.sourceLabel}
                    <ArrowRightIcon className="size-3.5" />
                  </a>
                </SpotlightCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/40 bg-muted/40 section-space">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeading eyebrow={t.principles.eyebrow} title={<Highlight text={t.principles.title} />} />
          <div className="mt-10 lg:mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.principles.items.map((item, i) => (
              <BlurFade key={item.title} delay={(i % 3) * 0.1}>
                <SpotlightCard className="h-full p-8">
                  <div className="mb-4 w-fit rounded-xl bg-primary/10 p-3 text-primary">{principleIcons[i]}</div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-base text-muted-foreground">{item.body}</p>
                </SpotlightCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <SectionHeading eyebrow={t.honest.eyebrow} title={t.honest.title} description={t.honest.description} />
          <ul className="mt-10 space-y-4 text-muted-foreground">
            {t.honest.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <CheckIcon className="size-3" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-base text-muted-foreground">
            {t.honest.note.text}{" "}
            <Link href={t.honest.note.href} className="text-primary hover:underline">
              {t.honest.note.link}
            </Link>
            {t.honest.note.after}
          </p>
        </div>
      </section>

      <CtaSection locale={locale} />
      <SiteFooter locale={locale} roPath={RO_PATH} />
    </main>
  );
}
