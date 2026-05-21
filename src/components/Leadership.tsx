import { useEffect, useRef, useState } from "react";

type Member = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

const members: Member[] = [
  {
    name: "Hugo Lemos",
    role: "Chief Executive Officer",
    image: "https://www.braxentech.com/_next/image?url=%2Fhugo_profile.png&w=3840&q=75",
    bio: "Former staff engineer at global-scale fintechs. Hugo leads Braxen with a builder's bias — strategy distilled into systems that ship.",
  },
  {
    name: "Neemias Rocha",
    role: "Chief Technology Officer",
    image: "https://www.braxentech.com/_next/image?url=%2Fneemias_profile.png&w=3840&q=75",
    bio: "Distributed systems architect. Two decades turning ambiguous product bets into observable, defensible platforms.",
  },
  {
    name: "Rodrigo Gama",
    role: "Head of Product Engineering",
    image: "https://www.braxentech.com/_next/image?url=%2Frodrigo_profile.png&w=3840&q=75",
    bio: "Product-minded engineer. Rodrigo brings the bench discipline — small teams, tight loops, releases that hold up under load.",
  },
  {
    name: "Tiago Rocha",
    role: "Head of AI & Platform",
    image: "https://www.braxentech.com/_next/image?url=%2Ftiago_profile.png&w=3840&q=75",
    bio: "Applied ML and infrastructure. Tiago embeds models where they earn their keep and keeps the platform underneath honest.",
  },
];

function Card({ member, flipped }: { member: Member; flipped: boolean }) {
  const [manual, setManual] = useState<boolean | null>(null);
  const isFlipped = manual ?? flipped;

  return (
    <button
      onClick={() => setManual(!isFlipped)}
      className="group relative aspect-[3/4] w-full [perspective:1400px] text-left"
      aria-label={`${member.name} — ${member.role}`}
    >
      <div
        className={`relative size-full transition-transform duration-[900ms] ease-[cubic-bezier(.7,.1,.2,1)] [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* FRONT — Photo */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          className="absolute inset-0 overflow-hidden border-hairline"
        >
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top grayscale"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pt-12 pb-5 px-5">
            <p className="font-mono text-xs tracking-[0.25em] text-primary mb-1">
              {member.role.toUpperCase()}
            </p>
            <h3 className="font-mono text-xl font-bold text-foreground tracking-tight">
              {member.name}
            </h3>
          </div>
        </div>

        {/* BACK — bio */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] border-hairline bg-background p-8 flex flex-col">
          <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-6">
            — Profile
          </p>
          <p className="font-display text-2xl md:text-3xl leading-tight mb-4">
            {member.name}
          </p>
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
            {member.role}
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {member.bio}
          </p>
          <span className="mt-auto text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            Tap to flip
          </span>
        </div>
      </div>
    </button>
  );
}

export function Leadership() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(0); // number of cards flipped to "front" (portrait)

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when section top hits center, 1 when section bottom hits center
      const total = rect.height - vh;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / Math.max(total, 1)));
      const n = Math.min(members.length, Math.floor(p * (members.length + 0.5)));
      setRevealed(n);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="leadership"
      className="relative px-6 md:px-10 py-32 md:py-48 border-t border-border min-h-[180vh]"
    >
      <div className="mx-auto max-w-7xl sticky top-24">
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            — Leadership
          </p>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05] mb-8">
            High-level{" "}
            <em className="italic text-muted-foreground">strategic leadership</em>.
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
            Our leadership carries the DNA of global technology giants. Every Braxen
            engagement is shepherded by specialists who have shipped against complex
            architectures and unforgiving deadlines.
          </p>
          <p className="mt-6 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            Scroll to reveal · Tap to flip
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {members.map((m, i) => (
            <Card key={m.name} member={m} flipped={i >= revealed} />
          ))}
        </div>
      </div>
    </section>
  );
}
