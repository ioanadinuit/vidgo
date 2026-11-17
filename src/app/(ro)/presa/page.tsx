import { PressView } from "@/views/press";
import { getContent } from "@/lib/i18n";
import { alternatesFor, openGraphFor } from "@/lib/metadata";
const p = getContent("ro").about.press;
// The page heading (p.title, p.description) is written for readers; the search snippet needs its own length.
const title = "VidGo în presă: interviu și podcast";
const description = "Interviul și podcastul în care Ioana Dinu explică de ce încetinesc magazinele online, cum le testezi cu PageSpeed și cum migrezi fără să pierzi poziții.";
export const metadata = { title, description, alternates: alternatesFor("ro", "/presa"), openGraph: openGraphFor("ro", "/presa", p.title, p.description) };
export default function Page() { return <PressView locale="ro" />; }
