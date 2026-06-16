"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack";
import { siteHeaderClass, siteHeaderInnerClass } from "@/lib/site-header";
import { ContactForm } from "@/components/ContactForm";
import { ScrollReelTestimonials } from "@/components/ScrollReelTestimonials";
import { IntegrationCarousel } from "@/components/IntegrationCarousel";
import { INBOXY_URL } from "@/lib/inboxy";
import { atendimentoIaFaq } from "@/lib/faq-data";
import { atendimentoIaTestimonials } from "@/lib/atendimento-ia-testimonials";

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

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["inteligente", "omnichannel", "integrada", "automatizada", "escalável"],
    [],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((current) => (current + 1) % titles.length);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles.length]);

  return (
    <section
      id="hero"
      className="relative w-full border-b border-border bg-background bg-grain pt-28 pb-16 md:flex md:min-h-[85vh] md:items-center md:pt-32 md:pb-24"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center md:gap-8">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-sans text-[2rem] leading-[1.05] tracking-tight sm:text-4xl md:text-6xl lg:text-7xl"
          >
            <span className="text-foreground">Operação de atendimento</span>
            <span className="relative mt-1 flex h-[1.1em] w-full justify-center overflow-hidden md:mt-2">
              {titles.map((title, index) => (
                <motion.span
                  key={title}
                  className="absolute font-sans text-foreground"
                  initial={{ opacity: 0, y: "-100%" }}
                  transition={{ type: "spring", stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? { y: 0, opacity: 1 }
                      : {
                          y: titleNumber > index ? "-150%" : "150%",
                          opacity: 0,
                        }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-lg"
          >
            Agentes de IA com CRM integrado. Qualificação 24/7, vendas na
            conversa e integração com suas APIs.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground md:text-xs"
          >
            Proposta em 24h · no ar em semanas
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:justify-center"
          >
            <a
              href="#contato"
              data-cta="hero"
              className="btn btn-lg btn-primary w-full sm:w-auto"
            >
              Quero meus agentes
              <MoveRight className="size-4" aria-hidden />
            </a>
            <a
              href="#como-funciona"
              className="btn btn-lg btn-outline btn-muted hidden sm:inline-flex"
            >
              Ver como funciona
            </a>
            <a
              href="#como-funciona"
              className="py-1 text-[10px] tracking-[0.22em] uppercase text-muted-foreground transition-colors hover:text-foreground sm:hidden"
            >
              Ver como funciona →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
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
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            — Problema e solução
          </p>
          <h2 className="font-sans text-3xl md:text-5xl">
            Do caos manual à{" "}
            <em className="italic text-muted-foreground">operação que escala</em>.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-border">
          <div className="bg-background p-8 md:p-10">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">
              Hoje
            </p>
            <ul className="space-y-8">
              {pains.map((item) => (
                <li key={item.title}>
                  <h3 className="font-sans text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card/30 p-8 md:p-10">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">
              Com agentes Braxen
            </p>
            <ul className="space-y-8">
              {solutions.map((item) => (
                <li key={item.title}>
                  <h3 className="font-sans text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const NAV_STICKY_OFFSET = 96;
const CARD_STACK_INCREMENT_Y = 12;

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

function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateStackScroll = () => {
      const container = containerRef.current;
      const card = cardRef.current;
      if (!container || !card) return;

      const cardHeight = card.getBoundingClientRect().height;
      const count = processSteps.length;
      const gap = 16;
      const stackRunway =
        (count - 1) * Math.max(cardHeight - CARD_STACK_INCREMENT_Y, 120);

      container.style.minHeight = `${Math.ceil(
        cardHeight * count + gap * (count - 1) + stackRunway,
      )}px`;
    };

    updateStackScroll();

    const observer = new ResizeObserver(updateStackScroll);
    if (cardRef.current) observer.observe(cardRef.current);

    window.addEventListener("resize", updateStackScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateStackScroll);
    };
  }, []);

  return (
    <section
      id="como-funciona"
      className="scroll-mt-24 border-t border-border px-6 md:px-10 py-24 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-start md:gap-12 xl:gap-16">
        <div className="md:sticky md:top-24 md:self-start md:py-4">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            — Como funciona
          </p>
          <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl tracking-tight mb-6">
            Do diagnóstico à operação{" "}
            <em className="italic text-muted-foreground">no ar em semanas</em>.
          </h2>
          <p className="max-w-prose text-sm leading-relaxed text-muted-foreground md:text-base">
            Implantação com suporte na operação — monitoramento, ajustes do
            agente e evolução contínua depois de colocar no ar.
          </p>
        </div>

        <ContainerScroll ref={containerRef} className="space-y-4 pb-4 md:pb-8">
          {processSteps.map((step, index) => (
            <CardSticky
              key={step.id}
              ref={index === 0 ? cardRef : undefined}
              index={index + 1}
              baseTop={NAV_STICKY_OFFSET}
              incrementY={CARD_STACK_INCREMENT_Y}
              incrementZ={10}
              className="rounded-lg border border-border bg-card/80 p-6 shadow-lg shadow-black/10 backdrop-blur-md md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-sans text-xl md:text-2xl tracking-tight">
                  {step.title}
                </h3>
                <span className="font-sans text-xl md:text-2xl text-primary tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {step.description}
              </p>
            </CardSticky>
          ))}
        </ContainerScroll>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="px-6 md:px-10 py-24 md:py-28 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            — Clientes satisfeitos
          </p>
          <h2 className="font-sans text-3xl md:text-5xl mb-4">
            Quem já confia na{" "}
            <em className="italic text-muted-foreground">Braxen</em>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base">
            Resultados reais em atendimento, CRM e automação.
          </p>
        </div>

        <div className="flex justify-center">
          <ScrollReelTestimonials testimonials={atendimentoIaTestimonials} />
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = atendimentoIaFaq;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 md:px-10 py-24 md:py-28 border-t border-border">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            — Perguntas frequentes
          </p>
          <h2 className="font-sans text-3xl md:text-5xl">
            Tire suas{" "}
            <em className="italic text-muted-foreground">dúvidas</em>.
          </h2>
        </div>

        <div className="divide-y divide-border">
          {items.map((item, i) => (
            <button
              key={i}
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
          ))}
        </div>
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
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-8">
          — Próximo passo
        </p>
        <h2 className="font-sans text-4xl leading-[0.95] mb-6">
          Monte seus agentes de IA com a{" "}
          <em className="italic text-muted-foreground">Braxen</em>
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto mb-12 leading-relaxed">
          Descreva sua operação. Retorno em até 24 horas com análise técnica —
          sem compromisso.
        </p>
        <ContactForm
          source={PAGE_SOURCE}
          messagePlaceholder="Ex.: atendo ~200 leads/mês no WhatsApp e preciso integrar com meu ERP..."
          submitMicrocopy="Abre o WhatsApp · Resposta em até 24h"
        />
      </div>
    </section>
  );
}

function InboxyLink() {
  return (
    <section className="px-6 md:px-10 py-12 border-t border-border">
      <p className="text-center text-sm text-muted-foreground">
        Prefere começar sozinho?{" "}
        <a
          href={INBOXY_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="inboxy"
          className="text-primary hover:text-foreground transition-colors underline-offset-4 hover:underline"
        >
          Conheça o Inboxy
        </a>
      </p>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 md:px-10 py-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
      <p>
        © {new Date().getFullYear()} Braxen Tech — Todos os direitos reservados
      </p>
      <p className="flex items-center gap-2">
        <span className="inline-block size-1.5 rounded-full bg-primary blink" />
        Construído no escuro
      </p>
    </footer>
  );
}

export function AtendimentoIaPage() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <ProblemSolution />
      <IntegrationCarousel />
      <HowItWorks />
      <TestimonialsSection />
      <FAQ />
      <Contact />
      <InboxyLink />
      <Footer />
      <StickyCta />
    </main>
  );
}
