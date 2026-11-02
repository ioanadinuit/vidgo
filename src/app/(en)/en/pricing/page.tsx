import type { Metadata } from "next";

import { PricingView } from "@/views/pricing";
import { pricingMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pricingMetadata("en");

export default function PricingPage() {
  return <PricingView locale="en" />;
}
