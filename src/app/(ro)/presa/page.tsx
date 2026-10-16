import { PressView } from "@/views/press";
import { getContent } from "@/lib/i18n";
import { alternatesFor, openGraphFor } from "@/lib/metadata";
const p = getContent("ro").about.press;
export const metadata = { title: p.title, description: p.description, alternates: alternatesFor("ro", "/presa"), openGraph: openGraphFor("ro", "/presa", p.title, p.description) };
export default function Page() { return <PressView locale="ro" />; }
