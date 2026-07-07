"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AnimatedHero } from "@/components/AnimatedHero";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { siteHeaderClass, siteHeaderInnerClass } from "@/lib/site-header";
import { ContactForm } from "@/components/ContactForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/ui/footer-section";
import {
  ScrollReveal,
  SectionHeader,
  StaggerChildren,
} from "@/components/ui/scroll-reveal";
import { TECH_SQUADS_FAQ_COUNT } from "@/lib/faq-data";
import { ROUTES } from "@/lib/routes";

function Nav() {
  const tNav = useTranslations("nav.techSquads");
  const tCta = useTranslations("techSquads.nav");
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
    { href: "#desafios", label: tNav("challenges") },
    { href: "#como-funciona", label: tNav("howItWorks") },
    { href: "#diferenciais", label: tNav("differentials") },
    { href: "#perfis", label: tNav("profiles") },
    { href: "#faq", label: tNav("faq") },
  ];

  return (
    <>
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
          <nav className="hidden md:flex items-center gap-10 text-xs tracking-[0.25em] uppercase">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3 sm:gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
            <a
              href="#contato"
              className="btn btn-sm btn-outline btn-outline-primary hidden md:inline-flex"
            >
              {tCta("cta")}
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
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
            href="#contato"
            onClick={() => setMenuOpen(false)}
            className="btn btn-lg btn-primary mt-4"
          >
            {tCta("cta")}
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

function Stats() {
  const t = useTranslations("techSquads.stats");
  const stats = Array.from({ length: 4 }, (_, i) => ({
    value: t(`items.${i}.value`),
    label: t(`items.${i}.label`),
  }));

  return (
    <section className="px-6 md:px-10 py-20 border-t border-border bg-card">
      <StaggerChildren className="mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-sans text-3xl md:text-4xl text-primary mb-2">
              {s.value}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px] mx-auto">
              {s.label}
            </p>
          </div>
        ))}
      </StaggerChildren>
      <p className="text-center text-[9px] tracking-[0.2em] uppercase text-muted-foreground/50 mt-8">
        {t("sources")}
      </p>
    </section>
  );
}

