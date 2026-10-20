import { ActivityIcon, ArrowDownIcon, ArrowRightLeftIcon, CheckIcon, GaugeIcon, ServerIcon, SearchCheckIcon, ShieldCheckIcon, SparklesIcon, Wand2Icon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GrowthFlow } from "@/components/growth-flow";
import { ZoomFigure } from "@/components/zoom-figure";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHeader } from "@/components/page-header";
import { CtaSection } from "@/components/cta-section";
import { CaseSection } from "@/components/case/case-section";
import { ChapterRail } from "@/components/case/chapter-rail";
import { CompareBars } from "@/components/case/compare-bars";
import { FactCompare } from "@/components/case/fact-compare";
import { ScoreRings } from "@/components/case/score-rings";
import { UptimeStrip } from "@/components/case/uptime-strip";
import type { Locale } from "@/lib/i18n";

export function CaseStudyView({ locale }: { locale: Locale }) {
  const t = (ro: string, en: string) => locale === "ro" ? ro : en;
  const n = (ro: string, en: string) => t(ro, en).split(/([+€]?\d[\d.,]*(?:\s*[%€])?)/g).map((part, i) => /\d/.test(part) ? <span className="financial-number" key={i}>{part}</span> : part);
  const old = "biorganicbubu.ro";
  const next = "biotu.ro · VidGo";
  const detailsLabel = t("Detalii și surse", "Details and sources");

  const chapters = [
    { id: t("context", "context"), label: t("Contextul", "Context") },
    { id: t("disponibilitate", "availability"), label: t("Disponibilitate", "Availability") },
    { id: t("viteza", "speed"), label: t("Viteză", "Speed") },
    { id: t("pagespeed", "pagespeed"), label: "PageSpeed" },
    { id: t("administrare", "administration"), label: t("Administrare", "Administration") },
    { id: "seo", label: "SEO" },
    { id: t("boti", "bots"), label: t("Boți și securitate", "Bots and security") },
    { id: t("impact", "impact"), label: t("Impact financiar", "Financial impact") },
    { id: t("concluzii", "conclusions"), label: t("Concluzii", "Conclusions") },
  ];
  const [cContext, cUptime, cSpeed, cPageSpeed, cAdmin, cSeo, cBots, cImpact, cConclusions] = chapters;

  return <main id="main-content" className="site-page case-study relative">
    <SiteHeader locale={locale} roPath="/studiu-de-caz" />
    <PageHeader eyebrow={t("Studiu de caz · biotu.ro · Octombrie 2026", "Case study · biotu.ro · October 2026")} title={t("Rezultatele noastre", "Our results")} description={t("Un comerciant vinde același catalog pe magazinul vechi și pe unul nou, construit pe VidGo. Le-am măsurat pe amândouă cu aceleași instrumente.", "One merchant sells the same catalog through an old store and a new store built on VidGo. We measured both with the same tools.")} />
    <div className="mx-auto max-w-6xl px-4 lg:px-8">
      <GrowthFlow locale={locale} />

      <div className="case-metrics">{[
        ["100%",t("disponibilitate în patru săptămâni, față de 99,83%", "uptime over four weeks, compared with 99.83%")],
        [t("3,2×", "3.2×"),t("mai rapid la timpul median de răspuns", "faster median response time")],
        ["95",t("scor PageSpeed pe desktop, față de 84", "desktop PageSpeed score, compared with 84")],
        ["50 → 18",t("poziția în Google în 3 luni, organic, fără publicitate plătită", "Google position over 3 months, organic, without paid advertising")]
      ].map(([value,label])=><div key={value}><strong>{value}</strong><p>{label}</p></div>)}</div>

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

      <section className="case-section case-section-ai"><p className="case-eyebrow">{t("Căutare AI · GEO", "AI search · GEO")}</p><h2>{t("Google AI și ChatGPT recunosc biotu.ro de la primul cuvânt", "Google AI and ChatGPT recognise biotu.ro from the first word")}</h2>
      <p className="chapter-takeaway">{t("Un domeniu de două luni, cu 2 backlinkuri, este asociat corect cu brandul de la un singur cuvânt: „biotu”.", "A two-month-old domain with 2 backlinks is correctly tied to the brand from a single word: “biotu”.")}</p>
      <div className="case-figures case-figures-ai">
        <ZoomFigure src="/assets/case-study-google-ai-overview-biotu.png" width={1453} height={745} zoomLabel={t("Mărește captura", "Zoom the screenshot")}
          title={t("Căutarea „biotu” în", "The search “biotu” in")} accent="Google AI Overview"
          alt={t("Google AI Overview pentru căutarea „biotu”: descrie Biotu.ro ca magazin online românesc cu peste 7.000 de produse bio și listează categoriile de produse", "Google AI Overview for the search “biotu”: describes Biotu.ro as a Romanian online store with over 7,000 organic products and lists its product categories")}
          caption={t("Google AI Overview identifică Biotu.ro ca magazin online românesc cu peste 7.000 de produse bio și naturale și prezintă categoriile de produse preluate din site.", "Google AI Overview identifies Biotu.ro as a Romanian online store with over 7,000 organic and natural products and lists the product categories taken from the site.")} />
        <ZoomFigure src="/assets/case-study-chatgpt-biotu.png" width={960} height={394} zoomLabel={t("Mărește captura", "Zoom the screenshot")}
          title={t("Căutarea „biotu” în", "The search “biotu” in")} accent="ChatGPT"
          alt={t("Conversație ChatGPT: la cuvântul „biotu” asistentul descrie BioTu.ro ca magazin online cu peste 7.000 de produse bio și naturale și spune că site-ul apare primul în rezultate, urmat de paginile Despre noi, Contact și Producători", "ChatGPT conversation: for the word “biotu” the assistant describes BioTu.ro as an online store with over 7,000 organic and natural products and says the site comes first in the results, followed by its About, Contact and Producers pages")}
          caption={t("ChatGPT descrie BioTu.ro ca magazin online cu peste 7.000 de produse bio și naturale; la căutarea exactă „biotu”, site-ul apare primul în rezultate, urmat de paginile Despre noi, Contact și Producători.", "ChatGPT describes BioTu.ro as an online store with over 7,000 organic and natural products; for the exact search “biotu”, the site comes first in the results, followed by its About, Contact and Producers pages.")} />
      </div>
      <details className="chapter-details"><summary>{detailsLabel}</summary><div className="chapter-details-body">
        <p>{t("„Biotu” nu este un nume unic online: există alte branduri cu nume identic sau foarte apropiat, cu ani de istoric și mult mai multe backlinkuri. Am testat ce răspund asistenții AI la un singur cuvânt, „biotu”, fără „.ro”, fără „magazin”, fără alt context.", "“Biotu” is not a unique name online: other brands carry the same or a very similar name, with years of history and far more backlinks. We tested what AI assistants answer to a single word, “biotu”, without “.ro”, “store” or any other context.")}</p>
        <p>{t("Un domeniu indexat din august 2026, cu 2 backlinkuri, este asociat corect cu brandul în ambele sisteme. Asta vine din structura paginilor: titluri, date structurate, llms.txt și conținut randat pe server, pe care roboții AI îl pot citi direct, fără JavaScript.", "A domain indexed since August 2026, with 2 backlinks, is correctly associated with the brand in both systems. This comes from the page structure: titles, structured data, llms.txt and server-rendered content that AI crawlers can read directly, without JavaScript.")}</p>
        <p className="case-source">{t("Sursa: capturi de ecran din 16 octombrie 2026, Google Search (AI Overview) și ChatGPT cu căutare web, aceeași interogare „biotu”. Răspunsurile asistenților AI variază în timp și în funcție de cont; capturile arată rezultatul la data testului.", "Source: screenshots from 16 October 2026, Google Search (AI Overview) and ChatGPT with web search, the same query “biotu”. AI assistant answers vary over time and by account; the screenshots show the result on the test date.")}</p>
      </div></details></section>

      <div className="case-study-transition">
        <p>{t("Ce se află în spatele acestor rezultate? Nouă capitole scurte, fiecare cu o imagine și o concluzie. Sursele sunt la un click distanță.", "What is behind these results? Nine short chapters, each with a picture and a takeaway. The sources are one click away.")}</p>
        <Button size="lg" asChild><a href={`#${cContext.id}`}>{t("Vezi studiul de caz", "Explore the case study")}<ArrowDownIcon aria-hidden="true" /></a></Button>
      </div>

      <div className="case-body">
        <ChapterRail chapters={chapters} label={t("Capitolele studiului", "Study chapters")} />
        <div className="case-chapters">
          <CaseSection id={cContext.id} eyebrow={cContext.label} title={t("Același catalog, platforme diferite", "One catalog, different platforms")} detailsLabel={detailsLabel}
            takeaway={t("Același catalog de peste 7.000 de produse. Doar platforma și serverul diferă.", "The same catalog of more than 7,000 products. Only the platform and the server differ.")}
            details={<>
              <p>{t("Aceeași firmă vinde același catalog de produse bio și naturale, peste 7.000 de produse, pe două magazine care rulează în paralel.", "The same business sells more than 7,000 organic and natural products through two stores running in parallel.")}</p>
              <p>{t("Magazinul vechi are avantajul vechimii domeniului. Diferențele din capitolele următoare vin din platformă și infrastructură, nu din conținut.", "The old store has the advantage of an established domain. The differences in the following chapters come from the platform and infrastructure, rather than the content.")}</p>
            </>}>
            <FactCompare oldLabel={old} nextLabel={next} rows={[
              { label: t("Platformă", "Platform"), old: "Open source · PHP 7.0.33", next: "VidGo", oldState: "neutral" },
              { label: t("Infrastructură", "Infrastructure"), old: t("Server web LiteSpeed, fără CDN", "LiteSpeed web server, no CDN"), next: t("Server propriu (VPS), cu Cloudflare", "Dedicated VPS, with Cloudflare"), oldState: "neutral" },
              { label: t("Domeniu", "Domain"), old: t("Cu istoric: 4.700 de backlinkuri", "Established: 4,700 backlinks"), next: t("Nou, indexat din august 2026: 2 backlinkuri", "New, indexed since August 2026: 2 backlinks"), oldState: "ok" },
            ]} />
          </CaseSection>

          <CaseSection id={cUptime.id} eyebrow={cUptime.label} title={t("Patru săptămâni, verificare la fiecare minut", "Four weeks, checked every minute")} detailsLabel={detailsLabel}
            takeaway={t("Zero întreruperi în patru săptămâni. Magazinul vechi a căzut în două dimineți de vânzare.", "Zero outages in four weeks. The old store went down on two sales mornings.")}
            details={<>
              <p>{t("Magazinul vechi a căzut în orele de dimineață: sâmbătă 26 septembrie, între 08:30 și 10:00, 45 din 58 de verificări au eșuat; luni 28 septembrie, între 08:22 și 09:35, încă 13. În aceeași perioadă de monitorizare, biotu.ro nu a avut nicio întrerupere, iar un vârf de 60.000 de cereri într-o zi a trecut fără oprire.", "The old store experienced morning outages: on Saturday 26 September, between 08:30 and 10:00, 45 of 58 checks failed; on Monday 28 September, between 08:22 and 09:35, another 13 failed. During the same monitoring period, biotu.ro had no outages and handled a peak of 60,000 requests in one day without interruption.")}</p>
              <aside className="case-quote">
                <h3>{t("Întreruperile pot costa și vizibilitate în Google", "Outages can also cost Google visibility")}</h3>
                <p>{t("Cele 16 incidente și întreruperea maximă de 55 de minute înseamnă perioade în care magazinul nu putea fi accesat. Dacă Googlebot întâlnește erori de server sau conexiune, poate reduce ritmul de scanare: produsele noi și actualizările pot fi descoperite mai târziu. Erorile persistente pot duce, în timp, la eliminarea paginilor afectate din index.", "The 16 incidents and longest outage of 55 minutes represent periods when the store could not be reached. If Googlebot encounters server or connection errors, it can reduce crawling: new products and updates may be discovered later. Persistent errors can eventually lead to affected pages being removed from the index.")}</p>
                <p className="case-source">{t("Impact potențial asupra SEO, nu o penalizare măsurată în acest studiu. Datele de monitorizare nu arată dacă Googlebot a accesat magazinul în timpul incidentelor sau câte poziții ori vizite s-au pierdut.", "Potential SEO impact, not a penalty measured in this study. Monitoring data does not show whether Googlebot visited during the incidents or how many positions or visits were lost.")}</p>
                <a className="text-primary underline underline-offset-4" href="https://developers.google.com/crawling/docs/troubleshooting/http-status-codes" target="_blank" rel="noopener noreferrer">{t("Sursa: Google — efectul erorilor de server asupra scanării și indexării", "Source: Google — server errors, crawling and indexing")}</a>
              </aside>
              <p className="case-source">{t("Sursa: Uptime Kuma, verificare HTTP la 60 de secunde, același punct de monitorizare, 16 septembrie – 13 octombrie 2026; analitice de trafic biotu.ro.", "Source: Uptime Kuma, HTTP checks every 60 seconds from the same monitoring location, 16 September – 13 October 2026; biotu.ro traffic analytics.")}</p>
            </>}>
            <UptimeStrip days={28} startLabel={t("16 sept.", "16 Sep")} endLabel={t("13 oct.", "13 Oct")} rows={[
              { name: old, uptime: t("99,83%", "99.83%"), summary: t("65 verificări eșuate din 38.635 · 16 incidente în 8 zile · cea mai lungă întrerupere: 55 de minute", "65 failed checks of 38,635 · 16 incidents across 8 days · longest outage: 55 minutes"), outages: [
                { day: 10, label: t("Sâmbătă 26 sept., 08:30–10:00", "Saturday 26 Sep, 08:30–10:00") },
                { day: 12, label: t("Luni 28 sept., 08:22–09:35", "Monday 28 Sep, 08:22–09:35") },
              ] },
              { name: next, uptime: "100%", summary: t("0 verificări eșuate din 39.173 · 0 incidente · vârf de 60.000 de cereri într-o zi, fără oprire", "0 failed checks of 39,173 · 0 incidents · a 60,000-request day with no interruption"), outages: [] },
            ]} />
            <CompareBars oldLabel={old} nextLabel={next} rows={[
              { label: t("Verificări eșuate", "Failed checks"), old: 65, next: 0, oldText: "65", nextText: "0", delta: t("la zero", "to zero") },
              { label: t("Incidente", "Incidents"), old: 16, next: 0, oldText: "16", nextText: "0", delta: t("la zero", "to zero") },
              { label: t("Cea mai lungă întrerupere", "Longest outage"), old: 55, next: 0, oldText: t("55 min", "55 min"), nextText: t("niciuna", "none"), delta: t("la zero", "to zero") },
            ]} />
          </CaseSection>

          <CaseSection id={cSpeed.id} eyebrow={cSpeed.label} title={t("Timp de răspuns", "Response time")} detailsLabel={detailsLabel}
            takeaway={t("Răspuns median de 326 ms, față de 1.048 ms: de 3,2 ori mai rapid, la fiecare cerere.", "A median response of 326 ms versus 1,048 ms: 3.2 times faster, on every request.")}
            details={<p className="case-source">{t("Surse: Uptime Kuma, 16 septembrie – 13 octombrie 2026, aproximativ 39.000 de verificări per magazin; test propriu din 13 octombrie 2026, 20 de cereri către pagina principală, câte 5 în paralel. Ambele magazine au răspuns la toate cererile.", "Sources: Uptime Kuma, 16 September – 13 October 2026, approximately 39,000 checks per store; internal test on 13 October 2026, 20 homepage requests in batches of 5 concurrent requests. Both stores responded to every request.")}</p>}>
            <CompareBars oldLabel={old} nextLabel={next} rows={[
              { label: t("Median", "Median"), old: 1048, next: 326, oldText: t("1.048 ms", "1,048 ms"), nextText: "326 ms", delta: t("3,2×", "3.2×") },
              { label: t("95% din răspunsuri, sub", "95% of responses below"), old: 1491, next: 438, oldText: t("1.491 ms", "1,491 ms"), nextText: "438 ms", delta: t("3,4×", "3.4×") },
              { label: t("99% din răspunsuri, sub", "99% of responses below"), old: 2405, next: 516, oldText: t("2.405 ms", "2,405 ms"), nextText: "516 ms", delta: t("4,7×", "4.7×") },
              { label: t("Răspunsuri mai lente de 3 secunde", "Responses slower than 3 seconds"), old: 164, next: 13, oldText: "164", nextText: "13", delta: t("12,6×", "12.6×") },
              { label: t("Primul byte, median (20 de cereri)", "Time to first byte, median (20 requests)"), old: 1.23, next: 0.53, oldText: t("1,23 s", "1.23 s"), nextText: t("0,53 s", "0.53 s"), delta: t("2,3×", "2.3×") },
              { label: t("Pagina completă, median (20 de cereri)", "Full page, median (20 requests)"), old: 1.61, next: 0.63, oldText: t("1,61 s", "1.61 s"), nextText: t("0,63 s", "0.63 s"), delta: t("2,6×", "2.6×") },
            ]} />
          </CaseSection>

          <CaseSection id={cPageSpeed.id} eyebrow="Google PageSpeed" title={t("Scoruri Lighthouse pe pagina principală", "Homepage Lighthouse scores")} detailsLabel={detailsLabel}
            takeaway={t("Pe mobil, pagina este vizibilă complet în 2,7 secunde, nu în 4,6. Accesibilitate de la 61 la 97.", "On mobile, the page is fully visible in 2.7 seconds, not 4.6. Accessibility from 61 to 97.")}
            details={<>
              <p>{t("Pe mobil, scorul vine din grafică. Cel mai mare element al paginii (LCP 5,6 s, față de 4,4 s) este bannerul principal al biotu.ro, grafica de conversie a magazinului, încărcată cu prioritate. Serverul răspunde în 30 ms în test. Grafica este o decizie comercială, nu o limită a platformei.", "On mobile, the score reflects the graphics. The largest page element (LCP 5.6 s versus 4.4 s) is biotu.ro’s main conversion banner, loaded with priority. The server responds in 30 ms in the test. The graphics are a commercial decision, rather than a platform limitation.")}</p>
              <p className="case-source">{t("Sursa: pagespeed.web.dev, 13 octombrie 2026 (biotu.ro 11:54, biorganicbubu.ro 11:39).", "Source: pagespeed.web.dev, 13 October 2026 (biotu.ro 11:54, biorganicbubu.ro 11:39).")}</p>
            </>}>
            <ScoreRings oldLabel={old} nextLabel={next} items={[
              { label: t("Performanță, desktop", "Desktop performance"), old: 84, next: 95 },
              { label: t("Performanță, mobil", "Mobile performance"), old: 66, next: 75 },
              { label: t("Accesibilitate", "Accessibility"), old: 61, next: 97 },
              { label: t("Bune practici", "Best practices"), old: 73, next: 100 },
              { label: "SEO", old: 92, next: 100 },
            ]} />
            <CompareBars oldLabel={old} nextLabel={next} rows={[
              { label: t("Primul conținut afișat, mobil", "First contentful paint, mobile"), old: 3.8, next: 1.8, oldText: t("3,8 s", "3.8 s"), nextText: t("1,8 s", "1.8 s"), delta: t("−2,0 s", "−2.0 s") },
              { label: t("Pagina vizibilă complet, mobil", "Speed Index, mobile"), old: 4.6, next: 2.7, oldText: t("4,6 s", "4.6 s"), nextText: t("2,7 s", "2.7 s"), delta: t("−1,9 s", "−1.9 s") },
              { label: t("Deplasări de layout, mobil (CLS)", "Cumulative layout shift, mobile"), old: 0.188, next: 0, oldText: t("0,188", "0.188"), nextText: "0", delta: t("la zero", "to zero") },
            ]} />
          </CaseSection>

          <CaseSection id={cAdmin.id} eyebrow={cAdmin.label} title={t("Administrarea, văzută de comerciant", "Administration, from the merchant’s perspective")} detailsLabel={detailsLabel}
            takeaway={t("Sute de actualizări de produse în sub o secundă. Clienții vechi mutați fără să observe nimic.", "Hundreds of product updates in under a second. Existing customers moved without noticing anything.")}>
            <figure className="case-quote"><blockquote>{t("„E atât de rapidă că nu apuc să clipesc. Fac sute de actualizări de produse în sub o secundă. Migrarea a fost simplă: clienții vechi au fost mutați fără să observe nimic. […] E ca și cum ai avea propria platformă, cu sprijin tehnic real în spate.”", "“It is so fast I barely have time to blink. I make hundreds of product updates in under a second. Migration was simple: existing customers were moved without noticing anything. […] It is like having your own platform, with real technical support behind it.”")}</blockquote><figcaption>Elena Săulescu · biotu.ro</figcaption></figure>
            <ul className="chapter-tags">{[t("Ușor de folosit", "Easy to use"), t("Intuitiv", "Intuitive"), t("Util", "Useful"), t("Extrem de rapid", "Extremely fast"), t("Automatizat", "Automated")].map((tag) => <li key={tag}>{tag}</li>)}</ul>
          </CaseSection>

          <CaseSection id={cSeo.id} eyebrow="SEO" title={t("Audit SEO și parcursul în Google", "SEO audit and progress in Google")} detailsLabel={detailsLabel}
            takeaway={t("De la B− la A+, fără niciun plugin. În Google, de la poziția 50 la 18 în trei luni.", "From B− to A+, without a single plugin. In Google, from position 50 to 18 in three months.")}
            details={<>
              <p>{t("Pe 17 octombrie 2026, poziția medie zilnică în Google era 18,4. Cu patru săptămâni înainte era peste 30. La lansare, în a doua jumătate a lui iulie, magazinul pornea de la poziția 50 și a coborât până la 75 și a trecut printr-o indexare dificilă în august, cu zile fără afișări. Media pe trei luni, 26,5, poartă acel început; media pe ultimele 28 de zile este 24,1, iar tendința zilnică urcă săptămână de săptămână, organic, fără publicitate plătită.", "On 17 October 2026 the daily average Google position was 18.4. Four weeks earlier it was above 30. At launch, in the second half of July, the store started at position 50 and dropped as low as 75 and went through a rough indexing phase in August, with days without impressions. The three-month average, 26.5, carries that start; the 28-day average is 24.1, and the daily trend climbs week after week, organically, without paid advertising.")}</p>
              <p className="case-source">{t("Surse: SEOptimer, 13 octombrie (biorganicbubu.ro) și 16 septembrie 2026 (biotu.ro); Google Search Console, 17 octombrie 2026. Tot ce apare în coloana biotu.ro vine din platformă, fără plugin și fără configurare.", "Sources: SEOptimer, 13 October (biorganicbubu.ro) and 16 September 2026 (biotu.ro); Google Search Console, 17 October 2026. Everything in the biotu.ro column is built into the platform, without plugins or configuration.")}</p>
            </>}>
            <div className="seo-grades">
              {[
                { label: t("Nota On-Page SEO", "On-page SEO grade"), from: "B−", to: "A+", source: "SEOptimer" },
                { label: t("Nota GEO (AI)", "GEO (AI) grade"), from: "A−", to: "A+", source: "SEOptimer" },
                { label: t("Poziția în Google, 3 luni", "Google position, 3 months"), from: "50", to: "18", source: "Google Search Console" },
              ].map((g) => <div key={g.label}><p>{g.label}</p><strong><span className="seo-from">{g.from}</span><span className="seo-arrow" aria-hidden="true">→</span><span className="seo-to">{g.to}</span></strong><small>{g.source}</small></div>)}
            </div>
            <ul className="seo-checks" aria-label={t("Elemente SEO de bază", "Basic SEO elements")}>
              {[
                { label: t("Titlul paginii", "Page title"), old: t("145 de caractere", "145 characters"), next: t("56 de caractere", "56 characters") },
                ...["Heading H1", "Tag canonical", "Sitemap XML", "Open Graph"].map((label) => ({ label, old: t("Lipsește", "Missing"), next: t("Prezent", "Present") })),
              ].map((c) => <li key={c.label}><span className="seo-check-label">{c.label}</span><span className="seo-check-old"><XIcon aria-hidden="true" size={14} />{c.old}</span><span className="seo-check-next"><CheckIcon aria-hidden="true" size={14} />{c.next}</span></li>)}
            </ul>
          </CaseSection>

          <CaseSection id={cBots.id} eyebrow={cBots.label} title={t("Peste 500.000 de cereri, zero coșuri false", "Over 500,000 requests, zero fake carts")} detailsLabel={detailsLabel}
            takeaway={t("Același trafic automat. Pe magazinul vechi: peste 8.000 de coșuri false și finalizarea comenzii blocată. Pe VidGo: zero.", "The same automated traffic. On the old store: over 8,000 fake carts and a frozen checkout. On VidGo: zero.")}
            details={<>
              <p>{t("Același comerciant, aceleași produse, același tip de trafic automat. Pe magazinul vechi, boții au creat peste 8.000 de coșuri abuzive, mii în câteva ore, iar în vârfurile de atac pagina de finalizare a comenzii s-a blocat. Clienți reali au sunat să întrebe de ce nu le ajunge comanda: butonul de plasare nu mai răspundea.", "The same merchant, the same products, the same kind of automated traffic. On the old store, bots created more than 8,000 abusive carts, thousands within a few hours, and at the peaks of the attack the checkout page froze. Real customers called to ask why their order had not arrived: the place-order button had stopped responding.")}</p>
              <p>{t("biotu.ro nu a avut niciun coș fals și nicio comandă falsă de la lansare. Limitarea de rată și filtrele pentru boți malițioși fac parte din platformă, nu sunt plugin-uri, și nu pun nicio pagină de verificare în fața clienților sau a Google. Traficul automat este oprit înainte să ajungă la coș, iar procesul de comandă a rămas disponibil în tot acest timp.", "biotu.ro has had no fake carts and no fake orders since launch. Rate limiting and malicious-bot filters are part of the platform, not plugins, and they put no verification page in front of customers or Google. Automated traffic is stopped before it reaches the cart, and the ordering process stayed available throughout.")}</p>
              <p className="case-source">{t("Surse: administrarea biorganicbubu.ro, octombrie 2026 (coșuri create de boți și blocarea finalizării comenzii); Cloudflare Web Traffic pentru biotu.ro, ultimele 30 de zile până la 16 octombrie 2026 (526.550 cereri, dintre care 415.320 neservite din cache; 37.520 vizitatori unici, maximum 7.380 și minimum 1.530 pe zi); jurnalele platformei; monitorizarea Uptime Kuma de mai sus, zero întreruperi.", "Sources: biorganicbubu.ro administration, October 2026 (bot-created carts and checkout blocking); Cloudflare Web Traffic for biotu.ro, the 30 days to 16 October 2026 (526,550 requests, of which 415,320 uncached; 37,520 unique visitors, maximum 7,380 and minimum 1,530 per day); platform logs; the Uptime Kuma monitoring above, zero outages.")}</p>
            </>}>
            <div className="chapter-stats">
              <div><strong>{t("526.550", "526,550")}</strong><p>{t("cereri în 30 de zile pe biotu.ro", "requests in 30 days on biotu.ro")}</p></div>
              <div><strong>{t("37.520", "37,520")}</strong><p>{t("vizitatori unici, vârf de 7.380 într-o zi", "unique visitors, peaking at 7,380 in one day")}</p></div>
              <div><strong>0</strong><p>{t("coșuri false, comenzi false, pagini de verificare", "fake carts, fake orders, verification pages")}</p></div>
            </div>
            <FactCompare oldLabel={old} nextLabel={next} rows={[
              { label: t("Coșuri false create de boți", "Fake carts created by bots"), old: t("peste 8.000", "over 8,000"), next: "0" },
              { label: t("Comenzi false", "Fake orders"), old: t("da, amestecate cu cele reale", "yes, mixed with real ones"), next: "0" },
              { label: t("Finalizarea comenzii blocată", "Checkout blocked"), old: t("da, în vârfurile de atac", "yes, at attack peaks"), next: t("niciodată", "never") },
              { label: t("Încetiniri sau căderi", "Slowdowns or outages"), old: t("da", "yes"), next: t("niciuna", "none") },
              { label: t("Protecție", "Protection"), old: t("plugin-uri și pagini de verificare adăugate ulterior", "plugins and verification pages added afterwards"), next: t("limitare de rată și filtre anti-boți incluse în platformă", "rate limiting and malicious-bot filters built into the platform") },
            ]} />
          </CaseSection>

          <CaseSection id={cImpact.id} eyebrow={cImpact.label} title={t("Doar 5% mai multe comenzi: 10.000 € în plus pe an", "Just 5% more orders: €10,000 more per year")} detailsLabel={detailsLabel}
            takeaway={n("La 200.000 € venituri brute pe an, doar 5% mai multe comenzi înseamnă 10.000 € în plus. Scenariu ilustrativ, nu promisiune.", "At €200,000 in annual gross revenue, just 5% more orders means €10,000 more. An illustrative scenario, not a promise.")}
            details={<>
              <p>{n("Traficul organic în creștere aduce mai mulți vizitatori. Răspunsul mai rapid și disponibilitatea magazinului pot ajuta mai mulți dintre ei să finalizeze comanda. Simularea de aici presupune o singură creștere totală de 5% a comenzilor; nu adună separat efectele traficului și vitezei.", "Growing organic traffic brings more visitors. Faster responses and store availability can help more of them complete their orders. This scenario assumes a single combined 5% increase in orders; it does not add separate traffic and speed effects.")}</p>
              <p className="case-source">{n("Calcul: 200.000 € × 5% = 10.000 € vânzări suplimentare pe an. Scenariu ilustrativ, nu rezultat financiar măsurat la biotu.ro și nici creștere garantată. Sumele reprezintă venituri brute, nu profit; nu includ deducerea costurilor suplimentare, retururilor, taxelor sau costului platformei.", "Calculation: €200,000 × 5% = €10,000 in additional annual sales. An illustrative scenario, not a measured financial result for biotu.ro or a guaranteed increase. Amounts are gross revenue, not profit; additional costs, returns, taxes and platform costs have not been deducted.")}</p>
            </>}>
            <div className="case-conclusions case-impact">
              <article><h3>{n("Venituri brute actuale", "Current gross revenue")}</h3><p><strong className="financial-number">200.000 € / {t("an", "year")}</strong></p></article>
              <article><h3>{n("Ipoteză de creștere a comenzilor", "Assumed order growth")}</h3><p><strong className="financial-number">+5%</strong> · {t("aceeași valoare medie a comenzii", "unchanged average order value")}</p></article>
              <article><h3>{n("Vânzări suplimentare estimate", "Estimated additional sales")}</h3><p><strong className="financial-number">+10.000 € / {t("an", "year")}</strong> · {n("aproximativ 833 € pe lună", "approximately €833 per month")}</p></article>
              <article><h3>{n("Venituri brute în scenariul estimat", "Gross revenue in this scenario")}</h3><p><strong className="financial-number">210.000 € / {t("an", "year")}</strong></p></article>
            </div>
          </CaseSection>

          <CaseSection id={cConclusions.id} eyebrow={cConclusions.label} title={t("Ce înseamnă pentru un magazin online", "What this means for an online store")} detailsLabel={detailsLabel}
            takeaway={t("Opt lucruri pe care le primești din prima zi, fiecare măsurat mai sus.", "Eight things you get from day one, each measured above.")}>
            <div className="conclusions">{[
              { Icon: ActivityIcon, stat: "100%", title: t("Deschis când vin clienții", "Open when customers arrive"), body: t("Nicio întrerupere în patru săptămâni. Magazinul vechi: două dimineți de vânzare pierdute.", "No outages in four weeks. The old store lost two sales mornings.") },
              { Icon: GaugeIcon, stat: t("2,7 s", "2.7 s"), title: t("Pagini care se încarcă repede", "Pages that load quickly"), body: t("Pagina vizibilă complet pe mobil, față de 4,6 s.", "Fully visible on mobile, compared with 4.6 s.") },
              { Icon: SparklesIcon, stat: "A+", title: t("Vizibil în Google și în AI", "Visible in Google and AI"), body: t("Titluri, canonical, sitemap și date structurate din platformă. AI-ul recunoaște brandul dintr-un cuvânt.", "Titles, canonical tags, sitemaps and structured data built in. AI recognises the brand from one word.") },
              { Icon: ShieldCheckIcon, stat: "0", title: t("Boții nu ajung la coș", "Bots never reach the cart"), body: t("Zero coșuri false la peste 500.000 de cereri, fără pagini de verificare.", "Zero fake carts across 500,000+ requests, with no verification pages.") },
              { Icon: Wand2Icon, stat: t("auto", "auto"), title: t("Fără griji tehnice", "Less technical administration"), body: t("Actualizări primite automat, facturi și AWB generate fără pași manuali.", "Automatic updates, invoices and shipping labels generated without manual steps.") },
              { Icon: ArrowRightLeftIcon, stat: t("0 opriri", "0 downtime"), title: t("Migrare fără oprirea vânzărilor", "Migration without stopping sales"), body: t("Produse, comenzi și clienți mutați; clienții vechi se autentifică din prima zi.", "Products, orders and customers migrated; existing customers sign in from day one.") },
              { Icon: ServerIcon, stat: "VPS", title: t("Serverul tău, datele tale", "Your server, your data"), body: t("Magazinul rulează pe un server din contul tău de cloud.", "The store runs on a server in your own cloud account.") },
              { Icon: SearchCheckIcon, stat: "100", title: t("Scor SEO Lighthouse", "Lighthouse SEO score"), body: t("100 din 100 pe pagina principală, cu 100 la bune practici. Magazinul vechi: 92 și 73.", "100 of 100 on the homepage, with 100 for best practices. The old store: 92 and 73.") },
            ].map(({ Icon, stat, title, body }) => <article key={title}><Icon aria-hidden="true" size={20} /><strong>{stat}</strong><h3>{title}</h3><p>{body}</p></article>)}</div>
            <p className="chapter-next">{t("Pasul următor: un demo cu catalogul tău real, în aceeași zi, ca să vezi înainte să decizi.", "Next step: a demo with your real catalog, on the same day, so you can see it before deciding.")}</p>
          </CaseSection>
        </div>
      </div>
    </div><CtaSection locale={locale} /><SiteFooter locale={locale} roPath="/studiu-de-caz" />
  </main>;
}
