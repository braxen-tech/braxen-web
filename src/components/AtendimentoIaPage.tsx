"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { AnimatedHero } from "@/components/AnimatedHero";
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
import { atendimentoIaFaq } from "@/lib/faq-data";

const PAGE_SOURCE = "/atendimento-ia";

function Nav() {
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
          href="/"
          className="flex items-center gap-2 text-sm tracking-[0.3em] uppercase"
        >
          <span className="inline-block size-2 rounded-full bg-primary" />
          Braxen
        </a>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contato"
            data-cta="nav"
            className="btn btn-sm btn-primary md:hidden"
          >
            Falar
          </a>
          <a
            href="#contato"
            data-cta="nav"
            className="btn btn-sm btn-outline btn-outline-primary hidden md:inline-flex"
          >
            Quero meus agentes
          </a>
        </div>
      </div>
    </motion.header>
  );
}

function StickyCta() {
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
        Quero meus agentes
        <MoveRight className="size-4" aria-hidden />
      </a>
    </div>
  );
}

function ProblemSolution() {
  const pains = [
    {
      title: "Leads sem resposta",
      desc: "Cliente manda mensagem à noite e só recebe retorno no dia seguinte — se receber.",
    },
    {
      title: "Canais fragmentados",
      desc: "WhatsApp, e-mail e chat no site em lugares diferentes. Nada conversa entre si.",
    },
    {
      title: "Zero visibilidade",
      desc: "Não sabe quantos leads entraram, quantos foram atendidos, quantos viraram venda.",
    },
  ];

  const solutions = [
    {
      title: "Atendimento 24/7 em todos os canais",
      desc: "WhatsApp, Telegram, e-mail, SMS e chat no site — um agente, uma fila, histórico unificado.",
    },
    {
      title: "CRM integrado na operação",
      desc: "Pipeline visual, tags automáticas e métricas de conversão. Tudo num só lugar.",
    },
    {
      title: "Vendas, agenda e APIs conectadas",
      desc: "Agenda reuniões, vende no chat e integra ERP, pagamentos ou sistemas internos.",
    },
  ];

  return (
    <section id="desafios" className="px-6 md:px-10 py-24 md:py-28 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          align="center"
          className="mb-12 md:mb-16"
          title={
            <>
              Do caos manual à{" "}
              <em className="italic text-muted-foreground">
                operação que escala
              </em>
              .
            </>
          }
          titleClassName="font-sans text-3xl md:text-5xl"
        />

        <div className="grid lg:grid-cols-2 gap-px bg-border">
          <div className="bg-background p-8 md:p-10">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">
              Hoje
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
              Com agentes Braxen
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

const processSteps = [
  {
    id: "step-1",
    title: "Diagnóstico",
    description:
      "Mapeamos seu fluxo de atendimento, canais ativos e integrações necessárias. Entendemos volume, gargalos e o que precisa automatizar primeiro.",
  },
  {
    id: "step-2",
    title: "Treino do agente",
    description:
      "Configuramos a IA com o conhecimento do seu negócio — produtos, regras comerciais, tom de voz e respostas para as objeções mais comuns.",
  },
  {
    id: "step-3",
    title: "Integração",
    description:
      "Conectamos WhatsApp, Telegram, e-mail, chat no site, CRM e APIs externas. Tudo conversando na mesma operação.",
  },
  {
    id: "step-4",
    title: "Colocamos no ar",
    description:
      "Em semanas — não meses. Acompanhamos os primeiros dias, ajustamos o agente e garantimos que a operação rode redondo.",
  },
] as const;

function FAQ() {
  const items = atendimentoIaFaq;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 md:px-10 py-24 md:py-28 border-t border-border">
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          align="center"
          className="mb-12 md:mb-16"
          title={
            <>
              Tire suas{" "}
              <em className="italic text-muted-foreground">dúvidas</em>.
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
              Monte seus agentes de IA com a{" "}
              <em className="italic text-muted-foreground">Braxen</em>
            </>
          }
          description="Descreva sua operação. Retorno em até 24 horas com análise técnica — sem compromisso."
          titleClassName="font-sans text-4xl leading-[0.95] mb-0"
          descriptionClassName="text-base md:text-lg max-w-lg mx-auto mt-6 max-w-none"
        />
        <ScrollReveal>
          <ContactForm
            source={PAGE_SOURCE}
            messagePlaceholder="Ex.: atendo ~200 leads/mês no WhatsApp e preciso integrar com meu ERP..."
            submitMicrocopy="Resposta em até 24h"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}

export function AtendimentoIaPage() {
  return (
    <main className="relative">
      <Nav />
      <AnimatedHero
        staticTitle="Operação de atendimento"
        rotatingWords={[
          "inteligente",
          "omnichannel",
          "integrada",
          "automatizada",
          "escalável",
        ]}
        subtitle="Agentes de IA com CRM integrado. Qualificação 24/7, vendas na conversa e integração com suas APIs."
        trustLine="Proposta em 24h · no ar em semanas"
        primaryCta={{
          href: "#contato",
          label: "Quero meus agentes",
          dataCta: "hero",
        }}
        secondaryCta={{
          href: "#como-funciona",
          label: "Ver como funciona",
        }}
      />
      <ProblemSolution />
      <IntegrationCarousel />
      <StackedCardsSection
        id="como-funciona"
        title={
          <>
            Do diagnóstico à operação{" "}
            <em className="italic text-muted-foreground">no ar em semanas</em>.
          </>
        }
        description="Implantação com suporte na operação — monitoramento, ajustes do agente e evolução contínua depois de colocar no ar."
        cards={processSteps}
      />
      <TestimonialsSection />
      <FAQ />
      <Contact />
      <Footer contactHref="#contato" />
      <StickyCta />
    </main>
  );
}
