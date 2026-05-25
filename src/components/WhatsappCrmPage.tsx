"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-whatsapp-crm.jpg";
import flowImg from "@/assets/flow-whatsapp-crm.jpg";
import portfolioAiAgent from "@/assets/portfolio-ai-agent.jpg";
import portfolioWhatsapp from "@/assets/portfolio-whatsapp-automation.jpg";
import portfolioCrm from "@/assets/portfolio-crm.jpg";
import { imageSrc } from "@/lib/utils";
import { ContactForm } from "@/components/ContactForm";

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const links = [
    { href: "#desafios", label: "Desafios" },
    { href: "#solucao", label: "Solução" },
    { href: "#funciona", label: "Como funciona" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
      >
        <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
          <div className="flex items-center justify-between px-6 md:px-10 py-6 text-foreground">
            <a
              href="/"
              className="flex items-center gap-2 text-sm tracking-[0.3em] uppercase"
            >
              <span className="inline-block size-2 rounded-full bg-primary" />
              Braxen
            </a>
            <nav className="hidden md:flex items-center gap-10 text-xs tracking-[0.25em] uppercase">
              {links.map((l) => (
                <a key={l.href} href={l.href} className="hover:text-primary transition-colors">
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <a
                href="#contato"
                className="hidden md:inline-flex text-xs tracking-[0.25em] uppercase border-hairline px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Quero esse setup
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
                aria-label="Menu"
              >
                <span className={`block h-px w-5 bg-foreground transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
                <span className={`block h-px w-5 bg-foreground transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
              </button>
            </div>
          </div>
        </header>
      </motion.nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-3xl tracking-[0.1em] uppercase hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-xs tracking-[0.25em] uppercase"
          >
            Quero esse setup
            <span aria-hidden>→</span>
          </a>
        </div>
      )}
    </>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center">
      <img
        src={imageSrc(heroImg)}
        alt="WhatsApp integrado ao Chatwoot CRM"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />

      <div className="relative z-10 px-6 md:px-10 lg:px-16 max-w-2xl py-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs tracking-[0.4em] uppercase text-primary mb-6"
        >
          — Automação WhatsApp + CRM
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] mb-6"
        >
          Seu WhatsApp parou de vender quando você
          <span className="text-cyan-glow"> dormiu</span>?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-base md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg"
        >
          Atendimento 24/7 com IA, leads qualificados automaticamente e tudo
          organizado no Chatwoot — sem você levantar do sofá.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-start gap-4"
        >
          <a
            href="#contato"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-xs tracking-[0.25em] uppercase hover:opacity-90 transition-opacity"
          >
            Quero esse setup
            <span aria-hidden>→</span>
          </a>
          <a
            href="#funciona"
            className="inline-flex items-center gap-3 border-hairline px-8 py-4 text-xs tracking-[0.25em] uppercase hover:bg-card transition-colors"
          >
            Ver como funciona
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Challenges() {
  const items = [
    {
      title: "Leads sem resposta",
      desc: "Cliente manda mensagem às 22h e só recebe resposta no dia seguinte — se receber.",
    },
    {
      title: "Atendimento lento",
      desc: "Fila de mensagens crescendo enquanto seu time tenta dar conta no braço.",
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
      title: "Múltiplos números",
      desc: "Cada vendedor no seu celular, cada conversa num lugar diferente. Caos.",
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
            <em className="italic text-muted-foreground">ninguém resolve com planilha</em>.
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

function Solution() {
  return (
    <section id="solucao" className="px-6 md:px-10 py-32 md:py-48 border-t border-border">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-10">
          — A Solução
        </p>
        <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] mb-8">
          Não é mais uma ferramenta.{" "}
          <em className="italic text-muted-foreground">
            É a sua operação automatizada.
          </em>
        </h2>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Mapeamos seu processo de atendimento, configuramos um agente de IA
          treinado pro seu negócio, integramos tudo ao Chatwoot e entregamos
          funcionando. Seu time só entra quando a IA precisa de ajuda — o resto
          roda sozinho.
        </p>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Diagnóstico",
      desc: "Entendemos seu fluxo de atendimento atual, os gargalos e o que precisa ser automatizado.",
    },
    {
      n: "02",
      title: "Setup do agente IA",
      desc: "Configuramos o Claude com o conhecimento do seu negócio — produtos, preços, regras, tom de voz.",
    },
    {
      n: "03",
      title: "Integração Chatwoot",
      desc: "Conectamos WhatsApp Business, Chatwoot, Cal.com e ElevenLabs. Tudo conversando entre si.",
    },
    {
      n: "04",
      title: "Go-live",
      desc: "Em semanas — não meses. Acompanhamos os primeiros dias e ajustamos até a operação rodar redonda.",
    },
  ];

  return (
    <section id="funciona" className="px-6 md:px-10 py-32 border-t border-border">
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
            alt="Fluxo: cliente → WhatsApp → IA → Chatwoot → time humano"
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

function Features() {
  const items = [
    {
      title: "Agente IA com Claude",
      desc: "Treinado com o conhecimento do seu negócio. Atende, qualifica e agenda — em texto e áudio.",
    },
    {
      title: "Atendimento 24/7",
      desc: "Seu WhatsApp Business nunca dorme. Cada lead recebe resposta em segundos, qualquer hora do dia.",
    },
    {
      title: "CRM no Chatwoot",
      desc: "Pipeline visual, histórico completo, tags automáticas. Open-source, sem lock-in de fornecedor.",
    },
    {
      title: "Agendamento via Cal.com",
      desc: "O agente consulta sua agenda e marca reuniões direto na conversa. Sem link externo, sem atrito.",
    },
    {
      title: "Áudio com ElevenLabs",
      desc: "Respostas em áudio com voz natural. O cliente sente que está falando com uma pessoa de verdade.",
    },
    {
      title: "Handoff humano",
      desc: "Quando a IA não resolve, transfere pra um atendente real dentro do Chatwoot. Sem perder contexto.",
    },
    {
      title: "Métricas de conversão",
      desc: "Saiba quantos leads entraram, quantos foram qualificados e quantos viraram venda. Em tempo real.",
    },
    {
      title: "Arquitetura aberta",
      desc: "Stripe, Notion, HubSpot, planilhas internas. Se tem API, a gente conecta.",
    },
  ];

  return (
    <section className="px-6 md:px-10 py-32 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">
              — O que você ganha
            </p>
            <h2 className="font-display text-2xl md:text-4xl">
              Tudo que sua operação{" "}
              <em className="italic text-muted-foreground">precisa pra escalar</em>.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            Cada peça é configurada sob medida. Nenhum template genérico.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-background p-8 group hover:bg-card transition-colors"
            >
              <h4 className="font-display text-lg mb-3 group-hover:text-primary transition-colors">
                {item.title}
              </h4>
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

function Stack() {
  const tools = [
    {
      name: "WhatsApp Business",
      desc: "Canal oficial. Conformidade total com as políticas do Meta.",
    },
    {
      name: "Chatwoot",
      desc: "CRM open-source com pipeline visual. Sem lock-in de fornecedor.",
    },
    {
      name: "Claude (Anthropic)",
      desc: "Modelo de IA de última geração. Respostas inteligentes e contextuais.",
    },
    {
      name: "ElevenLabs",
      desc: "Síntese de voz natural. O cliente ouve áudio, não lê texto.",
    },
    {
      name: "Cal.com",
      desc: "Agendamento automatizado de reuniões direto na conversa.",
    },
  ];

  return (
    <section className="px-6 md:px-10 py-32 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            — Stack tecnológico
          </p>
          <h2 className="font-display text-3xl md:text-5xl">
            Ferramentas de{" "}
            <em className="italic text-muted-foreground">ponta a ponta</em>.
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-px bg-border">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="bg-background p-8 text-center group hover:bg-card transition-colors"
            >
              <h4 className="font-display text-lg mb-3 group-hover:text-primary transition-colors">
                {tool.name}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {tool.desc}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Mais integrações por vir — Stripe, Notion, HubSpot, planilhas
          internas.{" "}
          <span className="text-foreground">
            Se tem API, a gente conecta.
          </span>
        </p>
      </div>
    </section>
  );
}

function UseCases() {
  const cases = [
    {
      title: "Clínicas e consultórios",
      desc: "Agendamento automático, lembretes de consulta e triagem por IA. Uma clínica reduziu 80% das ligações no primeiro mês.",
      image: portfolioAiAgent,
    },
    {
      title: "E-commerce e varejo",
      desc: "Qualificação de leads, recuperação de carrinho abandonado e suporte pós-venda — tudo pelo WhatsApp.",
      image: portfolioWhatsapp,
    },
    {
      title: "Imobiliárias",
      desc: "Atendimento inicial, qualificação por perfil e agendamento de visitas. Triplicou o atendimento sem contratar ninguém.",
      image: portfolioCrm,
    },
  ];

  return (
    <section className="px-6 md:px-10 py-32 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            — Casos de uso
          </p>
          <h2 className="font-display text-3xl md:text-5xl">
            Já está{" "}
            <em className="italic text-muted-foreground">rodando</em>.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c) => (
            <div
              key={c.title}
              className="group border-hairline overflow-hidden hover:border-primary/30 transition-colors"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={imageSrc(c.image)}
                  alt={c.title}
                  loading="lazy"
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              </div>
              <div className="p-8">
                <h3 className="font-display text-xl mb-3 group-hover:text-primary transition-colors">
                  {c.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "Preciso ter API oficial do WhatsApp?",
      a: "Sim, trabalhamos com a API oficial do WhatsApp Business para garantir conformidade e estabilidade. Se você ainda não tem, cuidamos da configuração.",
    },
    {
      q: "O Chatwoot é hospedado por vocês ou na minha infra?",
      a: "Você escolhe. Podemos hospedar na nossa infraestrutura com manutenção inclusa, ou instalar na sua. Chatwoot é open-source — sem lock-in.",
    },
    {
      q: "Quanto tempo leva pra ir ao ar?",
      a: "Primeira versão rodando em 2 a 4 semanas, dependendo da complexidade. Projetos mais simples podem ir ao ar em dias.",
    },
    {
      q: "Posso customizar o agente e trocar a voz?",
      a: "Totalmente. O agente é treinado com o conhecimento do seu negócio, no seu tom de voz. A voz do ElevenLabs pode ser customizada também.",
    },
    {
      q: "E se a IA errar? Como funciona o handoff?",
      a: "A IA sabe reconhecer quando não consegue resolver. Nesses casos, transfere automaticamente para um atendente humano dentro do Chatwoot, com todo o contexto da conversa.",
    },
    {
      q: "Vocês conectam com meu sistema atual?",
      a: "Se tem API, a gente conecta. ERPs, planilhas, CRMs existentes, sistemas internos. Fazemos a integração sob medida.",
    },
    {
      q: "Quanto custa?",
      a: "Depende do escopo. Cada operação é diferente. Fale conosco e montamos uma proposta técnica em até 24 horas.",
    },
  ];

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
      className="px-6 md:px-10 py-32 md:py-48 border-t border-border"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-8">
          — Próximo Passo
        </p>
        <h2 className="font-display text-4xl leading-[0.95] mb-6">
          Quero esse{" "}
          <em className="italic text-muted-foreground">setup</em>.
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto mb-12 leading-relaxed">
          Descreva sua operação de atendimento. Retornamos em até 24 horas com
          uma análise técnica e proposta de automação.
        </p>
        <ContactForm />
      </div>
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

export function WhatsappCrmPage() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Challenges />
      <Solution />
      <HowItWorks />
      <Features />
      <Stack />
      <UseCases />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
