"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    text: "Reduzimos 80% das ligações com um agente de IA no WhatsApp. O time parou de apagar incêndio e voltou a focar no que importa.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Mariana Costa",
    role: "Diretora Clínica",
  },
  {
    text: "Triplicamos o atendimento sem contratar ninguém. Leads qualificados chegam no CRM prontos para fechar.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Rafael Mendes",
    role: "Sócio Imobiliária",
  },
  {
    text: "O CRM foi construído pro nosso processo — não um template. O time adotou na primeira semana.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Camila Rocha",
    role: "Head Comercial",
  },
  {
    text: "Dashboard operacional com métricas em tempo real. Pela primeira vez conseguimos enxergar receita e equipe no mesmo lugar.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Lucas Ferreira",
    role: "COO",
  },
  {
    text: "Integração Stripe, WhatsApp e agendamento rodando sozinhos. Menos planilha, mais conversão.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Ana Beatriz Lima",
    role: "Gerente de Operações",
  },
  {
    text: "Primeira entrega em semanas, não meses. Acompanhamos cada etapa e medimos impacto real desde o dia um.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Pedro Almeida",
    role: "Fundador",
  },
  {
    text: "Automação de follow-up no WhatsApp transformou nosso funil. Onboarding e pós-venda sem depender de planilha.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Felipe Santos",
    role: "Marketing",
  },
  {
    text: "ERP interno sob medida — estoque, compras e faturamento integrados. Parou a bagunça entre áreas.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Juliana Martins",
    role: "Diretora Financeira",
  },
  {
    text: "Tech squad dedicado integrado ao nosso time. Entregamos mais features sem inflar headcount.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Bruno Nascimento",
    role: "CTO",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

function TestimonialsColumn({
  className,
  testimonials: items,
  duration = 10,
}: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) {
  return (
    <div className={className}>
      <motion.ul
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="m-0 flex list-none flex-col gap-6 bg-transparent p-0 pb-6"
      >
        {[0, 1].map((index) => (
          <Fragment key={index}>
            {items.map(({ text, image, name, role }, i) => (
              <motion.li
                key={`${index}-${i}`}
                aria-hidden={index === 1 ? "true" : undefined}
                tabIndex={index === 1 ? -1 : 0}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                whileFocus={{
                  scale: 1.03,
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                className="group w-full max-w-xs cursor-default rounded-sm border border-border bg-card p-8 shadow-lg shadow-black/20 transition-all duration-300 select-none focus:outline-none focus:ring-2 focus:ring-primary/30 md:p-10"
              >
                <blockquote className="m-0 p-0">
                  <p className="m-0 leading-relaxed text-muted-foreground">
                    {text}
                  </p>
                  <footer className="mt-6 flex items-center gap-3">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={`Avatar de ${name}`}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-border transition-all duration-300 ease-in-out group-hover:ring-primary/30"
                    />
                    <div className="flex flex-col">
                      <cite className="leading-5 font-medium not-italic tracking-tight text-foreground">
                        {name}
                      </cite>
                      <span className="mt-0.5 text-sm leading-5 tracking-tight text-muted-foreground">
                        {role}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </motion.li>
            ))}
          </Fragment>
        ))}
      </motion.ul>
    </div>
  );
}

export function Testimonials({ enabled = false }: { enabled?: boolean }) {
  if (!enabled) return null;

  return (
    <div
      className="relative mt-16 overflow-hidden md:mt-20"
      role="region"
      aria-label="Depoimentos de clientes"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 },
        }}
        className="mb-10 text-center md:mb-14"
      >
        <p className="mb-4 text-xs tracking-[0.4em] uppercase text-primary">
          — Resultados reais
        </p>
        <h2 className="font-display text-heading-2">
          O que nossos clientes{" "}
          <em className="italic text-muted-foreground">dizem</em>.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
          De agentes de IA a dashboards sob medida — cada projeto é construído
          para o processo de quem confia na Braxen.
        </p>
      </motion.div>

      <div className="mx-auto flex max-h-[740px] justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
        <TestimonialsColumn testimonials={firstColumn} duration={15} />
        <TestimonialsColumn
          testimonials={secondColumn}
          className="hidden md:block"
          duration={19}
        />
        <TestimonialsColumn
          testimonials={thirdColumn}
          className="hidden lg:block"
          duration={17}
        />
      </div>
    </div>
  );
}
