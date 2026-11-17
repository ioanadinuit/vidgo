import { PressView } from "@/views/press";
import { getContent } from "@/lib/i18n";
import { alternatesFor, openGraphFor } from "@/lib/metadata";
const p = getContent("en").about.press;
// The page heading (p.title, p.description) is written for readers; the search snippet needs its own length.
const title = "VidGo in the press: interview and podcast";
const description = "The interview and podcast in which Ioana Dinu explains why online stores slow down, how to test them with PageSpeed and how to migrate without losing rankings.";
export const metadata = { title, description, alternates: alternatesFor("en", "/presa"), openGraph: openGraphFor("en", "/presa", p.title, p.description) };
export default function Page() { return <PressView locale="en" />; }
