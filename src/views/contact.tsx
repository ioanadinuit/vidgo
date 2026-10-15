import { LinkIcon, MailIcon, PhoneIcon, SendIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHeader } from "@/components/page-header";
import { BlurFade } from "@/components/velora/blur-fade";
import { SpotlightCard } from "@/components/velora/spotlight-card";
import { getContent, localePath, startUrl, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { JsonLd, breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";

const RO_PATH = "/contact";

const channelTargets = {
  email: { icon: <MailIcon className="size-6" />, href: `mailto:${siteConfig.email}`, cta: siteConfig.email },
  phone: { icon: <PhoneIcon className="size-6" />, href: `tel:${siteConfig.phone.replace(/\s/g, "")}`, cta: siteConfig.phoneDisplay },
  start: { icon: <SendIcon className="size-6" />, href: siteConfig.start, cta: undefined },
};

export function ContactView({ locale }: { locale: Locale }) {
  const t = getContent(locale).contact;
  const path = localePath(locale, RO_PATH);

  return (
    <main id="main-content" className="site-page relative">
      <JsonLd
        data={[
          webPageJsonLd(locale, "ContactPage", t.meta.title, path, t.meta.description),
          breadcrumbJsonLd(locale, [{ name: t.breadcrumb, path }]),
        ]}
      />
      <SiteHeader locale={locale} roPath={RO_PATH} />
      <PageHeader eyebrow={t.header.eyebrow} title={t.header.title} description={t.header.description} />
      <section className="pb-28">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {t.channels.map((channel, i) => {
              const target = channelTargets[channel.target];
              const cta = channel.cta ?? target.cta;
              const href = channel.target === "start" ? startUrl(locale) : target.href;
              return (
                <BlurFade key={channel.title} delay={i * 0.1}>
                  <SpotlightCard className="flex h-full flex-col p-8">
                    <div className="mb-4 w-fit rounded-xl bg-primary/10 p-3 text-primary">{target.icon}</div>
                    <h2 className="text-lg font-semibold">{channel.title}</h2>
                    <p className="mt-2 flex-1 text-base text-muted-foreground">{channel.body}</p>
                    <Button className="mt-6 w-fit" variant={i === 0 ? "default" : "outline"} asChild>
                      <a href={href} rel="noopener" target={href.startsWith("http") ? "_blank" : undefined}>
                        {cta}
                      </a>
                    </Button>
                  </SpotlightCard>
                </BlurFade>
              );
            })}
          </div>
          <BlurFade delay={0.4}>
            <p className="mt-10 text-center text-base text-muted-foreground">
              <a href={siteConfig.linkedin} rel="noopener" target="_blank" className="inline-flex items-center gap-2 hover:text-foreground">
                <LinkIcon className="size-4" />
                {t.linkedin}
              </a>
            </p>
          </BlurFade>
        </div>
      </section>
      <SiteFooter locale={locale} roPath={RO_PATH} />
    </main>
  );
}
