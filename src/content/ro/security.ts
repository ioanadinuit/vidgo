import type { SecurityContent } from "@/content/types";

export const security: SecurityContent = {
  meta: {
    title: "Securitate magazin online: plugin-uri vulnerabile pe platformele open source",
    description:
      "Magazine pe platforme open source sparte prin plugin-uri și module vulnerabile: patru cazuri din 2026 și de ce un magazin fără plugin-uri este mai greu de spart. Cum sunt protejate autentificarea, cardurile, token-urile și datele GDPR la VidGo.",
    keywords: ["security", "woocommerce", "prestashop"],
  },
  breadcrumb: "Securitate",
  header: {
    eyebrow: "Securitate",
    title: "Fiecare plugin e o ușă. VidGo nu are plugin-uri.",
    description:
      "Într-un magazin pe o platformă open source, funcțiile vin ca extensii scrise de alți oameni, actualizate în alt ritm, cu bug-uri pe care le afli din presă. La VidGo, autentificarea, plățile, facturile și livrarea sunt cod al platformei, testat și actualizat împreună.",
  },
  incidents: {
    eyebrow: "Patru cazuri din 2026",
    title: "Ce se întâmplă când o funcție de bază e **un plugin sau un modul**.",
    description:
      "Surse: Search Engine Journal pe baza avizelor Wordfence, anunțul oficial PrestaShop și avizul de securitate publicat pe GitHub. Nu sunt excepții, sunt ritmul normal al unui ecosistem de extensii.",
    sourceLabel: "Sursa: Search Engine Journal",
    items: [
      {
        when: "18 august 2026",
        what: "PrestaShop 9.1.5 și 8.2.8",
        severity: "CVSS până la 8,3 · cinci vulnerabilități",
        body: "Actualizare de securitate pentru nucleul PrestaShop. Printre probleme: la importul CSV, serverul descărca orice adresă de imagine primită, fără verificare (SSRF); exporturile CSV permiteau injectarea de formule; adresa IP a clientului putea fi falsificată prin antetul X-Forwarded-For.",
        href: "https://build.prestashop-project.org/news/2026/prestashop-9-1-5-security-release/",
      },
      {
        when: "1 august 2026",
        what: "WooCommerce Social Login",
        severity: "CVSS 9,8 · CVE-2026-8457",
        body: "Plugin-ul de login cu Facebook, Google, Amazon, PayPal și Apple accepta token-uri Apple fără să le verifice semnătura. Oricine putea trimite un token falsificat cu adresa de email a unui utilizator existent și primea o sesiune pe contul lui, inclusiv pe cel de administrator. Afectate: toate versiunile până la 2.8.7.",
        href: "https://www.searchenginejournal.com/woocommerce-social-login-wordpress-plugin-enables-full-site-takeover/584601/",
      },
      {
        when: "10 iulie 2026",
        what: "PrestaShop Layered Navigation (ps_facetedsearch)",
        severity: "CVSS 10 · CVE-2026-54159",
        body: "Modulul de filtre din catalog lua valoarea filtrului de preț sau greutate din adresa paginii și o deserializa fără validare. O singură cerere trimisă din front-office, fără autentificare, scria un fișier PHP pe server și dădea control complet asupra magazinului. Afectate: versiunile 3.0.0 până la 4.0.3.",
        href: "https://github.com/advisories/GHSA-m5f5-28qr-9g9r",
      },
      {
        when: "12 ianuarie 2026",
        what: "WooCommerce Square",
        severity: "CVSS 7,5 · până la 80.000 de instalări",
        body: "Plugin-ul de plăți prin Square nu valida identificatorul primit de la client. Fără nicio autentificare, un atacator putea obține referințele cardurilor salvate ale clienților și le putea folosi pentru plăți frauduloase. Afectate: toate versiunile până la 5.1.1.",
        href: "https://www.searchenginejournal.com/woocommerce-wordpress-plugin-exploit-enables-fraudulent-charges/564872/",
      },
    ],
  },
  principles: {
    eyebrow: "Cum e gândită platforma",
    title: "Apărare pe straturi, **la fiecare pas**.",
    items: [
      {
        title: "Autentificarea nu se încrede în client",
        body: "La Sign in with Google, token-ul primit de la Google este verificat pe server: semnătura, față de cheile publice ale Google, și destinatarul, adică ID-ul de client al magazinului. Exact verificarea care lipsea din plugin-ul de mai sus. Contul se leagă de identitatea stabilă Google, nu de adresa de email, care se poate schimba sau refolosi.",
      },
      {
        title: "Cardurile nu ating platforma",
        body: "Plata cu cardul se face în Stripe Checkout. Numărul cardului nu trece prin serverul magazinului și nu este stocat de el. Ce ajunge înapoi este confirmarea plății, printr-un webhook cu semnătură verificată și cu protecție la livrări repetate.",
      },
      {
        title: "Token-urile sunt criptate în repaus",
        body: "Token-urile de sesiune, de resetare a parolei și de acces public la facturi sunt criptate înainte să ajungă în baza de date, printr-un serviciu de criptare separat de aplicație. Sesiunile sunt semnate cu chei asimetrice, nu cu un secret partajat.",
      },
      {
        title: "Fiecare tranziție este validată pe server",
        body: "Starea unei comenzi, un ramburs sau o anulare se schimbă doar dacă backend-ul acceptă tranziția. Interfața ascunde acțiunile neeligibile, dar nu ea decide. Rate limit pe login și pe linkurile publice, CSRF pe orice endpoint care modifică date.",
      },
      {
        title: "Un magazin, un server",
        body: "Fiecare magazin rulează izolat pe propriul VPS, cu certificate emise și reînnoite automat și cu backup-uri de bază de date la cerere sau programate. Un incident la un magazin nu are cum să ajungă la altul, pentru că nu împart nimic.",
      },
      {
        title: "Trasabilitate și GDPR",
        body: "Jurnal de audit pe fluxurile sensibile: importuri, acces la facturi, rambursuri, anonimizări, incidente. Dreptul la ștergere, articolul 17, se aplică dintr-un click, cu păstrarea datelor fiscale pe perioada legală de retenție.",
      },
    ],
  },
  honest: {
    eyebrow: "Ce nu promitem",
    title: "Securitatea nu e un scor de 100.",
    description: "Sunt lucruri de spus clar, ca să nu le afli după.",
    items: [
      "Actualizările platformei se fac de noi, în abonamentul lunar. Nu există buton de „update all” pe care să îl apese cineva vineri seara.",
      "Datele fiscale se păstrează pe perioada cerută de lege chiar și după o cerere de ștergere GDPR. Anonimizăm persoana, nu factura.",
      "Documentele publice, cum sunt facturile trimise prin link, sunt accesibile doar cu un token unic, cu jurnal de acces și cu limitare de frecvență. Linkul rămâne un link: nu îl trimite mai departe.",
      "Un server privat înseamnă și responsabilitatea ta de a plăti găzduirea. Cât timp este plătită, magazinul rulează fără întrerupere.",
    ],
    note: {
      text: "Lista completă a funcționalităților, inclusiv cele fiscale și de GDPR, este pe pagina",
      link: "Platformă",
      href: "/platforma",
      after: ".",
    },
  },
};
