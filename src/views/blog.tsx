import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHeader } from "@/components/page-header";
import { CtaSection } from "@/components/cta-section";
import { BlurFade } from "@/components/velora/blur-fade";
import { getBlogListing, getBlogPosts } from "@/lib/blog-posts";
import { getContent, localePath, type Locale } from "@/lib/i18n";
import { JsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { stripDiacritics } from "@/lib/text";

const RO_PATH = "/blog";

export function BlogView({ locale }: { locale: Locale }) {
  const ui = getContent(locale).blog;
  const listing = getBlogListing(locale);
  const posts = getBlogPosts(locale);
  const path = localePath(locale, RO_PATH);

  return (
    <main id="main-content" className="site-page relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: listing.jsonLd }} />
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: ui.breadcrumb, path }])} />
      <SiteHeader locale={locale} roPath={RO_PATH} />
      <PageHeader eyebrow={listing.eyebrow} title={listing.heading} description={listing.intro} />

      <section className="pb-8">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 lg:px-8">
          {posts.map((post, i) => {
            const href = `${path}/${post.slug}`;
            return (
              <BlurFade key={post.slug} delay={Math.min(i, 3) * 0.08}>
                <article className="group grid items-center gap-6 rounded-3xl border bg-card p-4 transition-shadow hover:shadow-lg sm:p-6 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
                  <Link href={href} tabIndex={-1} aria-hidden="true" className="block overflow-hidden rounded-2xl border">
                    <img
                      src={post.image}
                      alt={post.cardAlt}
                      width={1536}
                      height={1024}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="block aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </Link>
                  <div>
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-muted-foreground">
                      <time dateTime={post.date}>{post.dateLabel}</time>
                      <span aria-hidden="true">•</span>
                      <span>{post.readTime}</span>
                      <span aria-hidden="true">•</span>
                      <span className="font-display font-bold uppercase tracking-[0.2em] text-primary">{stripDiacritics(post.category)}</span>
                    </div>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance lg:text-3xl">
                      <Link href={href} className="transition-colors hover:text-primary">
                        {post.cardTitle}
                      </Link>
                    </h2>
                    <p className="mt-3 text-muted-foreground text-pretty">{post.excerpt}</p>
                    <Link
                      href={href}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      {ui.readArticle}
                      <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              </BlurFade>
            );
          })}
        </div>
      </section>

      <CtaSection locale={locale} />
      <SiteFooter locale={locale} roPath={RO_PATH} />
    </main>
  );
}
