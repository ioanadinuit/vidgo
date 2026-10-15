import type { ContactContent } from "@/content/types";

export const contact: ContactContent = {
  meta: {
    title: "Contact și demo gratuit al magazinului tău",
    description:
      "Îți construim gratuit un demo al magazinului tău pe platforma VidGo, cu skin-ul, produsele și identitatea ta. Sau scrie direct: răspunde persoana care a construit platforma, nu un departament.",
  },
  breadcrumb: "Contact",
  header: {
    eyebrow: "Contact",
    title: "Vorbești direct cu cine a construit platforma.",
    description: "Fără formular de tichete și fără cont de suport. Alege canalul care îți e la îndemână.",
  },
  channels: [
    {
      title: "Un demo gratuit al magazinului tău",
      body: "Îți construim gratuit un demo pe platforma noastră, cu skin-ul, produsele și identitatea ta. Ne ceri, noi îl facem.",
      cta: "Solicită un demo gratuit",
      target: "start",
    },
    {
      title: "Email",
      body: "Pentru întrebări, oferte scrise sau ca să trimiți adresa magazinului actual înainte de discuție.",
      target: "email",
    },
    {
      title: "Telefon",
      body: "Luni până vineri, în timpul programului. Dacă nu răspund, revin eu.",
      target: "phone",
    },
    {
      title: "Spune-mi ce te doare la magazinul actual",
      body: "Un formular scurt: ce platformă ai, ce nu merge, cum te găsesc. Primești un răspuns concret, nu un newsletter.",
      cta: "Deschide formularul",
      target: "start",
    },
  ],
  linkedin: "Ioana Dinu pe LinkedIn",
};
