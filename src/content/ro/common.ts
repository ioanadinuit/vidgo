import type { CommonContent } from "@/content/types";
import { siteConfig } from "@/lib/site-config";

export const common: CommonContent = {
  site: {
    tagline: "Platformă de e-commerce completă, găzduită pe serverul tău",
    description:
      "Magazin online complet — storefront, admin și backend într-o singură aplicație, fără plugin-uri. Pagini randate pe server, scor SEO 100, facturare automată cu e-Factura, migrare cu redirecționări de pe platforme open source. Găzduire privată pe VPS, întreținută de cine a construit platforma.",
  },
  breadcrumbHome: "Acasă",
  nav: [
    { text: "Platformă", href: "/platforma" },
    { text: "Securitate", href: "/securitate" },
    { text: "Portofoliu", href: "/#portofoliu" },
    { text: "Blog", href: "/blog" },
    { text: "Despre", href: "/despre" },
    { text: "Contact", href: "/contact" },
  ],
  header: {
    homeLabel: "VidGo Technology — acasă",
    menuLabel: "Meniu principal",
    bookDemo: "Solicită un demo gratuit",
  },
  mobile: {
    open: "Deschide meniul",
    close: "Închide meniul",
    bookDemo: "Solicită un demo gratuit",
  },
  switchTo: {
    code: "EN",
    label: "English",
  },
  footer: {
    blurb:
      "Platformă de e-commerce completă, construită și întreținută în România. Storefront, admin și backend într-o singură aplicație, pe serverul tău.",
    groups: [
      {
        title: "Platformă",
        links: [
          { text: "Funcționalități", href: "/platforma" },
          { text: "Securitate", href: "/securitate" },
          { text: "Demo cu 100.000 de produse", href: siteConfig.demo100k },
        ],
      },
      {
        title: "Companie",
        links: [
          { text: "Despre", href: "/despre" },
          { text: "Presă", href: "/despre#presa" },
          { text: "Blog", href: "/blog" },
          { text: "Contact", href: "/contact" },
          { text: "Cont client", href: siteConfig.portal },
        ],
      },
      {
        title: "Resurse",
        links: [
          { text: "Magazin de referință: biotu.ro", href: siteConfig.reference },
          { text: "llms.txt", href: "/llms.txt" },
          { text: "Solicită un demo gratuit", href: siteConfig.start },
        ],
      },
    ],
    copyright: "© 2026 VidGo Technology · Platformă e-commerce completă, întreținută cap-coadă.",
    founder: "Ioana Dinu · Fondator",
  },
  cta: {
    eyebrow: "Hai să vorbim",
    title: "Îți construim gratuit un demo al magazinului tău pe platforma noastră.",
    body: "Cu skin-ul, produsele și identitatea ta. Ne ceri, noi îl facem.",
    bookDemo: "Solicită un demo gratuit",
  },
  notFound: {
    eyebrow: "404",
    title: "Pagina nu există.",
    description: "Adresa a fost mutată sau nu a existat niciodată. Paginile de mai jos există sigur.",
    links: [
      { text: "Acasă", href: "/" },
      { text: "Platforma", href: "/platforma" },
      { text: "Blog", href: "/blog" },
    ],
  },
};
