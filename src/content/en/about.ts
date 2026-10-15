import type { AboutContent } from "@/content/types";

export const about: AboutContent = {
  meta: {
    title: "About Ioana Dinu and the VidGo platform",
    description:
      "VidGo Technology is built by Ioana Dinu, a software engineer with over 15 years of experience, for merchants who want a complete platform, maintained by the person who wrote it.",
  },
  breadcrumb: "About",
  header: {
    eyebrow: "About",
    title: "Built by someone who also maintains it.",
    description:
      "VidGo Technology exists because between SaaS platforms that take a share of every sale and custom stores nobody wants anymore, the middle path was missing.",
  },
  photoAlt: "Ioana Dinu, founder of VidGo Technology",
  role: "Ioana Dinu · Founder",
  title: "You run the store. I run the platform.",
  p1: "Over 15 years of software development, with senior backend and full-stack experience, at Jumbo in the Netherlands and on projects for IBM Netherlands clients. I built VidGo for merchants migrating from open-source platforms or from an outdated custom store, and for agencies that deliver e-commerce projects to their clients.",
  p2: "The middle path I propose is a complete platform, customised for your business and maintained end to end, with the engineering and compliance work already done. I answer, directly, not a support department.",
  linkedin: "Ioana Dinu on LinkedIn",
  stats: [
    { value: 15, suffix: "+", label: "years of software development" },
    { value: 7010, suffix: "", label: "products migrated to biotu.ro" },
    { value: 100000, suffix: "+", label: "products in the speed demo" },
    {
      value: 4,
      suffix: "",
      label:
        "storefront themes as a starting point, one for each type of store, endlessly editable in the elements displayed, including with AI",
    },
  ],
  principles: {
    eyebrow: "Principles",
    title: "Four things that are not negotiable.",
    items: [
      {
        title: "A single application",
        body: "Storefront, admin panel and backend are one product, built by the same team. There is no “app store” where core features are plugins written by someone else.",
      },
      {
        title: "Your server, your data",
        body: "The application installs on a VPS in your account, at the provider you choose. You do not depend on our hosting and you do not share infrastructure with other stores.",
      },
      {
        title: "No commission on sales",
        body: "A fixed price for the build and a monthly subscription. The platform does not earn more when you sell more.",
      },
      {
        title: "Measured, not promised",
        body: "The speeds and scores we display are from real stores, with Google's tools, with a link so you can verify them. When something is in progress, it says “in progress”.",
      },
    ],
  },
  press: {
    id: "press",
    eyebrow: "Press",
    title: "VidGo in the press.",
    description:
      "The interview and podcast episode in which Ioana Dinu explains why online stores slow down, how to test them with PageSpeed and how to migrate without losing Google rankings.",
    article: {
      outlet: "Fabricat în RO",
      kind: "Article",
      title: "Ioana Dinu, Vidgo: 6 checks for an online store",
      body: "The founder of VidGo Technology explains why online stores slow down, how to test a site with PageSpeed and how to migrate without losing rankings. In Romanian.",
      date: "2026-10-15",
      dateLabel: "15 October 2026",
      href: "https://fabricatinro.ro/podcast-cu-antreprenori-romani/ioana-dinu-vidgo/",
      image: "/assets/press-fabricat-in-ro.jpg",
      imageAlt: "Ioana Dinu, founder of VidGo Technology, guest on the Fabricat în RO podcast",
      cta: "Read the article on fabricatinro.ro",
    },
    video: {
      outlet: "Fabricat în RO Podcast",
      kind: "Podcast",
      title: "Why does your online store slow down and lose customers?",
      body: "The full episode, on a podcast with Romanian entrepreneurs and manufacturers: store speed, migrating from open-source platforms and what to check before switching platforms. In Romanian.",
      youtubeId: "6d9eW3IcBqM",
      href: "https://youtu.be/6d9eW3IcBqM",
      poster: "/assets/press-podcast-fabricat-in-ro.jpg",
      posterAlt: "Ioana Dinu on the Fabricat în RO podcast, YouTube episode",
      play: "Play the episode",
      cta: "Open on YouTube",
    },
  },
};
