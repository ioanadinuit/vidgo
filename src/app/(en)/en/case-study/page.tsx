import { CaseStudyView } from "@/views/case-study";
import { alternatesFor } from "@/lib/metadata";
export const metadata = { title: "biotu.ro case study — The same store, two platforms", description: "Measured comparison of uptime, speed, PageSpeed and SEO for the same catalog on two platforms.", alternates: alternatesFor("en", "/studiu-de-caz"), openGraph: { type: "website", url: "/en/case-study", title: "VidGo · biotu.ro case study", images: [{ url: "/assets/case-study-preview.png", width: 2400, height: 1538, alt: "VidGo results: visibility, traffic and orders" }] }, twitter: { card: "summary_large_image", title: "VidGo · biotu.ro case study", images: ["/assets/case-study-preview.png"] } };
export default function Page() { return <CaseStudyView locale="en" />; }