function Challenges() {
  const t = useTranslations("techSquads.challenges");
  const items = Array.from({ length: 6 }, (_, i) => ({
    title: t(`items.${i}.title`),
    desc: t(`items.${i}.desc`),
  }));

  return (
    <section id="desafios" className="px-6 md:px-10 py-32 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          align="center"
          className="mb-16"
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

        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-background p-8 md:p-10 group hover:bg-card transition-colors"
            >
              <h3 className="font-sans text-xl mb-3 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

function HowItWorks() {
  const t = useTranslations("techSquads.howItWorks");
  const steps = Array.from({ length: 4 }, (_, i) => ({
    n: t(`steps.${i}.n`),
    title: t(`steps.${i}.title`),
    desc: t(`steps.${i}.desc`),
  }));

  return (
    <section
      id="como-funciona"
      className="px-6 md:px-10 py-32 border-t border-border"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          align="center"
          className="mb-16"
          title={
            <>
              {t("titleLead")}{" "}
              <em className="italic text-muted-foreground">{t("titleEm")}</em>.
            </>
          }
          titleClassName="font-sans text-3xl md:text-5xl"
        />

        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.n} className="group">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-sans text-3xl text-primary">
                  {step.n}
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <h3 className="font-sans text-xl mb-3 group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

function Differentials() {
  const t = useTranslations("techSquads.differentials");
  const items = Array.from({ length: 6 }, (_, i) => ({
    title: t(`items.${i}.title`),
    desc: t(`items.${i}.desc`),
  }));

  return (
    <section
      id="diferenciais"
      className="px-6 md:px-10 py-32 border-t border-border"
    >
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <h2 className="font-sans text-2xl md:text-4xl">
            {t("titleLead")}{" "}
            <em className="italic text-muted-foreground">{t("titleEm")}</em>.
          </h2>
          <p className="text-muted-foreground max-w-sm">{t("subtitle")}</p>
        </ScrollReveal>

        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-background p-8 md:p-10 group hover:bg-card transition-colors"
            >
              <h3 className="font-sans text-xl mb-3 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

function Profiles() {
  const t = useTranslations("techSquads.profiles");
  const categories = Array.from({ length: 3 }, (_, i) => {
    const roles: string[] = t.raw(`categories.${i}.roles`) ?? [];
    return {
      title: t(`categories.${i}.title`),
      roles,
    };
  });

  return (
    <section id="perfis" className="px-6 md:px-10 py-32 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          align="center"
          className="mb-16"
          title={
            <>
              {t("titleLead")}{" "}
              <em className="italic text-muted-foreground">{t("titleEm")}</em>.
            </>
          }
          titleClassName="font-sans text-3xl md:text-5xl"
        />

        <StaggerChildren className="grid md:grid-cols-3 gap-px bg-border">
          {categories.map((cat) => (
            <div key={cat.title} className="bg-background p-8 md:p-10">
              <h3 className="font-sans text-2xl mb-6 text-primary">
                {cat.title}
              </h3>
              <ul className="space-y-3">
                {cat.roles.map((role) => (
                  <li
                    key={role}
                    className="text-sm text-muted-foreground flex items-center gap-3"
                  >
                    <span className="size-1 rounded-full bg-primary shrink-0" />
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </StaggerChildren>

        <ScrollReveal className="text-center mt-12">
          <a href="#contato" className="btn btn-lg btn-primary">
            {t("cta")}
            <span aria-hidden>→</span>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

function MarketContext() {
  const t = useTranslations("techSquads.marketContext");
  return (
    <section className="px-6 md:px-10 py-32 md:py-48 border-t border-border">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          align="center"
          title={
            <>
              {t("titleLead")}{" "}
              <em className="italic text-muted-foreground">
                {t("titleEm")}
              </em>
              .
            </>
          }
          description={t("description")}
          titleClassName="font-sans text-[clamp(2rem,5vw,4.5rem)] mb-0"
          descriptionClassName="text-base md:text-lg max-w-2xl mx-auto mt-8 mb-0 max-w-none"
        />
        <ScrollReveal delay={0.2}>
          <p className="text-center text-xs text-muted-foreground/60 mt-8">
            {t("source")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

function FAQ() {
  const t = useTranslations("techSquads.faq");
  const items = Array.from({ length: TECH_SQUADS_FAQ_COUNT }, (_, i) => ({
    q: t(`items.${i}.q`),
    a: t(`items.${i}.a`),
  }));

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 md:px-10 py-32 border-t border-border">
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          align="center"
          className="mb-16"
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
  const t = useTranslations("techSquads.contact");
  return (
    <section
      id="contato"
      className="px-6 md:px-10 py-32 md:py-48 border-t border-border"
    >
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeader
          align="center"
          className="mb-12"
          title={
            <>
              {t("titleLead")}{" "}
              <em className="italic text-muted-foreground">{t("titleEm")}</em>.
            </>
          }
          description={t("description")}
          titleClassName="font-sans text-4xl leading-[0.95] mb-0"
          descriptionClassName="text-base md:text-lg max-w-lg mx-auto mt-6 max-w-none"
        />
        <ScrollReveal>
          <ContactForm source={ROUTES.techSquads} />
        </ScrollReveal>
      </div>
    </section>
  );
}

export function TechSquadsPage() {
  const tHero = useTranslations("techSquads.hero");

  const rotatingWords: string[] = tHero.raw("rotatingWords") ?? [];

  return (
    <main className="relative">
      <Nav />
      <AnimatedHero
        staticTitle={tHero("staticTitle")}
        rotatingWords={rotatingWords}
        subtitle={tHero("subtitle")}
        trustLine={tHero("trustLine")}
        primaryCta={{
          href: "#contato",
          label: tHero("primaryCta"),
          dataCta: "hero",
        }}
        secondaryCta={{
          href: "#como-funciona",
          label: tHero("secondaryCta"),
        }}
      />
      <Stats />
      <Challenges />
      <HowItWorks />
      <Differentials />
      <Profiles />
      <MarketContext />
      <FAQ />
      <Contact />
      <Footer contactHref="#contato" />
    </main>
  );
}
