"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedHero } from "@/components/AnimatedHero";
import { siteHeaderClass, siteHeaderInnerClass } from "@/lib/site-header";
import { ContactForm } from "@/components/ContactForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { techSquadsFaq } from "@/lib/faq-data";

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
    { href: "#desafios", label: "Desafios" },
    { href: "#como-funciona", label: "Como funciona" },
    { href: "#diferenciais", label: "Diferenciais" },
    { href: "#perfis", label: "Perfis" },
    { href: "#faq", label: "FAQ" },
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
            href="/"
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
            <ThemeToggle />
            <a
              href="#contato"
              className="btn btn-sm btn-outline btn-outline-primary hidden md:inline-flex"
            >
              Montar meu squad
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
            Montar meu squad
            <span aria-hidden>→</span>
          </a>
          <ThemeToggle className="mt-2" />
        </div>
      )}
    </>
  );
}

function Stats() {
  const stats = [
    { value: "US$ 462 bi", label: "Mercado global de IT outsourcing em 2026" },
    { value: "92%", label: "das G2000 usam times externos de tecnologia" },
    { value: "15–30%", label: "de redução de custo vs. contratação interna" },
    { value: "9,3%", label: "CAGR projetado até 2033" },
  ];

  return (
    <section className="px-6 md:px-10 py-20 border-t border-border bg-card">
      <div className="mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
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
      </div>
      <p className="text-center text-[9px] tracking-[0.2em] uppercase text-muted-foreground/50 mt-8">
        Fontes: Coherent Market Insights, 2026 · Saigon Technology · Gartner
      </p>
    </section>
  );
}

function Challenges() {
  const items = [
    {
      title: "Contratar leva meses",
      desc: "57% dos gestores consideram difícil encontrar profissionais de TI qualificados. Enquanto isso, o backlog cresce.",
    },
    {
      title: "Time interno sobrecarregado",
      desc: "Sua equipe apaga incêndios em vez de construir produto. Cada novo projeto vira mais um prato girando.",
    },
    {
      title: "Falta de especialistas",
      desc: "IA, cloud, DevOps, mobile — você precisa de perfis que não existem no seu quadro atual.",
    },
    {
      title: "Projetos atrasando",
      desc: "Sem capacidade de entrega, roadmaps deslizam e a concorrência passa na frente.",
    },
    {
      title: "Rotatividade alta",
      desc: "Desenvolvedores saem e levam o conhecimento embora. Recontratação custa tempo e dinheiro.",
    },
    {
      title: "Escalar é arriscado",
      desc: "Contratar CLT pra demanda sazonal é caro. Não contratar é perder oportunidade.",
    },
  ];

  return (
    <section id="desafios" className="px-6 md:px-10 py-32 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            — Reconhece algum desses?
          </p>
          <h2 className="font-sans text-3xl md:text-5xl">
            Os desafios que{" "}
            <em className="italic text-muted-foreground">
              travam seu crescimento
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
              <h3 className="font-sans text-xl mb-3 group-hover:text-primary transition-colors">
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
      desc: "Entendemos seu contexto, stack, processos e objetivos. Mapeamos os perfis ideais para o seu desafio.",
    },
    {
      n: "02",
      title: "Montagem do squad",
      desc: "Selecionamos profissionais seniores com experiência comprovada. Você aprova cada perfil antes de começar.",
    },
    {
      n: "03",
      title: "Integração",
      desc: "O squad se conecta ao seu time, ferramentas e rituais. Funciona como extensão natural da sua equipe.",
    },
    {
      n: "04",
      title: "Gestão e evolução",
      desc: "Acompanhamento com métricas, feedbacks e evolução contínua. Escale para cima ou para baixo quando precisar.",
    },
  ];

  return (
    <section
      id="como-funciona"
      className="px-6 md:px-10 py-32 border-t border-border"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            — Processo
          </p>
          <h2 className="font-sans text-3xl md:text-5xl">
            Do diagnóstico ao{" "}
            <em className="italic text-muted-foreground">squad rodando</em>.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        </div>
      </div>
    </section>
  );
}

