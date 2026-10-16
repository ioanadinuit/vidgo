import { ArrowUpRightIcon } from "lucide-react";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/velora/blur-fade";
import { SpotlightCard } from "@/components/velora/spotlight-card";
import { getContent, type Locale } from "@/lib/i18n";

export function PressCards({ locale }: { locale: Locale }) {
 const t = getContent(locale).about;
 return (
          <div className="grid gap-6 lg:grid-cols-2">
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
 );
}
