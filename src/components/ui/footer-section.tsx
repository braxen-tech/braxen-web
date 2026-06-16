"use client";

import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SOCIAL_LINKS } from "@/lib/site";

interface FooterLink {
  title: string;
  href: string;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: "Soluções",
    links: [
      { title: "Automação de atendimento", href: "/atendimento-ia" },
      { title: "Tech Squads", href: "/tech-squads" },
      { title: "Entregas", href: "/#entregas" },
      { title: "Serviços", href: "/#services" },
    ],
  },
  {
    label: "Navegação",
    links: [
      { title: "A Dor", href: "/#problema" },
      { title: "Como fazemos", href: "/#como-fazemos" },
      { title: "Time", href: "/#leadership" },
      { title: "Depoimentos", href: "/#depoimentos" },
    ],
  },
  {
    label: "Contato",
    links: [
      { title: "Fale conosco", href: "/#contact" },
      { title: "Automação", href: "/atendimento-ia#contato" },
      { title: "Tech Squads", href: "/tech-squads#contato" },
    ],
  },
  {
    label: "Redes",
    links: [
      { title: "LinkedIn", href: SOCIAL_LINKS.linkedin },
      { title: "Instagram", href: SOCIAL_LINKS.instagram },
      { title: "GitHub", href: SOCIAL_LINKS.github },
    ],
  },
];

type FooterProps = {
  contactHref?: string;
};

export function Footer({ contactHref = "/#contact" }: FooterProps) {
  const links = footerLinks.map((section) =>
    section.label === "Contato"
      ? {
          ...section,
          links: section.links.map((link) =>
            link.title === "Fale conosco"
              ? { ...link, href: contactHref }
              : link,
          ),
        }
      : section,
  );

  return (
    <footer className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center rounded-t-4xl border-t border-border bg-[radial-gradient(35%_128px_at_50%_0%,color-mix(in_oklab,var(--foreground)_8%,transparent),transparent)] px-6 py-12 md:rounded-t-[3rem] lg:py-16">
      <div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/20 blur" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm tracking-[0.3em] uppercase"
          >
            <span className="inline-block size-2 rounded-full bg-primary" />
            Braxen
          </a>
          <p className="mt-8 text-sm text-muted-foreground md:mt-0">
            © {new Date().getFullYear()} Braxen Tech — Todos os direitos
            reservados.
          </p>
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
          {links.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs tracking-[0.2em] uppercase">
                  {section.label}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="inline-flex items-center transition-all duration-300 hover:text-foreground"
                        {...(link.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
