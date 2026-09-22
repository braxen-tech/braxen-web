"use client";

import { useLocale } from "next-intl";
import { AccordionFeatureSection } from "@/components/ui/accordion-feature-section";
import { anchorId } from "@/lib/anchors";

export function Portfolio() {
  const locale = useLocale();
  return <AccordionFeatureSection id={anchorId(locale, "deliveries")} />;
}
