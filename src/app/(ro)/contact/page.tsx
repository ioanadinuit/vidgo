import type { Metadata } from "next";

import { ContactView } from "@/views/contact";
import { contactMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = contactMetadata("ro");

export default function ContactPage() {
  return <ContactView locale="ro" />;
}
