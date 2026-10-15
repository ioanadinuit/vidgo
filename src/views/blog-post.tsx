import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GridPattern } from "@/components/velora/grid-pattern";
import type { BlogPost } from "@/lib/blog-posts";
import { roBlogPath } from "@/lib/blog-posts";
import { getContent, localePath, type Locale } from "@/lib/i18n";
import { stripDiacritics } from "@/lib/text";

import styles from "./blog.module.css";

export function BlogPostView({ locale, post }: { locale: Locale; post: BlogPost }) {
  const ui = getContent(locale).blog;
  const roPath = roBlogPath(locale, post.slug);

  return (
    <main id="main-content" className="site-page relative">
      {post.jsonLd.map((json, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      ))}
      <SiteHeader locale={locale} roPath={roPath} />

      <header className="relative overflow-hidden pt-32 pb-10 lg:pt-40 lg:pb-14">
        <GridPattern
          width={48}
          height={48}
          className="fill-transparent stroke-border/60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]"
        />
        <div className="relative mx-auto max-w-4xl px-4 lg:px-8">
          <Link
            href={localePath(locale, "/blog")}
            className="inline-flex items-center gap-1.5 text-base text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon className="size-4" />
            {ui.back}
          </Link>
          <p className="mt-6 font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">{stripDiacritics(post.eyebrow)}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">{post.heading}</h1>
          <p
            className="mt-5 max-w-3xl text-lg text-muted-foreground text-pretty"
            dangerouslySetInnerHTML={{ __html: post.dekHtml }}
          />
          <div className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-muted-foreground">
            <span>{post.byline}</span>
            <span aria-hidden="true">•</span>
            <time dateTime={post.date}>{post.dateLabel}</time>
            <span aria-hidden="true">•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <img
          src={post.image}
          alt={post.coverAlt}
          width={1536}
          height={1024}
          fetchPriority="high"
          className="block h-auto w-full rounded-2xl border lg:rounded-3xl"
        />
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 pt-12 pb-24 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16 lg:px-8 lg:pt-16">
        <article className={styles.article} dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
        <aside className={styles.toc} aria-label={ui.tocLabel}>
          <strong>{ui.tocTitle}</strong>
          {post.toc.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </aside>
      </div>

      <SiteFooter locale={locale} roPath={roPath} />
    </main>
  );
}
