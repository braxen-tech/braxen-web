"use client";

import textureStone from "@/assets/texture-stone.jpg";
// import boy from "@/assets/boy.png";
import chapterMonolith from "@/assets/chapter-monolith.jpg";
import chapterCraft from "@/assets/chapter-craft.jpg";
import chapterBlueprint from "@/assets/chapter-blueprint.jpg";
import logoB2w from "@/assets/logos/b2w.png";
import logoGlobo from "@/assets/logos/globo.png";
import logoRivian from "@/assets/logos/rivian.png";
import logoSerasa from "@/assets/logos/serasa.png";
import { ContactForm } from "@/components/ContactForm";
import { Leadership } from "@/components/Leadership";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Portfolio } from "@/components/Portfolio";
import { imageSrc, type ImageSrc } from "@/lib/utils";

const expertiseClients = [
  { name: "Globo", logo: logoGlobo },
  { name: "Rivian", logo: logoRivian },
  { name: "Serasa", logo: logoSerasa },
  { name: "B2W", logo: logoB2w },
] as const;

function RevealWords({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden mr-[0.25em] last:mr-0"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 1,
              delay: delay + i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="flex items-center justify-between px-6 md:px-10 py-6 text-foreground">
          <a
            href="#top"
            className="flex items-center gap-2 text-sm tracking-[0.3em] uppercase"
          >
            <span className="inline-block size-2 rounded-full bg-primary" />
            Braxen
          </a>
          <nav className="hidden md:flex items-center gap-10 text-xs tracking-[0.25em] uppercase">
            <a
              href="#chapter-1"
              className="hover:text-primary transition-colors"
            >
              Origin
            </a>
            <a
              href="#chapter-2"
              className="hover:text-primary transition-colors"
            >
              Craft
            </a>
            <a
              href="#chapter-3"
              className="hover:text-primary transition-colors"
            >
              Practice
            </a>
            <a href="#contact" className="hover:text-primary transition-colors">
              Contact
            </a>
          </nav>
          <a
            href="#contact"
            className="text-xs tracking-[0.25em] uppercase border-hairline px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Brief us
          </a>
        </div>
      </header>
    </motion.nav>
  );
}

function Hero() {
  return (
    <section id="top" className="relative h-screen w-full overflow-hidden">
      <video
        src="/hero-smooth.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* <p className="fade-up text-xs tracking-[0.45em] uppercase text-primary mb-8">
          Software House · Est. 2019
        </p> */}
        <h1 className="fade-up font-display text-[clamp(3.5rem,12vw,11rem)] leading-[0.9]">
          <RevealWords text="BRAXEN" delay={0.4} />
          <RevealWords text="." delay={0.4} className="text-cyan-glow" />
          <br />
          <RevealWords
            text="Tech, sculpted."
            delay={0.4}
            className="font-display italic text-muted-foreground"
          />
          {/* <em className="font-display italic text-muted-foreground">Tech, sculpted.</em> */}
        </h1>
        {/* <p className="fade-up mt-10 max-w-xl text-sm md:text-base text-muted-foreground leading-relaxed">
          We build digital systems the way a city is built — slowly, in layers, with foundations
          that outlast the architects.
        </p> */}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="font-body text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed mb-12 md:mb-16"
        >
          We transform ambitious ideas into high-performance software. Your
          strategic partner to build the future, today.
        </motion.p>
      </div>

      <div className="absolute bottom-6 left-6 z-10 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
        N 43°36′ · E 1°26′
      </div>
      <div className="absolute bottom-6 right-6 z-10 text-[10px] tracking-[0.3em] uppercase text-muted-foreground blink">
        ● Live
      </div>
    </section>
  );
}

function Statement() {
  return (
    <section className="relative px-6 md:px-10 py-32 md:py-48">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-10">
          — Manifesto
        </p>
        <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)]">
          More than a vendor.{" "}
          <em className="italic text-muted-foreground">
            A workshop where ideas are forged into infrastructure.
          </em>
        </h2>
      </div>
    </section>
  );
}

