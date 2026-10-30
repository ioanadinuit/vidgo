import * as en from "@/content/en";
import * as ro from "@/content/ro";
import { siteConfig } from "@/lib/site-config";

/**
 * Two languages, no i18n framework. Romanian is the default and lives at the
 * root; English lives under /en. Every page is a shared view that receives a
 * `locale` and reads its copy from `src/content/<locale>`.
 */
export type Locale = "ro" | "en";

export const defaultLocale: Locale = "ro";
export const locales: readonly Locale[] = ["ro", "en"] as const;

/** BCP-47 tag used for <html lang>. */
export const htmlLang: Record<Locale, string> = { ro: "ro", en: "en" };
/** Open Graph locale. */
export const ogLocale: Record<Locale, string> = { ro: "ro_RO", en: "en_US" };
/** schema.org inLanguage. */
export const schemaLang: Record<Locale, string> = { ro: "ro-RO", en: "en" };

/** Romanian route → English route. Blog slugs are mapped separately. */
const pathMap: Record<string, string> = {
  "/": "/en",
  "/presa": "/en/press",
  "/studiu-de-caz": "/en/case-study",
  "/platforma": "/en/platform",
  "/securitate": "/en/security",
  "/despre": "/en/about",
  "/contact": "/en/contact",
  "/blog": "/en/blog",
};

/** Romanian blog slug → English blog slug. The post data keeps the same order. */
export const blogSlugMap: Record<string, string> = {
  "dropshipping-furnizori-romania": "dropshipping-romanian-suppliers",
  "viteza-magazin-online": "online-store-speed",
  "cum-s-a-schimbat-indexarea": "how-indexing-changed",
  "structura-temei-magazin": "store-theme-structure",
  "vizibilitate-google-ai": "google-ai-visibility",
};

/** Romanian in-page anchors → English anchors (home sections, platform features). */
const hashMap: Record<string, string> = {
  portofoliu: "portfolio",
  presa: "press",
  platforma: "platform",
  imagini: "images",
  comenzi: "orders",
  fiscal: "invoicing",
  ramburs: "refunds",
  livrare: "shipping",
  teme: "themes",
  migrare: "migration",
  cont: "customers",
  limbi: "languages",
};

/**
 * Maps a Romanian path (the canonical key of every page) to the same page in
 * `locale`. Accepts an optional `#anchor`. Used for the language switch, the
 * hreflang alternates and the sitemap.
 */
/** The free-demo request form, in the visitor's language. */
export function startUrl(locale: Locale): string {
  if (locale === "en") {
    return siteConfig.startEn;
  }
  return siteConfig.start;
}

export function localePath(locale: Locale, roPath: string): string {
  if (locale === "ro") {
    return roPath;
  }
  const [path, hash] = roPath.split("#");
  let mapped: string;
  if (path.startsWith("/blog/")) {
    const slug = path.slice("/blog/".length);
    mapped = `/en/blog/${blogSlugMap[slug] ?? slug}`;
  } else {
    mapped = pathMap[path] ?? `/en${path}`;
  }
  return hash ? `${mapped}#${hashMap[hash] ?? hash}` : mapped;
}

/** English blog slug → Romanian blog slug (the canonical key). */
export function roBlogSlug(locale: Locale, slug: string): string {
  if (locale === "ro") {
    return slug;
  }
  const entry = Object.entries(blogSlugMap).find(([, enSlug]) => enSlug === slug);
  return entry ? entry[0] : slug;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "ro" ? "en" : "ro";
}

const content = { ro, en } as const;

export function getContent(locale: Locale) {
  return content[locale];
}
