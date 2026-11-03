"use client"
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import Image from "next/image";

const tabs = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Me" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

type Rect = { left: number; width: number; barW: number };

const LEAD = "cubic-bezier(0.3, 1.3, 0.4, 1)";
const TRAIL = "cubic-bezier(0.25, 0.9, 0.3, 1)";

const GLASS_CSS = `
@keyframes lg-breathe {
  0%, 100% { transform: scale(1, 1); }
  50%      { transform: scale(1.035, 1.09); }
}
@keyframes lg-sheen {
  from { background-position: 0 0, 130% 0; }
  to   { background-position: 0 0, -30% 0; }
}
@media (prefers-reduced-motion: reduce) {
  .lg-anim { animation: none !important; }
}
`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [rect, setRect] = useState<Rect | null>(null);
  const [ready, setReady] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);
  const [moving, setMoving] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const lockUntil = useRef(0);
  const prevIdx = useRef(0);
  const movingTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = useCallback((id: string) => {
    const next = tabs.findIndex((t) => t.id === id);
    if (next === -1 || next === prevIdx.current) return;
    setDir(next > prevIdx.current ? 1 : -1);
    prevIdx.current = next;
    setActive(id);
    setMoving(true);
    clearTimeout(movingTimer.current);
    movingTimer.current = setTimeout(() => setMoving(false), 650);
  }, []);

  useEffect(() => () => clearTimeout(movingTimer.current), []);

  const measure = useCallback(() => {
    const nav = navRef.current;
    const el = linkRefs.current[active];
    if (!nav || !el) return;
    setRect({ left: el.offsetLeft, width: el.offsetWidth, barW: nav.offsetWidth });
  }, [active]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    const raf = requestAnimationFrame(() => setReady(true));
    return () => {
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(raf);
    };
  }, [measure]);

  // scroll-spy
  useEffect(() => {
    const sections = tabs
      .map((t) => document.getElementById(t.id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < lockUntil.current) return;
        entries.forEach((e) => e.isIntersecting && goTo(e.target.id));
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [goTo]);

  const handleClick = (id: string) => {
    lockUntil.current = Date.now() + 900;
    goTo(id);
    setIsOpen(false);
  };

  const lensStyle = (r: Rect): React.CSSProperties => {
    const pad = 4;
    const left = r.left - pad;
    const right = r.barW - (r.left + r.width) - pad;
    const leadMs = 380;
    const trailMs = 640;
    const rightLeads = dir === 1;
    return {
      left,
      right,
      top: -5,
      bottom: -5,
      transform: moving ? "scale(1.03, 1.1)" : "scale(1, 1)",
      transition: ready
        ? [
            `left ${rightLeads ? trailMs : leadMs}ms ${rightLeads ? TRAIL : LEAD} ${rightLeads ? 40 : 0}ms`,
            `right ${rightLeads ? leadMs : trailMs}ms ${rightLeads ? LEAD : TRAIL} ${rightLeads ? 0 : 40}ms`,
            "transform 300ms ease",
          ].join(", ")
        : "none",
    };
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <style>{GLASS_CSS}</style>

      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 bg-[#0b0416]/55 backdrop-blur-md shadow-[0_0_40px_rgba(113,39,186,0.20)] transition-opacity duration-300 ${isScrolled || isOpen ? "opacity-100" : "opacity-0"
          }`}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/profile.png"
            alt="Devin Syafa"
            width={48}
            height={48}
            className="rounded-full object-cover border border-[#2DD4BF]"
          />
        </Link>

        <nav
          ref={navRef}
          className="relative hidden md:flex items-center rounded-full font-medium text-lg"
          style={{ gap: 6, padding: "8px 12px" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(18px) saturate(170%)",
              WebkitBackdropFilter: "blur(18px) saturate(170%)",
              border: "1px solid rgba(255,255,255,0.16)",
              boxShadow: [
                "inset 0 1px 1px rgba(255,255,255,0.45)",
                "inset 0 -1px 1px rgba(255,255,255,0.10)",
                "inset 0 0 22px rgba(255,255,255,0.05)",
                "0 8px 32px rgba(0,0,0,0.35)",
              ].join(", "),
            }}
          />

          {rect && (
            <div aria-hidden="true" className="pointer-events-none absolute" style={lensStyle(rect)}>
              <div
                className="lg-anim absolute inset-0 rounded-full"
                style={{
                  background: [
                    "linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0) 50%)",
                    "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.38) 35%, transparent 50%)",
                    "linear-gradient(135deg, rgba(45,212,191,0.40) 0%, rgba(255,255,255,0.12) 55%, rgba(45,212,191,0.24) 100%)",
                  ].join(", "),
                  backgroundSize: "100% 100%, 250% 100%, 100% 100%",
                  backdropFilter: "blur(4px) saturate(190%) brightness(1.25)",
                  WebkitBackdropFilter: "blur(4px) saturate(190%) brightness(1.25)",
                  border: "1px solid rgba(255,255,255,0.30)",
                  boxShadow: [
                    "inset 0 1.5px 1px rgba(255,255,255,0.7)",
                    "inset 0 -1.5px 1px rgba(255,255,255,0.25)",
                    "inset 0 0 14px rgba(255,255,255,0.18)",
                    "0 0 18px rgba(45,212,191,0.45)",
                    "0 6px 18px rgba(0,0,0,0.30)",
                  ].join(", "),
                  animation: "lg-breathe 4s ease-in-out infinite, lg-sheen 5.5s linear infinite",
                }}
              />
            </div>
          )}

          {/* 3) tab */}
          {tabs.map((t) => (
            <Link
              key={t.id}
              href={`#${t.id}`}
              ref={(el) => {
                linkRefs.current[t.id] = el;
              }}
              onClick={() => handleClick(t.id)}
              className="relative z-10 inline-block rounded-full whitespace-nowrap transition-colors duration-300"
              style={{
                padding: "6px 22px",
                color: active === t.id ? "#ffffff" : "rgba(255,255,255,0.68)",
                fontWeight: active === t.id ? 600 : 500,
                textShadow: "0 1px 2px rgba(0,0,0,0.35)",
              }}
            >
              {t.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded text-white/80 hover:text-[#2DD4BF] transition duration-200"
        >
          <FaBarsStaggered className="size-6" />
        </button>
      </div>

      {/* mobile menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4">
          <div className="flex flex-col gap-3 text-base font-medium text-white/80">
            {tabs.map((t) => (
              <Link
                key={t.id}
                href={`#${t.id}`}
                className={`transition duration-200 hover:text-[#2DD4BF] ${active === t.id ? "text-[#2DD4BF]" : ""}`}
                onClick={() => handleClick(t.id)}
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;