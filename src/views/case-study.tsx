import { ArrowDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GrowthFlow } from "@/components/growth-flow";
import { ZoomFigure } from "@/components/zoom-figure";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHeader } from "@/components/page-header";
import { CtaSection } from "@/components/cta-section";
import type { Locale } from "@/lib/i18n";

export function CaseStudyView({ locale }: { locale: Locale }) {
  const t = (ro: string, en: string) => locale === "ro" ? ro : en;
  const n = (ro: string, en: string) => t(ro, en).split(/([+€]?\d[\d.,]*(?:\s*[%€])?)/g).map((part, i) => /\d/.test(part) ? <span className="financial-number" key={i}>{part}</span> : part);
  const old = "biorganicbubu.ro";
  function Table({ caption, rows }: { caption: string; rows: string[][] }) {
    return <div className="case-table-wrap"><table><caption>{caption}</caption><thead><tr><th scope="col">{t("Indicator", "Metric")}</th><th scope="col">{old}</th><th scope="col">biotu.ro · VidGo</th></tr></thead><tbody>{rows.map(([label,a,b]) => <tr key={label}><th scope="row">{label}</th><td>{a}</td><td>{b}</td></tr>)}</tbody></table></div>;
  }
  return <main id="main-content" className="site-page case-study relative">
    <SiteHeader locale={locale} roPath="/studiu-de-caz" />
    <PageHeader eyebrow={t("Studiu de caz · biotu.ro · Octombrie 2026", "Case study · biotu.ro · October 2026")} title={t("Rezultatele noastre", "Our results")} description={t("Un comerciant vinde același catalog pe magazinul vechi și pe unul nou, construit pe VidGo. Le-am măsurat pe amândouă cu aceleași instrumente.", "One merchant sells the same catalog through an existing store and a new store built on VidGo. We measured both with the same tools.")} />
    <div className="mx-auto max-w-6xl px-4 lg:px-8">
      <GrowthFlow locale={locale} />
      <div className="case-figures-heading"><p className="case-eyebrow">Google Search Console</p><h2>{t("Evoluția urmărită: poziția medie în Google pe 28 de zile și pe 3 luni", "Tracked evolution: average Google position over 28 days and 3 months")}</h2><p>{t("Măsurat zilnic, organic, fără publicitate plătită. Ultima actualizare: 17 octombrie 2026.", "Measured daily, organically, without paid advertising. Last update: 17 October 2026.")}</p></div>
      <div className="case-figures case-figures-gsc">
        <ZoomFigure src="/assets/case-study-gsc-3-months.png" width={1569} height={701} zoomLabel={t("Mărește graficul", "Zoom the chart")}
          title={t("Evoluția urmărită pe", "Tracked evolution over")} accent={t("3 luni", "3 months")}
          alt={t("Google Search Console, poziția medie zilnică pe 3 luni: pornire de la 50 în iulie, indexare dificilă în august, apoi urcare constantă până la 18,4", "Google Search Console, daily average position over 3 months: start at 50 in July, rough indexing in August, then a steady climb to 18.4")}
          caption={t("Trei luni, 18 iulie – 17 octombrie 2026: pornire de la 50 la lansare, indexare dificilă în august, apoi urcare constantă. Media perioadei: 26,5.", "Three months, 18 July – 17 October 2026: start at 50 at launch, rough indexing in August, then a steady climb. Period average: 26.5.")} />
        <ZoomFigure src="/assets/case-study-gsc-28-days.png" width={1569} height={701} zoomLabel={t("Mărește graficul", "Zoom the chart")}
          title={t("Evoluția urmărită pe", "Tracked evolution over")} accent={t("28 de zile", "28 days")}
          alt={t("Google Search Console, poziția medie zilnică în ultimele 28 de zile: urcă de la peste 30 la 18,4 pe 17 octombrie 2026", "Google Search Console, daily average position over the last 28 days: climbs from above 30 to 18.4 on 17 October 2026")}
          caption={t("Ultimele 28 de zile, 20 septembrie – 17 octombrie 2026: de la peste 30 la 18,4. Media perioadei: 24,1.", "Last 28 days, 20 September – 17 October 2026: from above 30 to 18.4. Period average: 24.1.")} />
      </div>
      <div className="case-study-transition">
        <p>{t("Ce se află în spatele acestor rezultate? Vezi comparația dintre cele două magazine, măsurătorile și sursele.", "What is behind these results? Explore the two-store comparison, measurements and sources.")}</p>
        <Button size="lg" asChild><a href="#studiu-detaliat">{t("Vezi studiul de caz", "Explore the case study")}<ArrowDownIcon aria-hidden="true" /></a></Button>
      </div>
      <section id="studiu-detaliat" className="case-study-details-intro"><h2>{t("Același magazin, platforme diferite", "The same store, different platforms")}</h2></section>

      <div className="case-metrics">{[
        ["100%",t("disponibilitate în patru săptămâni, față de 99,83%", "uptime over four weeks, compared with 99.83%")],
        ["3,2×",t("mai rapid la timpul median de răspuns", "faster median response time")],
        ["95",t("scor PageSpeed pe desktop, față de 84", "desktop PageSpeed score, compared with 84")],
        ["50 → 18",t("poziția în Google în 3 luni, de la lansarea din iulie, organic, fără publicitate plătită", "Google position over 3 months, since the July launch, organic, without paid advertising")]
      ].map(([value,label])=><div key={value}><strong>{value}</strong><p>{label}</p></div>)}</div>

      <section className="case-section"><p className="case-eyebrow">{t("Contextul", "Context")}</p><h2>{t("Același catalog, platforme diferite", "One catalog, different platforms")}</h2>
      <p>{t("Aceeași firmă vinde același catalog de produse bio și naturale, peste 7.000 de produse, pe două magazine care rulează în paralel.", "The same business sells more than 7,000 organic and natural products through two stores running in parallel.")}</p>
      <Table caption={t("Platformă, infrastructură și domeniu", "Platform, infrastructure and domain")} rows={[
        [t("Platformă", "Platform"),"Open source · PHP 7.0.33","VidGo"],
        [t("Infrastructură", "Infrastructure"),t("Server web LiteSpeed, fără CDN", "LiteSpeed web server, no CDN"),t("Server propriu (VPS), cu Cloudflare", "Dedicated VPS, with Cloudflare")],
        [t("Domeniu", "Domain"),t("Cu istoric: 4.700 de backlinkuri", "Established: 4,700 backlinks"),t("Nou, indexat din august 2026: 2 backlinkuri", "New, indexed since August 2026: 2 backlinks")]
      ]}/><p>{t("Magazinul vechi are avantajul vechimii domeniului. Diferențele de mai jos vin din platformă și infrastructură, nu din conținut.", "The existing store has the advantage of an established domain. The differences below come from the platform and infrastructure, rather than the content.")}</p></section>

      <section className="case-section"><p className="case-eyebrow">{t("Disponibilitate", "Availability")}</p><h2>{t("Patru săptămâni, verificare la fiecare minut", "Four weeks, checked every minute")}</h2>
      <Table caption={t("16 septembrie – 13 octombrie 2026", "16 September – 13 October 2026")} rows={[
        [t("Disponibilitate", "Uptime"),"99,83%","100%"],
        [t("Verificări eșuate", "Failed checks"),t("65 din 38.635", "65 of 38,635"),t("0 din 39.173", "0 of 39,173")],
        [t("Incidente", "Incidents"),t("16, în 8 zile diferite", "16 across 8 separate days"),"0"],
        [t("Cea mai lungă întrerupere", "Longest outage"),t("55 de minute", "55 minutes"),t("Niciuna", "None")]
      ]}/><p>{t("Magazinul vechi a căzut în orele de dimineață: sâmbătă 26 septembrie, între 08:30 și 10:00, 45 din 58 de verificări au eșuat; luni 28 septembrie, între 08:22 și 09:35, încă 13. În aceeași perioadă de monitorizare, biotu.ro nu a avut nicio întrerupere, iar un vârf de 60.000 de cereri într-o zi a trecut fără oprire.", "The existing store experienced morning outages: on Saturday 26 September, between 08:30 and 10:00, 45 of 58 checks failed; on Monday 28 September, between 08:22 and 09:35, another 13 failed. During the same monitoring period, biotu.ro had no outages and handled a peak of 60,000 requests in one day without interruption.")}</p>
      <aside className="case-quote">
        <h3>{t("Întreruperile pot costa și vizibilitate în Google", "Outages can also cost Google visibility")}</h3>
        <p>{t("Cele 16 incidente și întreruperea maximă de 55 de minute înseamnă perioade în care magazinul nu putea fi accesat. Dacă Googlebot întâlnește erori de server sau conexiune, poate reduce ritmul de scanare: produsele noi și actualizările pot fi descoperite mai târziu. Erorile persistente pot duce, în timp, la eliminarea paginilor afectate din index.", "The 16 incidents and longest outage of 55 minutes represent periods when the store could not be reached. If Googlebot encounters server or connection errors, it can reduce crawling: new products and updates may be discovered later. Persistent errors can eventually lead to affected pages being removed from the index.")}</p>
        <p>{t("În perioada monitorizată, biotu.ro a avut zero întreruperi. Disponibilitatea continuă evită această barieră tehnică pentru accesul clienților și al motoarelor de căutare.", "During the monitoring period, biotu.ro had no outages. Continuous availability avoids this technical barrier for customers and search engines.")}</p>
        <p className="case-source">{t("Impact potențial asupra SEO, nu o penalizare măsurată în acest studiu. Datele de monitorizare nu arată dacă Googlebot a accesat magazinul în timpul incidentelor sau câte poziții ori vizite s-au pierdut.", "Potential SEO impact, not a penalty measured in this study. Monitoring data does not show whether Googlebot visited during the incidents or how many positions or visits were lost.")}</p>
        <a className="text-primary underline underline-offset-4" href="https://developers.google.com/crawling/docs/troubleshooting/http-status-codes" target="_blank" rel="noopener noreferrer">{t("Sursa: Google — efectul erorilor de server asupra scanării și indexării", "Source: Google — server errors, crawling and indexing")}</a>
      </aside>
      <p className="case-source">{t("Sursa: Uptime Kuma, verificare HTTP la 60 de secunde, același punct de monitorizare; analitice de trafic biotu.ro.", "Source: Uptime Kuma, HTTP checks every 60 seconds from the same monitoring location; biotu.ro traffic analytics.")}</p></section>

      <section className="case-section"><p className="case-eyebrow">{t("Viteză", "Speed")}</p><h2>{t("Timp de răspuns", "Response time")}</h2>
      <Table caption={t("Aproximativ 39.000 de verificări per magazin", "Approximately 39,000 checks per store")} rows={[
        [t("Median", "Median"),"1.048 ms","326 ms"],
        [t("95% din răspunsuri, sub", "95% of responses below"),"1.491 ms","438 ms"],
        [t("99% din răspunsuri, sub", "99% of responses below"),"2.405 ms","516 ms"],
        [t("Răspunsuri mai lente de 3 secunde", "Responses slower than 3 seconds"),"164","13"],
        [t("20 de cereri: primul byte, median", "20 requests: median time to first byte"),"1,23 s","0,53 s"],
        [t("20 de cereri: pagina completă, median", "20 requests: median full-page response"),"1,61 s","0,63 s"]
      ]}/><p className="case-source">{t("Surse: Uptime Kuma, 16 septembrie – 13 octombrie 2026; test propriu din 13 octombrie 2026, 20 de cereri către pagina principală, câte 5 în paralel. Ambele magazine au răspuns la toate cererile.", "Sources: Uptime Kuma, 16 September – 13 October 2026; internal test on 13 October 2026, 20 homepage requests in batches of 5 concurrent requests. Both stores responded to every request.")}</p></section>

      <section className="case-section"><p className="case-eyebrow">Google PageSpeed</p><h2>{t("Scoruri Lighthouse pe pagina principală", "Homepage Lighthouse scores")}</h2>
      <Table caption={t("13 octombrie 2026", "13 October 2026")} rows={[
        [t("Performanță, desktop", "Desktop performance"),"84","95"],
        [t("Performanță, mobil", "Mobile performance"),"66","75"],
        [t("Accesibilitate", "Accessibility"),"61","97"],
        [t("Bune practici", "Best practices"),"73","100"],
        ["SEO","92","100"],
        [t("Primul conținut afișat pe mobil", "First contentful paint, mobile"),"3,8 s","1,8 s"],
        [t("Pagina vizibilă complet pe mobil", "Speed Index, mobile"),"4,6 s","2,7 s"],
        [t("Deplasări de layout pe mobil (CLS)", "Cumulative layout shift, mobile"),"0,188","0"]
      ]}/><p>{t("Pe mobil, scorul vine din grafică. Cel mai mare element al paginii (LCP 5,6 s, față de 4,4 s) este bannerul principal al biotu.ro, grafica de conversie a magazinului, încărcată cu prioritate. Serverul răspunde în 30 ms în test. Grafica este o decizie comercială, nu o limită a platformei.", "On mobile, the score reflects the graphics. The largest page element (LCP 5.6 s versus 4.4 s) is biotu.ro’s main conversion banner, loaded with priority. The server responds in 30 ms in the test. The graphics are a commercial decision, rather than a platform limitation.")}</p>
      <p className="case-source">{t("Sursa: pagespeed.web.dev, 13 octombrie 2026 (biotu.ro 11:54, biorganicbubu.ro 11:39).", "Source: pagespeed.web.dev, 13 October 2026 (biotu.ro 11:54, biorganicbubu.ro 11:39).")}</p></section>

      <section className="case-section"><p className="case-eyebrow">{t("Administrare", "Administration")}</p><h2>{t("Administrarea, văzută de comerciant", "Administration, from the merchant’s perspective")}</h2>
      <figure className="case-quote"><blockquote>{t("„E atât de rapidă că nu apuc să clipesc. Fac sute de actualizări de produse în sub o secundă. Migrarea a fost simplă: clienții vechi au fost mutați fără să observe nimic. […] E ca și cum ai avea propria platformă, cu sprijin tehnic real în spate.”", "“It is so fast I barely have time to blink. I make hundreds of product updates in under a second. Migration was simple: existing customers were moved without noticing anything. […] It is like having your own platform, with real technical support behind it.”")}</blockquote><figcaption>Elena Săulescu · biotu.ro</figcaption></figure>
      <p>{t("Ușor de folosit · Intuitiv · Util · Extrem de rapid · Automatizat", "Easy to use · Intuitive · Useful · Extremely fast · Automated")}</p></section>


      <section className="case-section"><p className="case-eyebrow">SEO</p><h2>{t("Audit SEO și parcursul în Google", "SEO audit and progress in Google")}</h2>
      <Table caption="SEOptimer" rows={[
        [t("Nota On-Page SEO", "On-page SEO grade"),"B−","A+"],
        [t("Nota GEO (AI)", "GEO (AI) grade"),"A−","A+"],
        [t("Titlul paginii", "Page title"),t("145 caractere", "145 characters"),t("56 caractere", "56 characters")],
        ...["Heading H1","Tag canonical","Sitemap XML","Open Graph"].map(label=>[label,t("Lipsește / negăsit", "Missing / not found"),t("Prezent", "Present")])
      ]}/><aside className="case-search"><strong>50 → 18</strong><div><h3>Google Search Console · biotu.ro</h3><p>{t("Pe 17 octombrie 2026, poziția medie zilnică în Google era 18,4. Cu patru săptămâni înainte era peste 30. La lansare, în a doua jumătate a lui iulie, magazinul pornea de la poziția 50 și a coborât până la 75 și a trecut printr-o indexare dificilă în august, cu zile fără afișări. Media pe trei luni, 26,5, poartă acel început; media pe ultimele 28 de zile este 24,1, iar tendința zilnică urcă săptămână de săptămână, organic, fără publicitate plătită.", "On 17 October 2026 the daily average Google position was 18.4. Four weeks earlier it was above 30. At launch, in the second half of July, the store started at position 50 and dropped as low as 75 and went through a rough indexing phase in August, with days without impressions. The three-month average, 26.5, carries that start; the 28-day average is 24.1, and the daily trend climbs week after week, organically, without paid advertising.")}</p></div></aside>
      <p className="case-source">{t("Surse: SEOptimer, 13 octombrie (biorganicbubu.ro) și 16 septembrie 2026 (biotu.ro); Google Search Console, 17 octombrie 2026. Tot ce apare în coloana biotu.ro vine din platformă, fără plugin și fără configurare.", "Sources: SEOptimer, 13 October (biorganicbubu.ro) and 16 September 2026 (biotu.ro); Google Search Console, 17 October 2026. Everything in the biotu.ro column is built into the platform, without plugins or configuration.")}</p></section>

      <section className="case-section"><p className="case-eyebrow">{t("Căutare AI · GEO", "AI search · GEO")}</p><h2>{t("Google AI și ChatGPT recunosc biotu.ro de la primul cuvânt", "Google AI and ChatGPT recognise biotu.ro from the first word")}</h2>
      <p>{t("„Biotu” nu este un nume unic online: există alte branduri cu nume identic sau foarte apropiat, cu ani de istoric și mult mai multe backlinkuri. Am testat ce răspund asistenții AI la un singur cuvânt, „biotu”, fără „.ro”, fără „magazin”, fără alt context.", "“Biotu” is not a unique name online: other brands carry the same or a very similar name, with years of history and far more backlinks. We tested what AI assistants answer to a single word, “biotu”, without “.ro”, “store” or any other context.")}</p>
      <div className="case-figures">
        <figure><img src="/assets/case-study-google-ai-overview-biotu.png" alt={t("Google AI Overview pentru căutarea „biotu”: descrie Biotu.ro ca magazin online românesc cu peste 7.000 de produse bio și listează categoriile de produse", "Google AI Overview for the search “biotu”: describes Biotu.ro as a Romanian online store with over 7,000 organic products and lists its product categories")} loading="lazy" width={1453} height={745} /><figcaption>{t("Google AI Overview, căutarea „biotu”: identifică Biotu.ro ca magazin online românesc cu peste 7.000 de produse bio și naturale și prezintă categoriile de produse preluate din site.", "Google AI Overview, search “biotu”: identifies Biotu.ro as a Romanian online store with over 7,000 organic and natural products and lists the product categories taken from the site.")}</figcaption></figure>
        <figure><img src="/assets/case-study-chatgpt-biotu.png" alt={t("Conversație ChatGPT: la cuvântul „biotu” asistentul descrie BioTu.ro ca magazin online cu peste 7.000 de produse bio și naturale și spune că site-ul apare primul în rezultate, urmat de paginile Despre noi, Contact și Producători", "ChatGPT conversation: for the word “biotu” the assistant describes BioTu.ro as an online store with over 7,000 organic and natural products and says the site comes first in the results, followed by its About, Contact and Producers pages")} loading="lazy" width={960} height={394} /><figcaption>{t("ChatGPT, întrebare „biotu”: descrie BioTu.ro ca magazin online cu peste 7.000 de produse bio și naturale; la căutarea exactă „biotu”, site-ul apare primul în rezultate, urmat de paginile Despre noi, Contact și Producători.", "ChatGPT, prompt “biotu”: describes BioTu.ro as an online store with over 7,000 organic and natural products; for the exact search “biotu”, the site comes first in the results, followed by its About, Contact and Producers pages.")}</figcaption></figure>
      </div>
      <p>{t("Un domeniu indexat din august 2026, cu 2 backlinkuri, este asociat corect cu brandul în ambele sisteme. Asta vine din structura paginilor: titluri, date structurate, llms.txt și conținut randat pe server, pe care roboții AI îl pot citi direct, fără JavaScript.", "A domain indexed since August 2026, with 2 backlinks, is correctly associated with the brand in both systems. This comes from the page structure: titles, structured data, llms.txt and server-rendered content that AI crawlers can read directly, without JavaScript.")}</p>
      <p className="case-source">{t("Sursa: capturi de ecran din 16 octombrie 2026, Google Search (AI Overview) și ChatGPT cu căutare web, aceeași interogare „biotu”. Răspunsurile asistenților AI variază în timp și în funcție de cont; capturile arată rezultatul la data testului.", "Source: screenshots from 16 October 2026, Google Search (AI Overview) and ChatGPT with web search, the same query “biotu”. AI assistant answers vary over time and by account; the screenshots show the result on the test date.")}</p></section>

      <section className="case-section"><p className="case-eyebrow">{t("Boți și securitate", "Bots and security")}</p><h2>{t("Peste 500.000 de cereri, zero coșuri false", "Over 500,000 requests, zero fake carts")}</h2>
      <p>{t("Același comerciant, aceleași produse, același tip de trafic automat. Pe magazinul vechi, boții au creat peste 8.000 de coșuri abuzive, mii în câteva ore, iar în vârfurile de atac pagina de finalizare a comenzii s-a blocat. Clienți reali au sunat să întrebe de ce nu le ajunge comanda: butonul de plasare nu mai răspundea.", "The same merchant, the same products, the same kind of automated traffic. On the existing store, bots created more than 8,000 abusive carts, thousands within a few hours, and at the peaks of the attack the checkout page froze. Real customers called to ask why their order had not arrived: the place-order button had stopped responding.")}</p>
      <Table caption={t("Același tip de trafic automat, două rezultate", "The same kind of automated traffic, two outcomes")} rows={[
        [t("Coșuri false create de boți", "Fake carts created by bots"), t("peste 8.000", "over 8,000"), "0"],
        [t("Comenzi false", "Fake orders"), t("da, amestecate cu cele reale", "yes, mixed with real ones"), "0"],
        [t("Finalizarea comenzii blocată", "Checkout blocked"), t("da, în vârfurile de atac", "yes, at attack peaks"), t("niciodată", "never")],
        [t("Încetiniri sau căderi", "Slowdowns or outages"), t("da", "yes"), t("niciuna", "none")],
        [t("Cereri în 30 de zile (Cloudflare)", "Requests in 30 days (Cloudflare)"), t("fără CDN, nemăsurat", "no CDN, not measured"), t("526.550, dintre care 415.320 neservite din cache", "526,550, of which 415,320 uncached")],
        [t("Vizitatori unici în 30 de zile", "Unique visitors in 30 days"), t("nemăsurat", "not measured"), t("37.520, cu vârf de 7.380 într-o zi", "37,520, peaking at 7,380 in one day")],
        [t("Protecție", "Protection"), t("plugin-uri și pagini de verificare adăugate ulterior", "plugins and verification pages added afterwards"), t("limitare de rată și filtre anti-boți incluse în platformă", "rate limiting and malicious-bot filters built into the platform")]
      ]}/>
      <p>{t("biotu.ro nu a avut niciun coș fals și nicio comandă falsă de la lansare. Limitarea de rată și filtrele pentru boți malițioși fac parte din platformă, nu sunt plugin-uri, și nu pun nicio pagină de verificare în fața clienților sau a Google. Traficul automat este oprit înainte să ajungă la coș, iar procesul de comandă a rămas disponibil în tot acest timp.", "biotu.ro has had no fake carts and no fake orders since launch. Rate limiting and malicious-bot filters are part of the platform, not plugins, and they put no verification page in front of customers or Google. Automated traffic is stopped before it reaches the cart, and the ordering process stayed available throughout.")}</p>
      <p className="case-source">{t("Surse: administrarea biorganicbubu.ro, octombrie 2026 (coșuri create de boți și blocarea finalizării comenzii); Cloudflare Web Traffic pentru biotu.ro, ultimele 30 de zile până la 16 octombrie 2026 (526.550 cereri, 37.520 vizitatori unici, maximum 7.380 și minimum 1.530 pe zi); jurnalele platformei; monitorizarea Uptime Kuma de mai sus, zero întreruperi.", "Sources: biorganicbubu.ro administration, October 2026 (bot-created carts and checkout blocking); Cloudflare Web Traffic for biotu.ro, the 30 days to 16 October 2026 (526,550 requests, 37,520 unique visitors, maximum 7,380 and minimum 1,530 per day); platform logs; the Uptime Kuma monitoring above, zero outages.")}</p></section>

      <section className="case-section"><p className="case-eyebrow">{n("Impact financiar estimat", "Estimated financial impact")}</p>
      <h2>{n("Doar 5% mai multe comenzi: 10.000 € în plus pe an", "Just 5% more orders: €10,000 more per year")}</h2>
      <p>{n("Pentru un magazin cu venituri brute de 200.000 € pe an, o creștere de numai 5% a numărului de comenzi ar însemna 10.000 € vânzări suplimentare anual, dacă valoarea medie a comenzii rămâne aceeași.", "For a store with annual gross revenue of €200,000, just 5% more orders would mean €10,000 in additional annual sales, assuming the average order value stays the same.")}</p>
      <div className="case-conclusions">
        <article><h3>{n("Venituri brute actuale", "Current gross revenue")}</h3><p><strong className="financial-number">200.000 € / {n("an", "year")}</strong></p></article>
        <article><h3>{n("Ipoteză de creștere a comenzilor", "Assumed order growth")}</h3><p><strong className="financial-number">+5%</strong> · {n("aceeași valoare medie a comenzii", "unchanged average order value")}</p></article>
        <article><h3>{n("Vânzări suplimentare estimate", "Estimated additional sales")}</h3><p><strong className="financial-number">+10.000 € / {n("an", "year")}</strong> · {n("aproximativ 833 € pe lună", "approximately €833 per month")}</p></article>
        <article><h3>{n("Venituri brute în scenariul estimat", "Gross revenue in this scenario")}</h3><p><strong className="financial-number">210.000 € / {n("an", "year")}</strong></p></article>
      </div>
      <p>{n("Traficul organic în creștere aduce mai mulți vizitatori. Răspunsul mai rapid și disponibilitatea magazinului pot ajuta mai mulți dintre ei să finalizeze comanda. Simularea de aici presupune o singură creștere totală de 5% a comenzilor; nu adună separat efectele traficului și vitezei.", "Growing organic traffic brings more visitors. Faster responses and store availability can help more of them complete their orders. This scenario assumes a single combined 5% increase in orders; it does not add separate traffic and speed effects.")}</p>
      <p className="case-source">{n("Calcul: 200.000 € × 5% = 10.000 € vânzări suplimentare pe an. Scenariu ilustrativ, nu rezultat financiar măsurat la biotu.ro și nici creștere garantată. Sumele reprezintă venituri brute, nu profit; nu includ deducerea costurilor suplimentare, retururilor, taxelor sau costului platformei.", "Calculation: €200,000 × 5% = €10,000 in additional annual sales. An illustrative scenario, not a measured financial result for biotu.ro or a guaranteed increase. Amounts are gross revenue, not profit; additional costs, returns, taxes and platform costs have not been deducted.")}</p></section>

      <section className="case-section"><p className="case-eyebrow">{t("Concluzii", "Conclusions")}</p><h2>{t("Ce înseamnă pentru un magazin online", "What this means for an online store")}</h2><div className="case-conclusions">{[
        [t("Magazin deschis când vin clienții", "Open when customers arrive"),t("Nicio întrerupere în patru săptămâni. Magazinul vechi a fost indisponibil în două dimineți de vânzare.", "No outages in four weeks. The existing store was unavailable during two sales mornings.")],
        [t("Pagini care se încarcă repede", "Pages that load quickly"),t("Pe mobil, pagina este vizibilă complet în 2,7 secunde, față de 4,6.", "On mobile, the page is fully visible in 2.7 seconds, compared with 4.6.")],
        [t("Vizibil în Google și în asistenții AI", "Visible in Google and AI assistants"),t("Titluri, H1, canonical, sitemap și date structurate vin din platformă, fără pluginuri. Google AI și ChatGPT recunosc brandul de la un singur cuvânt.", "Titles, H1, canonical tags, sitemaps and structured data are built into the platform, without plugins. Google AI and ChatGPT recognise the brand from a single word.")],
        [t("Boții nu ajung la coș", "Bots never reach the cart"),t("Zero coșuri și comenzi false la peste 500.000 de cereri, fără pagini de verificare în fața clienților.", "Zero fake carts and orders across more than 500,000 requests, with no verification pages in front of customers.")],
        [t("Fără griji tehnice", "Less technical administration"),t("Actualizări primite automat, facturi și AWB generate fără pași manuali.", "Automatic updates, invoices and shipping labels generated without manual steps.")],
        [t("Migrare fără oprirea vânzărilor", "Migration without stopping sales"),t("Produse, comenzi și clienți mutați; clienții vechi se autentifică din prima zi.", "Products, orders and customers migrated; existing customers can sign in from day one.")],
        [t("Serverul tău, datele tale", "Your server, your data"),t("Magazinul rulează pe un server din contul tău de cloud.", "The store runs on a server in your own cloud account.")]
      ].map(([title,body])=><article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
      <p>{t("Pasul următor: un demo cu catalogul tău real, în aceeași zi, ca să vezi înainte să decizi.", "Next step: a demo with your real catalog, on the same day, so you can see it before deciding.")}</p></section>
    </div><CtaSection locale={locale} /><SiteFooter locale={locale} roPath="/studiu-de-caz" />
  </main>;
}
