import type { Metadata } from "next";

import { AboutView } from "@/views/about";
import { aboutMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = aboutMetadata("en");

export default function AboutPage() {
  return <AboutView locale="en" />;
}
