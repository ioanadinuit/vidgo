import { ArrowUpRightIcon, LinkIcon } from "lucide-react";

import { YouTubeEmbed } from "@/components/youtube-embed";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { CtaSection } from "@/components/cta-section";
import { BlurFade } from "@/components/velora/blur-fade";
import { NumberTicker } from "@/components/velora/number-ticker";
import { SpotlightCard } from "@/components/velora/spotlight-card";
import { getContent, localePath, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { JsonLd, breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";

const RO_PATH = "/despre";

export function AboutView({ locale }: { locale: Locale }) {
  const t = getContent(locale).about;
  const path = localePath(locale, RO_PATH);

  return (
    <main id="main-content" className="site-page relative">
      <JsonLd
        data={[
          webPageJsonLd(locale, "AboutPage", t.meta.title, path, t.meta.description),
          breadcrumbJsonLd(locale, [{ name: t.breadcrumb, path }]),
        ]}
      />
      <SiteHeader locale={locale} roPath={RO_PATH} />
      <PageHeader eyebrow={t.header.eyebrow} title={t.header.title} description={t.header.description} />

      <section className="pb-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:px-8">
          <BlurFade direction="right">
            <div className="relative mx-auto max-w-sm overflow-hidden rounded-3xl border bg-card">
              <img
                src="/assets/ioana-web.jpg"
                alt={t.photoAlt}
                width={640}
                height={800}
                className="block w-full object-cover"
              />
            </div>
          </BlurFade>
          <BlurFade direction="left" delay={0.15}>
            <div>
              <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">{t.role}</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance lg:text-4xl">{t.title}</h2>
              <p className="mt-4 text-muted-foreground">{t.p1}</p>
              <p className="mt-4 text-muted-foreground">{t.p2}</p>
              <Button variant="outline" className="mt-6" asChild>
                <a href={siteConfig.linkedin} rel="noopener" target="_blank">
                  <LinkIcon />
                  {t.linkedin}
                </a>
              </Button>
            </div>
          </BlurFade>
        </div>
      </section>

      <section className="border-y border-border/40 py-14">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 lg:grid-cols-4 lg:px-8">
          {t.stats.map((stat, i) => (
            <BlurFade key={stat.label} delay={i * 0.1}>
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="font-display text-3xl font-bold tracking-tight lg:text-4xl">
                  <NumberTicker value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-base text-muted-foreground">{stat.label}</span>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeading eyebrow={t.principles.eyebrow} title={t.principles.title} />
          <div className="mt-10 lg:mt-12 grid gap-6 md:grid-cols-2">
            {t.principles.items.map((item, i) => (
              <BlurFade key={item.title} delay={(i % 2) * 0.1}>
                <SpotlightCard className="h-full p-8">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-base text-muted-foreground">{item.body}</p>
                </SpotlightCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id={t.press.id} className="scroll-mt-24 border-t border-border/40 section-space">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeading eyebrow={t.press.eyebrow} title={t.press.title} description={t.press.description} />
          <div className="mt-10 lg:mt-12 grid gap-6 lg:grid-cols-2">
            <BlurFade>
              <SpotlightCard className="flex h-full flex-col">
                <a href={t.press.article.href} rel="noopener" target="_blank" className="block overflow-hidden">
                  <img
                    src={t.press.article.image}
                    alt={t.press.article.imageAlt}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="aspect-video w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                </a>
                <div className="flex flex-1 flex-col p-8">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 font-display font-bold uppercase tracking-[0.15em] text-primary">
                      {t.press.article.kind}
                    </span>
                    <span className="text-muted-foreground">
                      {t.press.article.outlet} · <time dateTime={t.press.article.date}>{t.press.article.dateLabel}</time>
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-balance">{t.press.article.title}</h3>
                  <p className="mt-2 flex-1 text-base text-muted-foreground">{t.press.article.body}</p>
                  <Button variant="outline" className="mt-6 self-start" asChild>
                    <a href={t.press.article.href} rel="noopener" target="_blank">
                      {t.press.article.cta}
                      <ArrowUpRightIcon />
                    </a>
                  </Button>
                </div>
              </SpotlightCard>
            </BlurFade>
            <BlurFade delay={0.1}>
              <SpotlightCard className="flex h-full flex-col">
                <YouTubeEmbed
                  videoId={t.press.video.youtubeId}
                  title={t.press.video.title}
                  poster={t.press.video.poster}
                  posterAlt={t.press.video.posterAlt}
                  playLabel={t.press.video.play}
                />
                <div className="flex flex-1 flex-col p-8">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 font-display font-bold uppercase tracking-[0.15em] text-primary">
                      {t.press.video.kind}
                    </span>
                    <span className="text-muted-foreground">{t.press.video.outlet}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-balance">{t.press.video.title}</h3>
                  <p className="mt-2 flex-1 text-base text-muted-foreground">{t.press.video.body}</p>
                  <Button variant="outline" className="mt-6 self-start" asChild>
                    <a href={t.press.video.href} rel="noopener" target="_blank">
                      {t.press.video.cta}
                      <ArrowUpRightIcon />
                    </a>
                  </Button>
                </div>
              </SpotlightCard>
            </BlurFade>
          </div>
        </div>
      </section>

      <CtaSection locale={locale} />
      <SiteFooter locale={locale} roPath={RO_PATH} />
    </main>
  );
}
