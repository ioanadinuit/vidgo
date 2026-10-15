import type { Metadata } from "next";

import { ContactView } from "@/views/contact";
import { contactMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = contactMetadata("en");

export default function ContactPage() {
  return <ContactView locale="en" />;
}
