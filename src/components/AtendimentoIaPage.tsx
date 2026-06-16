"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import flowImg from "@/assets/flow-whatsapp-crm.jpg";
import { siteHeaderClass, siteHeaderInnerClass } from "@/lib/site-header";
import { imageSrc } from "@/lib/utils";
import { ContactForm } from "@/components/ContactForm";
import { ScrollReelTestimonials } from "@/components/ScrollReelTestimonials";
import { INBOXY_URL } from "@/lib/inboxy";
import { atendimentoIaFaq } from "@/lib/faq-data";
import { atendimentoIaTestimonials } from "@/lib/atendimento-ia-testimonials";

const PAGE_SOURCE = "/atendimento-ia";

function PrimaryCta({
  href = "#contato",
  children = "Quero meus agentes",
  className = "",
  dataCta,
}: {
  href?: string;
  children?: React.ReactNode;
  className?: string;
  dataCta?: string;
}) {
  return (
    <a
      href={href}
      data-cta={dataCta}
      className={`inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-xs tracking-[0.25em] uppercase hover:opacity-90 transition-opacity ${className}`}
    >
      {children}
      <span aria-hidden>→</span>
    </a>
  );
}

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
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
            href="/"
            className="flex items-center gap-2 text-sm tracking-[0.3em] uppercase"
          >
            <span className="inline-block size-2 rounded-full bg-primary" />
            Braxen
          </a>
          <div className="flex items-center gap-4">
            <a
              href="#contato"
              data-cta="nav"
              className="hidden md:inline-flex text-xs tracking-[0.25em] uppercase border-hairline px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Quero meus agentes
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
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
          <a
            href="#contato"
            data-cta="nav-mobile"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-xs tracking-[0.25em] uppercase"
          >
            Quero meus agentes
            <span aria-hidden>→</span>
          </a>
        </div>
      )}
    </>
  );
}

