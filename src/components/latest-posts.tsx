import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { BlurFade } from "@/components/velora/blur-fade";
import { getBlogPosts } from "@/lib/blog-posts";
import { localePath, type Locale } from "@/lib/i18n";
import { stripDiacritics } from "@/lib/text";

/**
 * The newest blog posts as cards. Used on the home page so every post gets a
 * crawlable link from the most important page of the site, not only from /blog.
 */
export function LatestPosts({ locale, count = 3, readLabel }: { locale: Locale; count?: number; readLabel: string }) {
  const posts = [...getBlogPosts(locale)].sort((a, b) => b.date.localeCompare(a.date)).slice(0, count);
  const base = localePath(locale, "/blog");
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {posts.map((post, i) => {
        const href = `${base}/${post.slug}`;
        return (
          <BlurFade key={post.slug} delay={i * 0.08}>
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-lg">
              <Link href={href} tabIndex={-1} aria-hidden="true" className="block overflow-hidden border-b">
                <img
                  src={post.image}
                  alt={post.cardAlt}
                  width={1536}
                  height={1024}
                  loading="lazy"
                  className="block aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">{stripDiacritics(post.category)}</span>
                <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-balance">
                  <Link href={href} className="transition-colors hover:text-primary">{post.cardTitle}</Link>
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground text-pretty">{post.excerpt}</p>
                <Link href={href} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                  {readLabel}
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          </BlurFade>
        );
      })}
    </div>
  );
}
