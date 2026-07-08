"use client";

import { useState, useEffect, useRef } from "react";
import { motion, animate, useInView, useReducedMotion } from "framer-motion";
import {
  MoveRight,
  Bot,
  KanbanSquare,
  MessagesSquare,
  Workflow,
  CalendarCheck,
  CreditCard,
  HelpCircle,
  X,
  Check,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { siteHeaderClass, siteHeaderInnerClass } from "@/lib/site-header";
import { ClinicasQualificationForm } from "@/components/ClinicasQualificationForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  ScrollReveal,
  StaggerChildren,
} from "@/components/ui/scroll-reveal";
import { Footer } from "@/components/ui/footer-section";
import { StackedCardsSection } from "@/components/StackedCardsSection";
import { ROUTES } from "@/lib/routes";

const PAGE_SOURCE = ROUTES.clinics;
const TEAL = "#00C5CD";

const FEATURE_ICONS = [Bot, MessagesSquare, KanbanSquare, Workflow];
const SUPERPOWER_ICONS = [CalendarCheck, CreditCard, HelpCircle];

function Nav() {
  const t = useTranslations("clinicas.nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={siteHeaderClass(scrolled)}
    >
      <div className={siteHeaderInnerClass(scrolled)}>
        <a
          href=".."
          className="flex items-center gap-2 text-sm tracking-[0.3em] uppercase"
        >
          <span className="inline-block size-2 rounded-full bg-primary" />
          Braxen
        </a>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <a
            href="#contato"
            data-cta="nav"
            className="btn btn-sm btn-primary md:hidden"
          >
            {t("ctaShort")}
          </a>
          <a
            href="#contato"
            data-cta="nav"
            className="btn btn-sm btn-outline btn-outline-primary hidden md:inline-flex"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </motion.header>
  );
}

function StickyCta() {
  const t = useTranslations("clinicas.sticky");
  const [hideBar, setHideBar] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const contact = document.getElementById("contato");
    if (!hero || !contact) return;

    const update = () => {
      const heroRect = hero.getBoundingClientRect();
      const contactRect = contact.getBoundingClientRect();
      const heroInView = heroRect.bottom > 120;
      const contactInView =
        contactRect.top < window.innerHeight && contactRect.bottom > 0;
      setHideBar(heroInView || contactInView);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (hideBar) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background/95 backdrop-blur-md p-3 lg:hidden">
      <a
        href="#contato"
        data-cta="sticky"
        className="btn btn-primary w-full max-w-lg mx-auto"
      >
        {t("cta")}
        <MoveRight className="size-4" aria-hidden />
      </a>
    </div>
  );
}

function Hero() {
  const t = useTranslations("clinicas.hero");

  return (
    <section id="hero" className="relative overflow-hidden pt-28 md:pt-36">
      {/* Desktop image — bleeds off the top-right corner of the screen */}
      <ScrollReveal
        delay={0.1}
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block"
      >
        <img
          src="/clinicas-hero-doctor.png"
          alt={t("imageAlt")}
          width={590}
          height={845}
          loading="eager"
          decoding="async"
          className="absolute bottom-0 right-0 h-[90%] w-auto max-w-none"
        />
      </ScrollReveal>

      <div className="relative mx-auto grid max-w-7xl items-end gap-8 px-6 md:px-10 lg:grid-cols-2">
        <ScrollReveal className="order-1 pb-16 md:pb-24 lg:py-28">
          <p className="mb-6 text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium">
            {t("eyebrow")}
          </p>
          <h1 className="font-sans text-4xl leading-[1.08] md:text-5xl lg:text-[3.25rem] font-semibold tracking-tight">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("subtitle")}
          </p>
          <div className="mt-8">
            <a
              href="#contato"
              data-cta="hero"
              className="inline-flex items-center gap-3 rounded-full px-8 py-3.5 text-sm font-medium text-white tracking-wide transition-opacity hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: TEAL }}
            >
              {t("primaryCta")}
            </a>
          </div>
        </ScrollReveal>

        {/* Mobile/tablet image — bleeds off the right edge */}
        <ScrollReveal
          delay={0.1}
          className="order-2 -mr-6 flex justify-end md:-mr-10 lg:hidden"
        >
          <img
            src="/clinicas-hero-doctor.png"
            alt={t("imageAlt")}
            width={590}
            height={845}
            loading="eager"
            decoding="async"
            className="w-[min(80%,320px)] max-w-none"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}

function AnimatedStatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();

  const match = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);
  const hasMatch = match !== null;
  const prefix = match?.[1] ?? "";
  const target = match ? parseFloat(match[2].replace(",", ".")) : 0;
  const suffix = match?.[3] ?? "";
  const decimals = match ? (match[2].split(/[.,]/)[1]?.length ?? 0) : 0;

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!hasMatch) return;
    if (reducedMotion || !inView) {
      if (reducedMotion) setDisplay(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, target, reducedMotion, hasMatch]);

  if (!hasMatch) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function StatsBand() {
  const t = useTranslations("clinicas.stats");
  const items = t.raw("items") as { value: string; caption: string }[];

  return (
    <section className="px-6 py-10 md:px-10 md:py-14">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div
            className="animated-border grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/30 rounded-xl overflow-hidden text-white"
            style={{
              backgroundColor: "#0E9D9B",
              ["--animated-border-color" as string]: "#fff",
              ["--animated-border-width" as string]: "2.5px",
            }}
          >
            {items.map((item) => (
              <div key={item.caption} className="px-6 py-8 text-center">
                <p className="font-sans text-4xl md:text-5xl font-bold">
                  <AnimatedStatValue value={item.value} />
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  {item.caption}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function PhoneMockup() {
  const t = useTranslations("clinicas.secondHero");
  const features = t.raw("features") as { title: string }[];

  const badges: {
    idx: number;
    icon: typeof Bot;
    teal: boolean;
    pos: string;
  }[] = [
    { idx: 0, icon: FEATURE_ICONS[0], teal: true, pos: "top-[8%] -right-6 md:-right-12" },
    { idx: 1, icon: FEATURE_ICONS[1], teal: false, pos: "top-[40%] -left-4 md:-left-10" },
    { idx: 2, icon: FEATURE_ICONS[2], teal: false, pos: "bottom-[30%] -left-2 md:-left-6" },
    { idx: 3, icon: FEATURE_ICONS[3], teal: true, pos: "bottom-[14%] -right-6 md:-right-12" },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[260px] md:max-w-[280px]">
      {/* iPhone frame */}
      <div className="relative rounded-[2.5rem] border-[6px] border-zinc-900 dark:border-zinc-700 bg-zinc-900 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 z-10 h-6 w-28 rounded-b-2xl bg-zinc-900 dark:bg-zinc-700"
        />
        <img
          src="/clinicas-whatsapp-mockup.jpg"
          alt={t("whatsappImageAlt")}
          width={591}
          height={1280}
          loading="lazy"
          decoding="async"
          className="w-full rounded-[2rem]"
        />
      </div>
      {/* Floating feature badges */}
      {badges.map((badge) => {
        const Icon = badge.icon;
        return (
          <div
            key={badge.idx}
            className={`absolute ${badge.pos} flex items-center gap-2 rounded-full px-4 py-2 shadow-lg text-xs font-medium whitespace-nowrap z-10`}
            style={
              badge.teal
                ? { backgroundColor: TEAL, color: "white" }
                : {
                    backgroundColor: "var(--background, #fff)",
                    color: "var(--foreground, #18181b)",
                    border: "1px solid var(--border, #e4e4e7)",
                  }
            }
          >
            <Icon className="size-3.5" />
            {features[badge.idx]?.title}
          </div>
        );
      })}
    </div>
  );
}

function Capabilities() {
  const t = useTranslations("clinicas.secondHero");

  return (
    <section className="px-6 py-20 md:px-10 md:py-28 overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <ScrollReveal>
          <h2 className="font-sans text-3xl leading-[1.1] md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("description")}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <PhoneMockup />
        </ScrollReveal>
      </div>
    </section>
  );
}

function ProblemSolution() {
  const t = useTranslations("clinicas.problem");
  const pains = t.raw("pains") as string[];
  const solutions = t.raw("solutions") as string[];

  return (
    <section id="desafios" className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Column headers */}
        <ScrollReveal>
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <div className="rounded-xl bg-zinc-200 dark:bg-zinc-700 px-6 py-4 text-center">
              <p className="text-sm md:text-base font-medium text-foreground/70">
                {t("todayLabel")}
              </p>
            </div>
            <div
              className="rounded-xl px-6 py-4 text-center"
              style={{ backgroundColor: TEAL }}
            >
              <p className="text-sm md:text-base font-medium text-white">
                {t("withBraxenLabel")}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Pain / Solution cards */}
        <StaggerChildren className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            {pains.map((pain) => (
              <div
                key={pain}
                className="flex items-start gap-4 rounded-xl bg-red-50 dark:bg-red-950/20 p-5 border border-red-100 dark:border-red-900/30"
              >
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-red-500">
                  <X className="size-3.5 text-white" strokeWidth={3} />
                </span>
                <p className="text-sm md:text-base font-medium">{pain}</p>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {solutions.map((solution) => (
              <div
                key={solution}
                className="flex items-start gap-4 rounded-xl bg-green-50 dark:bg-green-950/20 p-5 border border-green-100 dark:border-green-900/30"
              >
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-green-500">
                  <Check className="size-3.5 text-white" strokeWidth={3} />
                </span>
                <p className="text-sm md:text-base font-medium">{solution}</p>
              </div>
            ))}
          </div>
        </StaggerChildren>
      </div>
    </section>
  );
}

function PullQuote() {
  const t = useTranslations("clinicas.pullQuote");

  return (
    <section className="px-6 py-20 md:px-10 md:py-28">
      <ScrollReveal className="mx-auto max-w-4xl">
        <div className="relative px-6 md:px-12">
          <span
            aria-hidden
            className="absolute -top-4 left-0 text-7xl md:text-8xl font-serif leading-none select-none"
            style={{ color: TEAL }}
          >
            &ldquo;
          </span>
          <p
            className="font-sans text-xl leading-snug md:text-3xl lg:text-[2.25rem] font-medium italic pt-10"
            style={{ color: TEAL }}
          >
            {t("line1")}
            <br className="hidden md:block" />{" "}
            <span className="underline decoration-2 underline-offset-4">
              {t("line2")}
            </span>
          </p>
          <span
            aria-hidden
            className="block text-right text-7xl md:text-8xl font-serif leading-none select-none -mt-4"
            style={{ color: TEAL }}
          >
            &rdquo;
          </span>
        </div>
      </ScrollReveal>
    </section>
  );
}

function Superpowers() {
  const t = useTranslations("clinicas.superpowers");
  const items = t.raw("items") as { title: string; desc: string }[];
  const cards = items.map((item, i) => {
    const Icon = SUPERPOWER_ICONS[i] ?? CalendarCheck;
    return {
      id: `superpower-${i}`,
      title: item.title,
      description: item.desc,
      icon: <Icon className="size-7" style={{ color: TEAL }} />,
    };
  });

  return (
    <>
      <StackedCardsSection id="superpoderes" title={t("title")} cards={cards} />
      <div className="flex justify-center px-6 pb-20 md:pb-28">
        <a
          href="#contato"
          data-cta="superpowers"
          className="inline-flex items-center gap-3 rounded-full px-8 py-3.5 text-sm font-medium text-white tracking-wide transition-opacity hover:opacity-90 cursor-pointer"
          style={{ backgroundColor: TEAL }}
        >
          {t("cta")}
        </a>
      </div>
    </>
  );
}

function Contact() {
  const t = useTranslations("clinicas.contact");

  return (
    <section
      id="contato"
      className="scroll-mt-24 px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 items-start">
        <ScrollReveal>
          <h2
            className="font-sans text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight"
            style={{ color: TEAL }}
          >
            {t("title")}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg max-w-md">
            {t("description")}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <ClinicasQualificationForm source={PAGE_SOURCE} />
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground text-center">
            {t("lgpdNote")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function ClinicasPage() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <StatsBand />
      <Capabilities />
      <ProblemSolution />
      <PullQuote />
      <Superpowers />
      <Contact />
      <Footer contactHref="#contato" />
      <StickyCta />
    </main>
  );
}
