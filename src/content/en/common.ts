import type { CommonContent } from "@/content/types";
import { siteConfig } from "@/lib/site-config";

export const common: CommonContent = {
  site: {
    tagline: "E-commerce platform on your own server",
    description:
      "A complete online store: storefront, admin panel and backend in one application, without plugins. SEO score 100, automatic e-Factura, private VPS hosting.",
  },
  breadcrumbHome: "Home",
  nav: [
    { text: "Platform", href: "/en/platform" },
    { text: "Security", href: "/en/security" },
    { text: "Portfolio", href: "/en#portfolio" },
    { text: "Case study", href: "/en/case-study" },
    { text: "Press", href: "/en/press" },
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
    company: "VidGo Technologies is a product of E SHOP TECH SRL · Tax ID (CUI) 50709956 · Trade Register no. J2024031300009 · Str. Răsăritului 73, 400587 Cluj-Napoca, Cluj county, Romania",
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
