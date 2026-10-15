import type { Metadata } from "next";

import { AboutView } from "@/views/about";
import { aboutMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = aboutMetadata("ro");

export default function AboutPage() {
  return <AboutView locale="ro" />;
}
