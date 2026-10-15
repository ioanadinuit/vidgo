// English translations of the four Romanian articles in ../ro/blog-posts.ts.
// Same structure, ids, callouts, sources and CTA; only the language differs.
// bodyHtml / dekHtml are trusted, hand-written HTML rendered with dangerouslySetInnerHTML.

import type { BlogListing, BlogPost } from "@/content/types";
import { siteConfig } from "@/lib/site-config";

const BASE = siteConfig.url;

const publisher = {
  "@type": "Organization",
  name: "VidGo Technologies",
  url: `${BASE}/`,
};

const author = {
  "@type": "Person",
  name: "Ioana Dinu",
  url: `${BASE}/en/about`,
};

function posting(post: {
  slug: string;
  headline: string;
  description: string;
  image: string;
  date: string;
  keywords: string[];
}): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.headline,
    description: post.description,
    image: `${BASE}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en",
    mainEntityOfPage: `${BASE}/en/blog/${post.slug}`,
    author,
    publisher,
    keywords: post.keywords,
  });
}

function breadcrumb(slug: string, name: string): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/en` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/en/blog` },
      { "@type": "ListItem", position: 3, name, item: `${BASE}/en/blog/${slug}` },
    ],
  });
}

export const blogListing: BlogListing = {
  title: "E-commerce, performance and AI blog | VidGo Technologies",
  description:
    "Clear explanations of online store speed, theme structure, indexing, AI crawlers, Google Merchant Center and the automations included in the VidGo platform.",
  robots: "index,follow,max-image-preview:large",
  ogTitle: "E-commerce, performance and AI blog | VidGo Technologies",
  ogDescription:
    "Practical guides on how an online store becomes faster, easier to find and easier to understand — by people and by robots.",
  eyebrow: "VidGo Knowledge",
  heading: "E-commerce explained without jargon.",
  intro:
    "The tools that make a store visible, fast and easy to manage — explained through their concrete effect on the business.",
  jsonLd: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "VidGo Technologies Blog",
    url: `${BASE}/en/blog`,
    inLanguage: "en",
    publisher,
    blogPost: [
      {
        "@type": "BlogPosting",
        headline: "Speed is not a score. It is the orders you never see.",
        url: `${BASE}/en/blog/online-store-speed`,
        datePublished: "2026-08-24",
      },
      {
        "@type": "BlogPosting",
        headline: "Indexing is no longer about links. What actually changed.",
        url: `${BASE}/en/blog/how-indexing-changed`,
        datePublished: "2026-08-24",
      },
      {
        "@type": "BlogPosting",
        headline: "The theme you chose is the most expensive technical decision in your store",
        url: `${BASE}/en/blog/store-theme-structure`,
        datePublished: "2026-08-24",
      },
      {
        "@type": "BlogPosting",
        headline: "How an online store becomes visible in Google and in AI answers",
        url: `${BASE}/en/blog/google-ai-visibility`,
        datePublished: "2026-08-12",
      },
    ],
  }),
};

export const blogPosts: BlogPost[] = [
  {
    slug: "online-store-speed",
    title: "Online store speed: what Google measures and what it costs you | VidGo",
    description:
      "What LCP, INP and CLS mean for an online store, why “it works fine on my phone” is misleading, where the seconds go and what it costs in orders.",
    author: "Ioana Dinu",
    robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    ogTitle: "Speed is not a score. It is the orders you never see.",
    ogDescription:
      "What the Google test actually measures, why the impression from your own phone is misleading and where the seconds go in an online store.",
    twitterTitle: "Speed is not a score. It is the orders you never see.",
    image: "/assets/blog-viteza-magazin-online.png",
    eyebrow: "Performance",
    heading: "Speed is not a score. It is the orders you never see.",
    dekHtml:
      "A slow store shows no error. The customer does not call to complain. They simply leave, and the sales report only shows a number smaller than last month's — with no explanation attached.",
    byline: "By Ioana Dinu",
    date: "2026-08-24",
    dateLabel: "24 August 2026",
    readTime: "9 minutes",
    coverAlt: "The three Core Web Vitals measurements and their effect on an online store",
    cardAlt: "Core Web Vitals thresholds for an online store",
    category: "Performance",
    cardTitle: "Speed is not a score. It is the orders you never see.",
    excerpt:
      "What the Google test actually measures, why “it works fine on my phone” is misleading, where the seconds go in a store and what each of them costs, in money.",
    toc: [
      { id: "ce-masoara", label: "What the test measures" },
      { id: "de-ce-difera", label: "Why it differs from your impression" },
      { id: "unde-se-duc", label: "Where the seconds go" },
      { id: "cat-costa", label: "What it costs in money" },
      { id: "ce-se-poate", label: "What can be fixed and what cannot" },
      { id: "vidgo", label: "The VidGo approach" },
    ],
    jsonLd: [
      posting({
        slug: "online-store-speed",
        headline: "Speed is not a score. It is the orders you never see.",
        description:
          "What LCP, INP and CLS mean for an online store, why the impression from your own phone is misleading and where the seconds go.",
        image: "/assets/blog-viteza-magazin-online.png",
        date: "2026-08-24",
        keywords: ["site speed", "Core Web Vitals", "LCP", "INP", "CLS", "PageSpeed", "ecommerce performance"],
      }),
      breadcrumb("online-store-speed", "Online store speed"),
    ],
    bodyHtml: `<p>The most common reaction when I show someone the score of their own store is: “but it works fine for me”. The reaction is honest and, in its own way, correct — on the owner's phone, on the office wi-fi, with the site already in the browser's memory, it really does work fine. The problem is that the visitor who lands on the page for the first time has none of those three advantages.</p>
