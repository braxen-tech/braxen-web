"use client";

import textureTech from "@/assets/texture-tech.jpg";
import chapterProblem from "@/assets/chapter-problem.jpg";
import chapterSolution from "@/assets/chapter-solution.jpg";
import chapterResult from "@/assets/chapter-result.jpg";
import { ContactForm } from "@/components/ContactForm";
import { INBOXY_URL } from "@/lib/inboxy";
import { Leadership } from "@/components/Leadership";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Portfolio } from "@/components/Portfolio";
import { imageSrc, type ImageSrc } from "@/lib/utils";

function RevealWords({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 1,
              delay: delay + i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

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
    { href: "#chapter-1", label: "A Dor" },
    { href: "#chapter-2", label: "A Solução" },
    { href: "#chapter-3", label: "O Resultado" },
    { href: "#contact", label: "Contato" },
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
              href="#top"
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
                href="#contact"
                className="hidden md:inline-flex text-xs tracking-[0.25em] uppercase border-hairline px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Fale conosco
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
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-xs tracking-[0.25em] uppercase"
          >
            Fale conosco
            <span aria-hidden>→</span>
          </a>
        </div>
      )}
    </>
  );
}

function Hero() {
  return (
    <section id="top" className="relative h-screen w-full overflow-hidden">
      <video
        src="/hero-smooth.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />

      <div className="relative z-10 flex h-full flex-col items-start justify-center px-6 md:px-10 lg:px-16 text-left max-w-2xl">
        <h1 className="fade-up font-display text-4xl tracking-tight">
          <RevealWords text="BRAXEN" delay={0.4} className="text-7xl" />
          <RevealWords text="." delay={0.4} className="text-cyan-glow" />
          <br />
          <RevealWords
            text="Tecnologia que escala."
            delay={0.4}
            className="font-display italic text-muted-foreground"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="font-body mt-6 text-md md:text-xl text-muted-foreground max-w-lg leading-relaxed mb-8 md:mb-10"
        >
          Desenvolvemos software sob medida, agentes de IA e automações que
          transformam operações manuais em crescimento real.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row items-start gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-xs tracking-[0.25em] uppercase hover:opacity-90 transition-opacity"
          >
            Quero uma solução
            <span aria-hidden>→</span>
          </a>
          <a
            href="#chapter-2"
            className="inline-flex items-center gap-3 border-hairline px-8 py-4 text-xs tracking-[0.25em] uppercase hover:bg-card transition-colors"
          >
            Ver como funciona
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-6 z-10 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
        N 43°36′ · E 1°26′
      </div>
      <div className="absolute bottom-6 right-6 z-10 text-[10px] tracking-[0.3em] uppercase text-muted-foreground blink">
        ● Live
      </div>
    </section>
  );
}

function Statement() {
  return (
    <section className="relative px-6 md:px-10 py-32 md:py-48">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-10">
          — O Diagnóstico
        </p>
        <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)]">
          Enquanto sua equipe apaga incêndios,{" "}
          <em className="italic text-muted-foreground">
            seu concorrente automatizou.
          </em>
        </h2>
      </div>
    </section>
  );
}

