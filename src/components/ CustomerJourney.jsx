import { useEffect, useRef, useState } from "react";
import Wrap from "../components/Wrap";
import Section from "../components/Section";

const INDIGO = "rgba(99,102,241,0.42)";
const SKY = "rgba(186,230,253,0.9)";
const INDIGO_SOLID = "rgba(99,102,241,1)";
const SKY_SOLID = "rgba(56,131,217,1)";

const eyebrowStyle = {
  color: INDIGO_SOLID,
  background: "rgba(99,102,241,0.07)",
  border: "1px solid rgba(99,102,241,0.18)",
};

function SectionLabel({ children }) {
  return (
    <span
      className="inline-flex items-center gap-[6px] sm:gap-[7px] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[.14em] rounded-full px-3 sm:px-4 py-[5px] sm:py-[6px] mb-4 sm:mb-5"
      style={eyebrowStyle}
    >
      <span className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: INDIGO_SOLID }} />
      {children}
    </span>
  );
}

const journeyThemes = [
  "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
  "linear-gradient(135deg, #38BFE3 0%, #3B82F6 100%)",
  "linear-gradient(135deg, #818CF8 0%, #6366F1 100%)",
  "linear-gradient(135deg, #60D5F5 0%, #6366F1 100%)",
  "linear-gradient(135deg, #A78BFA 0%, #4F46E5 100%)",
];

const journeySteps = [
  {
    title: "Discovery",
    tag: "Stage 01",
    body: "We map how requests move through your systems today and pinpoint where quantum era risk actually lives in your stack.",
  },
  {
    title: "Technical Workshop",
    tag: "Stage 02",
    body: "Your engineers and ours align on integration points, constraints, and a rollout plan tailored to your architecture.",
  },
  {
    title: "Pilot / PoC",
    tag: "Stage 03",
    body: "A scoped proof of concept runs against real traffic, so protection is validated with evidence, not assumptions.",
  },
  {
    title: "Production Deployment",
    tag: "Stage 04",
    body: "QuantZen goes live across production endpoints, with monitoring and audit logging active from the first request.",
  },
  {
    title: "Annual Enterprise Contract",
    tag: "Stage 05",
    body: "A long term partnership begins, backed by continuous updates, cryptographic agility, and dedicated support.",
  },
];

function JourneyIcon({ index, color }) {
  switch (index) {
    case 0: // Discovery — magnifying glass
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]">
          <circle cx="10.5" cy="10.5" r="6.5" stroke={color} strokeWidth="2" />
          <path d="M20 20l-5-5" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 1: // Technical Workshop — wrench
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]">
          <path
            d="M14.7 6.3a4 4 0 00-5.4 4.9L4 16.5V20h3.5l5.3-5.3a4 4 0 004.9-5.4l-2.6 2.6-2-2 2.6-2.6z"
            stroke={color}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 2: // Pilot / PoC — flask
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]">
          <path d="M9.5 3h5" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M10.5 3v6.5L5.8 18a1.6 1.6 0 001.4 2.4h9.6a1.6 1.6 0 001.4-2.4L13.5 9.5V3" stroke={color} strokeWidth="2" strokeLinejoin="round" />
          <path d="M8 15.5h8" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 3: // Production Deployment — server / rocket
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]">
          <rect x="4" y="4" width="16" height="6" rx="1.5" stroke={color} strokeWidth="2" />
          <rect x="4" y="14" width="16" height="6" rx="1.5" stroke={color} strokeWidth="2" />
          <circle cx="7.5" cy="7" r="0.9" fill={color} />
          <circle cx="7.5" cy="17" r="0.9" fill={color} />
        </svg>
      );
    case 4: // Annual Enterprise Contract — document / handshake
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]">
          <path d="M7 3h7l4 4v14H7V3z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
          <path d="M14 3v4h4" stroke={color} strokeWidth="2" strokeLinejoin="round" />
          <path d="M9.5 12.5h5M9.5 15.5h5M9.5 18.5h3" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
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
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
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
        { threshold: 0.25, rootMargin: "0px 0px -60px 0px" }
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach((io) => io && io.disconnect());
  }, []);
  return [refs, visible];
}

