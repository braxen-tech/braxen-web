import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
  type PanInfo,
} from "framer-motion";
import chapterMonolith from "@/assets/chapter-monolith.jpg";
import chapterCraft from "@/assets/chapter-craft.jpg";
import chapterBlueprint from "@/assets/chapter-blueprint.jpg";
import heroCity from "@/assets/hero-city.jpg";
import textureStone from "@/assets/texture-stone.jpg";
import { imageSrc } from "@/lib/utils";

const sources = [
  chapterMonolith,
  chapterCraft,
  chapterBlueprint,
  heroCity,
  textureStone,
].map(imageSrc);

const titles = [
  "Monolith OS",
  "Quiet Ledger",
  "Blueprint Cloud",
  "Northbound",
  "Stonecutter",
  "Foundry",
  "Hearth",
  "Lantern",
  "Anchor",
  "Vellum",
  "Cinder",
  "Compass",
  "Mosaic",
  "Pillar",
  "Aperture",
  "Cathedral",
];

const PLANE_COUNT = titles.length;

const PLANE_LAYOUT = {
  desktop: { width: 320, height: 384, gap: -80 },
  mobile: { width: 220, height: 264, gap: -55 },
} as const;

type PlaneLayout = (typeof PLANE_LAYOUT)[keyof typeof PLANE_LAYOUT];

function usePlaneLayout() {
  const [layout, setLayout] = useState<PlaneLayout>(PLANE_LAYOUT.desktop);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => {
      const mobile = mq.matches;
      setIsMobile(mobile);
      setLayout(mobile ? PLANE_LAYOUT.mobile : PLANE_LAYOUT.desktop);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const spacing = layout.width + layout.gap;
  const scrollRange = spacing * PLANE_COUNT;

  return { ...layout, spacing, scrollRange, isMobile };
}

function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

function Plane({
  index,
  scrollX,
  scrollVelocity,
  planeWidth,
  planeHeight,
  planeSpacing,
  scrollRange,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: {
  index: number;
  scrollX: MotionValue<number>;
  scrollVelocity: MotionValue<number>;
  planeWidth: number;
  planeHeight: number;
  planeSpacing: number;
  scrollRange: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const hoverLift = useSpring(0, { stiffness: 400, damping: 25 });
  const velocityOffset = useSpring(0, {
    stiffness: 300,
    damping: 20,
    mass: 0.3,
  });
  const baseX = index * planeSpacing;

  useEffect(() => {
    hoverLift.set(isHovered ? -30 : 0);
  }, [hoverLift, isHovered]);

  useMotionValueEvent(scrollVelocity, "change", (velocity) => {
    if (prefersReducedMotion) {
      velocityOffset.set(0);
      return;
    }

    const wrapped =
      wrap(-scrollRange / 2, scrollRange / 2, baseX + scrollX.get()) /
      (scrollRange / 2);
    const wave = Math.sin(wrapped * Math.PI * 2);
    velocityOffset.set((velocity / 50) * wave * 5);
  });

  const transform = useTransform(() => {
    const sx = scrollX.get();
    const offset = velocityOffset.get();
    const lift = hoverLift.get();
    const x = wrap(-scrollRange / 2, scrollRange / 2, baseX + sx);
    const y = x * -0.35 + offset + lift;
    const z = x * -1.2;

    return `translate3d(${x}px, ${y}px, ${z}px) rotateY(-50deg)`;
  });

  const src = sources[index % sources.length];
  const title = titles[index];

  return (
    <motion.figure
      className="absolute flex items-center justify-center text-foreground will-change-transform"
      style={{
        width: planeWidth,
        height: planeHeight,
        transform,
        zIndex: isHovered ? 100 : 1,
        filter: isHovered ? "brightness(1.15)" : "brightness(1)",
        transformStyle: "preserve-3d",
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      transition={{ filter: { duration: 0.2 } }}
    >
      <span className="absolute -top-6 left-0 font-mono text-[10px] tracking-[0.05em] text-muted-foreground">
        {String(index).padStart(2, "0")}
      </span>

      <div className="absolute inset-0 overflow-hidden bg-card shadow-[0_25px_50px_-12px_rgba(0,0,0,0.45)] ring-1 ring-foreground/10">
        <img
          src={src}
          alt={title}
          loading="lazy"
          draggable={false}
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="pointer-events-none absolute left-full top-1/2 ml-3 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className="h-px w-[120px] origin-left bg-foreground"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <div className="px-2 py-1 font-mono text-[10px] uppercase tracking-[0.35em] text-foreground">
              {title}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.figure>
  );
}

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollOffset = useMotionValue(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { width, height, spacing, scrollRange, isMobile } = usePlaneLayout();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  const scrollXBase = useTransform(
    smoothProgress,
    [0, 1],
    [0, -scrollRange * 0.65],
  );
  const scrollX = useTransform(
    [scrollXBase, scrollOffset],
    ([base, offset]) => (base as number) + (offset as number),
  );
  const smoothScrollX = useSpring(scrollX, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });
  const scrollVelocity = useVelocity(smoothScrollX);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative border-t border-border bg-background h-[200vh] md:h-[320vh]"
    >
      <motion.div
        ref={containerRef}
        className="sticky top-[10vh] h-[78vh] w-full overflow-hidden md:top-0 md:h-screen md:touch-none"
        onPan={
          isMobile
            ? undefined
            : (_event, info: PanInfo) =>
                scrollOffset.set(scrollOffset.get() + info.delta.x * 2.5)
        }
      >
        <div className="pointer-events-none absolute left-5 top-5 z-50 max-w-xs md:left-12 md:top-20 md:max-w-xl">
          <p className="mb-2 text-[10px] uppercase tracking-[0.4em] text-primary md:mb-4 md:text-xs">
            — Portfólio
          </p>
          <h2 className="font-display text-4xl leading-[0.95] md:text-7xl">
            Projetos<span className="text-cyan-glow">.</span>
          </h2>
        </div>

        <p className="absolute bottom-3 right-5 z-50 font-mono text-[9px] uppercase tracking-[0.35em] text-muted-foreground md:bottom-8 md:right-8 md:text-[10px] md:tracking-[0.4em]">
          Role para explorar
        </p>

        {isMobile && (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-40 h-8 bg-gradient-to-b from-background to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-8 bg-gradient-to-t from-background to-transparent"
            />
          </>
        )}

        <div
          className="relative flex h-full w-full items-center justify-center"
          style={{
            perspective: "2000px",
            perspectiveOrigin: "10% 10%",
          }}
        >
          <div
            className="relative flex translate-y-4 items-center justify-center md:translate-y-[100px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {Array.from({ length: PLANE_COUNT }).map((_, index) => (
              <Plane
                key={index}
                index={index}
                scrollX={smoothScrollX}
                scrollVelocity={scrollVelocity}
                planeWidth={width}
                planeHeight={height}
                planeSpacing={spacing}
                scrollRange={scrollRange}
                isHovered={hoveredIndex === index}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
