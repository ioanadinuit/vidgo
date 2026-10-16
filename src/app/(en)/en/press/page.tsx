import { PressView } from "@/views/press";
import { getContent } from "@/lib/i18n";
import { alternatesFor, openGraphFor } from "@/lib/metadata";
const p = getContent("en").about.press;
export const metadata = { title: p.title, description: p.description, alternates: alternatesFor("en", "/presa"), openGraph: openGraphFor("en", "/presa", p.title, p.description) };
export default function Page() { return <PressView locale="en" />; }
