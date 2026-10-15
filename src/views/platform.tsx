import Link from "next/link";
import {
  BotIcon,
  BoxesIcon,
  CheckIcon,
  FileTextIcon,
  GlobeIcon,
  LanguagesIcon,
  MailIcon,
  PaletteIcon,
  RotateCcwIcon,
  SearchIcon,
  ServerIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  TruckIcon,
  UploadIcon,
  UserRoundCheckIcon,
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
import { JsonLd, breadcrumbJsonLd, platformJsonLd } from "@/lib/json-ld";
import { stripDiacritics } from "@/lib/text";

const RO_PATH = "/platforma";

const featureIcons: Record<string, React.ReactNode> = {
  seo: <SearchIcon className="size-6" />,
  catalog: <BoxesIcon className="size-6" />,
  orders: <ShoppingCartIcon className="size-6" />,
  invoicing: <FileTextIcon className="size-6" />,
  refunds: <RotateCcwIcon className="size-6" />,
  shipping: <TruckIcon className="size-6" />,
  email: <MailIcon className="size-6" />,
  themes: <PaletteIcon className="size-6" />,
  migration: <UploadIcon className="size-6" />,
  gdpr: <ShieldCheckIcon className="size-6" />,
  customers: <UserRoundCheckIcon className="size-6" />,
  hosting: <ServerIcon className="size-6" />,
  languages: <LanguagesIcon className="size-6" />,
};

const techIcons = [<ServerIcon key="java" className="size-6" />, <GlobeIcon key="nuxt" className="size-6" />, <BotIcon key="ai" className="size-6" />];

export function PlatformView({ locale }: { locale: Locale }) {
  const t = getContent(locale).platform;
  const path = localePath(locale, RO_PATH);

  return (
    <main id="main-content" className="site-page relative">
      <JsonLd data={[platformJsonLd(locale), breadcrumbJsonLd(locale, [{ name: t.breadcrumb, path }])]} />
      <SiteHeader locale={locale} roPath={RO_PATH} />
      <PageHeader eyebrow={t.header.eyebrow} title={t.header.title} description={t.header.description}>
        <nav aria-label={t.sectionsLabel} className="mt-8 flex flex-wrap justify-start gap-2">
          {t.features.map((feature) => (
            <a
              key={feature.id}
              href={`#${feature.id}`}
              className="rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {stripDiacritics(feature.eyebrow)}
            </a>
          ))}
        </nav>
      </PageHeader>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl space-y-8 px-4 lg:px-8">
          {t.features.map((feature, i) => (
            <BlurFade key={feature.id} delay={Math.min(i, 3) * 0.05}>
              <SpotlightCard id={feature.id} className="scroll-mt-24 p-8 lg:p-10">
                <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
                  <div>
                    <div className="mb-4 w-fit rounded-xl bg-primary/10 p-3 text-primary">{featureIcons[feature.key]}</div>
                    <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">
                      {feature.eyebrow}
                    </span>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance lg:text-3xl">
                      {feature.title}
                    </h2>
                    <p className="mt-4 text-muted-foreground">{feature.body}</p>
                  </div>
                  <div>
                    <ul className="space-y-3 text-sm">
                      {feature.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                            <CheckIcon className="size-3" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    {feature.note && (
                      <p className="mt-6 rounded-xl border border-dashed border-border bg-muted/60 p-4 text-base text-muted-foreground">
                        {feature.note}
                      </p>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </BlurFade>
          ))}
        </div>
      </section>

      <section className="border-y border-border/40 bg-muted/40 py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeading eyebrow={t.tech.eyebrow} title={<Highlight text={t.tech.title} />} description={t.tech.description} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {t.tech.cards.map((card, i) => (
              <BlurFade key={card.title} delay={i * 0.1}>
                <SpotlightCard className="h-full p-8">
                  <div className="mb-4 w-fit rounded-xl bg-primary/10 p-3 text-primary">{techIcons[i]}</div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="mt-2 text-base text-muted-foreground">{card.body}</p>
                </SpotlightCard>
              </BlurFade>
            ))}
          </div>
          <p className="mt-10 text-center text-base text-muted-foreground">
            {t.tech.note.text}{" "}
            <Link href={t.tech.note.href} className="text-primary hover:underline">
              {t.tech.note.link}
            </Link>
            {t.tech.note.after}
          </p>
        </div>
      </section>

      <CtaSection locale={locale} />
      <SiteFooter locale={locale} roPath={RO_PATH} />
    </main>
  );
}
