import type { SecurityContent } from "@/content/types";

export const security: SecurityContent = {
  meta: {
    title: "Online store security: vulnerable plugins on open-source platforms",
    description:
      "Stores on open-source platforms breached through vulnerable plugins and modules: four cases from 2026 and why a store without plugins is harder to break into. How authentication, cards, tokens and GDPR data are protected at VidGo.",
    keywords: ["security", "woocommerce", "prestashop"],
  },
  breadcrumb: "Security",
  header: {
    eyebrow: "Security",
    title: "Every plugin is a door. VidGo has no plugins.",
    description:
      "In a store on an open-source platform, features come as extensions written by other people, updated at a different pace, with bugs you learn about from the press. At VidGo, authentication, payments, invoices and delivery are platform code, tested and updated together.",
  },
  incidents: {
    eyebrow: "Four cases from 2026",
    title: "What happens when a core feature is **a plugin or a module**.",
    description:
      "Sources: Search Engine Journal based on Wordfence advisories, the official PrestaShop announcement and the security advisory published on GitHub. These are not exceptions; they are the normal rhythm of an extension ecosystem.",
    sourceLabel: "Source: Search Engine Journal",
    items: [
      {
        when: "18 August 2026",
        what: "PrestaShop 9.1.5 and 8.2.8",
        severity: "CVSS up to 8.3 · five vulnerabilities",
        body: "Security update for the PrestaShop core. Among the problems: at CSV import, the server downloaded any image address it received, without verification (SSRF); CSV exports allowed formula injection; the customer's IP address could be spoofed through the X-Forwarded-For header.",
        href: "https://build.prestashop-project.org/news/2026/prestashop-9-1-5-security-release/",
      },
      {
        when: "1 August 2026",
        what: "WooCommerce Social Login",
        severity: "CVSS 9.8 · CVE-2026-8457",
        body: "The login plugin for Facebook, Google, Amazon, PayPal and Apple accepted Apple tokens without verifying their signature. Anyone could send a forged token with the email address of an existing user and receive a session on that account, including the administrator's. Affected: all versions up to 2.8.7.",
        href: "https://www.searchenginejournal.com/woocommerce-social-login-wordpress-plugin-enables-full-site-takeover/584601/",
      },
      {
        when: "10 July 2026",
        what: "PrestaShop Layered Navigation (ps_facetedsearch)",
        severity: "CVSS 10 · CVE-2026-54159",
        body: "The catalog filter module took the price or weight filter value from the page address and deserialised it without validation. A single request sent from the front office, without authentication, wrote a PHP file on the server and gave complete control over the store. Affected: versions 3.0.0 to 4.0.3.",
        href: "https://github.com/advisories/GHSA-m5f5-28qr-9g9r",
      },
      {
        when: "12 January 2026",
        what: "WooCommerce Square",
        severity: "CVSS 7.5 · up to 80,000 installations",
        body: "The Square payment plugin did not validate the identifier received from the client. Without any authentication, an attacker could obtain the references of customers' saved cards and use them for fraudulent payments. Affected: all versions up to 5.1.1.",
        href: "https://www.searchenginejournal.com/woocommerce-wordpress-plugin-exploit-enables-fraudulent-charges/564872/",
      },
    ],
  },
  principles: {
    eyebrow: "How the platform is designed",
    title: "Layered defence, **at every step**.",
    items: [
      {
        title: "Authentication does not trust the client",
        body: "With Sign in with Google, the token received from Google is verified on the server: the signature, against Google's public keys, and the audience, that is, the store's client ID. Exactly the check that was missing from the plugin above. The account is linked to the stable Google identity, not to the email address, which can change or be reused.",
      },
      {
        title: "Cards never touch the platform",
        body: "Card payment happens in Stripe Checkout. The card number does not pass through the store's server and is not stored by it. What comes back is the payment confirmation, through a webhook with a verified signature and with protection against repeated deliveries.",
      },
      {
        title: "Tokens are encrypted at rest",
        body: "Session tokens, password reset tokens and public invoice access tokens are encrypted before they reach the database, through an encryption service separate from the application. Sessions are signed with asymmetric keys, not with a shared secret.",
      },
      {
        title: "Every transition is validated on the server",
        body: "The state of an order, a refund or a cancellation changes only if the backend accepts the transition. The interface hides ineligible actions, but it is not the one deciding. Rate limiting on login and on public links, CSRF on every endpoint that modifies data.",
      },
      {
        title: "One store, one server",
        body: "Each store runs isolated on its own VPS, with certificates issued and renewed automatically and with database backups on demand or scheduled. An incident at one store has no way of reaching another, because they share nothing.",
      },
      {
        title: "Traceability and GDPR",
        body: "Audit log on sensitive flows: imports, invoice access, refunds, anonymisations, incidents. The right to erasure, Article 17, is applied in one click, with tax data kept for the legal retention period.",
      },
    ],
  },
  honest: {
    eyebrow: "What we do not promise",
    title: "Security is not a score of 100.",
    description: "Some things are worth saying clearly, so you do not find them out afterwards.",
    items: [
      "Platform updates are done by us, as part of the monthly subscription. There is no “update all” button for someone to press on a Friday evening.",
      "Tax data is kept for the period required by law even after a GDPR erasure request. We anonymise the person, not the invoice.",
      "Public documents, such as invoices sent by link, are accessible only with a unique token, with an access log and with rate limiting. The link remains a link: do not forward it.",
      "A private server also means it is your responsibility to pay for the hosting. As long as it is paid, the store runs without interruption.",
    ],
    note: {
      text: "The complete list of features, including the tax and GDPR ones, is on the",
      link: "Platform",
      href: "/en/platform",
      after: " page.",
    },
  },
};
