import { useEffect, useRef, useState } from "react";
import PageMeta from "../components/PageMeta";
import Wrap from "../components/Wrap";
import Section from "../components/Section";

const INDIGO = "rgba(99,102,241,0.42)";
const SKY = "rgba(186,230,253,0.9)";
const INDIGO_SOLID = "rgba(99,102,241,1)";
const SKY_SOLID = "rgba(56,131,217,1)";

/* ---------- shared reveal hooks (same pattern as Security.jsx) ---------- */

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
        { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach((io) => io && io.disconnect());
  }, []);
  return [refs, visible];
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

/* ---------- icon set ---------- */

function GlobeIcon({ color = "#fff" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.8" />
      <path d="M3.5 12h17M12 3.5c2.4 2.3 3.7 5.2 3.7 8.5s-1.3 6.2-3.7 8.5c-2.4-2.3-3.7-5.2-3.7-8.5S9.6 5.8 12 3.5z" stroke={color} strokeWidth="1.8" />
    </svg>
  );
}

function ClipboardCheckIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="5.5" y="4.5" width="13" height="16" rx="2" stroke={color} strokeWidth="1.8" />
      <path d="M9 4.5V3.5a1.5 1.5 0 013 0v1M9 4.5a1.5 1.5 0 003 0" stroke={color} strokeWidth="1.8" />
      <path d="M9 13l2 2 4-4.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ScaleIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 3v18M7 21h10" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5 7h5M14 7h5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5 7l-2.5 5a2.6 2.6 0 005 0L5 7zM19 7l-2.5 5a2.6 2.6 0 005 0L19 7z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function ImportIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 3v11" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 10.5l4 4 4-4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 16v3a1.5 1.5 0 001.5 1.5h12a1.5 1.5 0 001.5-1.5v-3" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function TransferIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 8h13M17 8l-3-3M17 8l-3 3" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 16H7M7 16l3-3M7 16l3 3" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BanIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" />
      <path d="M6 6l12 12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function KeyIcon({ color = "#fff" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="8" cy="15" r="4" stroke={color} strokeWidth="1.8" />
      <path d="M11 12l9-9M17 6l2.5 2.5M14 9l2 2" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StampIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M9 3.5a3 3 0 016 0c0 1.6-1.3 2.3-1.3 3.8V9h-3.4V7.3C10.3 5.8 9 5.1 9 3.5z" stroke={color} strokeWidth="1.7" strokeLinejoin="round" />
      <rect x="7" y="9" width="10" height="4.5" rx="1" stroke={color} strokeWidth="1.7" />
      <path d="M4.5 20l1-6h13l1 6" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BellIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M6 10a6 6 0 1112 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10z" stroke={color} strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M10 18.5a2 2 0 004 0" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function MailIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5.5" width="18" height="13" rx="2.2" stroke={color} strokeWidth="1.8" />
      <path d="M4 7l8 6 8-6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- data ---------- */

const complianceItems = [
  { icon: ScaleIcon, label: "Export regulations" },
  { icon: BanIcon, label: "Trade sanctions" },
  { icon: ImportIcon, label: "Import restrictions" },
  { icon: TransferIcon, label: "Technology transfer regulations" },
];

const restrictedItems = [
  "Exported in violation of applicable law.",
  "Used by prohibited persons or entities.",
  "Used for unlawful purposes.",
];

const algorithms = [
  {
    name: "ML-KEM",
    tag: "Key encapsulation",
    body: "Lattice-based key establishment standardized for post quantum confidentiality.",
  },
  {
    name: "ML-DSA",
    tag: "Digital signatures",
    body: "Lattice based signature scheme used to authenticate and sign requests.",
  },
  {
    name: "FALCON",
    tag: "Digital signatures",
    body: "Compact lattice based signature scheme, aligned with public post quantum standards.",
  },
];

const govItems = [
  { icon: ImportIcon, label: "Import approval" },
  { icon: StampIcon, label: "Export licensing" },
  { icon: BellIcon, label: "Regulatory notification" },
];

/* ---------- page ---------- */

