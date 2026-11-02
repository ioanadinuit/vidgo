import type { Metadata } from "next";

import { getBlogListing, getBlogPost, roBlogPath } from "@/lib/blog-posts";
import { getContent, ogLocale, localePath, type Locale } from "@/lib/i18n";
import { alternatesFor, openGraphFor } from "@/lib/metadata";
import { keywordsFor } from "@/lib/seo-keywords";

/**
 * Metadata builders shared by the Romanian and English route files, so each
 * thin page.tsx is one call. All copy comes from src/content/<locale>.
 */

export function platformMetadata(locale: Locale): Metadata {
  const { meta } = getContent(locale).platform;
  return {
    title: meta.title,
    description: meta.description,
    keywords: keywordsFor(locale, ...meta.keywords),
    alternates: alternatesFor(locale, "/platforma"),
    openGraph: openGraphFor(locale, "/platforma", meta.title, meta.description),
  };
}

export function securityMetadata(locale: Locale): Metadata {
  const { meta } = getContent(locale).security;
  return {
    title: meta.title,
    description: meta.description,
    keywords: keywordsFor(locale, ...meta.keywords),
    alternates: alternatesFor(locale, "/securitate"),
    openGraph: openGraphFor(locale, "/securitate", meta.title, meta.description),
  };
}

export function aboutMetadata(locale: Locale): Metadata {
  const { meta } = getContent(locale).about;
  return {
    title: meta.title,
    description: meta.description,
    alternates: alternatesFor(locale, "/despre"),
    openGraph: openGraphFor(locale, "/despre", meta.title, meta.description),
  };
}

export function contactMetadata(locale: Locale): Metadata {
  const { meta } = getContent(locale).contact;
  return {
    title: meta.title,
    description: meta.description,
    alternates: alternatesFor(locale, "/contact"),
    openGraph: openGraphFor(locale, "/contact", meta.title, meta.description),
  };
}

export function blogMetadata(locale: Locale): Metadata {
  const listing = getBlogListing(locale);
  return {
    title: { absolute: listing.title },
    description: listing.description,
    robots: listing.robots,
    alternates: alternatesFor(locale, "/blog"),
    openGraph: openGraphFor(locale, "/blog", listing.ogTitle, listing.ogDescription),
    twitter: {
      card: "summary_large_image",
      title: listing.ogTitle,
      description: listing.ogDescription,
      images: ["/assets/og-image.jpg"],
    },
  };
}

export function blogPostMetadata(locale: Locale, slug: string): Metadata {
  const post = getBlogPost(locale, slug);
  if (!post) {
    return {};
  }
  const roPath = roBlogPath(locale, slug);
  const url = localePath(locale, roPath);
  return {
    title: { absolute: post.title },
    description: post.description,
    authors: [{ name: post.author }],
    robots: post.robots,
    alternates: alternatesFor(locale, roPath),
    openGraph: {
      type: "article",
      locale: ogLocale[locale],
      siteName: "VidGo Technologies",
      url,
      title: post.ogTitle,
      description: post.ogDescription,
      images: [{ url: post.image, width: 1536, height: 1024 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.twitterTitle,
      images: [post.image],
    },
  };
}
