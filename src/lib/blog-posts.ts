import type { BlogListing, BlogPost } from "@/content/types";
import { getContent, roBlogSlug, type Locale } from "@/lib/i18n";

/**
 * Locale-aware access to the blog data. The Romanian posts live in
 * src/content/ro/blog-posts.ts (verbatim from the old static blog), the
 * English ones in src/content/en/blog-posts.ts. Slugs are mapped in i18n.ts.
 */
export type { BlogListing, BlogPost };

export function getBlogListing(locale: Locale): BlogListing {
  return getContent(locale).blogListing;
}

export function getBlogPosts(locale: Locale): BlogPost[] {
  return getContent(locale).blogPosts;
}

export function getBlogPost(locale: Locale, slug: string): BlogPost | undefined {
  return getBlogPosts(locale).find((post) => post.slug === slug);
}

/** The Romanian path of a post: the canonical key for hreflang and the language switch. */
export function roBlogPath(locale: Locale, slug: string): string {
  return `/blog/${roBlogSlug(locale, slug)}`;
}
