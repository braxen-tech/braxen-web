"use client";

import { useTranslations } from "next-intl";
import { ZenarateNav } from "@/components/zenarate/ZenarateNav";
import { ZenarateFooter } from "@/components/zenarate/ZenarateFooter";
import { motion } from "framer-motion";

export function CasePage({ caseKey }: { caseKey: string }) {
  const t = useTranslations(`cases.${caseKey}`);

  return (
    <>
      <ZenarateNav />
      <main className="min-h-screen bg-white pt-32 pb-24">
        <article className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="mb-4 inline-block rounded-full bg-[var(--muted)] px-3 py-1 text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
              {t("category")}
            </span>
            <h1 className="text-display-1 mt-4">{t("title")}</h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--muted-foreground)]">
              {t("description")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-12 overflow-hidden rounded-2xl bg-[#F5F5F2]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={t("image")}
              alt={t("title")}
              className="h-auto w-full object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="prose prose-lg mt-12 max-w-none"
          >
            <p className="text-base leading-relaxed text-[var(--muted-foreground)]">
              {t("body")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <a href="#contato" className="btn btn-gold">
              {t("cta")}
            </a>
          </motion.div>
        </article>
      </main>
      <ZenarateFooter />
    </>
  );
}
