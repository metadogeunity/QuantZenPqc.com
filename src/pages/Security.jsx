import { useEffect, useRef, useState } from "react";
import PageMeta from "../components/PageMeta";
import Eyebrow from "../components/Eyebrow";
import Card from "../components/Card";
import FeatureRow from "../components/FeatureRow";
import Wrap from "../components/Wrap";
import Section from "../components/Section";

const INDIGO = "rgba(99,102,241,0.42)";
const SKY = "rgba(186,230,253,0.9)";
const INDIGO_SOLID = "rgba(99,102,241,1)";
const SKY_SOLID = "rgba(56,131,217,1)";

const riskIcon = {
  color: INDIGO_SOLID,
  borderColor: "rgba(99,102,241,0.3)",
  background: "rgba(99,102,241,0.06)",
};
const safeIcon = {
  color: SKY_SOLID,
  borderColor: "rgba(186,230,253,0.7)",
  background: "rgba(186,230,253,0.3)",
};

const modelCards = [
  {
    icon: "!",
    style: riskIcon,
    title: "Harvest now, decrypt later",
    body: "Encrypted traffic captured today is stored for the day a quantum computer can break it. Because financial and identity data stays sensitive for decades, this is a present risk not a future one.",
  },
  {
    icon: "∿",
    style: riskIcon,
    title: "Public key cryptography is the weak point",
    body: "Shor's algorithm breaks RSA and elliptic curve cryptography, the asymmetric primitives underpinning TLS key exchange and certificates. Grover's algorithm weakens symmetric strength, motivating larger keys.",
  },
  {
    icon: "✓",
    style: safeIcon,
    title: "Post quantum cryptography mitigates it",
    body: "Lattice based ML KEM and ML DSA NIST FIPS 203 and 204 are designed to resist both classical and quantum attack. QuantZen applies them to live API traffic without a stack rebuild.",
  },
  {
    icon: "↻",
    style: safeIcon,
    title: "Cryptographic agility",
    body: "Algorithms evolve. QuantZen rotates parameter sets and primitives by policy, and prevents downgrade by binding negotiated parameters into the signed, authenticated request.",
  },
];

