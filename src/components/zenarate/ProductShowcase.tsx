"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

const PRODUCTS = [
  { key: "aiAgents", bg: "bg-[#c5ccd4]" },
  { key: "techSquads", bg: "bg-[#a3b18a]" },
  { key: "software", bg: "bg-[#c4a882]" },
] as const;

const TABS = ["cto", "headComercial", "ceo", "headProduto"] as const;

export function ProductShowcase() {
  const t = useTranslations("home.productShowcase");
  const [activeProduct, setActiveProduct] = useState(0);

  return (
    <section className="px-6 py-24 md:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-display-2 text-center mb-6">
          {t("headingLead")}
          <br />
          <em className="italic text-[var(--accent-gold)]">{t("headingEm")}</em>
        </h2>

        <p className="mx-auto mb-16 max-w-2xl text-center text-base text-[var(--muted-foreground)] md:text-lg">
          {t("description")}
        </p>

        {/* Two-column layout */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left: product screenshot */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className={`aspect-[4/3] rounded-2xl ${PRODUCTS[activeProduct].bg} flex items-center justify-center p-8`}
            >
              <div className="w-full max-w-md rounded-xl bg-white/90 p-6 shadow-lg backdrop-blur">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-xs font-medium text-[var(--muted-foreground)]">
                    {t(`products.${PRODUCTS[activeProduct].key}.mockupLabel`)}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-3/4 rounded bg-gray-200" />
                  <div className="h-3 w-1/2 rounded bg-gray-200" />
                  <div className="h-3 w-5/6 rounded bg-gray-200" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right: product selector + description */}
          <div>
            <div className="mb-8 flex flex-col gap-2">
              {PRODUCTS.map((product, index) => (
                <button
                  key={product.key}
                  onClick={() => setActiveProduct(index)}
                  className={`text-left text-display-3 transition-colors ${
                    index === activeProduct
                      ? "text-[var(--foreground)]"
                      : "text-[var(--muted-foreground)]/40"
                  }`}
                >
                  {index === activeProduct && (
                    <span className="mr-2 inline-block text-[var(--accent-gold)]">•</span>
                  )}
                  <span className={index === activeProduct ? "font-serif italic" : ""}>
                    {t(`products.${product.key}.name`)}
                  </span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="mb-8 text-[var(--muted-foreground)] leading-relaxed">
                  {t(`products.${PRODUCTS[activeProduct].key}.description`)}
                </p>
                <a href={t(`products.${PRODUCTS[activeProduct].key}.href`)} className="btn btn-pill">
                  {t(`products.${PRODUCTS[activeProduct].key}.cta`)}
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