function Clients() {
  const logos = [
    { src: "/globo.png", alt: "Globo" },
    { src: "/tim.png", alt: "TIM" },
    { src: "/disney.png", alt: "Disney" },
    { src: "/amazon.png", alt: "Amazon" },
    { src: "/rivian.png", alt: "Rivian" },
    { src: "/serasa.png", alt: "Serasa" },
    { src: "/sicredi.png", alt: "Sicredi" },
    { src: "/b2w.png", alt: "B2W" },
  ];

  const track = [...logos, ...logos];

  return (
    <section className="py-20 border-t border-border overflow-hidden">
      <p className="text-center text-xs tracking-[0.4em] uppercase text-muted-foreground mb-12 px-6">
        — Quem confiou em nossa expertise
      </p>
      <div className="relative flex w-max animate-marquee hover:[animation-play-state:paused]">
        {track.map((logo, i) => (
          <div key={`${logo.alt}-${i}`} className="flex items-center justify-center px-10 md:px-14">
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-14 md:h-20 w-auto object-contain transition-opacity grayscale hover:grayscale-0"
            />
          </div>
        ))}
        {track.map((logo, i) => (
          <div key={`${logo.alt}-dup-${i}`} className="flex items-center justify-center px-10 md:px-14" aria-hidden="true">
            <img
              src={logo.src}
              alt=""
              className="h-14 md:h-20 w-auto object-contain transition-opacity grayscale hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function Chapter({
  kicker,
  body,
  image,
  reverse,
  id,
}: {
  kicker: string;
  body: string;
  image: ImageSrc;
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
            alt={kicker}
            loading="lazy"
            className="w-full h-[60vh] md:h-[80vh] object-cover grayscale-[0.2]"
          />
        </div>
        <div className="md:col-span-5 md:px-6">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            — {kicker}
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg md:text-xl max-w-md">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}

function Practices() {
  const items = [
    {
      k: "01",
      t: "Software Sob Medida",
      d: "ERPs, CRMs, dashboards e plataformas internas construídos para o seu processo — não para um template genérico.",
    },
    {
      k: "02",
      t: "Sites e Aplicativos",
      d: "Presença digital que converte. Web, mobile e landing pages de alto desempenho, do design à produção.",
    },
    {
      k: "03",
      t: "Agentes de IA",
      d: "Atendimento, qualificação de leads e automação de operações rodando 24h com inteligência artificial generativa.",
    },
    {
      k: "04",
      t: "Automações e Integrações",
      d: "WhatsApp, Stripe, APIs externas e processos internos conectados e automatizados — seu time faz menos, entrega mais.",
    },
  ];
  return (
    <section className="px-6 md:px-10 py-32 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">
              — Serviços
            </p>
            <h2 className="font-display text-2xl md:text-4xl">
              O que{" "}
              <em className="italic text-muted-foreground">construímos</em>.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            Quatro pilares, uma equipe. Montamos times especializados que
            entregam juntos e acompanham os resultados ao longo do tempo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          {items.map((i) => (
            <div
              key={i.k}
              className="bg-background p-10 md:p-14 group hover:bg-card transition-colors"
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-display text-3xl text-primary">
                  {i.k}
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <h4 className="font-display text-3xl mb-4 group-hover:text-primary transition-colors">
                {i.t}
              </h4>
              <p className="text-muted-foreground leading-relaxed">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StoneBreak() {
  return (
    <section
      className="relative h-[60vh] overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: `url(${imageSrc(textureTech)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-background/40" />
      <blockquote className="relative z-10 text-center px-6 max-w-4xl">
        <p className="font-display italic text-3xl md:text-5xl leading-tight">
          &ldquo;Uma clínica reduziu 80% das ligações com um agente de IA. Uma
          imobiliária{" "}
          <span className="text-cyan-glow">triplicou o atendimento </span> sem
          contratar ninguém. Isso não é futuro — já está rodando.&rdquo;
        </p>
        <footer className="mt-8 text-xs tracking-[0.4em] uppercase text-muted-foreground">
          — Resultados reais de clientes Braxen
        </footer>
      </blockquote>
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
        <h2 className="font-display text-4xl leading-[0.95] mb-6">
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
            <p>LinkedIn · GitHub · Instagram</p>
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
          href={INBOXY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          Inboxy
        </a>
        <span className="hidden sm:inline text-border">·</span>
        <span className="flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-primary blink" />
          Construído no escuro
        </span>
      </p>
    </footer>
  );
}

export function HomePage() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Statement />
      <Clients />
      <Chapter
        id="chapter-1"
        kicker="A Dor"
        body="Leads sem resposta. Equipe no limite. Planilhas que ninguém confia. Você sabe que precisa de tecnologia — mas não de mais uma ferramenta genérica que ninguém vai usar."
        image={chapterProblem}
      />
      <Chapter
        id="chapter-2"
        kicker="A Solução"
        body="Mapeamos onde sua operação trava, construímos exatamente o que resolve e colocamos pra rodar. Agente de IA no WhatsApp, CRM que seu time realmente usa, dashboard que mostra o que importa. Sem template. Sem licença."
        image={chapterSolution}
        reverse
      />
      <StoneBreak />
      <section className="px-6 md:px-10 py-20 border-t border-border bg-card">
        <div className="mx-auto max-w-5xl grid md:grid-cols-2 lg:grid-cols-2 gap-px bg-border">
          <div className="bg-background p-8 md:p-10 flex flex-col justify-between gap-6">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">
                — Produto
              </p>
              <h3 className="font-display text-xl md:text-2xl mb-2">
                Inboxy
              </h3>
              <p className="text-muted-foreground text-sm max-w-md">
                Agente de IA multicanal com vendas Stripe, agendamento Cal.com e inbox via Chatwoot.
              </p>
            </div>
            <a
              href={INBOXY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-primary hover:text-foreground transition-colors"
            >
              Conhecer o Inboxy <span aria-hidden>→</span>
            </a>
          </div>
          {/* <div className="bg-background p-8 md:p-10 flex flex-col justify-between gap-6">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">
                — Automação
              </p>
              <h3 className="font-display text-xl md:text-2xl mb-2">
                WhatsApp + CRM
              </h3>
              <p className="text-muted-foreground text-sm max-w-md">
                Agente de IA atendendo 24/7, leads no CRM e agendamentos automáticos.
              </p>
            </div>
            <a
              href="/whatsapp-crm"
              className="inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-primary hover:text-foreground transition-colors"
            >
              Conhecer solução <span aria-hidden>→</span>
            </a>
          </div> */}
          <div className="bg-background p-8 md:p-10 flex flex-col justify-between gap-6 md:col-span-2 lg:col-span-1">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">
                — Equipe
              </p>
              <h3 className="font-display text-xl md:text-2xl mb-2">
                Tech Squads
              </h3>
              <p className="text-muted-foreground text-sm max-w-md">
                Times completos de desenvolvimento, produto, dados e IA integrados ao seu negócio.
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
      </section>
      <Chapter
        id="chapter-3"
        kicker="O Resultado"
        body="Primeira entrega em semanas, não em meses. Você acompanha cada etapa, valida antes de ir pro ar e mede o impacto real. Se não funcionar, a gente ajusta até funcionar."
        image={chapterResult}
      />
      <Portfolio />
      <Practices />
      <Leadership />
      <Contact />
      <Footer />
    </main>
  );
}