function Differentials() {
  const items = [
    {
      title: "Profissionais seniores",
      desc: "Não alocamos juniors disfarçados. Cada membro do squad tem experiência real em projetos de alta complexidade.",
    },
    {
      title: "Gestão técnica ativa",
      desc: "Tech lead acompanhando entregas, qualidade de código, arquitetura e evolução do time.",
    },
    {
      title: "Integração real",
      desc: "O squad participa das suas dailies, sprints e decisões. Não é fornecedor — é parte do time.",
    },
    {
      title: "Baixa rotatividade",
      desc: "Modelo de retenção que preserva conhecimento do projeto. Estabilidade é parte da entrega.",
    },
    {
      title: "IA nativa",
      desc: "Cada squad já opera com ferramentas de IA para acelerar desenvolvimento, revisão e testes.",
    },
    {
      title: "Flexibilidade total",
      desc: "Aumente ou reduza o squad conforme a demanda. Sem burocracia, sem multas, sem surpresas.",
    },
  ];

  return (
    <section
      id="diferenciais"
      className="px-6 md:px-10 py-32 border-t border-border"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">
              — Diferenciais
            </p>
            <h2 className="font-sans text-2xl md:text-4xl">
              Mais que outsourcing{" "}
              <em className="italic text-muted-foreground">tradicional</em>.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            Não entregamos apenas pessoas. Entregamos capacidade real de
            entrega, com gestão e continuidade.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
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
        </div>
      </div>
    </section>
  );
}

function Profiles() {
  const categories = [
    {
      title: "Desenvolvimento",
      roles: [
        "Backend (Node, Python, Go)",
        "Frontend (React, Next.js, Vue)",
        "Mobile (React Native, Flutter)",
        "Tech Lead",
        "Arquiteto de Software",
        "QA / Testes",
        "DevOps / SRE",
      ],
    },
    {
      title: "Produto & Design",
      roles: [
        "Product Manager",
        "Product Owner",
        "UX Designer",
        "UI Designer",
        "Product Designer",
      ],
    },
    {
      title: "Dados & IA",
      roles: [
        "Engenheiro de Dados",
        "Cientista de Dados",
        "Engenheiro de IA / ML",
        "Analista de Dados",
        "Especialista em LLMs",
        "Prompt Engineer",
      ],
    },
  ];

  return (
    <section id="perfis" className="px-6 md:px-10 py-32 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            — Perfis disponíveis
          </p>
          <h2 className="font-sans text-3xl md:text-5xl">
            Squads completos para{" "}
            <em className="italic text-muted-foreground">seu desafio</em>.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="bg-background p-8 md:p-10"
            >
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
        </div>

        <div className="text-center mt-12">
          <a
            href="#contato"
            className="btn btn-lg btn-primary"
          >
            Definir meu squad
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function MarketContext() {
  return (
    <section className="px-6 md:px-10 py-32 md:py-48 border-t border-border">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-10">
          — O mercado global
        </p>
        <h2 className="font-sans text-[clamp(2rem,5vw,4.5rem)] mb-8">
          Outsourcing de TI vai de{" "}
          <em className="italic text-muted-foreground">
            US$ 462 bi para US$ 861 bi até 2033
          </em>
          .
        </h2>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
          Empresas líderes já entenderam: construir capacidade de entrega com
          times externos especializados não é terceirização — é estratégia. O
          modelo evoluiu de cortar custos para gerar valor real, com IA, cloud e
          DevOps integrados desde o início.
        </p>
        <p className="text-xs text-muted-foreground/60">
          Fonte: Coherent Market Insights, IT Services Outsourcing Market
          2026–2033
        </p>
      </div>
    </section>
  );
}

function FAQ() {
  const items = techSquadsFaq;

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 md:px-10 py-32 border-t border-border">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-16">
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
      className="px-6 md:px-10 py-32 md:py-48 border-t border-border"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-8">
          — Próximo Passo
        </p>
        <h2 className="font-sans text-4xl leading-[0.95] mb-6">
          Vamos montar{" "}
          <em className="italic text-muted-foreground">seu squad</em>.
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto mb-12 leading-relaxed">
          Descreva seu desafio técnico. Retornamos em até 24 horas com uma
          proposta de squad sob medida.
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

export function TechSquadsPage() {
  return (
    <main className="relative">
      <Nav />
      <AnimatedHero
        staticTitle="Seu time de tecnologia"
        rotatingWords={[
          "pronto amanhã",
          "sob demanda",
          "integrado",
          "escalável",
          "dedicado",
        ]}
        subtitle="Squads completos de desenvolvimento, produto, dados e IA integrados ao seu time. Sem inflar estrutura, sem meses de recrutamento."
        trustLine="Proposta em 24h · squad operando em semanas"
        primaryCta={{
          href: "#contato",
          label: "Montar meu squad",
          dataCta: "hero",
        }}
        secondaryCta={{
          href: "#como-funciona",
          label: "Ver como funciona",
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
      <Footer />
    </main>
  );
}