const protections = [
  { icon: "S", title: "Payload signing & verification", body: "Each request is signed with a post quantum digital signature over a canonical representation, and verified server side before any backend processing occurs." },
  { icon: "I", title: "Message integrity", body: "Authenticated encryption binds integrity to the payload, so any byte level modification is detected and the request is rejected." },
  { icon: "R", title: "Replay protection", body: "Nonces, counters, and timestamps are bound into the signed request; previously seen or expired requests are refused." },
  { icon: "M", title: "Man in the middle protection", body: "Because authenticity is bound to the payload not just the transport an intermediary cannot silently alter, substitute, or impersonate a request." },
  { icon: "A", title: "Tamper evident audit trail", body: "Every request, verification result, and threat decision is written to a cryptographically chained, immutable audit record suitable for regulatory review." },
];
function ProtectionIcon({ index, color }) {
  switch (index) {
    case 0: // signing
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M3 17c2-1 4-1 6 0s4 1 6 0 4-1 6 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M7 13L16 4l3 3-9 9H7v-3z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
    case 1: // integrity
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
          <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 2: // replay
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" />
          <path d="M12 8v4l3 2" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 3: // MITM
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke={color} strokeWidth="2" />
          <circle cx="12" cy="12" r="2.6" stroke={color} strokeWidth="2" />
          <path d="M4 19L20 5" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 4: // audit
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M7 3h7l4 4v14H7V3z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
          <path d="M14 3v4h4" stroke={color} strokeWidth="2" strokeLinejoin="round" />
          <path d="M9.5 12h5M9.5 15h5M9.5 18h3" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}



// Richer two-tone gradients per icon box — alternating indigo/violet and sky/indigo tones
const protectionThemes = [
  "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)", // indigo -> violet
  "linear-gradient(135deg, #38BFE3 0%, #3B82F6 100%)", // sky -> blue
  "linear-gradient(135deg, #818CF8 0%, #6366F1 100%)", // soft indigo -> indigo
  "linear-gradient(135deg, #60D5F5 0%, #6366F1 100%)", // sky -> indigo
  "linear-gradient(135deg, #A78BFA 0%, #4F46E5 100%)", // violet -> deep indigo
];

const protectionLayout = [
  { width: "92%", align: "self-start", from: "left" },
  { width: "78%", align: "self-end", from: "right" },
  { width: "100%", align: "self-start", from: "left" },
  { width: "82%", align: "self-end", from: "right" },
  { width: "95%", align: "self-start", from: "left" },
];



const protectionGlyphs = [
  (c) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 17c2-1 4-1 6 0s4 1 6 0 4-1 6 0" stroke={c} strokeWidth="2" strokeLinecap="round" />
      <path d="M7 13L16 4l3 3-9 9H7v-3z" stroke={c} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
  (c) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke={c} strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  (c) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke={c} strokeWidth="2" />
      <path d="M12 8v4l3 2" stroke={c} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  (c) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke={c} strokeWidth="2" />
      <circle cx="12" cy="12" r="2.6" stroke={c} strokeWidth="2" />
      <path d="M4 19L20 5" stroke={c} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  (c) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M7 3h7l4 4v14H7V3z" stroke={c} strokeWidth="2" strokeLinejoin="round" />
      <path d="M14 3v4h4" stroke={c} strokeWidth="2" strokeLinejoin="round" />
      <path d="M9.5 12h5M9.5 15h5M9.5 18h3" stroke={c} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
];



function Sparkline({ color }) {
  return (
    <svg width="64" height="28" viewBox="0 0 64 28" fill="none">
      <path
        d="M2 22 L10 22 L14 8 L18 22 L22 14 L26 22 L34 22 L38 6 L42 22 L46 16 L50 22 L58 22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="58" cy="22" r="2.4" fill={color} />
    </svg>
  );
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

const scenarioKindStyles = {
  normal: {
    ring: "rgba(99,102,241,0.18)",
    badge: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
    chipBg: "rgba(99,102,241,0.08)",
    chipText: "#4338CA",
    cardBorder: "rgba(99,102,241,0.14)",
  },
  threat: {
    ring: "rgba(244,63,94,0.18)",
    badge: "linear-gradient(135deg, #FB7185 0%, #E11D48 100%)",
    chipBg: "rgba(244,63,94,0.08)",
    chipText: "#BE123C",
    cardBorder: "rgba(244,63,94,0.18)",
  },
  block: {
    ring: "rgba(16,185,129,0.18)",
    badge: "linear-gradient(135deg, #34D399 0%, #059669 100%)",
    chipBg: "rgba(16,185,129,0.08)",
    chipText: "#047857",
    cardBorder: "rgba(16,185,129,0.18)",
  },
};

function ScenarioStepIcon({ kind }) {
  if (kind === "threat") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 3l9 16H3L12 3z" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
        <path d="M12 10v4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="17" r="0.9" fill="#fff" />
      </svg>
    );
  }
  if (kind === "block") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="#fff" strokeWidth="2" />
      <path d="M12 8v4l3 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ScenarioStep({ innerRef, visible, number, kind = "normal", title, verdict, children }) {
  const theme = scenarioKindStyles[kind] || scenarioKindStyles.normal;
  return (
    <div
      ref={innerRef}
      className="relative flex gap-5 pb-10 last:pb-0"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-28px)",
        transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div
        className="relative z-10 shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-[13px] font-bold text-white"
        style={{
          background: theme.badge,
          boxShadow: visible ? `0 0 0 6px ${theme.ring}` : `0 0 0 0px ${theme.ring}`,
          transition: "box-shadow 0.5s ease-out 0.15s",
        }}
      >
        <ScenarioStepIcon kind={kind} />
      </div>

      <div
        className="flex-1 min-w-0 rounded-2xl bg-white p-5"
        style={{
          border: `1px solid ${theme.cardBorder}`,
          boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 8px 22px rgba(15,23,42,0.05)",
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-1.5">
          <h3 className="text-[15px] font-bold text-gray-950 leading-snug">
            <span className="text-gray-400 font-semibold mr-1.5">{number.padStart(2, "0")}</span>
            {title}
          </h3>
          {verdict && (
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-[5px] text-[11px] font-semibold whitespace-nowrap"
              style={{ background: theme.chipBg, color: theme.chipText }}
            >
              {verdict}
            </span>
          )}
        </div>
        <p className="text-[13.5px] text-gray-600 leading-[1.65]">{children}</p>
      </div>
    </div>
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
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

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

export default function Security() {
  const [introRef, introVisible] = useReveal();
  const [cardsRef, cardsVisible] = useReveal();
  const [protRef, protVisible] = useReveal();
  const [scenarioRef, scenarioVisible] = useReveal();
  const [stepRefs, stepsVisible] = useRevealList(5);
  const cardThemes = [
  { bg: "#EAF1FF", chip: "#D7E4FF", text: "#1E3A8A" },
  { bg: "#F1ECFF", chip: "#E2D7FF", text: "#4338CA" },
  { bg: "#E7FBF6", chip: "#D2F5EA", text: "#0F766E" },
  { bg: "#EFF6FF", chip: "#DCEBFF", text: "#1D4ED8" },
];

const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <PageMeta title="Security" />

      {/* ── Intro: centered ── */}
     <Section className="!bg-white relative overflow-hidden">
  <div
    className="pointer-events-none absolute -top-[160px] left-1/2 -translate-x-1/2 w-[680px] h-[400px] rounded-full blur-[100px]"
    style={{ background: `radial-gradient(circle, ${SKY} 0%, ${INDIGO} 55%, transparent 75%)` }}
  />
  <Wrap className="relative">
    <div
      ref={introRef}
      className="flex flex-col items-center text-center mx-auto"
      style={{
        opacity: introVisible ? 1 : 0,
        transform: introVisible ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      <SectionLabel>The model</SectionLabel>
      <h2 className="max-w-[760px] text-[34px] max-[860px]:text-[27px] font-bold text-gray-950 leading-snug">
        Why{" "}
        <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)", backgroundSize: "200% auto", animation: "shimmer 3s linear infinite" }}>
                post quantum
        </span>{" "}
        , and why at the payload.
      </h2>
      <p className="mt-4.5 max-w-[680px] text-lg text-slate-500 leading-relaxed">
        Transport encryption protects a single hop and terminates at
        intermediaries. QuantZen protects the request itself {" "}
        <span className="font-semibold text-gray-800">
          confidentiality, authenticity, and integrity
        </span>{" "}
        travel with the payload, end to end, using cryptography designed to
        survive quantum attack.
      </p>
    </div>
  </Wrap>
</Section>

      {/* ── Model cards ── */}
  <Section tight className="!bg-white">
  <Wrap>
    <div className="max-w-[800px] mx-auto grid grid-cols-2 gap-7 max-[860px]:grid-cols-1">
      {modelCards.map((c, i) => {
        const theme = cardThemes[i % cardThemes.length];
        const isOpen = openIndex === i;
        return (
          <div
            key={c.title}
            className="rounded-[20px] p-6 flex flex-col transition-transform duration-300 hover:-translate-y-[2px]"
            style={{ background: theme.bg }}
          >
            <h3 className="text-[18px] font-bold text-gray-950 mb-2 leading-snug">
              {c.title}
            </h3>
            <p
              className="text-[13px] leading-[1.65] text-gray-700"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: isOpen ? "unset" : 2,
                WebkitBoxOrient: "vertical",
                overflow: isOpen ? "visible" : "hidden",
                transition: "all 0.3s ease",
              }}
            >
              {c.body}
            </p>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="mt-4 inline-flex items-center gap-1.5 self-start rounded-full px-3.5 py-[6px] text-[12px] font-semibold transition-colors duration-200"
              style={{ background: theme.chip, color: theme.text }}
            >
              {isOpen ? "Show less" : "Read more"}
              <span
                className="inline-block transition-transform duration-300"
                style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                ↓
              </span>
            </button>
          </div>
        );
      })}
    </div>
  </Wrap>
</Section>
      {/* ── Protections ── */}
<Section className="!bg-white relative overflow-hidden">
  {/* Background: pure white on the left, color appears only on the right edge using the two brand colors only */}
  <div
    className="absolute inset-0"
    style={{
      background: `linear-gradient(100deg, #ffffff 0%, #ffffff 55%, ${SKY} 82%, ${INDIGO} 100%)`,
    }}
  />

  <Wrap className="relative">
    <div className="flex flex-col items-center text-center mb-12">
      <SectionLabel>Protections</SectionLabel>
      <h2 className="max-w-[760px] text-[34px] max-[860px]:text-[27px] font-bold text-gray-950 leading-snug">
        What every{" "}
        <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)", backgroundSize: "200% auto", animation: "shimmer 3s linear infinite" }}>
                protected
        </span>{" "}
        request carries.
      </h2>
    </div>

    <div ref={protRef} className="max-w-[680px] mx-auto flex flex-col gap-5">
      {protections.map((f, i) => {
        const iconGradient = protectionThemes[i % protectionThemes.length];
        const layout = protectionLayout[i % protectionLayout.length];
        // strictly alternate entrance direction by index: even -> from left, odd -> from right
        const fromLeft = i % 2 === 0;
        const offsetX = fromLeft ? -160 : 160;
        return (
          <div
            key={f.title}
            className={`group relative rounded-[22px] bg-white p-5 flex items-center gap-5 hover:-translate-y-[3px] hover:shadow-lg ${layout.align}`}
            style={{
              width: layout.width,
              boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 10px 28px rgba(99,102,241,0.12)",
              border: "1px solid rgba(255,255,255,0.7)",
              opacity: protVisible ? 1 : 0,
              transform: protVisible
                ? "translateX(0px)"
                : `translateX(${offsetX}px)`,
              transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
              willChange: "transform, opacity",
            }}
          >
            <div
              className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              style={{ background: iconGradient, boxShadow: "0 4px 14px rgba(99,102,241,0.3)" }}
            >
              <ProtectionIcon index={i} color="#ffffff" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[15px] font-bold text-gray-950 leading-snug mb-1">{f.title}</h3>
              <p className="text-[13px] text-gray-600 leading-[1.6]">{f.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  </Wrap>
</Section>
      {/* ── Attack scenario ── */}
      <Section className="!bg-white relative overflow-hidden">
        <div
          className="pointer-events-none absolute top-[5%] right-[-140px] w-[400px] h-[400px] rounded-full blur-[110px]"
          style={{ background: `radial-gradient(circle, ${INDIGO} 0%, transparent 70%)` }}
        />
        <div
          className="pointer-events-none absolute bottom-[0%] left-[-160px] w-[360px] h-[360px] rounded-full blur-[110px]"
          style={{ background: `radial-gradient(circle, ${SKY} 0%, transparent 70%)` }}
        />
        <Wrap className="relative">
          <div className="flex flex-col items-center text-center mb-12">
            <SectionLabel>Attack scenario</SectionLabel>
            <h2 className="max-w-[760px] text-[34px] max-[860px]:text-[27px] font-bold text-gray-950 leading-snug">
        An intercepted, tampered{" "}
        <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)", backgroundSize: "200% auto", animation: "shimmer 3s linear infinite" }}>
                API 
        </span>{" "}
        request — stopped.
      </h2>
            <p className="mt-4.5 max-w-[680px] text-lg text-slate-500 leading-relaxed">
              A funds transfer request leaves a banking app. An attacker on the
              path attempts to alter the destination account. Here is what
              QuantZen does.
            </p>
          </div>

          <div
            ref={scenarioRef}
            className="relative max-w-[700px] mx-auto rounded-[28px] p-8 max-[640px]:p-5"
            style={{
              border: "1px solid rgba(99,102,241,0.12)",
              background: `linear-gradient(165deg, rgba(186,230,253,0.12) 0%, #ffffff 35%)`,
              boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 24px 60px rgba(99,102,241,0.1)",
              opacity: scenarioVisible ? 1 : 0,
              transform: scenarioVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            {/* animated connecting line — draws downward as steps reveal */}
            <div
              className="absolute left-[49px] top-[40px] bottom-[40px] w-px overflow-hidden max-[640px]:left-[39px]"
              style={{ background: "rgba(99,102,241,0.12)" }}
            >
              <div
                className="w-full"
                style={{
                  height: scenarioVisible ? "100%" : "0%",
                  background: `linear-gradient(180deg, ${INDIGO_SOLID}, #E11D48 38%, #059669 70%, ${SKY_SOLID})`,
                  transition: "height 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s",
                }}
              />
            </div>

            <div className="relative">
              <ScenarioStep
                innerRef={(el) => (stepRefs.current[0] = el)}
                visible={stepsVisible[0]}
                number="1"
                title="Request is protected at the boundary"
              >
                QuantZen intercepts <span className="font-mono text-[12.5px] bg-gray-50 px-1.5 py-0.5 rounded">POST /transfers</span>, signs the
                canonical request with ML DSA, and encrypts the payload with an
                ML KEM established session key.
              </ScenarioStep>

              <ScenarioStep
                innerRef={(el) => (stepRefs.current[1] = el)}
                visible={stepsVisible[1]}
                number="2"
                kind="threat"
                title="Attacker intercepts and tampers"
                verdict="⚠ payload altered in transit"
              >
                A man in the middle modifies the beneficiary account number
                inside the request body, then forwards it on.
              </ScenarioStep>

              <ScenarioStep
                innerRef={(el) => (stepRefs.current[2] = el)}
                visible={stepsVisible[2]}
                number="3"
                kind="threat"
                title="Replay is also attempted"
                verdict="⚠ stale nonce detected"
              >
                The attacker resends a previously captured valid request,
                hoping to trigger a duplicate transfer.
              </ScenarioStep>

              <ScenarioStep
                innerRef={(el) => (stepRefs.current[3] = el)}
                visible={stepsVisible[3]}
                number="4"
                kind="block"
                title="Verification engine rejects both"
                verdict="✓ blocked before backend"
              >
                The signature no longer matches the modified payload, and the
                replayed nonce has already been seen. Neither request reaches
                the core banking system.
              </ScenarioStep>

              <ScenarioStep
                innerRef={(el) => (stepRefs.current[4] = el)}
                visible={stepsVisible[4]}
                number="5"
                kind="block"
                title="Audit record is written"
                verdict="✓ logged & alertable"
              >
                Each rejection is logged immutably with timestamp, source,
                algorithm, and reason producing tamper evident evidence for
                investigation and compliance.
              </ScenarioStep>
            </div>
          </div>
        </Wrap>
      </Section>
    </>
  );
}