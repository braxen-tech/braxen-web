"use client";

import { useTranslations } from "next-intl";
import { AnimatedHero } from "@/components/AnimatedHero";
import { ContactForm } from "@/components/ContactForm";
import { IntegrationCarousel } from "@/components/IntegrationCarousel";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Leadership } from "@/components/Leadership";
import { FeatureSection, type FeatureListItem } from "@/components/ui/feature";
import {
  ScrollReveal,
  SectionHeader,
  StaggerChildren,
} from "@/components/ui/scroll-reveal";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Portfolio } from "@/components/Portfolio";
import { StackedCardsSection } from "@/components/StackedCardsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/ui/footer-section";
import { siteHeaderClass, siteHeaderInnerClass } from "@/lib/site-header";
import { clientLogoRow1, clientLogoRow2 } from "@/lib/client-logos-data";
import {
  painFeatureAssets,
  solutionFeatureAssets,
} from "@/lib/home-story-data";
import { ROUTES } from "@/lib/routes";

function Nav() {
  const t = useTranslations("nav.home");
  const tCommon = useTranslations("common");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = [
    { href: "#problema", label: t("pain") },
    { href: "#como-fazemos", label: t("howWeDo") },
    { href: "#entregas", label: t("deliveries") },
    { href: "#leadership", label: t("team") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={siteHeaderClass(scrolled)}
        style={{ zIndex: 9999 }}
      >
        <div className={siteHeaderInnerClass(scrolled)}>
          <a
            href="#top"
            className="flex items-center gap-2 text-sm tracking-[0.3em] uppercase"
          >
            <span className="inline-block size-2 rounded-full bg-primary" />
            Braxen
          </a>
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs tracking-[0.25em] uppercase">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="hover:text-primary transition-colors whitespace-nowrap"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3 sm:gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
            <a
              href="#contact"
              className="btn btn-sm btn-outline btn-outline-primary hidden lg:inline-flex whitespace-nowrap tracking-[0.2em]"
            >
              {tCommon("contactCta")}
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
              aria-label={tCommon("menu")}
            >
              <span
                className={`block h-px w-5 bg-foreground transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`}
              />
              <span
                className={`block h-px w-5 bg-foreground transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-3xl tracking-[0.1em] uppercase hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="btn btn-lg btn-primary mt-4"
          >
            {tCommon("contactCta")}
            <span aria-hidden>→</span>
          </a>
          <div className="mt-2 flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      )}
    </>
  );
}

function Products() {
  const t = useTranslations("home.products");
  return (
    <section id="products" className="px-6 md:px-10 py-20 bg-card">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title={
            <>
              {t("titleLead")}{" "}
              <em className="italic text-muted-foreground">{t("titleEm")}</em>?
            </>
          }
          className="mb-10"
          titleClassName="font-sans text-heading-2"
        />
        <StaggerChildren
          className="grid gap-px bg-border md:grid-cols-2"
          stagger={0.1}
        >
          <div className="flex flex-col justify-between gap-6 bg-background p-8 md:p-10">
            <div>
              <h3 className="text-heading-3 font-sans mb-2">
                {t("aiAgents.title")}
              </h3>
              <p className="max-w-md text-sm text-muted-foreground">
                {t("aiAgents.description")}
              </p>
            </div>
            <a
              href={ROUTES.aiAgents.slice(1)}
              className="inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-primary hover:text-foreground transition-colors"
            >
              {t("aiAgents.cta")} <span aria-hidden>→</span>
            </a>
          </div>
          <div className="flex flex-col justify-between gap-6 bg-background p-8 md:p-10">
            <div>
              <h3 className="text-heading-3 font-sans mb-2">
                {t("techSquads.title")}
              </h3>
              <p className="max-w-md text-sm text-muted-foreground">
                {t("techSquads.description")}
              </p>
            </div>
            <a
              href={ROUTES.techSquads.slice(1)}
              className="inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-primary hover:text-foreground transition-colors"
            >
              {t("techSquads.cta")} <span aria-hidden>→</span>
            </a>
          </div>
        </StaggerChildren>
      </div>
    </section>
  );
}

function Contact() {
  const t = useTranslations("home.contact");
  return (
    <section id="contact" className="px-6 md:px-10 py-32 md:py-48">
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeader
          align="center"
          title={
            <>
              {t("titleLead")}{" "}
              <em className="italic text-muted-foreground">{t("titleEm")}</em>.
            </>
          }
          description={t("description")}
          className="mb-12"
          titleClassName="font-sans text-heading-2 mb-0"
          descriptionClassName="text-base md:text-lg max-w-lg mx-auto mt-6 max-w-none"
        />
        <ScrollReveal>
          <ContactForm source="/" />
        </ScrollReveal>
      </div>
    </section>
  );
}

function useHomeFeatureItems(
  namespace: "home.pain" | "home.solution",
): FeatureListItem[] {
  const t = useTranslations(namespace);
  return Array.from({ length: 4 }, (_, i) => ({
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
  }));
}

function PainFeature() {
  const t = useTranslations("home.pain");
  const items = useHomeFeatureItems("home.pain");
  return (
    <FeatureSection
      id={painFeatureAssets.id}
      title={t("title")}
      subtitle={t("subtitle")}
      image={painFeatureAssets.image}
      imageAlt={t("imageAlt")}
      items={items}
      variant="problem"
    />
  );
}

function SolutionFeature() {
  const t = useTranslations("home.solution");
  const items = useHomeFeatureItems("home.solution");
  return (
    <FeatureSection
      id={solutionFeatureAssets.id}
      title={t("title")}
      subtitle={t("subtitle")}
      image={solutionFeatureAssets.image}
      imageAlt={t("imageAlt")}
      items={items}
      variant="solution"
      reverse
    />
  );
}

export function HomePage() {
  const t = useTranslations("home");
  const tHero = useTranslations("home.hero");
  const tServices = useTranslations("home.services");

  const rotatingWords: string[] = tHero.raw("rotatingWords") ?? [];
  const serviceCards = Array.from({ length: 4 }, (_, i) => ({
    id: tServices.raw(`cards.${i}.id`) ?? `service-${i + 1}`,
    title: tServices(`cards.${i}.title`),
    description: tServices(`cards.${i}.description`),
  }));

  return (
    <main className="relative">
      <Nav />
      <AnimatedHero
        id="top"
        staticTitle={tHero("staticTitle")}
        rotatingWords={rotatingWords}
        subtitle={tHero("subtitle")}
        trustLine={tHero("trustLine")}
        primaryCta={{
          href: "#contact",
          label: tHero("primaryCta"),
          dataCta: "hero",
        }}
        secondaryCta={{
          href: "#services",
          label: tHero("secondaryCta"),
        }}
      />
      <SectionHeader
        title={t("diagnosis.title")}
        description={t("diagnosis.description")}
        align="center"
        className="mx-auto my-22 md:mb-14 bg-none border-none"
        titleClassName="mt-5 max-w-none text-xl md:text-2xl"
        descriptionClassName="font-sans text-3xl md:text-5xl max-w-2xl"
      />
      <PainFeature />
      <SectionHeader
        title={t("transformation.title")}
        description={t("transformation.description")}
        align="center"
        className="mx-auto my-22 md:mb-14 bg-none border-none"
        titleClassName="max-w-none text-xl md:text-2xl"
        descriptionClassName="font-sans text-3xl md:text-5xl max-w-3xl"
      />
      <SolutionFeature />
      <Portfolio />
      <StackedCardsSection
        id="services"
        title={
          <>
            {tServices("titleLead")}{" "}
            <em className="italic text-muted-foreground">
              {tServices("titleEm")}
            </em>
            .
          </>
        }
        description={tServices("description")}
        cards={serviceCards}
      />
      <Products />
      <IntegrationCarousel
        variant="logo"
        row1={clientLogoRow1}
        row2={clientLogoRow2}
      />
      <Leadership />
      <TestimonialsSection
        id="depoimentos"
        description={t("testimonials.description")}
      />
      <Contact />
      <Footer contactHref="#contact" />
    </main>
  );
}
