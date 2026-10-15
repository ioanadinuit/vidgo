import type { AboutContent } from "@/content/types";

export const about: AboutContent = {
  meta: {
    title: "Despre Ioana Dinu și platforma VidGo",
    description:
      "VidGo Technology este construită de Ioana Dinu, inginer software cu peste 15 ani de experiență, pentru comercianții care vor o platformă completă, întreținută de cine a scris-o.",
  },
  breadcrumb: "Despre",
  header: {
    eyebrow: "Despre",
    title: "Construită de cineva care o și întreține.",
    description:
      "VidGo Technology există pentru că între platformele SaaS care iau o parte din fiecare vânzare și magazinele custom pe care nu le mai vrea nimeni, lipsea calea de mijloc.",
  },
  photoAlt: "Ioana Dinu, fondatoarea VidGo Technology",
  role: "Ioana Dinu · Fondator",
  title: "Tu te ocupi de magazin. Eu mă ocup de platformă.",
  p1: "Peste 15 ani de dezvoltare software, cu experiență de backend senior și full-stack, la Jumbo în Olanda și pe proiecte pentru clienți IBM Netherlands. Am construit VidGo pentru comercianții care migrează de pe platforme open source sau de pe un magazin custom învechit, și pentru agențiile care livrează proiecte de e-commerce clienților lor.",
  p2: "Calea de mijloc pe care o propun este o platformă completă, personalizată pentru afacerea ta și întreținută cap-coadă, cu partea de inginerie și de conformitate deja făcută. Răspund eu, direct, nu un departament de suport.",
  linkedin: "Ioana Dinu pe LinkedIn",
  stats: [
    { value: 15, suffix: "+", label: "ani de dezvoltare software" },
    { value: 7010, suffix: "", label: "produse migrate la biotu.ro" },
    { value: 100000, suffix: "+", label: "produse în demo-ul de viteză" },
    {
      value: 4,
      suffix: "",
      label:
        "teme de storefront ca punct de start, una pe fiecare tip de magazin, editabile la infinit în elementele afișate, inclusiv cu AI",
    },
  ],
  principles: {
    eyebrow: "Principii",
    title: "Patru lucruri care nu se negociază.",
    items: [
      {
        title: "O singură aplicație",
        body: "Storefront, admin și backend sunt un singur produs, construit de aceeași echipă. Nu există un „app store” în care funcțiile de bază să fie plugin-uri scrise de altcineva.",
      },
      {
        title: "Serverul tău, datele tale",
        body: "Aplicația se instalează pe un VPS din contul tău, la furnizorul ales. Nu depinzi de găzduirea noastră și nu împarți infrastructura cu alte magazine.",
      },
      {
        title: "Fără comision din vânzări",
        body: "Un preț fix pentru construire și un abonament lunar. Platforma nu câștigă mai mult când tu vinzi mai mult.",
      },
      {
        title: "Măsurat, nu promis",
        body: "Vitezele și scorurile pe care le afișăm sunt de pe magazine reale, cu instrumentele Google, cu link ca să le verifici. Când ceva e în lucru, scrie „în lucru”.",
      },
    ],
  },
  press: {
    id: "presa",
    eyebrow: "Presă",
    title: "VidGo în presă.",
    description:
      "Interviul și episodul de podcast în care Ioana Dinu explică de ce încetinesc magazinele online, cum le testezi cu PageSpeed și cum migrezi fără să pierzi poziții în Google.",
    article: {
      outlet: "Fabricat în RO",
      kind: "Articol",
      title: "Ioana Dinu, Vidgo: 6 verificări pentru un magazin online",
      body: "Fondatoarea VidGo Technology explică de ce încetinesc magazinele online, cum testezi un site cu PageSpeed și cum migrezi fără să pierzi poziții.",
      date: "2026-10-15",
      dateLabel: "15 octombrie 2026",
      href: "https://fabricatinro.ro/podcast-cu-antreprenori-romani/ioana-dinu-vidgo/",
      image: "/assets/press-fabricat-in-ro.jpg",
      imageAlt: "Ioana Dinu, fondatoarea VidGo Technology, invitată la podcastul Fabricat în RO",
      cta: "Citește articolul pe fabricatinro.ro",
    },
    video: {
      outlet: "Podcast Fabricat în RO",
      kind: "Podcast",
      title: "De ce încetinește magazinul online și pierzi clienți?",
      body: "Episodul complet, într-un podcast cu antreprenori și producători români: viteza magazinului, migrarea de pe platforme open source și ce verifici înainte să schimbi platforma.",
      youtubeId: "6d9eW3IcBqM",
      href: "https://youtu.be/6d9eW3IcBqM",
      poster: "/assets/press-podcast-fabricat-in-ro.jpg",
      posterAlt: "Ioana Dinu la podcastul Fabricat în RO, episod pe YouTube",
      play: "Redă episodul",
      cta: "Deschide pe YouTube",
    },
  },
};
