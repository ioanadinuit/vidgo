import type { MetadataRoute } from "next";

import { blogSlugMap, localePath } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

const BASE = siteConfig.url;

// Pages are exported as <name>.html and Cloudflare serves them without a trailing slash.
// Every entry is keyed by its Romanian path; the English twin comes from localePath.
const pages = ["/", "/platforma", "/securitate", "/despre", "/contact", "/blog", "/studiu-de-caz", "/presa"];

const blogPosts = [
  { slug: "viteza-magazin-online", lastModified: "2026-08-20" },
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
  const staticPages = pages.flatMap((path) => [
    {
      url: `${BASE}${path}`,
      lastModified: "2026-09-18",
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.7,
      alternates: { languages: languages(path) },
    },
    {
      url: `${BASE}${localePath("en", path)}`,
      lastModified: EN_LAST_MODIFIED,
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
