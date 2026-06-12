"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
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

const firstColumn = projects.slice(0, 4);
const secondColumn = projects.slice(4, 8);
const thirdColumn = projects.slice(8, 12);

function SolutionCard({ project }: { project: Project }) {
  return (
    <div className="group relative h-[22rem] w-full min-w-0 shrink-0 overflow-hidden rounded-sm border border-border shadow-lg shadow-black/25 sm:h-[24rem] md:h-[26rem] lg:h-[28rem]">
      <img
        src={imageSrc(project.image)}
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-[oklch(0.12_0.012_220/95%)] via-[oklch(0.12_0.012_220/35%)] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
        <span className="mb-2 block font-mono text-[10px] tracking-[0.3em] text-primary">
          {String(project.id).padStart(2, "0")}
        </span>
        <span className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-primary">
          {project.tag}
        </span>
        <h3 className="text-heading-3 font-medium leading-tight text-foreground">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      </div>
    </div>
  );
}

function SolutionsColumn({
  className,
  items,
  duration = 10,
}: {
  className?: string;
  items: Project[];
  duration?: number;
}) {
  return (
    <div className={cn("min-w-0 flex-1", className)}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-5 bg-background pb-5 md:gap-6 md:pb-6"
      >
        {[0, 1].map((index) => (
          <Fragment key={index}>
            {items.map((project) => (
              <motion.div
                key={`${index}-${project.id}`}
                aria-hidden={index === 1 ? true : undefined}
                whileHover={{
                  scale: 1.02,
                  y: -6,
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                className="w-full"
              >
                <SolutionCard project={project} />
              </motion.div>
            ))}
          </Fragment>
        ))}
      </motion.div>
    </div>
  );
}

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

      <div
        className="relative w-full px-4 sm:px-6 md:px-8 lg:px-10"
        role="region"
        aria-label="Soluções entregues pela Braxen"
      >
        <div className="mx-auto flex w-full max-w-[1400px] justify-center gap-4 md:gap-6 lg:gap-8 [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)] max-h-[780px] overflow-hidden">
          <SolutionsColumn items={firstColumn} duration={22} />
          <SolutionsColumn
            items={secondColumn}
            className="hidden md:block"
            duration={26}
          />
          <SolutionsColumn
            items={thirdColumn}
            className="hidden lg:block"
            duration={24}
          />
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[8%] bg-gradient-to-r from-background to-transparent sm:w-[6%]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[8%] bg-gradient-to-l from-background to-transparent sm:w-[6%]" />
      </div>
    </section>
  );
}
