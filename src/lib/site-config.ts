/**
 * Single source of truth for the site's identity and contact channels.
 * Every page, the header, the footer, robots and the sitemap read from here.
 */
export const siteConfig = {
  name: "VidGo Technology",
  shortName: "VidGo",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vidgotech.com").replace(/\/$/, ""),
  tagline: "Platformă de e-commerce completă, găzduită pe serverul tău",
  description:
    "Magazin online complet — storefront, admin și backend într-o singură aplicație, fără plugin-uri. Pagini randate pe server, scor SEO 100, facturare automată cu e-Factura, migrare cu redirecționări de pe platforme open source. Găzduire privată pe VPS, întreținută de cine a construit platforma.",
  email: "contact@vidgotech.com",
  phone: "+40 774 173 092",
  phoneDisplay: "0774 173 092",
  linkedin: "https://linkedin.com/in/ioana-dinu-it",
  portal: "https://dash.vidgotech.com",
  start: "https://start.vidgotech.com",
  startEn: "https://start.vidgotech.com/en/",
  demo100k: "https://eshop-tech.app",
  reference: "https://biotu.ro",
} as const;
