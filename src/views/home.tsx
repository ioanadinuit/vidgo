import { Fragment } from "react";
import Link from "next/link";
import { ArrowRightIcon, BoxesIcon, CalendarClockIcon, CheckIcon, ClipboardCheckIcon, FileTextIcon, GaugeIcon, HammerIcon, LockKeyholeIcon, PlugZapIcon, RocketIcon, SearchCheckIcon, SearchIcon, ServerIcon, ShieldAlertIcon, TruckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { CtaSection } from "@/components/cta-section";
import { Highlight } from "@/components/highlight";
import { PositioningStack } from "@/components/positioning-stack";
import { AuroraBackground } from "@/components/velora/aurora-background";
import { BentoCard, BentoGrid } from "@/components/velora/bento-grid";
import { BlurFade } from "@/components/velora/blur-fade";
import { BorderBeam } from "@/components/velora/border-beam";
import { DotPattern, GridPattern } from "@/components/velora/grid-pattern";
import { Marquee } from "@/components/velora/marquee";
import { NumberTicker } from "@/components/velora/number-ticker";
import { ScrollProgress } from "@/components/velora/scroll-progress";
import { SpotlightCard } from "@/components/velora/spotlight-card";
import { TiltCard } from "@/components/velora/tilt-card";
import { getContent, localePath, startUrl, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { stripDiacritics } from "@/lib/text";

const RO_PATH = "/";

const portfolioUrls = [siteConfig.reference, siteConfig.demo100k];

const stepIcons = [
  <SearchCheckIcon key="assess" className="size-6" />,
  <HammerIcon key="build" className="size-6" />,
  <ClipboardCheckIcon key="test" className="size-6" />,
  <RocketIcon key="migrate" className="size-6" />,
];

const bentoIcons = [<SearchIcon key="seo" />, <FileTextIcon key="invoicing" />, <BoxesIcon key="catalog" />, <TruckIcon key="orders" />];
const bentoSpans = ["", "", "", ""];

const partnerIcons = [
  <PlugZapIcon key="platform" className="size-6" />,
  <img key="disivo" src="/assets/partners/disivo.webp" alt="Disivo" width={96} height={24} loading="lazy" className="box-content h-6 w-auto rounded-md dark:bg-white dark:px-2 dark:py-1" />,
  <img key="dyver" src="/assets/partners/dyver.webp" alt="Dyver.AI" width={96} height={24} loading="lazy" className="box-content h-6 w-auto rounded-md bg-[#0E1220] px-2 py-1 dark:bg-transparent dark:p-0" />,
  <Fragment key="cybermicro">
    <img src="/assets/partners/cybermicro-light.jpg" alt="Cyber Micro Services" width={473} height={377} loading="lazy" className="h-20 w-auto rounded-md dark:hidden" />
    <img src="/assets/partners/cybermicro-dark.png" alt="Cyber Micro Services" width={946} height={754} loading="lazy" className="hidden h-20 w-auto dark:block" />
  </Fragment>,
];

export function HomeView({ locale }: { locale: Locale }) {
  const t = getContent(locale).home;
  const portfolioId = localePath(locale, "/#portofoliu").split("#")[1];

  return (
    <main id="main-content" className="site-page relative">
      <ScrollProgress />
      <SiteHeader locale={locale} roPath={RO_PATH} />

      {/* Hero */}
      <section className="home-hero relative overflow-hidden">
        <AuroraBackground intensity="subtle" />
        <GridPattern
          width={48}
          height={48}
          className="fill-transparent stroke-border/60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
        />
        <div className="hero-grid relative mx-auto max-w-6xl px-4 lg:px-8">
          <div className="hero-content">
          <BlurFade delay={0} direction="down">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-1.5 text-sm backdrop-blur">
              <ServerIcon className="size-3.5 text-primary" />
              <span className="font-medium">{t.badge}</span>
            </span>
          </BlurFade>

          <h1 className="hero-title mt-6 font-semibold tracking-tight text-balance">
            {t.headline}
            <span className="mt-2 block text-primary">{t.typewriter[0]}</span>
          </h1>

          <BlurFade delay={0.35}>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground text-pretty">{t.intro}</p>
          </BlurFade>

          <BlurFade delay={0.5}>
            <div className="mt-8 flex flex-wrap items-center justify-start gap-4">
              <Button size="lg" className="bg-go text-go-foreground hover:bg-go/90" asChild>
                <a href={startUrl(locale)} rel="noopener" target="_blank">
                  <CalendarClockIcon />
                  {t.bookDemo}
                </a>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link href={t.seePlatform.href}>
                  {t.seePlatform.text}
                  <ArrowRightIcon />
                </Link>
              </Button>
            </div>
          </BlurFade>

          </div>
          <BlurFade className="hero-visual" delay={0.15} offset={16}>
            <div className="relative mx-auto w-full">
              <div
                aria-hidden
                className="absolute -inset-6 rounded-[2rem] bg-gradient-to-r from-brand-from via-brand-via to-brand-to opacity-20 blur-3xl"
              />
              <div className="relative">
                <img
                  src="/assets/hero-laptop-en-ewhite.png"
                  alt={t.heroAlt}
                  width={1597}
                  height={985}
                  className="block w-full"
                  fetchPriority="high"
                />
              </div>
            </div>
          </BlurFade>

          <div className="hero-stats grid grid-cols-2 gap-6 lg:grid-cols-4">
            {t.stats.map((stat, i) => (
              <BlurFade key={stat.label} delay={i * 0.1}>
                <div className="flex flex-col gap-1">
                  <span className="font-display text-3xl font-bold tracking-tight lg:text-4xl">
                    <NumberTicker value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-base text-muted-foreground">{stat.label}</span>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Stack marquee */}
      <section className="border-y border-border/40 py-10">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <p className="mb-6 text-center text-base text-muted-foreground">{t.stackTitle}</p>
          <Marquee pauseOnHover className="[--duration:32s]">
            {t.stack.map((item) => (
              <span
                key={item}
                className="mx-8 font-display text-base font-bold tracking-wide text-muted-foreground/60 transition-colors hover:text-foreground"
              >
                {item}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Where we stand */}
      <section className="relative section-space">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeading eyebrow={t.positioning.eyebrow} title={<Highlight text={t.positioning.title} />} />
          <PositioningStack content={t.positioning} />
        </div>
      </section>

      {/* Why not a plugin-based store */}
      <section className="relative section-space">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeading eyebrow={t.why.eyebrow} title={<Highlight text={t.why.title} />} description={t.why.description} />
          <div className="mt-10 lg:mt-12 grid gap-6 lg:grid-cols-2">
            <BlurFade>
              <SpotlightCard className="h-full p-8">
                <div className="mb-4 w-fit rounded-xl bg-primary/10 p-3 text-primary">
                  <GaugeIcon className="size-6" />
                </div>
                <h3 className="text-xl font-semibold">{t.why.speed.title}</h3>
                <p className="mt-3 text-muted-foreground">{t.why.speed.p1}</p>
                <p className="mt-3 text-muted-foreground">{t.why.speed.p2}</p>
                <a
                  href="https://www.searchenginejournal.com/why-woocommerce-slows-down-how-to-fix-it-with-the-right-server-stack-spa/553432/"
                  rel="noopener nofollow"
                  target="_blank"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  {t.why.speed.link}
                  <ArrowRightIcon className="size-3.5" />
                </a>
              </SpotlightCard>
            </BlurFade>
            <BlurFade delay={0.12}>
              <SpotlightCard className="h-full p-8">
                <div className="mb-4 w-fit rounded-xl bg-primary/10 p-3 text-primary">
                  <ShieldAlertIcon className="size-6" />
                </div>
                <h3 className="text-xl font-semibold">{t.why.doors.title}</h3>
                <ul className="mt-3 space-y-3 text-muted-foreground">
                  {t.why.doors.items.map((item) => (
                    <li key={item.body}>
                      <strong className="text-foreground">{item.when}</strong> {item.body}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-muted-foreground">{t.why.doors.body}</p>
                <Link href={t.why.doors.link.href} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  {t.why.doors.link.text}
                  <ArrowRightIcon className="size-3.5" />
                </Link>
              </SpotlightCard>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Bento: what the platform does */}
      <section id={localePath(locale, "/#platforma").split("#")[1]} className="relative section-space">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeading eyebrow={t.bento.eyebrow} title={<Highlight text={t.bento.title} />} description={t.bento.description} />
          <BlurFade delay={0.15}>
            <BentoGrid className="mt-10 lg:mt-12">
              {t.bento.cards.map((card, i) => (
                <BentoCard
                  key={card.name}
                  name={card.name}
                  description={card.description}
                  className={bentoSpans[i]}
                  icon={bentoIcons[i]}
                  href={card.href}
                  cta={card.cta}
                  points={card.points}
                  background={
                    i === 0 ? (
                      <div className="absolute inset-0">
                        <DotPattern className="[mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
                      </div>
                    ) : undefined
                  }
                />
              ))}
            </BentoGrid>
          </BlurFade>
        </div>
      </section>

      {/* Measured */}
      <section className="section-bright section-space">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <BlurFade direction="right">
            <div>
              <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {stripDiacritics(t.measured.eyebrow)}
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance lg:text-4xl">
                <Highlight text={t.measured.title} />
              </h2>
              <p className="mt-4 text-muted-foreground">{t.measured.body}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {t.measured.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <CheckIcon className="size-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="outline" asChild>
                  <a
                    href="https://pagespeed.web.dev/analysis/https-biotu-ro/rfm4j5d5sj?form_factor=mobile"
                    rel="noopener"
                    target="_blank"
                  >
                    {t.measured.pagespeed}
                  </a>
                </Button>
                <Button variant="ghost" asChild>
                  <a href={siteConfig.demo100k} rel="noopener" target="_blank">
                    {t.measured.demo}
                    <ArrowRightIcon />
                  </a>
                </Button>
              </div>
            </div>
          </BlurFade>
          <BlurFade direction="left" delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {t.measured.scores.map((item) => (
                <TiltCard key={item.label}>
                  <div className="rounded-2xl border bg-card p-6 text-center">
                    <span className="font-display text-5xl font-bold text-go-foreground dark:text-foreground">
                      <NumberTicker value={item.score} />
                    </span>
                    <p className="mt-2 text-base text-muted-foreground">{item.label}</p>
                    <div className="mx-auto mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-go" style={{ width: `${item.score}%` }} />
                    </div>
                  </div>
                </TiltCard>
              ))}
              <p className="col-span-2 text-center text-xs text-muted-foreground">{t.measured.caption}</p>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Portfolio */}
      <section id={portfolioId} className="relative scroll-mt-20 section-space">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeading eyebrow={t.portfolio.eyebrow} title={<Highlight text={t.portfolio.title} />} description={t.portfolio.description} />
          <div className="mt-10 lg:mt-12 grid gap-6 md:grid-cols-2">
            {t.portfolio.items.map((item, i) => (
              <BlurFade key={portfolioUrls[i]} delay={i * 0.1}>
                <SpotlightCard className="flex h-full flex-col p-8">
                  <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    {stripDiacritics(item.kind)}
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold">{item.name}</h3>
                  <p className="mt-3 flex-1 text-muted-foreground">{item.body}</p>
                  <ul className="mt-6 flex flex-wrap gap-2 text-xs">
                    {item.facts.map((fact) => (
                      <li key={fact} className="rounded-full border px-3 py-1 text-muted-foreground">
                        {fact}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button variant="outline" asChild>
                      <a href={portfolioUrls[i]} rel="noopener" target="_blank">
                        {t.portfolio.open} {item.name}
                        <ArrowRightIcon />
                      </a>
                    </Button>
                  </div>
                </SpotlightCard>
              </BlurFade>
            ))}
          </div>
          <BlurFade delay={0.2}>
            <a
              href="https://optimac.ro"
              rel="noopener"
              target="_blank"
              className="group mt-6 flex flex-col gap-6 rounded-2xl border border-[#64B846]/40 bg-[#F7F4EE] p-8 text-[#1E1E1E] transition-colors hover:border-[#64B846] md:flex-row md:items-center md:justify-between lg:p-10"
            >
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#64B846]/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#3F8A28]">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#64B846] opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-[#64B846]" />
                  </span>
                  {t.portfolio.comingSoon.kind}
                </span>
                <h3 className="mt-4 font-serif text-2xl leading-snug text-balance lg:text-3xl">{t.portfolio.comingSoon.title}</h3>
              </div>
              <img
                src="/assets/optimac-logo.png"
                alt={t.portfolio.comingSoon.logoAlt}
                width={213}
                height={44}
                loading="lazy"
                className="h-9 w-auto shrink-0 transition-transform group-hover:scale-105 lg:h-11"
              />
            </a>
          </BlurFade>
          <BlurFade delay={0.25}>
            <figure className="relative mt-6 overflow-hidden rounded-2xl border bg-card p-8 lg:p-10">
              <BorderBeam size={100} duration={8} colorFrom="#FD6208" colorTo="#174B9A" />
              <blockquote className="text-lg leading-relaxed text-pretty">{t.portfolio.quote}</blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                <img
                  src="/assets/elena-biotu.jpg"
                  alt={t.portfolio.quoteAlt}
                  width={56}
                  height={56}
                  loading="lazy"
                  className="size-14 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">{t.portfolio.quoteName}</div>
                  <a href={siteConfig.reference} rel="noopener" target="_blank" className="text-sm text-primary hover:underline">
                    biotu.ro
                  </a>
                </div>
              </figcaption>
            </figure>
          </BlurFade>
        </div>
      </section>

      {/* How it works */}
      <section className="section-bright section-space">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeading eyebrow={t.steps.eyebrow} title={<Highlight text={t.steps.title} />} description={t.steps.description} />
          <div className="mt-10 lg:mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t.steps.items.map((step, i) => (
              <BlurFade key={step.n} delay={i * 0.1}>
                <div className="h-full rounded-2xl border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl font-bold text-primary">{step.n}</span>
                    <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary" aria-hidden>{stepIcons[i]}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-base text-muted-foreground">{step.body}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations & partners */}
      <section className="relative section-space">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeading eyebrow={t.partners.eyebrow} title={<Highlight text={t.partners.title} />} />
          <div className="mt-10 lg:mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t.partners.cards.map((card, i) => (
              <BlurFade key={card.title} delay={i * 0.12}>
                <SpotlightCard className="h-full p-8">
                  <div className="mb-4 flex min-h-12 w-fit items-center rounded-xl bg-primary/10 p-3 text-primary">
                    {partnerIcons[i]}
                  </div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  {card.tag ? (
                    <span className="mt-2 inline-block rounded-lg border border-brand-to/40 bg-brand-to/10 px-3 py-1 text-xs font-medium text-brand-to">
                      {card.tag}
                    </span>
                  ) : null}
                  <p className="mt-2 text-base text-muted-foreground">{card.body}</p>
                </SpotlightCard>
              </BlurFade>
            ))}
          </div>
          <BlurFade delay={0.3}>
            <p className="mt-8 text-center text-base text-muted-foreground">
              {t.partners.note.text}{" "}
              <Link href={t.partners.note.href} className="text-primary hover:underline">
                {t.partners.note.link}
              </Link>
              {t.partners.note.after}
            </p>
          </BlurFade>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <BlurFade>
          <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-base text-muted-foreground">
            <LockKeyholeIcon className="size-5 shrink-0 text-primary" />
            <span>{t.isolation}</span>
          </div>
        </BlurFade>
      </div>

      <CtaSection locale={locale} />
      <SiteFooter locale={locale} roPath={RO_PATH} />
    </main>
  );
}
