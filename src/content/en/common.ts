import type { CommonContent } from "@/content/types";
import { siteConfig } from "@/lib/site-config";

export const common: CommonContent = {
  site: {
    tagline: "Complete e-commerce platform, hosted on your own server",
    description:
      "A complete online store — storefront, admin panel and backend in one application, without plugins. Server-rendered pages, SEO score 100, automatic invoicing with e-Factura (Romanian e-invoicing XML), migration with redirects from open-source platforms. Private VPS hosting, maintained by the person who built the platform.",
  },
  breadcrumbHome: "Home",
  nav: [
    { text: "Platform", href: "/en/platform" },
    { text: "Security", href: "/en/security" },
    { text: "Portfolio", href: "/en#portfolio" },
    { text: "Blog", href: "/en/blog" },
    { text: "About", href: "/en/about" },
    { text: "Contact", href: "/en/contact" },
  ],
  header: {
    homeLabel: "VidGo Technology — home",
    menuLabel: "Main menu",
    bookDemo: "Request a free demo",
  },
  mobile: {
    open: "Open menu",
    close: "Close menu",
    bookDemo: "Request a free demo",
  },
  switchTo: {
    code: "RO",
    label: "Română",
  },
  footer: {
    blurb:
      "A complete e-commerce platform, built and maintained in Romania. Storefront, admin panel and backend in one application, on your own server.",
    groups: [
      {
        title: "Platform",
        links: [
          { text: "Features", href: "/en/platform" },
          { text: "Security", href: "/en/security" },
          { text: "Demo with 100,000 products", href: siteConfig.demo100k },
        ],
      },
      {
        title: "Company",
        links: [
          { text: "About", href: "/en/about" },
          { text: "Press", href: "/en/about#press" },
          { text: "Blog", href: "/en/blog" },
          { text: "Contact", href: "/en/contact" },
          { text: "Customer account", href: siteConfig.portal },
        ],
      },
      {
        title: "Resources",
        links: [
          { text: "Reference store: biotu.ro", href: siteConfig.reference },
          { text: "llms.txt", href: "/llms.txt" },
          { text: "Request a free demo", href: siteConfig.startEn },
        ],
      },
    ],
    copyright: "© 2026 VidGo Technology · Complete e-commerce platform, maintained end to end.",
    founder: "Ioana Dinu · Founder",
  },
  cta: {
    eyebrow: "Let's talk",
    title: "We build a free demo of your store on our platform.",
    body: "With your skin, your products and your identity. Just ask, we do it.",
    bookDemo: "Request a free demo",
  },
  notFound: {
    eyebrow: "404",
    title: "This page does not exist.",
    description: "The address has moved or never existed. The pages below do.",
    links: [
      { text: "Home", href: "/en" },
      { text: "Platform", href: "/en/platform" },
      { text: "Blog", href: "/en/blog" },
    ],
  },
};