function StickyCta() {
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const el = document.getElementById("contato");
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setContactVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (contactVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background/95 backdrop-blur-md px-4 py-3 lg:hidden">
      <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
        <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground leading-snug">
          Agentes de IA para sua operação
        </p>
        <a
          href="#contato"
          data-cta="sticky"
          className="shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 text-[10px] tracking-[0.25em] uppercase"
        >
          Falar com a Braxen
        </a>
      </div>
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
    <section className="relative w-full min-h-screen flex items-center border-b border-border bg-background bg-grain">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-center justify-center gap-8 py-24 lg:py-36">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <a
              href="#contato"
              data-cta="hero-badge"
              className="inline-flex items-center gap-3 border-hairline bg-card/40 px-4 py-2 text-[10px] tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
            >
              Proposta em 24 horas
              <MoveRight className="size-3.5" aria-hidden />
            </a>
          </motion.div>

          <div className="flex flex-col gap-5 items-center">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl max-w-3xl tracking-tight text-center leading-[0.95]"
            >
              <span className="text-foreground">Operação de atendimento</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center h-[1.1em] md:h-[1.15em] mt-2">
                {titles.map((title, index) => (
                  <motion.span
                    key={title}
                    className="absolute font-display text-cyan-glow"
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
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base md:text-xl leading-relaxed text-muted-foreground max-w-2xl text-center"
            >
              Agentes de IA com CRM integrado — qualificação 24/7, vendas e
              agendamentos na conversa. Integração com qualquer API e suporte na
              operação.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <a
              href="#como-funciona"
              className="inline-flex items-center gap-3 border-hairline px-8 py-4 text-xs tracking-[0.25em] uppercase hover:bg-card transition-colors text-muted-foreground hover:text-foreground"
            >
              Ver como funciona
            </a>
            <a
              href="#contato"
              data-cta="hero"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-xs tracking-[0.25em] uppercase hover:opacity-90 transition-opacity"
            >
              Quero meus agentes
              <MoveRight className="size-4" aria-hidden />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16 text-center">
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground">
          Resposta em <span className="text-foreground font-medium">24 horas</span>
        </p>
        <span className="hidden sm:block h-4 w-px bg-border" aria-hidden />
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground">
          Go-live em <span className="text-foreground font-medium">semanas</span>
        </p>
      </div>
    </section>
  );
}

function Challenges() {
  const items = [
    {
      title: "Leads sem resposta",
      desc: "Cliente manda mensagem à noite e só recebe retorno no dia seguinte — se receber.",
    },
    {
      title: "Canais fragmentados",
      desc: "WhatsApp num celular, e-mail no Outlook, chat no site em outro lugar. Nada conversa.",
    },
    {
      title: "Zero visibilidade",
      desc: "Não sabe quantos leads entraram, quantos foram atendidos, quantos viraram venda.",
    },
    {
      title: "Custo elevado",
      desc: "Contratar mais gente pra atender mais gente — e o lucro não acompanha.",
    },
    {
      title: "Integrações manuais",
      desc: "Copiar dados entre sistemas, planilhas e atendentes. Erro humano em cada handoff.",
    },
    {
      title: "Escalar é impossível",
      desc: "O processo funciona com 10 clientes. Com 100, tudo quebra.",
    },
  ];

  return (
    <section id="desafios" className="px-6 md:px-10 py-32 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            — Reconhece algum desses?
          </p>
          <h2 className="font-display text-3xl md:text-5xl">
            Os problemas que{" "}
            <em className="italic text-muted-foreground">
              ninguém resolve com planilha
            </em>
            .
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-background p-8 md:p-10 group hover:bg-card transition-colors"
            >
              <h3 className="font-display text-xl mb-3 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
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

function AgentCapabilities() {
  const items = [
    {
      title: "Atender e qualificar",
      desc: "Respostas em segundos, 24 horas. O agente entende contexto, qualifica leads e encaminha o que importa.",
    },
    {
      title: "Agendar na agenda",
      desc: "Marca eventos e reuniões direto na conversa — consulta disponibilidade e confirma sem redirecionar.",
    },
    {
      title: "Vender no chat",
      desc: "Apresenta catálogo, responde dúvidas e envia link de pagamento na hora. Conversão dentro do canal.",
    },
    {
      title: "Integrar com APIs",
      desc: "ERP, pagamentos, estoque, sistemas internos — se tem API, conectamos ao fluxo do agente.",
    },
  ];

  return (
    <section className="px-6 md:px-10 py-32 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            — O agente faz
          </p>
          <h2 className="font-display text-3xl md:text-5xl">
            Mais que chatbot.{" "}
            <em className="italic text-muted-foreground">Operação de verdade</em>.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-background p-8 md:p-10 group hover:bg-card transition-colors"
            >
              <h3 className="font-display text-xl mb-3 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
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

function MidCta() {
  return (
    <section className="px-6 md:px-10 py-20 border-t border-border bg-card">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-2xl md:text-4xl mb-4">
          Pronto para automatizar seu atendimento?
        </h2>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
          Conte sua operação — retornamos em 24h com proposta técnica.
        </p>
        <PrimaryCta dataCta="mid" />
      </div>
    </section>
  );
}

function Channels() {
  const channels = [
    { name: "WhatsApp", desc: "Onde seus clientes já estão" },
    { name: "Telegram", desc: "DMs com resposta automática" },
    { name: "SMS", desc: "Confirmações e lembretes por texto" },
    { name: "E-mail", desc: "Tickets e respostas assíncronas" },
    { name: "Chat no site", desc: "Widget no seu site, mesma fila" },
  ];

  return (
    <section className="px-6 md:px-10 py-32 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            — Canais
          </p>
          <h2 className="font-display text-3xl md:text-5xl">
            Um agente.{" "}
            <em className="italic text-muted-foreground">Todos os canais</em>.
          </h2>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
            WhatsApp, Telegram, e-mail, SMS e chat no site — uma fila, um CRM,
            histórico unificado.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-border">
          {channels.map((ch) => (
            <div
              key={ch.name}
              className="bg-background p-6 md:p-8 text-center group hover:bg-card transition-colors"
            >
              <h3 className="font-display text-lg mb-2 group-hover:text-primary transition-colors">
                {ch.name}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {ch.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CrmSection() {
  const items = [
    {
      title: "Pipeline visual",
      desc: "Acompanhe cada lead do primeiro contato ao fechamento — em tempo real.",
    },
    {
      title: "Histórico multicanal",
      desc: "Toda conversa, em qualquer canal, num só lugar. Contexto completo para humanos e IA.",
    },
    {
      title: "Tags automáticas",
      desc: "Classificação inteligente conforme o agente qualifica. Sem trabalho manual.",
    },
    {
      title: "Métricas de conversão",
      desc: "Saiba quantos leads entraram, quantos foram qualificados e quantos viraram venda.",
    },
  ];

  return (
    <section className="px-6 md:px-10 py-32 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            — CRM integrado
          </p>
          <h2 className="font-display text-3xl md:text-5xl">
            Visibilidade total.{" "}
            <em className="italic text-muted-foreground">Num só lugar</em>.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-background p-8 group hover:bg-card transition-colors"
            >
              <h3 className="font-display text-lg mb-3 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
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

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Diagnóstico",
      desc: "Mapeamos seu fluxo de atendimento, canais e integrações necessárias.",
    },
    {
      n: "02",
      title: "Treino do agente",
      desc: "Configuramos a IA com o conhecimento do seu negócio — produtos, regras, tom de voz.",
    },
    {
      n: "03",
      title: "Integração",
      desc: "Conectamos canais, CRM e APIs. Tudo conversando entre si.",
    },
    {
      n: "04",
      title: "Go-live",
      desc: "Em semanas — não meses. Acompanhamos os primeiros dias e ajustamos até rodar redondo.",
    },
  ];

  return (
    <section id="como-funciona" className="px-6 md:px-10 py-32 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            — Como funciona
          </p>
          <h2 className="font-display text-3xl md:text-5xl">
            Do diagnóstico ao{" "}
            <em className="italic text-muted-foreground">go-live em semanas</em>.
          </h2>
        </div>

        <div className="mb-16">
          <img
            src={imageSrc(flowImg)}
            alt="Fluxo: cliente → canais → agente IA → CRM → time humano"
            loading="lazy"
            className="w-full h-auto max-h-[400px] object-contain"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.n} className="group">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-display text-3xl text-primary">
                  {step.n}
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <h3 className="font-display text-xl mb-3 group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OperationalSupport() {
  return (
    <section className="px-6 md:px-10 py-32 md:py-40 border-t border-border">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
          — Suporte na operação
        </p>
        <h2 className="font-display text-3xl md:text-5xl mb-8">
          Não quer operar sozinho?{" "}
          <em className="italic text-muted-foreground">A gente cuida</em>.
        </h2>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          A Braxen acompanha a implantação e pode cuidar da operação contínua —
          monitoramento, ajustes do agente, evolução e suporte no dia a dia.
        </p>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="px-6 md:px-10 py-32 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            — Clientes satisfeitos
          </p>
          <h2 className="font-display text-3xl md:text-5xl mb-4">
            Quem já confia na{" "}
            <em className="italic text-muted-foreground">Braxen</em>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
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
    <section id="faq" className="px-6 md:px-10 py-32 border-t border-border">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            — Perguntas frequentes
          </p>
          <h2 className="font-display text-3xl md:text-5xl">
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
                <h3 className="font-display text-base md:text-lg group-hover:text-primary transition-colors">
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
      className="px-6 md:px-10 py-32 md:py-48 border-t border-border scroll-mt-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-8">
          — Próximo passo
        </p>
        <h2 className="font-display text-4xl leading-[0.95] mb-6">
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
      <TrustBar />
      <Challenges />
      <AgentCapabilities />
      <MidCta />
      <Channels />
      <CrmSection />
      <HowItWorks />
      <OperationalSupport />
      <TestimonialsSection />
      <FAQ />
      <Contact />
      <InboxyLink />
      <Footer />
      <StickyCta />
    </main>
  );
}
