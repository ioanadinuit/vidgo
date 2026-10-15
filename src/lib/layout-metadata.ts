import type { Metadata } from "next";

import { getContent, ogLocale, type Locale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/metadata";
import { keywordsFor } from "@/lib/seo-keywords";
import { siteConfig } from "@/lib/site-config";

/** Root metadata of a language: title template, default description, OG, icons. */
export function layoutMetadata(locale: Locale): Metadata {
  const { site } = getContent(locale).common;
  const title = `${siteConfig.name} — ${site.tagline}`;
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: `%s — ${siteConfig.name}`,
    },
    description: site.description,
    keywords: keywordsFor(locale, "platform", "seo"),
    authors: [{ name: "Ioana Dinu" }],
    alternates: alternatesFor(locale, "/"),
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      url: `${siteConfig.url}${locale === "ro" ? "" : "/en"}`,
      siteName: siteConfig.name,
      title,
      description: site.description,
      images: [{ url: "/assets/og-image.jpg", width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: site.description,
      images: ["/assets/og-image.jpg"],
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/assets/favicon.svg", type: "image/svg+xml" },
        { url: "/assets/favicon-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: "/assets/apple-touch-icon.png",
    },
  };
}
