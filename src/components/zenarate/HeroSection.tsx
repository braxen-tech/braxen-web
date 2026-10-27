"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function HeroSection({ ctaHref = "#contato" }: { ctaHref?: string }) {
  const t = useTranslations("home.hero");

  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        poster="/hero-poster.jpg"
      >
        <source src="/hero-2.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-display-1 text-white"
        >
          {t("headlineLead")}{" "}
          <em className="italic">{t("headlineEm")}</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base text-white/80 md:text-lg"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <a href={ctaHref} className="btn btn-gold">
            {t("primaryCta")}
          </a>
          <span className="text-xs uppercase tracking-widest text-white/60">
            {t("seal")}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
