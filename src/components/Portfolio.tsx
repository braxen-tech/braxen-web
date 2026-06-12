"use client";

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
import { Marquee } from "@/components/ui/3d-testimonails";
import { Card, CardContent } from "@/components/ui/card";
import { cn, imageSrc } from "@/lib/utils";

const projects = [
  {
    id: 1,
    title: "Agente de Atendimento",
    tag: "IA · WhatsApp",
    description: "Redução de 80% nas ligações com atendimento 24/7",
    image: portfolioAiAgent,
  },
  {
    id: 2,
    title: "CRM Sob Medida",
    tag: "Software · CRM",
    description: "Pipeline comercial integrado ao WhatsApp e e-mail",
    image: portfolioCrm,
  },
  {
    id: 3,
    title: "Dashboard Operacional",
    tag: "Analytics · BI",
    description: "Métricas de equipe e receita em tempo real",
    image: portfolioDashboard,
  },
  {
    id: 4,
    title: "App de Agendamento",
    tag: "Mobile · API",
    description: "Reservas, pagamentos e notificações automáticas",
    image: portfolioSchedulingApp,
  },
  {
    id: 5,
    title: "Qualificação de Leads",
    tag: "IA · Automação",
    description: "Triagem inteligente com scoring por IA generativa",
    image: portfolioLeadScoring,
  },
  {
    id: 6,
    title: "Integração Stripe",
    tag: "Pagamentos · API",
    description: "Checkout, assinaturas e webhooks sob medida",
    image: portfolioStripe,
  },
  {
    id: 7,
    title: "Portal do Cliente",
    tag: "Web App · SaaS",
    description: "Área logada com contratos, faturas e suporte",
    image: portfolioClientPortal,
  },
  {
    id: 8,
    title: "Automação WhatsApp",
    tag: "Integração · Bot",
    description: "Fluxos de onboarding e follow-up automatizados",
    image: portfolioWhatsappAutomation,
  },
  {
    id: 9,
    title: "ERP Interno",
    tag: "Software · Gestão",
    description: "Controle de estoque, compras e faturamento",
    image: portfolioErp,
  },
  {
    id: 10,
    title: "Landing Page",
    tag: "Site · Performance",
    description: "Página de alta conversão com SEO e analytics",
    image: portfolioLandingPage,
  },
  {
    id: 11,
    title: "Team as a Service",
    tag: "Squad · Alocação",
    description: "Equipe dedicada integrada ao seu time",
    image: portfolioTeam,
  },
  {
    id: 12,
    title: "Painel Administrativo",
    tag: "Dashboard · CRUD",
    description: "Gestão de usuários, permissões e conteúdo",
    image: portfolioAdminPanel,
  },
];

type Project = (typeof projects)[number];

function SolutionCard({ project }: { project: Project }) {
  return (
    <Card className="mx-auto box-border w-[min(calc(50vw-1.25rem),380px)] min-w-0 max-w-[380px] shrink-0 overflow-hidden border-border bg-card/95 shadow-lg backdrop-blur-sm sm:w-[min(calc(50vw-2rem),380px)] md:w-[320px] lg:w-[360px] xl:w-[380px]">
      <div className="relative h-36 w-full overflow-hidden sm:h-40 md:h-44 lg:h-52">
        <img
          src={imageSrc(project.image)}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-card/80 to-transparent" />
      </div>
      <CardContent className="p-4 md:p-5">
        <span className="block truncate font-mono text-[10px] tracking-[0.2em] text-primary">
          {String(project.id).padStart(2, "0")} · {project.tag}
        </span>
        <h3 className="mt-2 text-base font-medium leading-tight text-foreground md:text-lg">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground md:text-sm">
          {project.description}
        </p>
      </CardContent>
    </Card>
  );
}

const columns = [
  projects.slice(0, 3),
  projects.slice(3, 6),
  projects.slice(6, 9),
  projects.slice(9, 12),
];

export function Portfolio() {
  return (
    <section
      id="portfolio"
      className="w-full overflow-x-hidden border-t border-border py-24 md:py-28"
    >
      <div className="mb-10 px-6 md:mb-14 md:px-10 lg:px-16">
        <p className="mb-4 text-xs tracking-[0.4em] uppercase text-primary">
          — O que entregamos
        </p>
        <h2 className="text-heading-2 font-display">
          Soluções<span className="text-primary">.</span>
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
          De agentes de IA a dashboards sob medida — cada projeto é construído
          para o seu processo.
        </p>
      </div>

      <div className="relative h-[36rem] w-full overflow-hidden sm:h-[38rem] md:h-[42rem] lg:h-[48rem] [perspective:400px]">
        <div className="portfolio-3d-stage flex h-full w-full min-w-0 items-stretch justify-center gap-2 px-2 sm:gap-3 md:gap-5 lg:gap-8 lg:px-4">
          {columns.map((columnProjects, index) => (
            <div
              key={index}
              className={cn(
                "flex h-full min-w-0 flex-1 basis-0",
                index >= 2 && "hidden md:flex",
              )}
            >
              <Marquee
                vertical
                pauseOnHover
                reverse={index % 2 === 1}
                repeat={3}
                className="h-full w-full min-w-0 max-w-none flex-1 [--duration:45s] [--gap:1rem] md:[--gap:1.25rem]"
                ariaLabel={`Coluna de soluções ${index + 1}`}
              >
                {columnProjects.map((project) => (
                  <SolutionCard key={project.id} project={project} />
                ))}
              </Marquee>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1/5 bg-gradient-to-b from-background via-background/80 to-transparent sm:h-1/4" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/5 bg-gradient-to-t from-background via-background/80 to-transparent sm:h-1/4" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[12%] bg-gradient-to-r from-background via-background/70 to-transparent sm:w-[10%] md:w-[8%]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[12%] bg-gradient-to-l from-background via-background/70 to-transparent sm:w-[10%] md:w-[8%]" />
      </div>
    </section>
  );
}
