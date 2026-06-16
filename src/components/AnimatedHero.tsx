"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

export type AnimatedHeroProps = {
  id?: string;
  staticTitle: string;
  rotatingWords: string[];
  subtitle: string;
  trustLine?: string;
  primaryCta: {
    href: string;
    label: string;
    dataCta?: string;
  };
  secondaryCta?: {
    href: string;
    label: string;
  };
};

export function AnimatedHero({
  id = "hero",
  staticTitle,
  rotatingWords,
  subtitle,
  trustLine,
  primaryCta,
  secondaryCta,
}: AnimatedHeroProps) {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => rotatingWords, [rotatingWords]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((current) => (current + 1) % titles.length);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles.length]);

  return (
    <section
      id={id}
      className="relative w-full border-b border-border bg-background bg-grain pt-28 pb-16 md:flex md:min-h-[85vh] md:items-center md:pt-32 md:pb-24"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center md:gap-8">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-sans text-[2rem] leading-[1.05] tracking-tight sm:text-4xl md:text-6xl lg:text-7xl"
          >
            <span className="text-foreground">{staticTitle}</span>
            <span className="relative mt-1 flex h-[1.1em] w-full justify-center overflow-hidden md:mt-2">
              {titles.map((title, index) => (
                <motion.span
                  key={title}
                  className="absolute font-sans text-foreground"
                  initial={{ opacity: 0, y: "-100%" }}
                  transition={{ type: "spring", stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? { y: 0, opacity: 1 }
                      : {
                          y: titleNumber > index ? "-150%" : "150%",
                          opacity: 0,
                        }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-lg"
          >
            {subtitle}
          </motion.p>

          {trustLine ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground md:text-xs"
            >
              {trustLine}
            </motion.p>
          ) : null}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:justify-center"
          >
            <a
              href={primaryCta.href}
              data-cta={primaryCta.dataCta}
              className="btn btn-lg btn-primary w-full sm:w-auto"
            >
              {primaryCta.label}
              <MoveRight className="size-4" aria-hidden />
            </a>
            {secondaryCta ? (
              <>
                <a
                  href={secondaryCta.href}
                  className="btn btn-lg btn-outline btn-muted hidden sm:inline-flex"
                >
                  {secondaryCta.label}
                </a>
                <a
                  href={secondaryCta.href}
                  className="py-1 text-[10px] tracking-[0.22em] uppercase text-muted-foreground transition-colors hover:text-foreground sm:hidden"
                >
                  {secondaryCta.label} →
                </a>
              </>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
