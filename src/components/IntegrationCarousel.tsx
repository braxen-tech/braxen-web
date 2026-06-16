"use client";

import type { ComponentType } from "react";
import { MessageSquare, Webhook } from "lucide-react";
import {
  integrationRow1,
  integrationRow2,
  type IntegrationItem,
  type IntegrationLucideIcon,
} from "@/lib/integrations-data";

function iconUrl(slug: string) {
  return `https://cdn.simpleicons.org/${slug}/ffffff`;
}

const lucideIcons: Record<
  IntegrationLucideIcon,
  ComponentType<{ className?: string }>
> = {
  webhook: Webhook,
  sms: MessageSquare,
};

function IntegrationChip({ name, slug, lucide }: IntegrationItem) {
  const LucideIcon = lucide ? lucideIcons[lucide] : null;

  return (
    <div className="flex w-[5.5rem] shrink-0 flex-col items-center gap-2.5 sm:w-24">
      <div className="flex size-14 items-center justify-center rounded-full border border-border bg-card/60 sm:size-16">
        {LucideIcon ? (
          <LucideIcon className="size-6 text-foreground opacity-80" aria-hidden />
        ) : slug ? (
          <img
            src={iconUrl(slug)}
            alt=""
            width={28}
            height={28}
            className="size-7 object-contain opacity-90"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="font-sans text-xs font-medium text-foreground">
            {name.slice(0, 2)}
          </span>
        )}
      </div>
      <span className="max-w-full truncate text-center text-[9px] tracking-[0.15em] uppercase text-muted-foreground sm:text-[10px]">
        {name}
      </span>
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: IntegrationItem[];
  direction: "left" | "right";
}) {
  const track = [...items, ...items];

  return (
    <div
      className={`flex w-max gap-8 sm:gap-10 ${
        direction === "left"
          ? "animate-marquee-integrations-left"
          : "animate-marquee-integrations-right"
      } motion-reduce:animate-none`}
    >
      {track.map((item, i) => (
        <IntegrationChip key={`${item.name}-${i}`} {...item} />
      ))}
    </div>
  );
}

export function IntegrationCarousel() {
  return (
    <section
      id="integracoes"
      className="relative overflow-hidden border-t border-border px-6 py-24 md:px-10 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-50" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
          <p className="mb-6 text-xs tracking-[0.4em] uppercase text-primary">
            — Integrações
          </p>
          <h2 className="font-sans text-3xl md:text-5xl">
            Conecta com as ferramentas que{" "}
            <em className="italic text-muted-foreground">você já usa</em>.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            Calendário, mensageria, pagamentos e APIs — plugamos no fluxo do
            agente sem refazer sua operação.
          </p>
        </div>

        <div className="relative overflow-hidden pb-2">
          <MarqueeRow items={integrationRow1} direction="left" />
          <div className="mt-6">
            <MarqueeRow items={integrationRow2} direction="right" />
          </div>

          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent sm:w-24"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent sm:w-24"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
