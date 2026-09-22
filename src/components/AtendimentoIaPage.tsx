"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatedHero } from "@/components/AnimatedHero";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { StackedCardsSection } from "@/components/StackedCardsSection";
import { siteHeaderClass, siteHeaderInnerClass } from "@/lib/site-header";
import { ContactForm } from "@/components/ContactForm";
import { IntegrationCarousel } from "@/components/IntegrationCarousel";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/ui/footer-section";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import {
  ScrollReveal,
  SectionHeader,
  StaggerChildren,
} from "@/components/ui/scroll-reveal";
import { ATENDIMENTO_IA_FAQ_COUNT } from "@/lib/faq-data";

import { ROUTES } from "@/lib/routes";
import { anchorHref, anchorId } from "@/lib/anchors";

const PAGE_SOURCE = ROUTES.aiAgents;
const PROCESS_STEP_IDS = ["step-1", "step-2", "step-3", "step-4"] as const;

function Nav() {
  const t = useTranslations("atendimentoIa.nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={siteHeaderClass(scrolled)}
    >
      <div className={siteHeaderInnerClass(scrolled)}>
        <a
          href=".."
          className="flex items-center gap-2 text-sm tracking-[0.3em] uppercase"
        >
          <span className="inline-block size-2 rounded-full bg-primary" />
          Braxen
        </a>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <a
            href={anchorHref(locale, "contact")}
            data-cta="nav"
            className="btn btn-sm btn-primary md:hidden"
          >
            {t("ctaShort")}
          </a>
          <a
            href={anchorHref(locale, "contact")}
            data-cta="nav"
            className="btn btn-sm btn-outline btn-outline-primary hidden md:inline-flex"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </motion.header>
  );
}

function StickyCta() {
  const t = useTranslations("atendimentoIa.sticky");
  const locale = useLocale();
  const [hideBar, setHideBar] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const contact = document.getElementById(anchorId(locale, "contact"));
    if (!hero || !contact) return;

    const update = () => {
      const heroRect = hero.getBoundingClientRect();
      const contactRect = contact.getBoundingClientRect();
      const heroInView = heroRect.bottom > 120;
      const contactInView =
        contactRect.top < window.innerHeight && contactRect.bottom > 0;
      setHideBar(heroInView || contactInView);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [locale]);

  if (hideBar) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background/95 backdrop-blur-md p-3 lg:hidden">
      <a
        href={anchorHref(locale, "contact")}
        data-cta="sticky"
        className="btn btn-primary w-full max-w-lg mx-auto"
      >
        {t("cta")}
        <MoveRight className="size-4" aria-hidden />
      </a>
    </div>
  );
}

function ProblemSolution() {
  const t = useTranslations("atendimentoIa.problem");
  const locale = useLocale();
  const pains = Array.from({ length: 3 }, (_, i) => ({
    title: t(`pains.${i}.title`),
    desc: t(`pains.${i}.desc`),
  }));
  const solutions = Array.from({ length: 3 }, (_, i) => ({
    title: t(`solutions.${i}.title`),
    desc: t(`solutions.${i}.desc`),
  }));

  return (
    <section
      id={anchorId(locale, "challenges")}
      className="px-6 md:px-10 py-24 md:py-28 border-t border-border"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          align="center"
          className="mb-12 md:mb-16"
          title={
            <>
              {t("titleLead")}{" "}
              <em className="italic text-muted-foreground">{t("titleEm")}</em>.
            </>
          }
          titleClassName="font-sans text-3xl md:text-5xl"
        />

        <div className="grid lg:grid-cols-2 gap-px bg-border">
          <div className="bg-background p-8 md:p-10">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">
              {t("todayLabel")}
            </p>
            <StaggerChildren className="space-y-8">
              {pains.map((item) => (
                <div key={item.title}>
                  <h3 className="font-sans text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </StaggerChildren>
          </div>
          <div className="bg-card/30 p-8 md:p-10">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">
              {t("withAgentsLabel")}
            </p>
            <StaggerChildren className="space-y-8">
              {solutions.map((item) => (
                <div key={item.title}>
                  <h3 className="font-sans text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const t = useTranslations("atendimentoIa.faq");
  const locale = useLocale();
  const items = Array.from({ length: ATENDIMENTO_IA_FAQ_COUNT }, (_, i) => ({
    q: t(`items.${i}.q`),
    a: t(`items.${i}.a`),
  }));
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id={anchorId(locale, "faq")}
      className="px-6 md:px-10 py-24 md:py-28 border-t border-border"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          align="center"
          className="mb-12 md:mb-16"
          title={
            <>
              {t("titleLead")}{" "}
              <em className="italic text-muted-foreground">{t("titleEm")}</em>.
            </>
          }
          titleClassName="font-sans text-3xl md:text-5xl"
        />

        <StaggerChildren className="divide-y divide-border">
          {items.map((item, i) => (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left py-6 group cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-sans text-base md:text-lg group-hover:text-primary transition-colors">
                    {item.q}
                  </h3>
                  <span className="text-primary text-xl shrink-0 mt-0.5">
                    {openIndex === i ? "−" : "+"}
                  </span>
                </div>
                {openIndex === i && (
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                    {item.a}
                  </p>
                )}
              </button>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

function Contact() {
  const t = useTranslations("atendimentoIa.contact");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  return (
    <section
      id={anchorId(locale, "contact")}
      className="px-6 md:px-10 py-24 md:py-36 border-t border-border scroll-mt-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeader
          align="center"
          className="mb-12"
          title={
            <>
              {t("titleLead")}{" "}
              <em className="italic text-muted-foreground">{t("titleEm")}</em>
            </>
          }
          description={t("description")}
          titleClassName="font-sans text-4xl leading-[0.95] mb-0"
          descriptionClassName="text-base md:text-lg max-w-lg mx-auto mt-6 max-w-none"
        />
        <ScrollReveal>
          <ContactForm
            source={PAGE_SOURCE}
            messagePlaceholder={t("messagePlaceholder")}
            submitMicrocopy={tCommon("microcopy24hShort")}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}

export function AtendimentoIaPage() {
  const tHero = useTranslations("atendimentoIa.hero");
  const tProcess = useTranslations("atendimentoIa.process");
  const tTestimonials = useTranslations("atendimentoIa.testimonials");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const rotatingWords: string[] = tHero.raw("rotatingWords") ?? [];
  const cards = PROCESS_STEP_IDS.map((id, index) => ({
    id,
    title: tProcess(`steps.${index}.title`),
    description: tProcess(`steps.${index}.description`),
  }));

  return (
    <main className="relative">
      <Nav />
      <AnimatedHero
        staticTitle={tHero("staticTitle")}
        rotatingWords={rotatingWords}
        subtitle={tHero("subtitle")}
        trustLine={tCommon("proposalIn24")}
        primaryCta={{
          href: anchorHref(locale, "contact"),
          label: tHero("primaryCta"),
          dataCta: "hero",
        }}
        secondaryCta={{
          href: anchorHref(locale, "howItWorks"),
          label: tHero("secondaryCta"),
        }}
      />
      <ProblemSolution />
      <IntegrationCarousel />
      <StackedCardsSection
        id={anchorId(locale, "howItWorks")}
        title={
          <>
            {tProcess("titleLead")}{" "}
            <em className="italic text-muted-foreground">
              {tProcess("titleEm")}
            </em>
            .
          </>
        }
        description={tProcess("description")}
        cards={cards}
      />
      <TestimonialsSection description={tTestimonials("description")} />
      <FAQ />
      <Contact />
      <Footer contactHref={anchorHref(locale, "contact")} />
      <StickyCta />
    </main>
  );
}
