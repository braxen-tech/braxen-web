"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { AnimatedHero } from "@/components/AnimatedHero";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { StackedCardsSection } from "@/components/StackedCardsSection";
import { siteHeaderClass, siteHeaderInnerClass } from "@/lib/site-header";
import { ContactForm } from "@/components/ContactForm";
import { IntegrationCarousel } from "@/components/IntegrationCarousel";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/ui/footer-section";
import {
  ScrollReveal,
  SectionHeader,
  StaggerChildren,
} from "@/components/ui/scroll-reveal";
import {
  CLINICAS_PAINS_COUNT,
  CLINICAS_SOLUTIONS_COUNT,
  CLINICAS_PROCESS_STEP_IDS,
} from "@/lib/clinicas-story-data";
import { CLINICAS_FAQ_COUNT } from "@/lib/clinicas-faq";

import { ROUTES } from "@/lib/routes";

const PAGE_SOURCE = ROUTES.clinics;

function Nav() {
  const t = useTranslations("clinicas.nav");
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
            href="#contato"
            data-cta="nav"
            className="btn btn-sm btn-primary md:hidden"
          >
            {t("ctaShort")}
          </a>
          <a
            href="#contato"
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
  const t = useTranslations("clinicas.sticky");
  const [hideBar, setHideBar] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const contact = document.getElementById("contato");
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
  }, []);

  if (hideBar) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background/95 backdrop-blur-md p-3 lg:hidden">
      <a
        href="#contato"
        data-cta="sticky"
        className="btn btn-primary w-full max-w-lg mx-auto"
      >
        {t("cta")}
        <MoveRight className="size-4" aria-hidden />
      </a>
    </div>
  );
}

function OmnichannelVisual() {
  const t = useTranslations("clinicas.omnichannel");
  return (
    <section
      id="inbox"
      className="border-t border-border px-6 md:px-10 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          align="center"
          className="mb-10 md:mb-14"
          title={
            <>
              {t("titleLead")}{" "}
              <em className="italic text-muted-foreground">{t("titleEm")}</em>
            </>
          }
          description={t("description")}
          titleClassName="font-sans text-3xl md:text-5xl"
          descriptionClassName="mx-auto mt-5 max-w-2xl"
        />
        <ScrollReveal className="overflow-hidden rounded-sm border border-border bg-muted/20">
          <img
            src="/clinicas-omnichannel.jpg"
            alt={t("imageAlt")}
            width={1920}
            height={1080}
            loading="lazy"
            decoding="async"
            className="w-full aspect-video object-cover object-center"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}

function ProblemSolution() {
  const t = useTranslations("clinicas.problem");
  const pains = Array.from({ length: CLINICAS_PAINS_COUNT }, (_, i) => ({
    title: t(`pains.${i}.title`),
    desc: t(`pains.${i}.desc`),
  }));
  const solutions = Array.from({ length: CLINICAS_SOLUTIONS_COUNT }, (_, i) => ({
    title: t(`solutions.${i}.title`),
    desc: t(`solutions.${i}.desc`),
  }));

  return (
    <section
      id="desafios"
      className="px-6 md:px-10 py-24 md:py-28 border-t border-border"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          align="center"
          className="mb-12 md:mb-16"
          title={
            <>
              {t("titleLead")}{" "}
              <em className="italic text-muted-foreground">
                {t("titleEm")}
              </em>
              .
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
              {t("withBraxenLabel")}
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

function TrustSection() {
  const t = useTranslations("clinicas.trust");
  const items = Array.from({ length: 3 }, (_, i) => ({
    title: t(`items.${i}.title`),
    desc: t(`items.${i}.desc`),
  }));

  return (
    <section className="border-t border-border px-6 md:px-10 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {items.map((item) => (
            <div key={item.title} className="bg-background p-8 md:p-10">
              <h3 className="font-sans text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const t = useTranslations("clinicas.faq");
  const items = Array.from({ length: CLINICAS_FAQ_COUNT }, (_, i) => ({
    q: t(`items.${i}.q`),
    a: t(`items.${i}.a`),
  }));
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
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
  const t = useTranslations("clinicas.contact");
  const tCommon = useTranslations("common");
  return (
    <section
      id="contato"
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

export function ClinicasPage() {
  const tHero = useTranslations("clinicas.hero");
  const tCommon = useTranslations("common");
  const tProcess = useTranslations("clinicas.process");
  const tIntegrations = useTranslations("clinicas.integrations");

  const rotatingWords: string[] = tHero.raw("rotatingWords") ?? [];
  const cards = CLINICAS_PROCESS_STEP_IDS.map((id) => ({
    id,
    title: tProcess(`steps.${CLINICAS_PROCESS_STEP_IDS.indexOf(id)}.title`),
    description: tProcess(
      `steps.${CLINICAS_PROCESS_STEP_IDS.indexOf(id)}.description`,
    ),
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
          href: "#contato",
          label: tHero("primaryCta"),
          dataCta: "hero",
        }}
        secondaryCta={{
          href: "#inbox",
          label: tHero("secondaryCta"),
        }}
      />
      <OmnichannelVisual />
      <ProblemSolution />
      <IntegrationCarousel description={tIntegrations("description")} />
      <StackedCardsSection
        id="como-funciona"
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
      <TrustSection />
      <FAQ />
      <Contact />
      <Footer contactHref="#contato" />
      <StickyCta />
    </main>
  );
}