function Chapter({
  index,
  title,
  kicker,
  body,
  image,
  reverse,
  id,
}: {
  index: string;
  title: string;
  kicker: string;
  body: string;
  image: ImageSrc;
  reverse?: boolean;
  id: string;
}) {
  return (
    <section
      id={id}
      className="relative px-6 md:px-10 py-24 md:py-40 border-t border-border"
    >
      <div
        className={`mx-auto max-w-7xl grid md:grid-cols-12 gap-10 items-center ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="md:col-span-7">
          <img
            src={imageSrc(image)}
            alt={title}
            loading="lazy"
            className="w-full h-[60vh] md:h-[80vh] object-cover grayscale-[0.2]"
          />
        </div>
        <div className="md:col-span-5 md:px-6">
          <div className="flex items-baseline gap-4 mb-8">
            <span className="font-display text-6xl text-primary">{index}</span>
            <span className="text-xs tracking-[0.4em] uppercase text-muted-foreground">
              Chapter
            </span>
          </div>
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">
            {kicker}
          </p>
          <h3 className="font-display text-4xl md:text-6xl mb-8">{title}</h3>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-md">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}

function Practices() {
  const items = [
    {
      k: "01",
      t: "Product Engineering",
      d: "Web, mobile, and back-of-house systems built to scale past the demo.",
    },
    {
      k: "02",
      t: "Platform & Cloud",
      d: "Infrastructure as a discipline — observable, reproducible, defensible.",
    },
    {
      k: "03",
      t: "AI Integration",
      d: "Models embedded where they earn their keep, not as theatre.",
    },
    {
      k: "04",
      t: "Design Systems",
      d: "Interfaces that age well, written down so teams can extend them.",
    },
  ];
  return (
    <section className="px-6 md:px-10 py-32 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">
              — Practice
            </p>
            <h2 className="font-display text-5xl md:text-7xl">
              The <em className="italic text-muted-foreground">workshop</em>.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            Four disciplines, one bench. We assemble small teams that ship
            together and stay through the second release.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          {items.map((i) => (
            <div
              key={i.k}
              className="bg-background p-10 md:p-14 group hover:bg-card transition-colors"
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-display text-3xl text-primary">
                  {i.k}
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <h4 className="font-display text-3xl mb-4 group-hover:text-primary transition-colors">
                {i.t}
              </h4>
              <p className="text-muted-foreground leading-relaxed">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StoneBreak() {
  return (
    <section
      className="relative h-[60vh] overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: `url(${imageSrc(textureStone)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-background/40" />
      <blockquote className="relative z-10 text-center px-6 max-w-4xl">
        <p className="font-display italic text-3xl md:text-5xl leading-tight">
          “We don&apos;t ship features. We{" "}
          <span className="text-cyan-glow">cut stone</span> — piece by piece —
          until something stands on its own.”
        </p>
        <footer className="mt-8 text-xs tracking-[0.4em] uppercase text-muted-foreground">
          — Founding Note, 2019
        </footer>
      </blockquote>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="px-6 md:px-10 py-32 md:py-48 border-t border-border"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-8">
          — Chapter Final
        </p>
        <h2 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.95] mb-12">
          Let&apos;s build the{" "}
          <em className="italic text-muted-foreground">next one</em>.
        </h2>
        <ContactForm />
        <div className="mt-20 grid md:grid-cols-3 gap-10 text-left text-sm">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-3">
              Studio
            </p>
            <p>
              14 Rue des Forges
              <br />
              31000 Toulouse, FR
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-3">
              Hours
            </p>
            <p>
              Mon — Fri
              <br />
              09:00 — 19:00 CET
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-3">
              Social
            </p>
            <p>LinkedIn · GitHub · Are.na</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 md:px-10 py-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
      <p>© {new Date().getFullYear()} Braxen Tech — All rights reserved</p>
      <p className="flex items-center gap-2">
        <span className="inline-block size-1.5 rounded-full bg-primary blink" />
        Crafted in the dark
      </p>
    </footer>
  );
}

export function HomePage() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Statement />
      <Chapter
        id="chapter-1"
        index="I"
        kicker="Origin"
        title="Born in the back rooms."
        body="Braxen began as a side bench in a Toulouse apartment — three engineers, one whiteboard, and the conviction that good software is closer to masonry than to magic. Every project since has carried the same patience: lay the stone, check the line, lay the next."
        image={chapterMonolith}
      />
      <Chapter
        id="chapter-2"
        index="II"
        kicker="Craft"
        title="Code as a quiet discipline."
        body="We write in the open, review without ceremony, and refuse the temptation to ship something we don't understand. The result is rarely flashy at launch. It is, however, still standing five years later."
        image={chapterCraft}
        reverse
      />
      <StoneBreak />
      <Chapter
        id="chapter-3"
        index="III"
        kicker="Practice"
        title="From blueprint to load-bearing wall."
        body="Discovery, architecture, build, hand-off — but never linear. Our teams sit beside yours, prototype in days, and harden in weeks. The hand-off is documentation a stranger could extend."
        image={chapterBlueprint}
      />
      <Portfolio />
      <Practices />
      <Leadership />
      <Contact />
      <Footer />
    </main>
  );
}
