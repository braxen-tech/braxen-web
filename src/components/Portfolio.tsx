"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import portfolioAiAgent from "@/assets/portfolio-ai-agent.jpg";
import portfolioCrm from "@/assets/portfolio-crm.jpg";
import portfolioDashboard from "@/assets/portfolio-dashboard.jpg";
import portfolioSchedulingApp from "@/assets/portfolio-scheduling-app.jpg";
import portfolioLeadScoring from "@/assets/portfolio-lead-scoring.jpg";
import portfolioStripe from "@/assets/portfolio-stripe.jpg";
import portfolioClientPortal from "@/assets/portfolio-client-portal.jpg";
import portfolioWhatsappAutomation from "@/assets/portfolio-whatsapp-automation.jpg";
import portfolioErp from "@/assets/portfolio-erp.jpg";
import portfolioLandingPage from "@/assets/portfolio-landing-page.jpg";
import portfolioTeam from "@/assets/portfolio-team.jpg";
import portfolioAdminPanel from "@/assets/portfolio-admin-panel.jpg";
import { imageSrc } from "@/lib/utils";

const projects = [
  { id: 1, title: "Agente de Atendimento", tag: "IA · WhatsApp", description: "Redução de 80% nas ligações com atendimento 24/7", image: portfolioAiAgent },
  { id: 2, title: "CRM Sob Medida", tag: "Software · CRM", description: "Pipeline comercial integrado ao WhatsApp e e-mail", image: portfolioCrm },
  { id: 3, title: "Dashboard Operacional", tag: "Analytics · BI", description: "Métricas de equipe e receita em tempo real", image: portfolioDashboard },
  { id: 4, title: "App de Agendamento", tag: "Mobile · API", description: "Reservas, pagamentos e notificações automáticas", image: portfolioSchedulingApp },
  { id: 5, title: "Qualificação de Leads", tag: "IA · Automação", description: "Triagem inteligente com scoring por IA generativa", image: portfolioLeadScoring },
  { id: 6, title: "Integração Stripe", tag: "Pagamentos · API", description: "Checkout, assinaturas e webhooks sob medida", image: portfolioStripe },
  { id: 7, title: "Portal do Cliente", tag: "Web App · SaaS", description: "Área logada com contratos, faturas e suporte", image: portfolioClientPortal },
  { id: 8, title: "Automação WhatsApp", tag: "Integração · Bot", description: "Fluxos de onboarding e follow-up automatizados", image: portfolioWhatsappAutomation },
  { id: 9, title: "ERP Interno", tag: "Software · Gestão", description: "Controle de estoque, compras e faturamento", image: portfolioErp },
  { id: 10, title: "Landing Page", tag: "Site · Performance", description: "Página de alta conversão com SEO e analytics", image: portfolioLandingPage },
  { id: 11, title: "Team as a Service", tag: "Squad · Alocação", description: "Equipe dedicada integrada ao seu time", image: portfolioTeam },
  { id: 12, title: "Painel Administrativo", tag: "Dashboard · CRUD", description: "Gestão de usuários, permissões e conteúdo", image: portfolioAdminPanel },
];

export function Portfolio() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = 430;
    el.scrollBy({ left: direction === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section id="portfolio" className="border-t border-border py-24 md:py-28">
      {/* Header */}
      <div className="px-6 md:px-10 lg:px-16 mb-10 md:mb-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.4em] text-primary md:mb-4 md:text-xs">
              — O que entregamos
            </p>
            <h2 className="font-display text-4xl leading-[0.95] md:text-7xl">
              Soluções<span className="text-primary">.</span>
            </h2>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-muted-foreground md:mt-5 md:text-sm">
              De agentes de IA a dashboards sob medida — cada projeto é construído para o seu processo.
            </p>
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-3">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Anterior"
            className="flex size-10 items-center justify-center border border-border text-foreground transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-25 disabled:pointer-events-none"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 3L5 8L10 13" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Próximo"
            className="flex size-10 items-center justify-center border border-border text-foreground transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-25 disabled:pointer-events-none"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 3L11 8L6 13" />
            </svg>
          </button>
          </div>
        </div>
      </div>

      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto px-6 pb-4 md:gap-7 md:px-10 lg:px-16 scrollbar-none snap-x snap-mandatory"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative shrink-0 w-[300px] md:w-[400px] h-[380px] md:h-[500px] snap-start overflow-hidden rounded-sm"
          >
            <img
              src={imageSrc(project.image)}
              alt={project.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[oklch(0.12_0.012_220/90%)]" />
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <span className="mb-1.5 block font-mono text-[10px] tracking-[0.3em] text-primary">
                {String(project.id).padStart(2, "0")}
              </span>
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                {project.tag}
              </span>
              <h3 className="text-lg font-medium leading-tight text-foreground">
                {project.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
