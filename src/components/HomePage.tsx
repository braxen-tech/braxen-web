"use client";

import { AnimatedHero } from "@/components/AnimatedHero";
import { ContactForm } from "@/components/ContactForm";
import { IntegrationCarousel } from "@/components/IntegrationCarousel";
import { Leadership } from "@/components/Leadership";
import { FeatureSection } from "@/components/ui/feature";
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
import { painFeature, solutionFeature } from "@/lib/home-story-data";

const serviceCards = [
  {
    id: "service-1",
    title: "Software Sob Medida",
    description:
      "ERPs, CRMs, dashboards e plataformas internas construídos para o seu processo — não para um template genérico.",
  },
  {
    id: "service-2",
    title: "Sites e Aplicativos",
    description:
      "Presença digital que converte. Web, mobile e landing pages de alto desempenho, do design à produção.",
  },
  {
    id: "service-3",
    title: "Agentes de IA",
    description:
      "Atendimento, qualificação de leads e automação de operações rodando 24h com inteligência artificial generativa.",
  },
  {
    id: "service-4",
    title: "Automações e Integrações",
    description:
      "WhatsApp, pagamentos, APIs externas e processos internos conectados — seu time faz menos, entrega mais.",
  },
] as const;

function Nav() {
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
    { href: "#problema", label: "A Dor" },
    { href: "#como-fazemos", label: "Como fazemos" },
    { href: "#entregas", label: "Entregas" },
    { href: "#leadership", label: "Time" },
    { href: "#contact", label: "Contato" },
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
            <ThemeToggle />
            <a
              href="#contact"
              className="btn btn-sm btn-outline btn-outline-primary hidden lg:inline-flex whitespace-nowrap tracking-[0.2em]"
            >
              Fale conosco
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
              aria-label="Menu"
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
            Fale conosco
            <span aria-hidden>→</span>
          </a>
          <ThemeToggle className="mt-2" />
        </div>
      )}
    </>
  );
}

function Products() {
  return (
    <section
      id="products"
      className="px-6 md:px-10 py-20 border-t border-border bg-card"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title={
            <>
              Pronto para{" "}
              <em className="italic text-muted-foreground">começar</em>?
            </>
          }
          className="mb-10"
          titleClassName="font-sans text-heading-2"
        />
        <StaggerChildren className="grid gap-px bg-border md:grid-cols-2" stagger={0.1}>
          <div className="flex flex-col justify-between gap-6 bg-background p-8 md:p-10">
            <div>
              <h3 className="text-heading-3 font-sans mb-2">Agentes de IA</h3>
              <p className="max-w-md text-sm text-muted-foreground">
                Atendimento omnichannel com CRM integrado, agenda, vendas e
                integração com suas APIs.
              </p>
            </div>
            <a
              href="/atendimento-ia"
              className="inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-primary hover:text-foreground transition-colors"
            >
              Conhecer solução <span aria-hidden>→</span>
            </a>
          </div>
          <div className="flex flex-col justify-between gap-6 bg-background p-8 md:p-10">
            <div>
              <h3 className="text-heading-3 font-sans mb-2">Tech Squads</h3>
              <p className="max-w-md text-sm text-muted-foreground">
                Times completos de desenvolvimento, produto, dados e IA
                integrados ao seu negócio.
              </p>
            </div>
            <a
              href="/tech-squads"
              className="inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-primary hover:text-foreground transition-colors"
            >
              Montar meu squad <span aria-hidden>→</span>
            </a>
          </div>
        </StaggerChildren>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="px-6 md:px-10 py-32 md:py-48 border-t border-border"
    >
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeader
          align="center"
          title={
            <>
              Vamos construir{" "}
              <em className="italic text-muted-foreground">sua solução</em>.
            </>
          }
          description="Descreva o problema. Nossa equipe retorna em até 24 horas com uma análise técnica e os próximos passos."
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

export function HomePage() {
  return (
    <main className="relative">
      <Nav />
      <AnimatedHero
        id="top"
        staticTitle="Software e agentes de IA"
        rotatingWords={[
          "escaláveis",
          "inteligentes",
          "integrados",
          "automatizados",
          "sob medida",
        ]}
        subtitle="Desenvolvemos software sob medida, agentes de IA e automações que transformam operações manuais em crescimento real."
        trustLine="Resposta em 24h · primeira entrega em semanas"
        primaryCta={{
          href: "#contact",
          label: "Quero uma solução",
          dataCta: "hero",
        }}
        secondaryCta={{
          href: "#services",
          label: "Ver serviços",
        }}
      />
      <IntegrationCarousel
        variant="logo"
        row1={clientLogoRow1}
        row2={clientLogoRow2}
      />
      <FeatureSection {...painFeature} variant="problem" />
      <FeatureSection {...solutionFeature} variant="solution" reverse />
      <Portfolio />
      <StackedCardsSection
        id="services"
        title={
          <>
            O que{" "}
            <em className="italic text-muted-foreground">construímos</em>.
          </>
        }
        description="Quatro pilares, uma equipe. Montamos times especializados que entregam juntos e acompanham os resultados ao longo do tempo."
        cards={serviceCards}
      />
      <Products />
      <Leadership />
      <TestimonialsSection
        id="depoimentos"
        description="Resultados reais em software, atendimento e automação."
      />
      <Contact />
      <Footer contactHref="#contact" />
    </main>
  );
}
