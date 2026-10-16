import type { HomeContent } from "@/content/types";

export const home: HomeContent = {
  keywords: ["platform", "erp", "seo", "migration"],
  badge: "E-commerce platform built and maintained in Romania",
  headline: "Your online store,",
  typewriter: ["fast.", "without plugins.", "on your own server.", "with automatic invoicing."],
  intro:
    "Speed turns the traffic you already pay for into orders. Automation takes you out of the day-to-day work. Tax compliance and GDPR come included, not as a separate project, paid for a second time.",
  bookDemo: "Request a free demo",
  seePlatform: { text: "See everything it includes", href: "/en/platform" },
  heroAlt: "The VidGo admin panel on a laptop: the order list, with the VidGo Technologies logo",
  stats: [
    { value: 100, suffix: "/100", label: "SEO score, on every store" },
    { value: 100000, suffix: "+", label: "products in the speed demo" },
    { value: 7010, suffix: "", label: "products migrated to biotu.ro" },
    { value: 0, suffix: "", label: "plugins to maintain" },
  ],
  stackTitle: "Integrations built into the platform, not bought as plugins",
  stack: [
    "Stripe",
    "e-Factura (XML UBL)",
    "Google Merchant",
    "Sign in with Google",
    "Innoship",
    "Disivo",
    "Dyver.AI",
    "Cloudflare",
    "Hetzner",
    "Scaleway",
    "PostgreSQL",
    "Redis",
  ],
  positioning: {
    eyebrow: "Where we stand",
    title: "Above the **crowded** entry level.",
    above: {
      eyebrow: "The layer above",
      title: "Shops that have outgrown their tech",
      body: "They need more than a hosted all-in-one platform can give.",
      chips: ["Own server and data", "Speed at scale", "Built-in automation"],
    },
    entry: {
      eyebrow: "Entry level",
      title: "Stores just starting out",
      body: "Solutions for launching a first online store. VidGo serves stores that have grown beyond this stage.",
      tag: "",
    },
  },
  why: {
    eyebrow: "Why not a plugin-based store",
    title: "On open-source platforms, speed and security are **separate projects**.",
    description:
      "Both are bought on top, maintained by someone and break at the next update. At VidGo they are the platform.",
    speed: {
      title: "Speed takes a whole industry",
      p1: "A 12-minute guide from Search Engine Journal explains why WooCommerce slows down once customers actually use the store, and what has to be fitted so that it does not: NGINX instead of Apache, PHP-FPM, Redis with Object Cache Pro, a system cron, layered caching. All extra, all to be maintained.",
      p2: "VidGo has nothing on that list to fix. A Java backend, Redis and server-rendered pages are the platform, not a tuning project. On a catalog of 100,000 products, the server responds in under 0.2 seconds on desktop.",
      link: "The Search Engine Journal article",
    },
    doors: {
      title: "Every plugin is a door",
      items: [
        {
          when: "January 2026 · WooCommerce Square.",
          body: "A vulnerability allowed unauthenticated access to saved payment methods and fraudulent payments. A flaw in one plugin directly affected payment security.",
        },
        {
          when: "July 2026 · PrestaShop.",
          body: "The ps_facetedsearch module allowed a complete server takeover with a single unauthenticated request. Severity: 10 out of 10.",
        },
      ],
      body: "VidGo builds essential capabilities into the platform, without separate store plugins to maintain. Stripe processes payments; card details do not pass through the store's server.",
      link: { text: "How security is designed", href: "/en/security" },
    },
  },
  bento: {
    eyebrow: "What it includes",
    title: "Everything a store needs, **already built**.",
    description:
      "A single application: storefront, admin panel and backend. No app-store rent, no fragile integrations to maintain.",
    cards: [
      {
        name: "Speed and SEO from day one",
        description:
          "Server-rendered pages, clean URLs, canonicals, sitemaps, structured data, robots.txt and llms.txt. 301 redirects from the old addresses at migration.",
        href: "/en/platform#seo",
        cta: "SEO, AEO, GEO details",
        points: ["SSR", "SEO score 100", "Automatic sitemap", "JSON-LD", "llms.txt", "301 at migration", "WebP"],
      },
      {
        name: "Invoices and tax documents",
        description:
          "Automatic invoice at the right moment for each payment method, pro-forma invoice for bank transfer, credit note on refund, e-Factura XML (Romanian e-invoicing), export for accounting.",
        href: "/en/platform#invoicing",
        cta: "How they are issued",
        points: ["e-Factura XML", "Pro-forma invoice", "Credit note", "Accounting export"],
      },
      {
        name: "Stock, variants, suppliers",
        description:
          "Stock management with threshold and reservation at order, products with variants, CSV import with smart matching, synchronisation from supplier feeds.",
        href: "/en/platform#catalog",
        cta: "Catalog and stock",
        points: ["Stock threshold", "Variants", "CSV import", "Supplier feeds"],
      },
      {
        name: "Orders, payments, delivery",
        description:
          "Stripe, bank transfer and cash on delivery in a single flow. Shipping label (AWB) generated automatically through Innoship when the order is placed. Refund engine with every effect automatic.",
        href: "/en/platform#orders",
        cta: "The order flow",
        points: ["Stripe", "Bank transfer", "Cash on delivery", "Innoship AWB", "Refunds", "Digital returns"],
      },
    ],
  },
  measured: {
    eyebrow: "Measured, not promised",
    title: "A real store, tested with the **Google** tool.",
    body: "biotu.ro, a live store with over 7,000 products, measured on mobile, the stricter test variant. Open the link and run the test yourself.",
    items: [
      "Performance 95, accessibility 95, best practices 100, SEO 100 (PageSpeed Insights, mobile, August 2026)",
      "Independent SEO audit: A on every factor the platform is responsible for",
      "Demo with 100,000 products: performance 96 on desktop, SEO 100, server response under 0.2 s (Lighthouse, 11.09.2026)",
      "New domain, no redirects, no ads: average Google position 29.9 one month after indexing, with about 2,000 products still uncrawled (Search Console, September 2026)",
    ],
    pagespeed: "Check biotu.ro on PageSpeed",
    demo: "Open the demo with 100,000 products",
    scores: [
      { score: 95, label: "Performance" },
      { score: 95, label: "Accessibility" },
      { score: 100, label: "Best practices" },
      { score: 100, label: "SEO" },
    ],
    caption: "Google PageSpeed Insights, mobile · biotu.ro · August 2026",
  },
  portfolio: {
    eyebrow: "Portfolio",
    title: "Stores running on **VidGo**.",
    description: "Open them and use them like an ordinary shopper: search, filter, add to cart.",
    items: [
      {
        kind: "Live store",
        name: "biotu.ro",
        body: "A store for organic and natural products, migrated from PrestaShop with products, orders and customers, without stopping sales.",
        facts: ["over 7,000 products", "new domain since May 2026", "SEO 100/100"],
      },
      {
        kind: "Test environment",
        name: "eshop-tech.app",
        body: "The demo store on which we test every release before it reaches customers, loaded with a catalog of 100,000 products.",
        facts: ["100,000 products", "server response under 0.2 s", "SEO 100"],
      },
    ],
    comingSoon: {
      kind: "Coming soon",
      title: "We are migrating and launching the new optimac.ro soon.",
      logoAlt: "optiMac",
    },
    open: "Open",
    quote:
      "“It is so fast that I do not have time to blink. I make hundreds of product updates in under a second. The migration was simple: the old customers were moved without noticing anything. I have a technology that lets me grow to the size of my catalog. It is like having your own platform, with real technical support behind it.”",
    quoteName: "Elena Săulescu",
    quoteAlt: "Elena Săulescu, biotu.ro",
  },
  steps: {
    eyebrow: "How you go live",
    title: "Your cloud. The store up in **5 minutes**.",
    description:
      "The application installs itself automatically on a VPS in the account of the provider you choose and starts in five minutes. Your infrastructure, your data. The migration itself has four steps.",
    items: [
      {
        n: "1",
        title: "Assess",
        body: "We look together at the current store, the catalog and the workflows. We decide what moves and what gets improved.",
      },
      {
        n: "2",
        title: "Build",
        body: "The new store gets your brand, with products, orders and customers imported. The old one keeps selling.",
      },
      {
        n: "3",
        title: "Test",
        body: "You check everything on a private link: checkout, payments, invoices, emails. Nothing goes live until it works.",
      },
      {
        n: "4",
        title: "Migrate",
        body: "We move the domain with the redirects prepared. Google rankings and customer accounts are kept.",
      },
    ],
  },
  partners: {
    eyebrow: "Integrations and partners",
    title: "What is connected and **who we work with**.",
    cards: [
      {
        title: "In the platform",
        body: "Stripe for online payments, Innoship for shipping labels (AWB) generated automatically when the order is placed, with any courier, e-Factura XML (Romanian e-invoicing) for the SPV tax portal, a Google Merchant feed generated automatically, Sign in with Google, supplier feeds.",
      },
      {
        title: "Disivo",
        tag: "Extra service: prices optimised against the competition",
        body: "Dynamic pricing for large catalogs: competitor monitoring, margin rules and AI-driven price strategy. Reseller offer for VidGo customers.",
      },
      {
        title: "Dyver.AI",
        body: "Turns supplier and catalog data from any source into correct, SEO-optimised listings, for any channel.",
      },
      {
        title: "Cyber Micro Services",
        tag: "Extra service: mobile app publishing",
        body: "Mobile app publishing: the VidGo store also reaches customers as an app on their phone.",
      },
    ],
    note: {
      text: "Agency or developer? You bring the client, VidGo delivers the platform, and you earn a recurring percentage of the subscription of every store you bring.",
      link: "Let's talk",
      href: "/en/contact",
      after: ".",
    },
  },
  isolation:
    "Each store runs isolated, on its own server, with tokens encrypted at rest, with automatic certificates and backups. An incident at one store does not reach another.",
};
