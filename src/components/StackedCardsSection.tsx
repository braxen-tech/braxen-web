"use client";

import { useEffect, useRef } from "react";
import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack";
import { SectionHeader } from "@/components/ui/scroll-reveal";

export type StackedCardItem = {
  id: string;
  title: string;
  description: string;
};

export type StackedCardsSectionProps = {
  id: string;
  title: React.ReactNode;
  description?: string;
  cards: readonly StackedCardItem[];
  stickyOffset?: number;
  incrementY?: number;
};

const DEFAULT_STICKY_OFFSET = 96;
const DEFAULT_INCREMENT_Y = 12;

export function StackedCardsSection({
  id,
  title,
  description,
  cards,
  stickyOffset = DEFAULT_STICKY_OFFSET,
  incrementY = DEFAULT_INCREMENT_Y,
}: StackedCardsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateStackScroll = () => {
      const container = containerRef.current;
      const card = cardRef.current;
      if (!container || !card) return;

      const cardHeight = card.getBoundingClientRect().height;
      const count = cards.length;
      const gap = 16;
      const stackRunway = (count - 1) * Math.max(cardHeight - incrementY, 120);

      container.style.minHeight = `${Math.ceil(
        cardHeight * count + gap * (count - 1) + stackRunway,
      )}px`;
    };

    updateStackScroll();

    const observer = new ResizeObserver(updateStackScroll);
    if (cardRef.current) observer.observe(cardRef.current);

    window.addEventListener("resize", updateStackScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateStackScroll);
    };
  }, [cards.length, incrementY]);

  return (
    <section id={id} className="scroll-mt-24 px-6 md:px-10 py-24 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-start md:gap-12 xl:gap-16">
        <div className="md:sticky md:top-24 md:self-start md:py-4">
          <SectionHeader
            title={title}
            description={description}
            titleClassName="font-sans text-3xl md:text-4xl lg:text-5xl tracking-tight mb-0"
            descriptionClassName="max-w-prose text-sm md:text-base mt-6 mb-0"
          />
        </div>

        <ContainerScroll ref={containerRef} className="space-y-4 pb-4 md:pb-8">
          {cards.map((card, index) => (
            <CardSticky
              key={card.id}
              ref={index === 0 ? cardRef : undefined}
              index={index + 1}
              baseTop={stickyOffset}
              incrementY={incrementY}
              incrementZ={10}
              className="rounded-lg border border-border bg-card/80 p-6 shadow-lg shadow-black/10 backdrop-blur-md md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-sans text-xl md:text-2xl tracking-tight">
                  {card.title}
                </h3>
                <span className="font-sans text-xl md:text-2xl text-primary tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {card.description}
              </p>
            </CardSticky>
          ))}
        </ContainerScroll>
      </div>
    </section>
  );
}