export default function ExportControl() {
  const [introRef, introVisible] = useReveal();
  const [compRef, compVisible] = useRevealList(complianceItems.length);
  const [restrRef, restrVisible] = useReveal();
  const [algoRef, algoVisible] = useRevealList(algorithms.length);
  const [govRef, govVisible] = useReveal();

  return (
    <>
      <PageMeta title="Export Control & Cryptography Notice" />

      {/* ── Hero ── */}
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
            <SectionLabel>Export Compliance</SectionLabel>
            <h1 className="max-w-[780px] text-[34px] max-[860px]:text-[27px] font-bold text-gray-950 leading-snug">
              Cryptography{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
                  backgroundSize: "200% auto",
                  animation: "shimmer 3s linear infinite",
                }}
              >
                crosses borders
              </span>{" "}
              differently than software does.
            </h1>
            <p className="mt-4.5 max-w-[680px] text-lg text-slate-500 leading-relaxed">
              QuantZen™ develops software related to cryptographic technologies. Our
              products, SDKs, technical documentation, and source code may be subject to
              applicable export control and trade compliance laws in the jurisdictions
              where we operate.
            </p>
          </div>
        </Wrap>
      </Section>

      {/* ── Compliance ── */}
      <Section tight className="!bg-white">
        <Wrap>
          <div className="flex flex-col items-center text-center mb-9">
            <SectionLabel>Compliance</SectionLabel>
            <h2 className="max-w-[640px] text-[26px] max-[860px]:text-[22px] font-bold text-gray-950 leading-snug">
              You're responsible for checking these first
            </h2>
            <p className="mt-2.5 max-w-[580px] text-[14.5px] text-slate-500 leading-relaxed">
              Before downloading, accessing, or using QuantZen™ products, users are
              responsible for complying with all applicable regulations below.
            </p>
          </div>

          <div className="max-w-[820px] mx-auto grid grid-cols-4 gap-4 max-[860px]:grid-cols-2 max-[480px]:grid-cols-1">
            {complianceItems.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.label}
                  ref={(el) => (compRef.current[i] = el)}
                  className="rounded-2xl p-5 flex flex-col items-center text-center gap-3 transition-transform duration-300 hover:-translate-y-[3px]"
                  style={{
                    background: "linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(186,230,253,0.14) 100%)",
                    border: "1px solid rgba(99,102,241,0.12)",
                    opacity: compVisible[i] ? 1 : 0,
                    transform: compVisible[i] ? "translateY(0)" : "translateY(16px)",
                    transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #6366F1 0%, #38BFE3 100%)", boxShadow: "0 4px 14px rgba(99,102,241,0.28)" }}
                  >
                    <Icon color="#fff" />
                  </div>
                  <span className="text-[13px] font-semibold text-gray-900 leading-snug break-words">
                    {c.label}
                  </span>
                </div>
              );
            })}
          </div>
        </Wrap>
      </Section>

      {/* ── Restricted use ── */}
      <Section className="!bg-white relative overflow-hidden">
        <div
          className="pointer-events-none absolute top-[8%] left-[-160px] w-[380px] h-[380px] rounded-full blur-[110px]"
          style={{ background: `radial-gradient(circle, ${INDIGO} 0%, transparent 70%)` }}
        />
        <Wrap className="relative">
          <div
            ref={restrRef}
            className="max-w-[780px] mx-auto rounded-[24px] p-7 max-[640px]:p-5"
            style={{
              border: "1px solid rgba(244,63,94,0.16)",
              background: "linear-gradient(135deg, rgba(244,63,94,0.04) 0%, rgba(99,102,241,0.03) 100%)",
              opacity: restrVisible ? 1 : 0,
              transform: restrVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "rgba(244,63,94,0.1)" }}>
                <BanIcon color="#E11D48" />
              </div>
              <h2 className="text-[18px] font-bold text-gray-950">Restricted use</h2>
            </div>
            <p className="text-[13.5px] text-gray-600 leading-[1.6] mb-5">
              QuantZen™ software may not be:
            </p>
            <div className="grid grid-cols-3 gap-4 max-[720px]:grid-cols-1">
              {restrictedItems.map((it, i) => (
                <div
                  key={it}
                  className="rounded-xl bg-white p-4 flex items-start gap-2.5"
                  style={{ border: "1px solid rgba(244,63,94,0.14)" }}
                >
                  <span className="mt-[2px] shrink-0"><BanIcon color="#E11D48" /></span>
                  <span className="text-[13px] text-gray-700 leading-[1.55]">{it}</span>
                </div>
              ))}
            </div>
          </div>
        </Wrap>
      </Section>

      {/* ── Cryptographic technologies ── */}
      <Section className="!bg-white relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(100deg, #ffffff 0%, #ffffff 55%, ${SKY} 82%, ${INDIGO} 100%)` }}
        />
        <Wrap className="relative">
          <div className="flex flex-col items-center text-center mb-12">
            <SectionLabel>Cryptographic technologies</SectionLabel>
            <h2 className="max-w-[760px] text-[34px] max-[860px]:text-[27px] font-bold text-gray-950 leading-snug">
              Built on public{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
                  backgroundSize: "200% auto",
                  animation: "shimmer 3s linear infinite",
                }}
              >
                post-quantum
              </span>{" "}
              standards.
            </h2>
            <p className="mt-3.5 max-w-[600px] text-[15px] text-slate-500 leading-relaxed">
              QuantZen™ incorporates modern cryptographic technologies aligned with
              publicly available standards. Use of these technologies may be regulated
              in certain jurisdictions.
            </p>
          </div>

          <div className="max-w-[960px] mx-auto grid grid-cols-3 gap-6 max-[860px]:grid-cols-1">
            {algorithms.map((a, i) => (
              <div
                key={a.name}
                ref={(el) => (algoRef.current[i] = el)}
                className="rounded-[22px] bg-white p-6 flex flex-col transition-transform duration-300 hover:-translate-y-[3px]"
                style={{
                  border: "1px solid rgba(99,102,241,0.1)",
                  boxShadow: "0 1px 3px rgba(15,23,42,0.05), 0 12px 30px rgba(99,102,241,0.08)",
                  opacity: algoVisible[i] ? 1 : 0,
                  transform: algoVisible[i] ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{
                    background: [
                      "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
                      "linear-gradient(135deg, #38BFE3 0%, #3B82F6 100%)",
                      "linear-gradient(135deg, #A78BFA 0%, #4F46E5 100%)",
                    ][i],
                    boxShadow: "0 4px 14px rgba(99,102,241,0.3)",
                  }}
                >
                  <KeyIcon />
                </div>
                <h3 className="text-[19px] font-bold text-gray-950 mb-1 tracking-tight">{a.name}</h3>
                <span
                  className="inline-flex self-start items-center rounded-full px-3 py-[4px] text-[11px] font-semibold mb-3"
                  style={{ background: "rgba(99,102,241,0.08)", color: "#4338CA" }}
                >
                  {a.tag}
                </span>
                <p className="text-[13px] text-gray-600 leading-[1.65]">{a.body}</p>
              </div>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ── Government restrictions ── */}
      <Section tight className="!bg-white">
        <Wrap>
          <div
            ref={govRef}
            className="max-w-[820px] mx-auto rounded-[24px] p-7 max-[640px]:p-5 flex flex-col gap-6 md:flex-row md:items-start"
            style={{
              border: "1px solid rgba(186,230,253,0.7)",
              background: "rgba(186,230,253,0.14)",
              opacity: govVisible ? 1 : 0,
              transform: govVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            <div className="flex items-start gap-5 md:flex-1">
              <div
                className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #60D5F5 0%, #6366F1 100%)", boxShadow: "0 4px 14px rgba(56,131,217,0.3)" }}
              >
                <GlobeIcon />
              </div>
              <div>
                <h2 className="text-[17px] font-bold text-gray-950 mb-1.5">Government restrictions</h2>
                <p className="text-[13.5px] text-gray-600 leading-[1.7]">
                  Certain countries may require the following before cryptographic
                  software can be used. Users are responsible for determining
                  applicable legal requirements.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 md:w-[240px] shrink-0">
              {govItems.map((g) => {
                const Icon = g.icon;
                return (
                  <div
                    key={g.label}
                    className="flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5"
                    style={{ border: "1px solid rgba(99,102,241,0.12)" }}
                  >
                    <span className="shrink-0" style={{ color: INDIGO_SOLID }}>
                      <Icon color={INDIGO_SOLID} />
                    </span>
                    <span className="text-[12.5px] font-semibold text-gray-800">{g.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Wrap>
      </Section>

      {/* ── Contact ── */}
      <Section className="!bg-white">
        <Wrap>
          <div
            className="max-w-[560px] mx-auto rounded-[24px] p-8 max-[640px]:p-6 text-center"
            style={{
              background: "linear-gradient(135deg, #6366F1 0%, #38BFE3 100%)",
              boxShadow: "0 20px 50px rgba(99,102,241,0.25)",
            }}
          >
            <div
              className="mx-auto w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "rgba(255,255,255,0.18)" }}
            >
              <MailIcon color="#fff" />
            </div>
            <h2 className="text-[19px] font-bold text-white mb-1.5">Export or compliance questions?</h2>
            <p className="text-[13.5px] text-white/85 leading-[1.6] mb-5">
              Reach out and we'll help point you in the right direction.
            </p>
            <a
              href="mailto:support@quantzenpqc.com"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-[10px] text-[13.5px] font-semibold text-indigo-700 transition-transform duration-200 hover:-translate-y-[1px]"
            >
              support@quantzenpqc.com
            </a>
          </div>
        </Wrap>
      </Section>
    </>
  );
}