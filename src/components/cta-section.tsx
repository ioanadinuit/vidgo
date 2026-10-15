import { MailIcon, PhoneIcon, SendIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/velora/blur-fade";
import { DotPattern } from "@/components/velora/grid-pattern";
import { getContent, startUrl, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { stripDiacritics } from "@/lib/text";

/** The closing block of every page: one call, one address, one number. */
export function CtaSection({ locale }: { locale: Locale }) {
  const { cta } = getContent(locale).common;
  return (
    <section className="section-space closing-section relative">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <BlurFade>
          <div className="band-orange relative overflow-hidden rounded-3xl px-6 py-12 text-left lg:px-16">
            <DotPattern className="opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
            <div className="relative">
              <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {stripDiacritics(cta.eyebrow)}
              </span>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-balance lg:text-5xl">
                {cta.title}
              </h2>
              <p className="mt-4 max-w-xl text-muted-foreground text-pretty">{cta.body}</p>
              <div className="mt-8 flex flex-wrap items-center justify-start gap-3">
                <Button size="lg" className="bg-[#0E1220] text-white hover:bg-[#0E1220]/90" asChild>
                  <a href={startUrl(locale)} rel="noopener" target="_blank">
                    <SendIcon />
                    {cta.bookDemo}
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-[#0E1220]/40 bg-transparent text-[#0E1220] hover:bg-white/30 dark:border-[#0E1220]/40 dark:bg-transparent dark:hover:bg-white/30" asChild>
                  <a href={`mailto:${siteConfig.email}`}>
                    <MailIcon />
                    {siteConfig.email}
                  </a>
                </Button>
                <Button size="lg" variant="ghost" asChild>
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                    <PhoneIcon />
                    {siteConfig.phoneDisplay}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
