"use client";

import { ZenarateNav } from "@/components/zenarate/ZenarateNav";
import { HeroSection } from "@/components/zenarate/HeroSection";
import { LogoOrbit } from "@/components/zenarate/LogoOrbit";
import { ProductShowcase } from "@/components/zenarate/ProductShowcase";
import { HighlightBanner } from "@/components/zenarate/HighlightBanner";

import { InsightsGrid } from "@/components/zenarate/InsightsGrid";
import { RolesIndustries } from "@/components/zenarate/RolesIndustries";
import { Leadership } from "@/components/Leadership";
import { ClosingCta } from "@/components/zenarate/ClosingCta";
import { ContactStrip } from "@/components/zenarate/ContactStrip";
import { ZenarateFooter } from "@/components/zenarate/ZenarateFooter";

export function HomePage() {
  return (
    <>
      <ZenarateNav />
      <HeroSection />
      <LogoOrbit />
      <RolesIndustries />
      <ProductShowcase />
      <Leadership />
      <HighlightBanner />
      <section id="cases">
        <InsightsGrid />
      </section>
      <ClosingCta ctaHref="#contato" />
      <section id="contato">
        <ContactStrip />
      </section>
      <ZenarateFooter />
    </>
  );
}
