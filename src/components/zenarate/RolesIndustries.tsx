"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ROWS = [
  { dir: "normal" as const },
  { dir: "reverse" as const },
  { dir: "normal" as const },
];

function MarqueeRow({
  items,
  dir,
  duration = "40s",
}: {
  items: string[];
  dir: "normal" | "reverse";
  duration?: string;
}) {
  return (
    <div className="group flex gap-[var(--gap)] overflow-hidden [--gap:2rem]">
      {Array.from({ length: 2 }).map((_, setIndex) => (
        <div
          key={setIndex}
          className={cn(
            "flex shrink-0 items-center gap-[var(--gap)]",
            "animate-[canopy-x_var(--duration)_linear_infinite]"
          )}
          style={{
            "--duration": duration,
            animationDirection: dir,
          } as React.CSSProperties}
          aria-hidden={setIndex === 1}
        >
          {items.map((item, i) => (
            <span
              key={`${setIndex}-${i}`}
              className="shrink-0 whitespace-nowrap text-2xl font-medium text-zinc-300 transition-colors hover:text-zinc-800 md:text-4xl lg:text-5xl"
            >
              {item}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

const ROW1 = ["Healthcare", "Finance & Banking", "Real Estate", "E-commerce", "Telecom", "Education", "Automotive", "SaaS"];
const ROW2 = ["Entertainment & Media", "Insurance", "Logistics", "Retail", "Energy", "Government", "Manufacturing", "Hospitality"];
const ROW3 = ["Legal", "Agriculture", "Pharma", "Construction", "Aviation", "Crypto & Web3", "Food & Beverage", "Sports"];

export function RolesIndustries() {
  const t = useTranslations("home.rolesIndustries");

  return (
    <section className="relative w-full overflow-hidden bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center text-display-2"
        >
          {t("headingLead")}{" "}
          <em className="italic">{t("headingEm")}</em>
        </motion.h2>
      </div>

      <div className="space-y-6">
        {ROWS.map((row, i) => (
          <MarqueeRow
            key={i}
            items={i === 0 ? ROW1 : i === 1 ? ROW2 : ROW3}
            dir={row.dir}
            duration={i === 1 ? "45s" : "40s"}
          />
        ))}
      </div>
    </section>
  );
}
