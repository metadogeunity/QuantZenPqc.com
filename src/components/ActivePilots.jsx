import { useEffect, useRef, useState } from "react";
import Wrap from "../components/Wrap";
import Section from "../components/Section";

const INDIGO = "rgba(99,102,241,0.42)";
const SKY = "rgba(186,230,253,0.9)";
const INDIGO_SOLID = "rgba(99,102,241,1)";

const eyebrowStyle = {
  color: INDIGO_SOLID,
  background: "rgba(99,102,241,0.07)",
  border: "1px solid rgba(99,102,241,0.18)",
};

function SectionLabel({ children }) {
  return (
    <span
      className="inline-flex items-center gap-[7px] text-[11px] font-semibold uppercase tracking-[.14em] rounded-full px-4 py-[6px] mb-5"
      style={eyebrowStyle}
    >
      <span className="w-[5px] h-[5px] rounded-full" style={{ background: INDIGO_SOLID }} />
      {children}
    </span>
  );
}

const pilotThemes = [
  "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
  "linear-gradient(135deg, #38BFE3 0%, #3B82F6 100%)",
  "linear-gradient(135deg, #818CF8 0%, #6366F1 100%)",
  "linear-gradient(135deg, #60D5F5 0%, #6366F1 100%)",
];

const statusStyles = {
  live: { dot: "#10B981", text: "#047857", bg: "rgba(16,185,129,0.08)", label: "Live" },
  pending: { dot: "#F59E0B", text: "#B45309", bg: "rgba(245,158,11,0.08)", label: "Pending" },
  paused: { dot: "#94A3B8", text: "#475569", bg: "rgba(148,163,184,0.12)", label: "Paused" },
};

const pilots = [
  {
    name: "OkraTech",
    category: "Marketplace",
    status: "live",
    icon: "cube",
  },
  {
    name: "Predict Protocol",
    category: "Prediction market",
    status: "live",
    icon: "chart",
  },
];

function PilotIcon({ type, color }) {
  if (type === "chart") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 19h18" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M4 15l5-5 4 3 7-8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 5h5v5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  // default: cube
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l8 4.6v8.8L12 21l-8-4.6V7.6L12 3z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 21v-9M20 7.6L12 12 4 7.6" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function useRevealList(count) {
  const refs = useRef([]);
  const [visible, setVisible] = useState(() => Array(count).fill(false));
  useEffect(() => {
    const observers = refs.current.map((el, i) => {
      if (!el) return null;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
            io.disconnect();
          }
        },
        { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach((io) => io && io.disconnect());
  }, [count]);
  return [refs, visible];
}

function PilotCard({ innerRef, visible, index, pilot }) {
  const theme = pilotThemes[index % pilotThemes.length];
  const status = statusStyles[pilot.status] || statusStyles.live;

  return (
    <div
      ref={innerRef}
      className="group relative rounded-[22px] bg-white p-6 flex flex-col items-start text-left hover:-translate-y-[3px] hover:shadow-lg transition-transform duration-300
                 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[380px]"
      style={{
        border: "1px solid rgba(99,102,241,0.12)",
        boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 10px 26px rgba(99,102,241,0.08)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s`,
      }}
    >
      <div className="w-full flex items-start justify-between gap-4 mb-5">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
          style={{ background: theme, boxShadow: "0 4px 14px rgba(99,102,241,0.3)" }}
        >
          <PilotIcon type={pilot.icon} color="#ffffff" />
        </div>

        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-[6px] text-[11px] font-semibold whitespace-nowrap"
          style={{ background: status.bg, color: status.text }}
        >
          <span className="relative flex w-[7px] h-[7px]">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-60"
              style={{
                background: status.dot,
                animation: pilot.status === "live" ? "pilotPing 1.8s cubic-bezier(0,0,0.2,1) infinite" : "none",
              }}
            />
            <span className="relative inline-flex rounded-full w-[7px] h-[7px]" style={{ background: status.dot }} />
          </span>
          {status.label}
        </span>
      </div>

      <h3 className="text-[19px] font-bold text-gray-950 leading-snug mb-1.5">{pilot.name}</h3>
      <p className="text-[13.5px] text-gray-500">{pilot.category}</p>

      <style>{`
        @keyframes pilotPing {
          0% { transform: scale(1); opacity: 0.6; }
          75%, 100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function ActivePilots() {
  const [introRef, introVisible] = useReveal();
  const [cardRefs, cardsVisible] = useRevealList(pilots.length);

  return (
    <Section className="!bg-white relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-[140px] right-[-120px] w-[520px] h-[360px] max-w-[80vw] rounded-full blur-[100px]"
        style={{ background: `radial-gradient(circle, ${SKY} 0%, ${INDIGO} 55%, transparent 75%)` }}
      />
      <Wrap className="relative">
        <div
          ref={introRef}
          className="flex flex-col items-center text-center mb-10 mx-auto px-4"
          style={{
            opacity: introVisible ? 1 : 0,
            transform: introVisible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <SectionLabel>Active pilots</SectionLabel>
          <h2 className="max-w-[560px] mx-auto text-[clamp(22px,4.2vw,30px)] font-bold text-gray-950 leading-snug">
            Teams running{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
                backgroundSize: "200% auto",
                animation: "shimmer 3s linear infinite",
              }}
            >
              QuantZen
            </span>{" "}
            in production today.
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6 px-4 sm:px-0">
          {pilots.map((pilot, i) => (
            <PilotCard
              key={pilot.name}
              innerRef={(el) => (cardRefs.current[i] = el)}
              visible={cardsVisible[i]}
              index={i}
              pilot={pilot}
            />
          ))}
        </div>
      </Wrap>
    </Section>
  );
}