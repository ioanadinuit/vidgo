import type { KeywordCluster } from "@/lib/seo-keywords";

/**
 * Shape of the per-language copy. One object per page plus `common` for the
 * chrome (header, footer, CTA, 404). Titles that highlight a phrase use
 * `**phrase**`; the views render that with <Highlight>.
 */

export interface TextLink {
  text: string;
  href: string;
}

/** A sentence with one inline link: `text` <link>`link`</link> `after`. */
export interface LinkedSentence {
  text: string;
  link: string;
  href: string;
  after: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface CommonContent {
  site: {
    tagline: string;
    description: string;
  };
  breadcrumbHome: string;
  nav: TextLink[];
  header: {
    homeLabel: string;
    menuLabel: string;
    bookDemo: string;
  };
  mobile: {
    open: string;
    close: string;
    bookDemo: string;
  };
  /** The language switch as shown on pages of THIS language: it points to the other one. */
  switchTo: {
    code: string;
    label: string;
  };
  footer: {
    blurb: string;
    groups: { title: string; links: TextLink[] }[];
    copyright: string;
    founder: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    body: string;
    bookDemo: string;
  };
  notFound: {
    eyebrow: string;
    title: string;
    description: string;
    links: TextLink[];
  };
}

export interface HomeContent {
  keywords: KeywordCluster[];
  badge: string;
  headline: string;
  typewriter: string[];
  intro: string;
  bookDemo: string;
  seePlatform: TextLink;
  heroAlt: string;
  stats: Stat[];
  stackTitle: string;
  stack: string[];
  positioning: {
    eyebrow: string;
    title: string;
    above: { eyebrow: string; title: string; body: string; chips: string[] };
    entry: { eyebrow: string; title: string; body: string; tag: string };
  };
  why: {
    eyebrow: string;
    title: string;
    description: string;
    speed: { title: string; p1: string; p2: string; link: string };
    doors: { title: string; items: { when: string; body: string }[]; body: string; link: TextLink };
  };
  bento: {
    eyebrow: string;
    title: string;
    description: string;
    cards: { name: string; description: string; href: string; cta: string; points: string[] }[];
  };
  measured: {
    eyebrow: string;
    title: string;
    body: string;
    items: string[];
    pagespeed: string;
    demo: string;
    scores: { score: number; label: string }[];
    caption: string;
  };
  portfolio: {
    eyebrow: string;
    title: string;
    description: string;
    items: { kind: string; name: string; body: string; facts: string[] }[];
    comingSoon: { kind: string; title: string; logoAlt: string };
    open: string;
    quote: string;
    quoteName: string;
    quoteAlt: string;
  };
  steps: {
    eyebrow: string;
    title: string;
    description: string;
    items: { n: string; title: string; body: string }[];
  };
  partners: {
    eyebrow: string;
    title: string;
    cards: { title: string; tag?: string; body: string }[];
    note: LinkedSentence;
  };
  isolation: string;
}

export interface PlatformFeature {
  /** Stable key for the icon; the same in every language. */
  key: string;
  /** Anchor id, localised. */
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  items: string[];
  note?: string;
}

export interface PlatformContent {
  meta: { title: string; description: string; keywords: KeywordCluster[] };
  schemaDescription: string;
  breadcrumb: string;
  header: { eyebrow: string; title: string; description: string };
  sectionsLabel: string;
  features: PlatformFeature[];
  tech: {
    eyebrow: string;
    title: string;
    description: string;
    cards: { title: string; body: string }[];
    note: LinkedSentence;
  };
}

export interface SecurityContent {
  meta: { title: string; description: string; keywords: KeywordCluster[] };
  breadcrumb: string;
  header: { eyebrow: string; title: string; description: string };
  incidents: {
    eyebrow: string;
    title: string;
    description: string;
    sourceLabel: string;
    items: { when: string; what: string; severity: string; body: string; href: string }[];
  };
  principles: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string }[];
  };
  honest: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
    note: LinkedSentence;
  };
}

export interface AboutContent {
  meta: { title: string; description: string };
  breadcrumb: string;
  header: { eyebrow: string; title: string; description: string };
  photoAlt: string;
  role: string;
  title: string;
  p1: string;
  p2: string;
  linkedin: string;
  stats: Stat[];
  principles: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string }[];
  };
  press: {
    /** Anchor id, localised. */
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    article: {
      outlet: string;
      kind: string;
      title: string;
      body: string;
      date: string;
      dateLabel: string;
      href: string;
      image: string;
      imageAlt: string;
      cta: string;
    };
    video: {
      outlet: string;
      kind: string;
      title: string;
      body: string;
      youtubeId: string;
      href: string;
      poster: string;
      posterAlt: string;
      play: string;
      cta: string;
    };
  };
}

export interface ContactContent {
  meta: { title: string; description: string };
  breadcrumb: string;
  header: { eyebrow: string; title: string; description: string };
  channels: { title: string; body: string; cta?: string; target: "email" | "phone" | "start" }[];
  linkedin: string;
}

export interface BlogUiContent {
  breadcrumb: string;
  readArticle: string;
  back: string;
  tocLabel: string;
  tocTitle: string;
}

export interface BlogListing {
  title: string;
  description: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  eyebrow: string;
  heading: string;
  intro: string;
  /** Pre-serialised schema.org Blog block. */
  jsonLd: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  image: string;
  eyebrow: string;
  heading: string;
  dekHtml: string;
  byline: string;
  date: string;
  dateLabel: string;
  readTime: string;
  coverAlt: string;
  cardAlt: string;
  category: string;
  cardTitle: string;
  excerpt: string;
  toc: { id: string; label: string }[];
  /** Pre-serialised schema.org blocks (BlogPosting + BreadcrumbList). */
  jsonLd: string[];
  bodyHtml: string;
}
