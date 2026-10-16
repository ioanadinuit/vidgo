import { CaseStudyView } from "@/views/case-study";
import { alternatesFor } from "@/lib/metadata";
export const metadata = { title: "Studiu de caz biotu.ro — Același magazin, două platforme", description: "Comparație măsurată: disponibilitate, viteză, PageSpeed și SEO pentru același catalog pe două platforme.", alternates: alternatesFor("ro", "/studiu-de-caz"), openGraph: { type: "website", url: "/studiu-de-caz", title: "VidGo · biotu.ro case study", images: [{ url: "/assets/case-study-preview.png", width: 2400, height: 1538, alt: "VidGo results: visibility, traffic and orders" }] }, twitter: { card: "summary_large_image", title: "VidGo · biotu.ro case study", images: ["/assets/case-study-preview.png"] } };
export default function Page() { return <CaseStudyView locale="ro" />; }