<div class="callout"><strong>The central idea:</strong> speed is not measured in impressions, but in three numbers that Google publishes for free for any site in the world. The numbers do not say how beautiful the store is. They say how long it takes until the customer can buy.</div>

<h2 id="ce-masoara">1. What the test actually measures, in store language</h2>
<p>Google uses three main indicators, known as Core Web Vitals. Each describes a concrete moment in the shopper's experience.</p>
<div class="stack">
<div class="stack-item"><strong>LCP — how long until the page is visible.</strong> The moment the main element appears: the product photo or the banner. Google's recommended threshold is 2.5 seconds. Above 4 seconds it falls into the “poor” category. I have come across active Romanian stores, with real sales, at 10, 15 and even 24 seconds.</div>
<div class="stack-item"><strong>INP — how long until the page responds to a tap.</strong> The customer taps “add to cart” and the page stays inert for a fraction of a second. Under 200 milliseconds is good. Above 500 it becomes visible as a “site that freezes”. The indicator replaced the old FID in 2024, precisely because it measures real interaction, not just the first tap.</div>
<div class="stack-item"><strong>CLS — how much the content jumps while loading.</strong> The customer taps a product, meanwhile a banner loads above it, and the finger lands on something else. The threshold is 0.1. Above 0.25 means a page that rearranges itself under the customer's finger.</div>
</div>
<p>There are also useful secondary indicators: TBT, the total time during which the page does not respond at all, and TTFB, the time until the server sends the first byte. The second shows whether the brake is in the server or in the page — a distinction that completely changes what needs fixing.</p>

<h2 id="de-ce-difera">2. Why the score differs from your impression</h2>
<h3>The test runs on an average phone, not on yours</h3>
<p>Lighthouse simulates a mid-range phone on a normal mobile connection, with the processor deliberately slowed down four times. It is not Google being unkind: it is the real average of the market. A recent iPhone on wi-fi hides problems that a 900-lei phone on 4G at the edge of town shows immediately.</p>
<h3>You have the site cached, the new customer does not</h3>
<p>On the second visit, the browser already has the fonts, images and code saved locally. A store owner is, by definition, always on the second visit. The shopper coming from an ad or a search is always on the first.</p>
<h3>There are two kinds of data, and both matter</h3>
<p>The lab test runs once, under controlled conditions, and is useful as a diagnosis. Field data comes from the real visits of Chrome users over the last 28 days and shows what actually happens to people. When the two do not match, the field data is right.</p>
<div class="callout"><strong>Check for yourself, in ten seconds:</strong> go to <a href="https://pagespeed.web.dev/" rel="noopener">pagespeed.web.dev</a>, enter the store's address and press Analyze. The test is public, free and made by Google, not by a vendor trying to sell you something.</div>

<h2 id="unde-se-duc">3. Where the seconds go</h2>
<p>When I take a slow store apart, the time is almost always lost in the same four places, in order of severity.</p>
<ol>
<li><strong>The theme.</strong> Universal themes are built to work for any type of store: jewellery, car parts, furniture, pharmacy. To cover every case, they load all the code for every case, on every page. A store uses perhaps 15% of what its theme delivers.</li>
<li><strong>The plugins.</strong> Each module adds its own CSS and JavaScript, usually on every page, not just where it is used. A store with 30 plugins can end up at 400–900 KB of unused code downloaded on every visit.</li>
<li><strong>The images.</strong> Photos of 2–4 MB, served at their original size and resized from CSS. The phone downloads everything, then shrinks it. Modern formats and the right sizes usually reduce the page weight by 60–80%, with no visible loss of quality.</li>
<li><strong>External scripts.</strong> Chat, maps, tracking pixels, reviews hosted elsewhere, fonts from another domain. Each is a new connection to a server you do not control and whose speed you cannot fix.</li>
</ol>
<p>None of the four is the merchant's fault. They are the natural consequence of a store built by addition: a theme bought, modules added along the way, each solving a real problem at the time.</p>

<h2 id="cat-costa">4. What it costs, in money</h2>
<p>The link between speed and sales has been documented for years, and Google publishes retail case studies with concrete figures. The usual order of magnitude: every extra second of loading cuts a few percent off conversion, and above three seconds a significant share of mobile visitors abandon before seeing anything.</p>
<p>The effect is double, and the second part is harder to see:</p>
<ul>
<li><strong>Direct:</strong> customers who leave before reaching the product. They do not appear in the statistics as a refusal, they appear as traffic that “did not convert”.</li>
<li><strong>Indirect:</strong> the advertising budget pays for every click the same, whether the page loads in 2 or in 12 seconds. A slow site turns part of the investment in promotion into clicks that go nowhere.</li>
</ul>
<p>Speed also matters for search rankings. Google confirms that page experience is a ranking factor — a factor, not the main factor. Relevant content remains more important. But between two stores selling the same product, with comparable content, the fast one starts with an advantage.</p>

