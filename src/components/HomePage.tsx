"use client";

import chapterProblem from "@/assets/chapter-problem.jpg";
import chapterSolution from "@/assets/chapter-solution.jpg";
import chapterResult from "@/assets/chapter-result.jpg";
import { AnimatedHero } from "@/components/AnimatedHero";
import { ContactForm } from "@/components/ContactForm";
import { IntegrationCarousel } from "@/components/IntegrationCarousel";
import { Leadership } from "@/components/Leadership";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Portfolio } from "@/components/Portfolio";
import { StackedCardsSection } from "@/components/StackedCardsSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import { siteHeaderClass, siteHeaderInnerClass } from "@/lib/site-header";
import { SOCIAL_LINKS } from "@/lib/site";
import { clientLogoRow1, clientLogoRow2 } from "@/lib/client-logos-data";
import { imageSrc, type ImageSrc } from "@/lib/utils";

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
    { href: "#chapter-1", label: "A Dor" },
    { href: "#chapter-2", label: "A Solução" },
    { href: "#chapter-3", label: "O Resultado" },
    { href: "#portfolio", label: "Soluções" },
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

function Statement() {
  return (
    <section className="relative px-6 md:px-10 py-32 md:py-48">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-10">
          — O Diagnóstico
        </p>
        <h2 className="font-sans text-heading-2">
          Enquanto sua equipe apaga incêndios,{" "}
          <em className="italic text-muted-foreground">
            seu concorrente automatizou.
          </em>
        </h2>
      </div>
    </section>
  );
}

function Chapter({
  kicker,
  title,
  body,
  image,
  imageAlt,
  reverse,
  id,
}: {
  kicker: string;
  title: string;
  body: string;
  image: ImageSrc;
  imageAlt: string;
  reverse?: boolean;
  id: string;
}) {
  return (
    <section
      id={id}
      className="relative px-6 md:px-10 py-24 md:py-40 border-t border-border"
    >
      <div
        className={`mx-auto max-w-7xl grid md:grid-cols-12 gap-10 items-center ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="md:col-span-7">
          <img
            src={imageSrc(image)}
            alt={imageAlt}
            loading="lazy"
            className="w-full h-[60vh] md:h-[80vh] object-cover grayscale-[0.2]"
          />
        </div>
        <div className="md:col-span-5 md:px-6">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            — {kicker}
          </p>
          <h2 className="font-sans text-heading-2 mb-6">{title}</h2>
          <p className="text-muted-foreground leading-relaxed text-lg md:text-xl max-w-md">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section
      id="products"
      className="px-6 md:px-10 py-20 border-t border-border bg-card"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">
            — Produtos e squads
          </p>
          <h2 className="font-sans text-heading-2">
            Pronto para{" "}
            <em className="italic text-muted-foreground">começar</em>?
          </h2>
        </div>
        <div className="grid gap-px bg-border md:grid-cols-2">
          <div className="flex flex-col justify-between gap-6 bg-background p-8 md:p-10">
            <div>
              <p className="mb-3 text-xs tracking-[0.4em] uppercase text-primary">
                — Automação
              </p>
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
              <p className="mb-3 text-xs tracking-[0.4em] uppercase text-primary">
                — Equipe
              </p>
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
        </div>
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
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-8">
          — Próximo Passo
        </p>
        <h2 className="font-sans text-heading-2 mb-6">
          Vamos construir{" "}
          <em className="italic text-muted-foreground">sua solução</em>.
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto mb-12 leading-relaxed">
          Descreva o problema. Nossa equipe retorna em até 24 horas com uma
          análise técnica e os próximos passos.
        </p>
        <ContactForm />
        <div className="mt-20 grid md:grid-cols-3 gap-10 text-left text-sm">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-3">
              Localização
            </p>
            <p>
              Brasil · Remoto
              <br />
              Atendimento nacional
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-3">
              Horário
            </p>
            <p>
              Seg — Sex
              <br />
              09:00 — 19:00 BRT
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-3">
              Redes
            </p>
            <p className="flex flex-wrap gap-x-3 gap-y-1">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                GitHub
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Instagram
              </a>
            </p>
          </div>
        </div>
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
      <p className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2">
        <a
          href="/atendimento-ia"
          className="hover:text-foreground transition-colors"
        >
          Automação
        </a>
        <span className="hidden sm:inline text-border">·</span>
        <a
          href="/tech-squads"
          className="hover:text-foreground transition-colors"
        >
          Tech Squads
        </a>
        <span className="hidden sm:inline text-border">·</span>
        <span>Braxen Tech · Brasil</span>
      </p>
    </footer>
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
      <Statement />
      <IntegrationCarousel
        variant="logo"
        row1={clientLogoRow1}
        row2={clientLogoRow2}
      />
      <Chapter
        id="chapter-1"
        kicker="A Dor"
        title="Sua operação trava antes de escalar"
        imageAlt="Equipe sobrecarregada com processos manuais e planilhas desorganizadas"
        body="Leads sem resposta. Equipe no limite. Planilhas que ninguém confia. Você sabe que precisa de tecnologia — mas não de mais uma ferramenta genérica que ninguém vai usar."
        image={chapterProblem}
      />
      <Chapter
        id="chapter-2"
        kicker="A Solução"
        title="Tecnologia feita pro seu processo"
        imageAlt="Dashboard e automações sob medida integrados à operação"
        body="Mapeamos onde sua operação trava, construímos exatamente o que resolve e colocamos pra rodar. Agente de IA no WhatsApp, CRM que seu time realmente usa, dashboard que mostra o que importa. Sem template. Sem licença."
        image={chapterSolution}
        reverse
      />
      <Chapter
        id="chapter-3"
        kicker="O Resultado"
        title="Entrega rápida, impacto mensurável"
        imageAlt="Resultados de negócio com entregas de software em produção"
        body="Primeira entrega em semanas, não em meses. Você acompanha cada etapa, valida antes de ir pro ar e mede o impacto real. Se não funcionar, a gente ajusta até funcionar."
        image={chapterResult}
      />
      <Portfolio />
      <StackedCardsSection
        id="services"
        eyebrow="— Serviços"
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
      <Contact />
      <Footer />
    </main>
  );
}
