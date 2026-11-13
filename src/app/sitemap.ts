import type { MetadataRoute } from "next";

import { blogSlugMap, localePath } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

const BASE = siteConfig.url;

// Pages are exported as <name>.html and Cloudflare serves them without a trailing slash.
// Every entry is keyed by its Romanian path; the English twin comes from localePath.
// lastModified = the last real content change of the page, in both languages (they change together).
// Update it when a page's content changes, so Google sees what is new.
const pages = [
  { path: "/", lastModified: "2026-11-06" },
  { path: "/platforma", lastModified: "2026-11-06" },
  { path: "/securitate", lastModified: "2026-11-06" },
  { path: "/despre", lastModified: "2026-11-02" },
  { path: "/contact", lastModified: "2026-10-15" },
  { path: "/blog", lastModified: "2026-10-30" },
  { path: "/studiu-de-caz", lastModified: "2026-10-30" },
  { path: "/presa", lastModified: "2026-10-16" },
];

const blogPosts = [
  { slug: "dropshipping-furnizori-romania", lastModified: "2026-10-30" },
  { slug: "viteza-magazin-online", lastModified: "2026-10-30" },
  { slug: "cum-s-a-schimbat-indexarea", lastModified: "2026-10-30" },
  { slug: "structura-temei-magazin", lastModified: "2026-08-20" },
  { slug: "vizibilitate-google-ai", lastModified: "2026-10-30" },
];

const EN_LAST_MODIFIED = "2026-09-18";

function languages(roPath: string) {
  const ro = `${BASE}${roPath}`;
  const en = `${BASE}${localePath("en", roPath)}`;
  return { ro, en, "x-default": ro };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = pages.flatMap(({ path, lastModified }) => [
    {
      url: `${BASE}${path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.7,
      alternates: { languages: languages(path) },
    },
    {
      url: `${BASE}${localePath("en", path)}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 0.9 : 0.6,
      alternates: { languages: languages(path) },
    },
  ]);

  const posts = blogPosts.flatMap((post) => {
    const roPath = `/blog/${post.slug}`;
    return [
      {
        url: `${BASE}${roPath}`,
        lastModified: post.lastModified,
        changeFrequency: "yearly" as const,
        priority: 0.5,
        alternates: { languages: languages(roPath) },
      },
      {
        url: `${BASE}/en/blog/${blogSlugMap[post.slug]}`,
        lastModified: post.lastModified > EN_LAST_MODIFIED ? post.lastModified : EN_LAST_MODIFIED,
        changeFrequency: "yearly" as const,
        priority: 0.5,
        alternates: { languages: languages(roPath) },
      },
    ];
  });

  return [...staticPages, ...posts];
}