function JourneyStep({ innerRef, visible, index, step }) {
  const isLast = index === journeySteps.length - 1;
  return (
    <div
      ref={innerRef}
      className="relative flex gap-4 sm:gap-6 pb-8 sm:pb-12 last:pb-0"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.05}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.05}s`,
      }}
    >
      {/* Badge + connector */}
      <div className="relative z-10 flex flex-col items-center shrink-0">
        <div
          className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-transform duration-300"
          style={{
            background: journeyThemes[index % journeyThemes.length],
            boxShadow: visible
              ? "0 6px 18px rgba(99,102,241,0.28)"
              : "0 0px 0px rgba(99,102,241,0)",
            transform: visible ? "scale(1) rotate(0deg)" : "scale(0.85) rotate(-6deg)",
          }}
        >
          <JourneyIcon index={index} color="#ffffff" />
        </div>
        {!isLast && (
          <div className="w-px flex-1 min-h-[28px] sm:min-h-[36px] mt-2 overflow-hidden">
            <div
              className="w-full h-full"
              style={{
                background: "linear-gradient(180deg, rgba(99,102,241,0.35), rgba(186,230,253,0.6))",
                transform: visible ? "scaleY(1)" : "scaleY(0)",
                transformOrigin: "top",
                transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s",
              }}
            />
          </div>
        )}
      </div>

      {/* Card */}
      <div
        className="flex-1 min-w-0 rounded-2xl sm:rounded-[20px] bg-white p-4 sm:p-6 hover:-translate-y-[2px] transition-transform duration-300"
        style={{
          border: "1px solid rgba(99,102,241,0.12)",
          boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 10px 26px rgba(99,102,241,0.08)",
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 mb-2">
          <h3 className="text-[15px] sm:text-[17px] font-bold text-gray-950 leading-snug">{step.title}</h3>
          <span
            className="inline-flex items-center rounded-full px-2.5 sm:px-3 py-[4px] sm:py-[5px] text-[10px] sm:text-[11px] font-semibold tracking-wide whitespace-nowrap"
            style={{ background: "rgba(99,102,241,0.08)", color: "#4338CA" }}
          >
            {step.tag}
          </span>
        </div>
        <p className="text-[13px] sm:text-[13.5px] text-gray-600 leading-[1.6] sm:leading-[1.65]">{step.body}</p>
      </div>
    </div>
  );
}

export default function CustomerJourney() {
  const [introRef, introVisible] = useReveal();
  const [stepRefs, stepsVisible] = useRevealList(journeySteps.length);

  return (
    <Section className="!bg-white relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-[100px] sm:-top-[160px] left-1/2 -translate-x-1/2 w-[90vw] max-w-[680px] h-[240px] sm:h-[400px] rounded-full blur-[70px] sm:blur-[100px]"
        style={{ background: `radial-gradient(circle, ${SKY} 0%, ${INDIGO} 55%, transparent 75%)` }}
      />
      <Wrap className="relative">
        <div
          ref={introRef}
          className="flex flex-col items-center text-center mb-10 sm:mb-14 px-2 sm:px-0"
          style={{
            opacity: introVisible ? 1 : 0,
            transform: introVisible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <SectionLabel>How we get there</SectionLabel>
          <h2 className="max-w-[760px] text-[22px] sm:text-[27px] md:text-[34px] font-bold text-gray-950 leading-snug">
            The{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
                backgroundSize: "200% auto",
                animation: "shimmer 3s linear infinite",
              }}
            >
              customer journey
            </span>{" "}
            from first call to enterprise contract.
          </h2>
          <p className="mt-3 sm:mt-4.5 max-w-[680px] text-sm sm:text-base md:text-lg text-slate-500 leading-relaxed">
            Every deployment follows the same five stages, so you always know
            what comes next and what it depends on.
          </p>
        </div>

        <div className="max-w-[640px] mx-auto px-1 sm:px-0">
          {journeySteps.map((step, i) => (
            <JourneyStep
              key={step.title}
              innerRef={(el) => (stepRefs.current[i] = el)}
              visible={stepsVisible[i]}
              index={i}
              step={step}
            />
          ))}
        </div>
      </Wrap>
    </Section>
  );
}