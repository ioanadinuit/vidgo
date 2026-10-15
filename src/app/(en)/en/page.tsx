import type { Metadata } from "next";

import { HomeView } from "@/views/home";
import { getContent } from "@/lib/i18n";
import { alternatesFor } from "@/lib/metadata";
import { keywordsFor } from "@/lib/seo-keywords";

export const metadata: Metadata = {
  keywords: keywordsFor("en", ...getContent("en").home.keywords),
  alternates: alternatesFor("en", "/"),
};

export default function Home() {
  return <HomeView locale="en" />;
}
