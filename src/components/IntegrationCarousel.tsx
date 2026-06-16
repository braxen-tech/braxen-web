"use client";

import type { ComponentType, ReactNode } from "react";
import { MessageSquare, Webhook } from "lucide-react";
import { useTheme } from "next-themes";
import type { LogoCarouselItem } from "@/lib/client-logos-data";
import { SectionHeader } from "@/components/ui/scroll-reveal";
import {
  integrationRow1,
  integrationRow2,
  type IntegrationItem,
  type IntegrationLucideIcon,
} from "@/lib/integrations-data";

function iconUrl(slug: string, color: string) {
  return `https://cdn.simpleicons.org/${slug}/${color.replace("#", "")}`;
}

const lucideIcons: Record<
  IntegrationLucideIcon,
  ComponentType<{ className?: string }>
> = {
  webhook: Webhook,
  sms: MessageSquare,
};

function IntegrationChip({
  name,
  slug,
  lucide,
  iconColor,
}: IntegrationItem & { iconColor: string }) {
  const LucideIcon = lucide ? lucideIcons[lucide] : null;

  return (
    <div className="flex w-[5.5rem] shrink-0 flex-col items-center gap-2.5 sm:w-24">
      <div className="flex size-14 items-center justify-center rounded-full border border-border bg-card/60 sm:size-16">
        {LucideIcon ? (
          <LucideIcon className="size-6 text-foreground opacity-80" aria-hidden />
        ) : slug ? (
          <img
            src={iconUrl(slug, iconColor)}
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

function LogoChip({ name, src }: LogoCarouselItem) {
  return (
    <div className="flex h-28 w-48 shrink-0 items-center justify-center px-4 sm:h-32 sm:w-56 md:h-36 md:w-64">
      <img
        src={src}
        alt={name}
        className="h-14 w-auto max-w-full object-contain opacity-60 grayscale transition-opacity hover:opacity-100 sm:h-16 md:h-20"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
  variant,
  iconColor,
}: {
  items: IntegrationItem[] | LogoCarouselItem[];
  direction: "left" | "right";
  variant: "integration" | "logo";
  iconColor?: string;
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
      {track.map((item, i) =>
        variant === "logo" ? (
          <LogoChip key={`${item.name}-${i}`} {...(item as LogoCarouselItem)} />
        ) : (
          <IntegrationChip
            key={`${item.name}-${i}`}
            {...(item as IntegrationItem)}
            iconColor={iconColor ?? "ffffff"}
          />
        ),
      )}
    </div>
  );
}

export type IntegrationCarouselProps = {
  id?: string;
  title?: ReactNode;
  description?: string;
  row1?: IntegrationItem[];
  row2?: IntegrationItem[];
  variant?: "integration";
};

export type LogoCarouselProps = {
  id?: string;
  title?: ReactNode;
  description?: string;
  row1: LogoCarouselItem[];
  row2: LogoCarouselItem[];
  variant: "logo";
};

type CarouselProps = IntegrationCarouselProps | LogoCarouselProps;

export function IntegrationCarousel(props: CarouselProps = {}) {
  const { resolvedTheme } = useTheme();
  const variant = props.variant ?? "integration";
  const iconColor = resolvedTheme === "light" ? "18181b" : "ffffff";
  const id = props.id ?? (variant === "logo" ? "clientes" : "integracoes");
  const title =
    props.title ??
    (variant === "logo" ? (
      <>
        Experiência acumulada em{" "}
        <em className="italic text-muted-foreground">empresas como</em>
      </>
    ) : (
      <>
        Conecta com as ferramentas que{" "}
        <em className="italic text-muted-foreground">você já usa</em>.
      </>
    ));
  const description =
    props.description ??
    (variant === "logo"
      ? "Time com histórico em operações de escala, mídia, varejo e tecnologia."
      : "Calendário, mensageria, pagamentos e APIs — plugamos no fluxo do agente sem refazer sua operação.");

  const row1 =
    props.row1 ?? (variant === "integration" ? integrationRow1 : undefined);
  const row2 =
    props.row2 ?? (variant === "integration" ? integrationRow2 : undefined);

  if (!row1 || !row2) return null;

  return (
    <section
      id={id}
      className="relative overflow-hidden border-t border-border px-6 py-24 md:px-10 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-50" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          title={title}
          description={description}
          align="center"
          className="mx-auto mb-12 max-w-2xl md:mb-14"
          titleClassName="font-sans text-3xl md:text-5xl"
          descriptionClassName="mt-5 max-w-none"
        />

        <div className="relative overflow-hidden pb-2">
          <MarqueeRow
            items={row1}
            direction="left"
            variant={variant}
            iconColor={iconColor}
          />
          <div className="mt-6">
            <MarqueeRow
              items={row2}
              direction="right"
              variant={variant}
              iconColor={iconColor}
            />
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
