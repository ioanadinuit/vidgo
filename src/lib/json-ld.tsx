import { getContent, localePath, schemaLang, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

/**
 * Structured data (schema.org JSON-LD) for the pages. Google reads it for the
 * knowledge panel, breadcrumbs in results and to understand what the site is.
 * Everything here is derived from siteConfig, so a contact change flows through.
 * The Organization graph is shared by both languages; page blocks take a locale.
 */

const ORG_ID = `${siteConfig.url}/#organization`;
const SITE_ID = `${siteConfig.url}/#website`;
const PERSON_ID = `${siteConfig.url}/#ioana-dinu`;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "VidGo Technologies",
      alternateName: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/assets/favicon-192.png`,
      image: `${siteConfig.url}/assets/og-image.jpg`,
      description: siteConfig.description,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      areaServed: "RO",
      founder: { "@id": PERSON_ID },
      sameAs: [siteConfig.linkedin],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.email,
        telephone: siteConfig.phone,
        availableLanguage: ["ro", "en"],
      },
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Ioana Dinu",
      jobTitle: "Fondator",
      url: `${siteConfig.url}/despre`,
      worksFor: { "@id": ORG_ID },
      sameAs: [siteConfig.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      name: siteConfig.name,
      url: siteConfig.url,
      inLanguage: "ro-RO",
      publisher: { "@id": ORG_ID },
    },
  ],
};

export function platformJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "VidGo",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "E-commerce platform",
    operatingSystem: "Web",
    url: `${siteConfig.url}${localePath(locale, "/platforma")}`,
    description: getContent(locale).platform.schemaDescription,
    provider: { "@id": ORG_ID },
    inLanguage: schemaLang[locale],
  };
}

/** Breadcrumbs. `path` of each item is the localised path (e.g. /en/platform). */
export function breadcrumbJsonLd(locale: Locale, items: { name: string; path: string }[]) {
  const home = { name: getContent(locale).common.breadcrumbHome, path: localePath(locale, "/") };
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [home, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path === "/" ? "/" : item.path}`,
    })),
  };
}

export function webPageJsonLd(
  locale: Locale,
  type: "WebPage" | "AboutPage" | "ContactPage",
  name: string,
  path: string,
  description: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    url: `${siteConfig.url}${path}`,
    description,
    inLanguage: schemaLang[locale],
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
  };
}

/** Renders one or more JSON-LD blocks. Safe: the data is ours, not user input. */
export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
