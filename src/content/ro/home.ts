import type { HomeContent } from "@/content/types";

export const home: HomeContent = {
  keywords: ["platform", "erp", "seo", "migration"],
  badge: "Platformă de e-commerce construită și întreținută în România",
  headline: "Magazinul tău online,",
  typewriter: ["rapid.", "fără plugin-uri.", "pe serverul tău.", "cu facturi automate."],
  intro:
    "Viteza transformă traficul pe care îl plătești deja în comenzi. Automatizările te scot din munca de zi cu zi. Conformitatea fiscală și GDPR vin incluse, nu ca un proiect separat, plătit încă o dată.",
  bookDemo: "Solicită un demo gratuit",
  seePlatform: { text: "Vezi tot ce conține", href: "/platforma" },
  heroAlt: "Panoul de administrare VidGo pe laptop: lista de comenzi, cu logoul VidGo Technologies",
  stats: [
    { value: 100, suffix: "/100", label: "scor SEO, pe fiecare magazin" },
    { value: 100000, suffix: "+", label: "produse în demo-ul de viteză" },
    { value: 7010, suffix: "", label: "produse migrate la biotu.ro" },
    { value: 0, suffix: "", label: "plugin-uri de întreținut" },
  ],
  stackTitle: "Integrări făcute în platformă, nu cumpărate ca plugin",
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
    eyebrow: "Unde ne poziționăm",
    title: "Deasupra nivelului de intrare, **aglomerat**.",
    above: {
      eyebrow: "Nivelul de deasupra",
      title: "Magazine pentru care tehnologia actuală e depășită",
      body: "Au nevoie de mai mult decât poate oferi o platformă găzduită all-in-one.",
      chips: ["Server și date proprii", "Viteză la scară mare", "Automatizări incluse"],
    },
    entry: {
      eyebrow: "Nivel de intrare",
      title: "Magazine la început de drum",
      body: "Soluții pentru lansarea primului magazin online. VidGo se adresează magazinelor care au depășit această etapă.",
      tag: "",
    },
  },
  why: {
    eyebrow: "De ce nu un magazin pe plugin-uri",
    title: "Pe platformele open source, viteza și securitatea sunt **proiecte separate**.",
    description:
      "Ambele se cumpără în plus, se întrețin de cineva și se strică la următorul update. La VidGo sunt platforma.",
    speed: {
      title: "Viteza cere o industrie întreagă",
      p1: "Un ghid de 12 minute din Search Engine Journal explică de ce WooCommerce încetinește când clienții chiar folosesc magazinul, și ce trebuie montat ca să nu o facă: NGINX în loc de Apache, PHP-FPM, Redis cu Object Cache Pro, cron de sistem, cache pe straturi. Toate în plus, toate de întreținut.",
      p2: "VidGo nu are de reparat nimic din lista aceea. Backend Java, Redis și pagini randate pe server sunt platforma, nu un proiect de tuning. Pe un catalog de 100.000 de produse, serverul răspunde sub 0,2 secunde pe desktop.",
      link: "Articolul din Search Engine Journal",
    },
    doors: {
      title: "Fiecare plugin e o ușă",
      items: [
        {
          when: "Ianuarie 2026 · WooCommerce Square.",
          body: "O vulnerabilitate permitea accesul neautentificat la metodele de plată salvate și efectuarea de plăți frauduloase. O problemă într-un singur plugin afecta direct siguranța plăților.",
        },
        {
          when: "Iulie 2026 · PrestaShop.",
          body: "Modulul ps_facetedsearch permitea preluarea completă a serverului cu o singură cerere, fără autentificare. Severitate: 10 din 10.",
        },
      ],
      body: "VidGo integrează funcțiile esențiale în platformă, fără plugin-uri de magazin de întreținut separat. Plățile sunt procesate de Stripe; datele cardurilor nu trec prin serverul magazinului.",
      link: { text: "Cum e gândită securitatea", href: "/securitate" },
    },
  },
  bento: {
    eyebrow: "Ce conține",
    title: "Tot ce îi trebuie unui magazin, **deja construit**.",
    description:
      "O singură aplicație: storefront, admin și backend. Fără chirie la app store, fără integrări fragile de întreținut.",
    cards: [
      {
        name: "Viteză și SEO din prima zi",
        description:
          "Pagini randate pe server, URL-uri curate, canonicals, sitemap-uri, date structurate, robots.txt și llms.txt. Redirecționări 301 din adresele vechi la migrare.",
        href: "/platforma#seo",
        cta: "Detalii SEO, AEO, GEO",
        points: ["SSR", "Scor SEO 100", "Sitemap automat", "JSON-LD", "llms.txt", "301 la migrare", "WebP"],
      },
      {
        name: "Facturi și documente fiscale",
        description:
          "Factură automată la momentul potrivit pentru fiecare metodă de plată, proformă la transfer bancar, storno la ramburs, XML e-Factura, export pentru contabilitate.",
        href: "/platforma#fiscal",
        cta: "Cum se emit",
        points: ["e-Factura XML", "Proformă", "Storno", "Export contabilitate"],
      },
      {
        name: "Stocuri, variante, furnizori",
        description:
          "Gestiune de stoc cu prag și rezervare la comandă, produse cu variante, import CSV cu potrivire inteligentă, sincronizare din feed-urile furnizorilor.",
        href: "/platforma#catalog",
        cta: "Catalog și stocuri",
        points: ["Prag de stoc", "Variante", "Import CSV", "Feed furnizori"],
      },
      {
        name: "Comenzi, plăți, livrare",
        description:
          "Stripe, transfer bancar și ramburs într-un singur flux. AWB generat automat prin Innoship la plasarea comenzii. Motor de rambursări cu toate efectele automate.",
        href: "/platforma#comenzi",
        cta: "Fluxul comenzii",
        points: ["Stripe", "Transfer bancar", "Ramburs", "AWB Innoship", "Rambursări", "Retur digital"],
      },
    ],
  },
  measured: {
    eyebrow: "Măsurat, nu promis",
    title: "Un magazin real, testat cu instrumentul **Google**.",
    body: "biotu.ro, magazin în funcțiune cu peste 7.000 de produse, măsurat pe mobil, varianta de test mai severă. Deschide linkul și rulează testul singur.",
    items: [
      "Performanță 95, accesibilitate 95, bune practici 100, SEO 100 (PageSpeed Insights, mobil, august 2026)",
      "Audit SEO independent: A la toți factorii de care răspunde platforma",
      "Demo cu 100.000 de produse: performanță 96 pe desktop, SEO 100, răspuns server sub 0,2 s (Lighthouse, 11.09.2026)",
      "Domeniu nou, fără redirecționări, fără reclame: poziție medie 29,9 în Google la o lună de la indexare, cu circa 2.000 de produse încă necrawlate (Search Console, septembrie 2026)",
    ],
    pagespeed: "Verifică biotu.ro pe PageSpeed",
    demo: "Deschide demo-ul cu 100.000 de produse",
    scores: [
      { score: 95, label: "Performanță" },
      { score: 95, label: "Accesibilitate" },
      { score: 100, label: "Bune practici" },
      { score: 100, label: "SEO" },
    ],
    caption: "Google PageSpeed Insights, mobil · biotu.ro · august 2026",
  },
  portfolio: {
    eyebrow: "Portofoliu",
    title: "Magazine care rulează pe **VidGo**.",
    description: "Deschide-le și folosește-le ca un cumpărător obișnuit: caută, filtrează, adaugă în coș.",
    items: [
      {
        kind: "Magazin în funcțiune",
        name: "biotu.ro",
        body: "Magazin de produse bio și naturale, migrat de pe PrestaShop cu produse, comenzi și clienți, fără să oprească vânzările.",
        facts: ["peste 7.000 de produse", "domeniu nou din mai 2026", "SEO 100/100"],
      },
      {
        kind: "Mediul de test",
        name: "eshop-tech.app",
        body: "Magazinul demo pe care testăm fiecare versiune înainte să ajungă la clienți, încărcat cu un catalog de 100.000 de produse.",
        facts: ["100.000 de produse", "răspuns server sub 0,2 s", "SEO 100"],
      },
    ],
    comingSoon: {
      kind: "În curând",
      title: "Migrăm și lansăm în curând noul optimac.ro.",
      logoAlt: "optiMac",
    },
    open: "Deschide",
    quote:
      "„E atât de rapidă că nu apuc să clipesc. Fac sute de actualizări de produse în sub o secundă. Migrarea a fost simplă: clienții vechi au fost mutați fără să observe nimic. Am o tehnologie care îmi permite să cresc la nivelul catalogului meu. E ca și cum ai avea propria platformă, cu sprijin tehnic real în spate.”",
    quoteName: "Elena Săulescu",
    quoteAlt: "Elena Săulescu, biotu.ro",
  },
  steps: {
    eyebrow: "Cum ajungi live",
    title: "Cloud-ul tău. Magazinul pornit în **5 minute**.",
    description:
      "Aplicația se instalează automat pe un VPS din contul furnizorului ales și pornește în cinci minute. Infrastructura ta, datele tale. Migrarea propriu-zisă are patru pași.",
    items: [
      {
        n: "1",
        title: "Evaluăm",
        body: "Ne uităm împreună la magazinul actual, la catalog și la fluxurile de lucru. Stabilim ce se mută și ce se îmbunătățește.",
      },
      {
        n: "2",
        title: "Construim",
        body: "Noul magazin primește brandul tău, produsele, comenzile și clienții importați. Cel vechi vinde în continuare.",
      },
      {
        n: "3",
        title: "Testăm",
        body: "Verifici totul pe un link privat: checkout, plăți, facturi, emailuri. Nimic nu intră live până nu merge.",
      },
      {
        n: "4",
        title: "Migrăm",
        body: "Mutăm domeniul cu redirecționările pregătite. Pozițiile din Google și conturile clienților se păstrează.",
      },
    ],
  },
  partners: {
    eyebrow: "Integrări și parteneri",
    title: "Ce e conectat și **cu cine lucrăm**.",
    cards: [
      {
        title: "În platformă",
        body: "Stripe pentru plăți online, Innoship pentru AWB-uri generate automat la plasarea comenzii, cu orice curier, XML e-Factura pentru SPV, feed Google Merchant generat automat, Sign in with Google, feed-uri de furnizori.",
      },
      {
        title: "Disivo",
        tag: "Serviciu extra: prețuri optimizate față de concurență",
        body: "Prețuri dinamice pentru cataloage mari: monitorizarea concurenței, reguli de marjă și strategie de preț cu AI. Ofertă de reseller pentru clienții VidGo.",
      },
      {
        title: "Dyver.AI",
        body: "Transformă datele de furnizor și de catalog din orice sursă în listări corecte, optimizate SEO, pentru orice canal.",
      },
      {
        title: "Cyber Micro Services",
        tag: "Serviciu extra: publicarea aplicației mobile",
        body: "Publicarea de aplicații mobile: magazinul VidGo ajunge și ca aplicație pe telefon.",
      },
    ],
    note: {
      text: "Agenție sau dezvoltator? Aduci clientul, VidGo livrează platforma, iar tu încasezi un procent recurent din abonamentul fiecărui magazin adus.",
      link: "Hai să vorbim",
      href: "/contact",
      after: ".",
    },
  },
  isolation:
    "Fiecare magazin rulează izolat, pe serverul lui, cu token-urile criptate în repaus, cu certificate și backup-uri automate. Un incident la un magazin nu ajunge la altul.",
  blog: {
    eyebrow: "Din blog",
    title: "Ce am învățat construind magazine rapide.",
    description: "Ghiduri practice despre viteză, indexare, SEO și dropshipping, cu exemple din magazine reale.",
    all: "Toate articolele",
    read: "Citește articolul",
  },
};