<h2 id="ce-se-poate">5. What can be fixed and what cannot</h2>
<p>Some of the problems are solved without changing anything fundamental: compressing images, deferring the loading of what is not on the first screen, removing unused modules, moving fonts to your own server. These are real gains and worth making.</p>
<p>What optimisation does not fix is the architecture. If the platform builds every page from scratch on every visit, if the theme delivers code for cases that do not concern you, if ten modules load because a single one needs them — the ceiling is set by construction. You can climb from 25 to 45. From 25 to 90, no.</p>
<div class="callout"><strong>The test that settles it:</strong> compare the mobile score with the desktop score. If desktop is good and mobile is poor, the problem is weight and it can be optimised. If both are poor, the brake does not come from the visitor's device but from the structure of the page — and there optimisation has limits.</div>

<h2 id="vidgo">How VidGo approaches the problem</h2>
<p>The platform I am building starts from the opposite premise: performance is not added at the end, it is decided at the beginning. Catalog pages are rendered on the server, so the visitor and the crawler receive ready-built HTML, not an empty page that fills in afterwards. There is no plugin layer: the features a store needs — digital returns, e-Factura (Romanian e-invoicing), stock synchronisation, search — are part of the platform and do not each bring their own baggage of code.</p>
<p>Under the hood run technologies used by Fortune 500 companies: Java 21, PostgreSQL 17 and caching on product loading. Not because it sounds impressive, but because a store with twenty thousand products and seasonal traffic needs the same foundations as a large application, only at a different scale.</p>

