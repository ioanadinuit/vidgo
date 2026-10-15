import type { Metadata } from "next";

import { localePath, ogLocale, type Locale } from "@/lib/i18n";

/**
 * hreflang + canonical for a page identified by its Romanian path. Romanian is
 * the default language, so it is also `x-default`. Next resolves the relative
 * paths against `metadataBase`.
 */
export function alternatesFor(locale: Locale, roPath: string): NonNullable<Metadata["alternates"]> {
  const ro = localePath("ro", roPath);
  const en = localePath("en", roPath);
  return {
    canonical: localePath(locale, roPath),
    languages: { ro, en, "x-default": ro },
  };
}

/** Open Graph block shared by the inner pages: website type, per-language locale. */
export function openGraphFor(locale: Locale, roPath: string, title: string, description: string): Metadata["openGraph"] {
  return {
    type: "website",
    locale: ogLocale[locale],
    url: localePath(locale, roPath),
    siteName: "VidGo Technologies",
    title,
    description,
    images: [{ url: "/assets/og-image.jpg", width: 1200, height: 630, alt: "VidGo Technologies" }],
  };
}
