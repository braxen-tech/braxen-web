"use client";

import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { SOCIAL_LINKS } from "@/lib/site";
import { ROUTES } from "@/lib/routes";

interface FooterLink {
  title: string;
  href: string;
}

interface FooterSection {
  label: string;
  key: "solutions" | "navigation" | "contact" | "social";
  links: FooterLink[];
}

function useFooterLinks(): FooterSection[] {
  const tSections = useTranslations("footer.sections");
  const tSolutions = useTranslations("footer.solutions");
  const tNavigation = useTranslations("footer.navigation");
  const tContact = useTranslations("footer.contact");
  const locale = useLocale();
  const base = `/${locale}`;

  return [
    {
      key: "solutions",
      label: tSections("solutions"),
      links: [
        { title: tSolutions("atendimentoIa"), href: `${base}${ROUTES.aiAgents}` },
        { title: tSolutions("clinicas"), href: `${base}${ROUTES.clinics}` },
        { title: tSolutions("techSquads"), href: `${base}${ROUTES.techSquads}` },
        { title: tSolutions("deliveries"), href: `${base}/#entregas` },
        { title: tSolutions("services"), href: `${base}/#services` },
      ],
    },
    {
      key: "navigation",
      label: tSections("navigation"),
      links: [
        { title: tNavigation("pain"), href: `${base}/#problema` },
        { title: tNavigation("howWeDo"), href: `${base}/#como-fazemos` },
        { title: tNavigation("team"), href: `${base}/#leadership` },
        { title: tNavigation("testimonials"), href: `${base}/#depoimentos` },
      ],
    },
    {
      key: "contact",
      label: tSections("contact"),
      links: [
        { title: tContact("talkToUs"), href: `${base}/#contact` },
        { title: tContact("automation"), href: `${base}${ROUTES.aiAgents}#contato` },
        { title: tContact("techSquads"), href: `${base}${ROUTES.techSquads}#contato` },
      ],
    },
    {
      key: "social",
      label: tSections("social"),
      links: [
        { title: "LinkedIn", href: SOCIAL_LINKS.linkedin },
        { title: "Instagram", href: SOCIAL_LINKS.instagram },
        { title: "GitHub", href: SOCIAL_LINKS.github },
      ],
    },
  ];
}

type FooterProps = {
  contactHref?: string;
};

export function Footer({ contactHref }: FooterProps = {}) {
  const t = useTranslations("footer");
  const locale = useLocale();
  const base = `/${locale}`;
  const sections = useFooterLinks();

  const resolvedContactHref = contactHref ?? `${base}/#contact`;
  const links = sections.map((section) =>
    section.key === "contact"
      ? {
          ...section,
          links: section.links.map((link, index) =>
            index === 0 ? { ...link, href: resolvedContactHref } : link,
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
            href={base}
            className="inline-flex items-center gap-2 text-sm tracking-[0.3em] uppercase"
          >
            <span className="inline-block size-2 rounded-full bg-primary" />
            Braxen
          </a>
          <p className="mt-8 text-sm text-muted-foreground md:mt-0">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
          {links.map((section, index) => (
            <AnimatedContainer key={section.key} delay={0.1 + index * 0.1}>
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