<section class="sources"><h2>Sources and further reading</h2><ul><li><a href="https://web.dev/articles/vitals" rel="noopener">web.dev: Core Web Vitals — LCP, INP, CLS</a></li><li><a href="https://pagespeed.web.dev/" rel="noopener">Google PageSpeed Insights — the public test</a></li><li><a href="https://developers.google.com/search/docs/appearance/page-experience" rel="noopener">Google Search Central: page experience in ranking</a></li><li><a href="https://web.dev/case-studies" rel="noopener">web.dev: case studies on speed and conversion</a></li></ul></section>
<section class="article-cta"><h2>Want to see your store's numbers?</h2><p>I run the public test together with you, show you where the seconds are lost and what can be fixed without changing the platform — and what cannot.</p><a href="/en/contact">Book a call</a></section>`,
  },
  {
    slug: "how-indexing-changed",
    title: "Indexing is no longer about links: what changed | VidGo",
    description:
      "From links and keywords to crawl budget, structured data and AI crawlers that do not execute JavaScript. What has changed in how a store gets found.",
    author: "Ioana Dinu",
    robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    ogTitle: "Indexing is no longer about links. What actually changed.",
    ogDescription:
      "Your site has new readers, which do not execute JavaScript and do not click on anything. What that means for an online store.",
    twitterTitle: "Indexing is no longer about links. What actually changed.",
    image: "/assets/blog-cum-s-a-schimbat-indexarea.png",
    eyebrow: "Indexing & AI crawlers",
    heading: "Indexing is no longer about links. What actually changed.",
    dekHtml:
      "For fifteen years the recipe was the same: keywords in the title, links from other sites, traffic. The recipe still helps, but it has stopped being enough — because who reads the site has changed, and so has how it decides what deserves to be shown.",
    byline: "By Ioana Dinu",
    date: "2026-08-24",
    dateLabel: "24 August 2026",
    readTime: "11 minutes",
    coverAlt:
      "The difference between classic link-based indexing and the way modern crawlers and AI systems read an online store",
    cardAlt: "The difference between classic indexing and the way modern crawlers read the site",
    category: "Indexing & AI",
    cardTitle: "Indexing is no longer about links. What actually changed.",
    excerpt:
      "Crawl budget, product understanding and a new category of visitor: AI crawlers, which do not execute JavaScript and do not click on anything. What it means concretely for a store.",
    toc: [
      { id: "atunci", label: "How it used to work" },
      { id: "buget", label: "Crawl budget" },
      { id: "intelegere", label: "Product understanding" },
      { id: "cititori-noi", label: "AI crawlers" },
      { id: "verificare", label: "Check for yourself" },
      { id: "ce-inseamna", label: "What it means for you" },
      { id: "vidgo", label: "The VidGo approach" },
    ],
    jsonLd: [
      posting({
        slug: "how-indexing-changed",
        headline: "Indexing is no longer about links. What actually changed.",
        description:
          "Crawl budget, structured data, server-side rendering and AI crawlers that do not execute JavaScript — what has changed in how an online store gets discovered.",
        image: "/assets/blog-cum-s-a-schimbat-indexarea.png",
        date: "2026-08-24",
        keywords: ["indexing", "crawl budget", "GPTBot", "AI crawlers", "server-side rendering", "SSR", "structured data"],
      }),
      breadcrumb("how-indexing-changed", "How indexing changed"),
    ],
    bodyHtml: `<p>A store can have ten thousand products in its catalog and three hundred in Google. The situation is not rare and almost never has anything to do with links. It has to do with what happens between the moment a robot requests the page and the moment it decides whether it is worth keeping.</p>
<div class="callout"><strong>The central idea:</strong> discovery has become a problem of <strong>readability</strong>, not of popularity. A site that robots read easily, understand without ambiguity and can crawl economically has a structural advantage over one that puts obstacles in their way — no matter how many links it has.</div>

<h2 id="atunci">1. How it used to work</h2>
<p>The classic model was simple to explain: the search engine discovered pages by following links, matched the words on the page with the words in the search and used the links received from other sites as a vote of confidence. The more votes, the higher. That is where the whole “link building” industry came from.</p>
<p>The model has not disappeared. Links still matter, and relevant content remains the most important thing. But between discovery and ranking, new layers have been added, and that is where most stores lose.</p>

<h2 id="buget">2. Crawl budget: a robot does not have unlimited time for you</h2>
<p>Google does not crawl a site endlessly. It allocates each domain a volume of requests, proportional to how fast the server responds and how much value it has found there in the past. Google calls the combination crawl budget.</p>
<p>The practical consequence is unpleasant for large stores:</p>
<ul>
<li>every slow page consumes more of the budget than a fast one;</li>
<li>every worthless filter page — colour plus size plus price, in every combination — consumes budget that never reaches the products;</li>
<li>every empty category sent in the sitemap asks the robot to come for nothing;</li>
<li>every duplicate, every address that responds both with www and without, doubles the work.</li>
</ul>
<p>A store with eight thousand products and forty thousand addresses generated from filters spends its budget on combinations nobody searches for, while new products wait weeks to be discovered. The fix is not more content, it is less noise.</p>

<h2 id="intelegere">3. From word matching to understanding the product</h2>
<p>Engines no longer look only for strings of characters. They try to identify which entity is involved: which product, which brand, which category, what price, whether it is in stock. The difference matters for a merchant, because it changes what is worth writing on the page.</p>
<p>For a person, a product page is obvious: photo, title, price, button. For a machine, the same information has to be declared explicitly, through structured data. A page without it forces the robot to guess from the text which figure is the price and whether the product is available. Sometimes it guesses right. Often it does not bother.</p>
<div class="callout"><strong>A quick test on your own store:</strong> search Google for <code>site:yourstore.com</code>. The number of results shown is approximate, but if it is an order of magnitude below the number of products in the catalog, the problem is discovery and readability, not promotion.</div>

<h2 id="cititori-noi">4. The site has new readers, which do not click on anything</h2>
<p>In the last two years a completely new category of visitor has appeared: the crawlers of AI systems. GPTBot for ChatGPT, Google-Extended for Gemini, ClaudeBot and others crawl public sites in order to answer people's questions.</p>
<p>They do not behave like a shopper, nor like Googlebot:</p>
<div class="stack">
<div class="stack-item"><strong>They do not execute JavaScript.</strong> The most important thing in this whole article. Googlebot renders JavaScript, with delay and cost, but it does. Most AI crawlers do not. What is not in the HTML sent by the server does not exist for them.</div>
<div class="stack-item"><strong>They do not click and do not scroll.</strong> Products that appear only after “load more” or after a filter applied from the interface are invisible.</div>
<div class="stack-item"><strong>They read once and remember.</strong> A wrong description or an old price can remain in the answers given to others long after you have corrected them on the site.</div>
<div class="stack-item"><strong>They can be blocked, but it is rarely a good idea.</strong> A store that forbids AI crawlers in <code>robots.txt</code> disappears from the answers in which it could have been recommended. I have found sites that do exactly this without knowing, from an inherited setting.</div>
</div>
<p>This is where the discussion about rendering becomes concrete. A store that builds its pages in the visitor's browser sends the robot an almost empty page. A server-rendered store sends complete HTML, with products, prices and links, ready to read — for Google, for AI systems and for the visitor with a weak phone alike.</p>

<h2 id="verificare">5. How to check for yourself what the robots see</h2>
<p>You do not need paid tools. Three checks say almost everything:</p>
<ol>
<li><strong>The page source.</strong> Open a category page, press Ctrl+U and search for the name of a product. If it does not appear in the source, although it is visible on screen, the product is built from JavaScript and some robots do not see it.</li>
<li><strong><code>yourstore.com/robots.txt</code>.</strong> It can be read directly in the browser. Check that you are not blocking useful areas by mistake and that the sitemap is declared there.</li>
<li><strong><code>yourstore.com/sitemap.xml</code>.</strong> Count what is inside. If products are missing or, conversely, empty categories are listed, the robot is being handed a wrong map.</li>
</ol>
<p>There is also a new convention, <code>llms.txt</code>, through which a site offers AI systems a structured summary of its content. It is not a universal standard and not a ranking factor confirmed by anyone — it deserves to be treated as a form of clarity, not as a shortcut.</p>

<h2 id="ce-inseamna">6. What it means for a merchant</h2>
<p>The practical conclusion is not that classic SEO is dead. It is that it has become the second step. The first step is for the site to be readable: complete HTML from the server, clear structure, data declared explicitly, no pages that waste the robot's budget.</p>
<p>The unfair part is that none of the above depends on the merchant. It depends on the platform. A store built on a theme that renders everything in the browser and on a layer of modules that generate thousands of useless addresses starts with a handicap, however good the products and however much is invested in promotion.</p>

<h2 id="vidgo">What VidGo does about it</h2>
<ul>
<li>catalog pages rendered on the server, so complete HTML for any reader;</li>
<li><code>robots.txt</code>, XML sitemap and <code>llms.txt</code> generated and maintained automatically, not written once by hand;</li>
<li>structured data for products, offers and the store's architecture;</li>
<li>explicit rules for AI crawlers, so that decisions are taken deliberately, not inherited;</li>
<li>no plugin layer generating phantom addresses.</li>
</ul>
<p>None of this guarantees rankings in Google or mentions in an AI answer. Nothing guarantees that. What it does is remove the obstacles and give the systems that decide correct data about what you sell.</p>

<section class="sources"><h2>Sources and further reading</h2><ul><li><a href="https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget" rel="noopener">Google Search Central: managing crawl budget</a></li><li><a href="https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics" rel="noopener">Google: JavaScript and indexing</a></li><li><a href="https://platform.openai.com/docs/bots" rel="noopener">OpenAI: GPTBot and its crawlers</a></li><li><a href="https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers" rel="noopener">Google: the list of crawlers, including Google-Extended</a></li></ul></section>
<section class="article-cta"><h2>Want to know what the robots see on your store?</h2><p>I check the page source, the sitemap and the crawler rules together with you — and show you what is missing from what should be readable.</p><a href="/en/contact">Book a call</a></section>`,
  },
  {
    slug: "store-theme-structure",
    title: "The store theme: the most expensive technical decision | VidGo",
    description:
      "Why the theme decides how fast, how secure and how easy to maintain an online store is — and why later optimisations have a ceiling.",
    author: "Ioana Dinu",
    robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    ogTitle: "The theme you chose is the most expensive technical decision in your store",
    ogDescription:
      "The theme is not just the look. It decides the speed, what robots see, what breaks at update time and what any later change costs you.",
    twitterTitle: "The theme you chose is the most expensive technical decision in your store",
    image: "/assets/blog-structura-temei-magazin.png",
    eyebrow: "Architecture & design",
    heading: "The theme you chose is the most expensive technical decision in your store",
    dekHtml:
      "It is bought in ten minutes, usually on the strength of a screenshot, and costs between 50 and 100 dollars. After which it sets, for the next few years, how fast the store loads, what robots see and what any change costs.",
    byline: "By Ioana Dinu",
    date: "2026-08-24",
    dateLabel: "24 August 2026",
    readTime: "10 minutes",
    coverAlt: "Comparison between a universal theme loaded with modules and a storefront built on a single base",
    cardAlt: "A universal theme loaded with modules, compared with a single technical base",
    category: "Architecture",
    cardTitle: "The theme you chose is the most expensive technical decision in your store",
    excerpt:
      "It is bought in ten minutes and decides, for years, how fast the store loads, what robots see and what breaks at every update. Why later optimisations have a ceiling.",
    toc: [
      { id: "universale", label: "Universal themes" },
      { id: "pluginuri", label: "The module layer" },
      { id: "ruleta", label: "Update roulette" },
      { id: "roboti", label: "What the robot sees" },
      { id: "alta-abordare", label: "Design as a setting" },
      { id: "ce-faci", label: "What to do now" },
      { id: "vidgo", label: "How VidGo is built" },
    ],
    jsonLd: [
      posting({
        slug: "store-theme-structure",
        headline: "The theme you chose is the most expensive technical decision in your store",
        description:
          "Why the structure of the theme decides speed, readability for robots and the cost of any later change in an online store.",
        image: "/assets/blog-structura-temei-magazin.png",
        date: "2026-08-24",
        keywords: ["store theme", "skin", "WooCommerce", "PrestaShop", "performance", "plugins", "storefront design"],
      }),
      breadcrumb("store-theme-structure", "Theme structure"),
    ],
    bodyHtml: `<p>When someone tells me they have a slow site, the first question is not what hosting they have. It is what theme they use. In almost every case I have measured, that is where most of the problem is decided — not in the server, not in the number of products, not in the seasonal traffic.</p>
<div class="callout"><strong>The central idea:</strong> the theme is not the layer of appearance laid over the store. It is the skeleton that decides what code is downloaded, in what order the page is built and what ends up being read by a robot. Colours and fonts are the last layer, not the first.</div>

<h2 id="universale">1. The problem with universal themes</h2>
<p>A theme sold on an online marketplace has to fit anyone: jewellery, car parts, pharmacy, furniture, food. To be sold ten thousand times, it brings along every possible variant — twenty types of product page, fifteen headers, sliders, galleries, countdowns, animations.</p>
<p>The code for every variant is delivered on every page, even if the store uses a single variant. I have seen stores that download between 400 and 900 kilobytes of unused JavaScript on every visit. On a mid-range phone, that code is not just downloaded: it also has to be interpreted, and while it is being interpreted the page does not respond to touch.</p>
<p>This is not a criticism of theme authors. A product that has to work for everyone is obliged to contain everything. The compromise is visible only when you measure it.</p>

<h2 id="pluginuri">2. The module layer, added on top</h2>
<p>On top of the theme comes what is missing: reviews, advanced filters, chat, newsletter popup, courier integration, loyalty programme, cookie banner. Each solves a real problem at the time of installation. Each brings its own CSS and its own JavaScript, as a rule on every page, not just where it is used.</p>
<div class="stack">
<div class="stack-item"><strong>They add up linearly, they are felt exponentially.</strong> Twenty modules mean twenty style files and twenty scripts, which often load the same library in different versions.</div>
<div class="stack-item"><strong>They generate addresses you do not want.</strong> Combined filters produce thousands of addresses with no commercial value, which consume the crawl budget instead of the products.</div>
<div class="stack-item"><strong>Each one is an attack surface.</strong> An unmaintained module, on an old version, is the most common way into a store. Sites that publicly announce their plugin versions in the page code do the attacker's work automatically.</div>
<div class="stack-item"><strong>They block the update.</strong> When the platform releases a new version, a single incompatible module is enough to postpone the update. That is how stores end up running for years on old versions, for short-term safety reasons that become long-term risk.</div>
</div>

<h2 id="ruleta">3. Update roulette</h2>
<p>The situation merchants describe most often is not “the site is slow”. It is “I do not want to touch anything anymore, because last time it broke”. The fear is justified: in a store built from a theme plus twenty modules from twenty different authors, nobody can guarantee that the update will not break something.</p>
<p>The real cost is not the hour of repair. It is that the store freezes. No more features are added, the design is no longer changed, nothing is updated anymore — and the distance to the competition grows quietly, month after month.</p>

<h2 id="roboti">4. What the robot sees also depends on the theme</h2>
<p>Modern themes often build the page in the visitor's browser: the server sends an empty skeleton, and JavaScript fills it with products. For a person with a good phone, the difference is one second. For a robot, it can be the difference between seeing the whole catalog and seeing nothing.</p>
<p>Googlebot renders JavaScript, with delay. The crawlers of AI systems — GPTBot for ChatGPT, Google-Extended for Gemini — generally do not. What is not in the HTML sent by the server does not exist for them.</p>
<div class="callout"><strong>A thirty-second check:</strong> open a category page, press <code>Ctrl+U</code> and search the source for the name of a product displayed on screen. If you cannot find it, the theme builds the catalog in the browser, and some robots do not read it.</div>

<h2 id="alta-abordare">5. The other approach: design as a setting, not as a foundation</h2>
<p>There is also the opposite model, used by large stores that cannot afford the compromise: a single technical base, the same for everyone, over which the appearance changes through configuration.</p>
<p>In practice, the theme becomes a set of decisions — palette, typography, rhythm, card shape, density — applied over a store that is already fast, already readable, already secured. Not a separate package of code, with its own bugs and its own update cycle.</p>
<div class="stack">
<div class="stack-item"><strong>The appearance changes without touching the engine.</strong> A store can look completely different without the speed or the structure changing.</div>
<div class="stack-item"><strong>One update, for everyone.</strong> A performance improvement or a security fix reaches everywhere at once, not module by module.</div>
<div class="stack-item"><strong>There is no unused code “for other cases”.</strong> What the store in question uses is what gets delivered.</div>
<div class="stack-item"><strong>Customisation is no longer blocked by the vendor.</strong> With AI tools, the theme document can be adjusted directly, without depending on someone's availability.</div>
</div>

<h2 id="ce-faci">6. What to do if you are already on a heavy theme</h2>
<p>Not everything I have described requires changing the platform. Three things are worth trying first, in order:</p>
<ol>
<li><strong>Take stock of the modules.</strong> Remove what has not been used in the last six months. It is the cheapest repair and usually the most visible.</li>
<li><strong>Fix the images.</strong> The right sizes, modern formats, deferred loading for what is below the first screen. 30–40 points on mobile are often gained.</li>
<li><strong>Measure again.</strong> If after the clean-up the mobile score is still under 40, the ceiling is in the architecture and optimisation will not raise it any further.</li>
</ol>
<p>The third point is the one that settles the discussion. A heavy theme can be adjusted, it cannot be redesigned. At some point, the money spent on successive optimisations exceeds the cost of a build done properly from the start.</p>

<h2 id="vidgo">How VidGo is built</h2>
<p>A single base for all stores, rendered on the server, with the commerce features included in the platform — no layer of modules each bringing its own code. On top of the base, skins are applied: design presets, not separate projects. A store can look editorial, minimalist or classic without anything in the engine being different.</p>
<p>Under the hood run Java 21, PostgreSQL 17 and caching on product loading — the same foundations used by Fortune 500 companies. Performance and security updates come automatically, for everyone, and do not depend on the compatibility of a third-party module.</p>

<section class="sources"><h2>Sources and further reading</h2><ul><li><a href="https://web.dev/articles/vitals" rel="noopener">web.dev: Core Web Vitals</a></li><li><a href="https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics" rel="noopener">Google: JavaScript and indexing</a></li><li><a href="https://securityheaders.com/" rel="noopener">securityheaders.com — the public check of security headers</a></li><li><a href="https://pagespeed.web.dev/" rel="noopener">Google PageSpeed Insights</a></li></ul></section>
<section class="article-cta"><h2>Want to know where your theme's ceiling is?</h2><p>We measure together, I separate what can be fixed through optimisation from what is down to the architecture, and I tell you honestly whether a rebuild is worth it or not.</p><a href="/en/contact">Book a call</a></section>`,
  },
  {
    slug: "google-ai-visibility",
    title: "Google and AI visibility for online stores | VidGo",
    description:
      "How robots.txt, sitemap, llms.txt, Google Merchant Center, structured data, AI-assisted SEO evaluations and smart autocomplete help an online store.",
    author: "Ioana Dinu",
    robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    ogTitle: "How an online store becomes visible in Google and in AI answers",
    ogDescription:
      "A clear guide to the invisible infrastructure that helps products get discovered, understood and recommended.",
    twitterTitle: "Google and AI visibility for online stores",
    image: "/assets/blog-vizibilitate-google-ai.png",
    eyebrow: "SEO & AI for e-commerce",
    heading: "How an online store becomes visible in Google and in AI answers",
    dekHtml:
      "A store is not promoted just because it exists online. For products to be discovered, search engines and AI systems must first be able to get in, then understand the offer correctly and, finally, find a relevant answer to the shopper's intent.",
    byline: "By Ioana Dinu",
    date: "2026-08-12",
    dateLabel: "12 August 2026",
    readTime: "10 minutes",
    coverAlt: "The flow through which a store's products reach search engines and AI systems",
    cardAlt: "Products connected to search engines and AI systems",
    category: "SEO & AI",
    cardTitle: "How an online store becomes visible in Google and in AI answers",
    excerpt:
      "From robots.txt and the sitemap to Merchant Center, structured data, AI-assisted SEO evaluations and smart search: what each one does and why the mere existence of a site is not enough.",
    toc: [
      { id: "acces", label: "Access and crawlers" },
      { id: "intelegere", label: "Structured data & Merchant" },
      { id: "relevanta", label: "AI-assisted SEO evaluations" },
      { id: "cautare", label: "AI search" },
      { id: "sistem", label: "The complete system" },
      { id: "vidgo", label: "What VidGo includes" },
    ],
    jsonLd: [
      posting({
        slug: "google-ai-visibility",
        headline: "How an online store becomes visible in Google and in AI answers",
        description:
          "A guide to robots.txt, sitemap, llms.txt, Merchant Center, structured data and AI tools for e-commerce.",
        image: "/assets/blog-vizibilitate-google-ai.png",
        date: "2026-08-12",
        keywords: ["ecommerce SEO", "AI search", "Google Merchant Center", "robots.txt", "sitemap", "llms.txt", "AI-assisted search"],
      }),
      breadcrumb("google-ai-visibility", "Google and AI visibility"),
    ],
    bodyHtml: `<p>There are large stores, with serious budgets, that still treat SEO as a list of keywords. They have good products and paid traffic, but elementary technical pieces are missing: an up-to-date sitemap, complete structured data, synchronisation with Merchant Center or clear control over crawlers. The result is a gap between what a person sees on the site and what automated systems can understand.</p>
<div class="callout"><strong>The central idea:</strong> modern visibility has three levels: <strong>access</strong>, <strong>understanding</strong> and <strong>relevance</strong>. No file guarantees rankings in Google or mentions in an AI answer, but a complete infrastructure removes the obstacles and gives better data to the systems that decide what gets shown.</div>

<h2 id="acces">1. Access: robots.txt, sitemap and crawler control</h2>
<h3>robots.txt is the doorman, not the sales agent</h3>
<p>The <code>robots.txt</code> file tells crawlers which areas they may access and where the sitemap is. It is useful for avoiding wasted crawling on technical pages, worthless filters or private areas. It is not, however, a promotion method, nor a guarantee of indexing. Google even distinguishes between crawling and indexing: an address blocked from crawling can, under certain conditions, appear as a URL without Google having read its content.</p>
<h3>The sitemap is the public inventory of the important content</h3>
<p>A good XML sitemap lists the canonical pages worth discovering: products, categories and articles. For a store with thousands of products, it shortens the path between a change and its discovery by the search engine. It must be generated automatically, updated when the catalog changes and declared in <code>robots.txt</code> and Search Console.</p>
<h3>llms.txt: a useful summary, not a magic shortcut</h3>
<p><code>llms.txt</code> gives AI systems a structured summary of the site and links to the important resources. It is an emerging convention, not a universal standard and not a confirmed ranking factor. Its value is clarity: it describes concisely what the store offers and where the canonical information is. In VidGo it is generated as part of the AI access layer, together with explicit rules for crawlers.</p>

<h2 id="intelegere">2. Understanding: structured data and Google Merchant Center</h2>
<p>A page looks obvious to a person: title, photo, price and buy button. For a machine, those have to be expressed without ambiguity. Structured data of the <code>Product</code>, <code>Offer</code> and <code>BreadcrumbList</code> types and the commercial policies turn the page into a machine-readable description.</p>
<div class="stack">
<div class="stack-item"><strong>Product:</strong> name, brand, identifiers, images and description.</div>
<div class="stack-item"><strong>Offer:</strong> price, currency, availability, condition and canonical URL.</div>
<div class="stack-item"><strong>Merchant Center:</strong> feed synchronised with the real inventory, price and stock.</div>
<div class="stack-item"><strong>Breadcrumbs:</strong> the product's place in the store's architecture.</div>
</div>
<p>Google explains that structured data can be used by Merchant Center for automatic updates and for building feeds through crawling. It reduces the risk of the price or availability in the feed not matching the page. The feed remains important: eligible products can appear for free in Search, Images, Lens, YouTube, Shopping and Gemini, without the display being guaranteed.</p>

<h2 id="relevanta">3. Relevance: AI-assisted SEO evaluations</h2>
<p>A classic audit finds technical errors: missing title, incorrect canonical, image without alternative text, slow page. AI can add a second layer: it evaluates whether the description answers the shopper's intent, whether the information is specific enough and whether similar pages cannibalise each other.</p>
<p>In the VidGo platform, the AI evaluation can flag:</p>
<ul><li>titles and descriptions that are too generic or duplicated;</li><li>missing benefits, specifications or frequently asked questions;</li><li>terms that shoppers use but which do not appear naturally in the content;</li><li>weak metadata and texts that do not differentiate the product;</li><li>mismatches between the feed, the structured data and the visible page.</li></ul>
<p>Important: the AI must not automatically publish unverified texts. It is an evaluator and an accelerator. The product data remains the source of truth, and the final content must be correct, useful and faithful to the offer.</p>

<h2 id="cautare">4. AI search and autocomplete: the customer finds what they want, even without the perfect term</h2>
<p>Traditional autocomplete completes letters. AI-assisted search can interpret intent. “Blue shoes for running on asphalt” is no longer just a string of words; it becomes a combination of category, colour, use and context.</p>
<p>For the merchant, the direct effect is inside the store:</p>
<ul><li>fewer searches with no results;</li><li>suggestions that tolerate typos and synonyms;</li><li>relevant products found faster;</li><li>new data about what people look for and what they do not find.</li></ul>
<p>This feature does not automatically raise the ranking in Google. It improves the experience, product discovery and conversion. Indirectly, a clear architecture and more useful pages support a healthier site.</p>

<h2 id="sistem">5. Why it matters that everything works together</h2>
<p>The value does not come from ticking seven tools separately. It comes from synchronisation. The new product enters the catalog, appears in the sitemap, receives structured data, reaches the feed, is evaluated for content and can be found through smart internal search. When the price or stock changes, the same information propagates everywhere.</p>
<ol><li><strong>The crawler gets in</strong> through correct rules and discovers the URL in the sitemap.</li><li><strong>The engine understands</strong> the product through structured data and the feed.</li><li><strong>The content is improved</strong> through the AI evaluation, without inventing attributes.</li><li><strong>The shopper finds</strong> the product through Google, commercial surfaces or internal search.</li><li><strong>The system stays synchronised</strong> when the catalog changes.</li></ol>
<div class="callout"><strong>Being “ahead of time” does not mean promising that AI will automatically recommend the store.</strong> It means the infrastructure is prepared for the way modern engines consume information: accessible, structured, consistent and easy to verify.</div>

<h2 id="vidgo">What is already included in VidGo</h2>
<ul><li><code>robots.txt</code>, XML sitemap and <code>llms.txt</code> generated and maintained;</li><li>structured data for products and the store's architecture;</li><li>Google Merchant Center integration and synchronisation;</li><li>AI-assisted SEO evaluations for content and metadata;</li><li>smart search and autocomplete for the catalog;</li><li>technical monitoring, speed and continuous maintenance.</li></ul>
<p>These are things a store owner should not be obliged to buy separately, connect through plugins and check manually after every update. In VidGo, they are part of the platform.</p>

<section class="sources"><h2>Sources and further reading</h2><ul><li><a href="https://developers.google.com/search/docs/specialty/ecommerce" rel="noopener">Google Search Central: SEO recommendations for e-commerce</a></li><li><a href="https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec" rel="noopener">Google: interpreting robots.txt</a></li><li><a href="https://support.google.com/merchants/answer/6069143" rel="noopener">Google Merchant Center: structured data for products</a></li><li><a href="https://support.google.com/merchants/answer/13889434" rel="noopener">Google Merchant Center: free product listings</a></li></ul></section>
<section class="article-cta"><h2>Want to see how it works on your catalog?</h2><p>I show you concretely what Google sees, what AI systems can understand and where visibility is being lost today.</p><a href="/en/contact">Book a call</a></section>`,
  },
];
