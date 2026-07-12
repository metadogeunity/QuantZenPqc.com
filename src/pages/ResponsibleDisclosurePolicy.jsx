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

function ShieldCheckIcon({ color = "#fff" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GlobeIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.8" />
      <path d="M3.5 12h17M12 3.5c2.4 2.3 3.7 5.2 3.7 8.5s-1.3 6.2-3.7 8.5c-2.4-2.3-3.7-5.2-3.7-8.5S9.6 5.8 12 3.5z" stroke={color} strokeWidth="1.8" />
    </svg>
  );
}

function ApiIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="8" width="6" height="8" rx="1.5" stroke={color} strokeWidth="1.8" />
      <rect x="14.5" y="8" width="6" height="8" rx="1.5" stroke={color} strokeWidth="1.8" />
      <path d="M9.5 12h5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function WindowIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="5" width="17" height="14" rx="2" stroke={color} strokeWidth="1.8" />
      <path d="M3.5 9h17" stroke={color} strokeWidth="1.8" />
      <circle cx="6.3" cy="7" r="0.6" fill={color} />
      <circle cx="8.1" cy="7" r="0.6" fill={color} />
    </svg>
  );
}

function DocIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M7 3h7l4 4v14H7V3z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 3v4h4" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9.5 12h5M9.5 15h5M9.5 18h3" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.12" />
      <path d="M7.5 12.5l3 3 6-6.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.12" />
      <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
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

function ClockIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.8" />
      <path d="M12 7.5V12l3 2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function TrendIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 16l5-5 4 4 7-8" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 7h5v5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AwardIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="9" r="5.2" stroke={color} strokeWidth="1.8" />
      <path d="M9 13.5L7.5 21l4.5-2.5 4.5 2.5-1.5-7.5" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- data ---------- */

const scopeItems = [
  { icon: GlobeIcon, label: "www.quantzenpqc.com" },
  { icon: ApiIcon, label: "Public APIs" },
  { icon: WindowIcon, label: "Public web applications" },
  { icon: DocIcon, label: "Public documentation" },
];

const doItems = [
  "Report vulnerabilities responsibly",
  "Provide sufficient technical details",
  "Allow us reasonable time to investigate",
  "Keep findings confidential until resolved",
];

const dontItems = [
  "Access customer data",
  "Modify data",
  "Interrupt services",
  "Perform denial of service attacks",
  "Use automated destructive scanning",
  "Social engineer employees",
  "Attempt physical intrusion",
];

const timeline = [
  {
    icon: MailIcon,
    title: "Initial acknowledgement",
    value: "Within 5 business days",
    body: "We confirm receipt of your report and open an internal investigation.",
  },
  {
    icon: ClockIcon,
    title: "Status updates",
    value: "As investigation progresses",
    body: "We keep you informed while we validate, reproduce, and remediate the issue.",
  },
];

const reportChecklist = [
  "Vulnerability description",
  "Steps to reproduce",
  "Impact assessment",
  "Screenshots (if applicable)",
  "Proof of concept",
];

/* ---------- page ---------- */

export default function ResponsibleDisclosurePolicy() {
  const [introRef, introVisible] = useReveal();
  const [scopeRef, scopeVisible] = useRevealList(scopeItems.length);
  const [ddRef, ddVisible] = useReveal();
  const [harborRef, harborVisible] = useReveal();
  const [timeRef, timeVisible] = useRevealList(timeline.length);
  const [reportRef, reportVisible] = useReveal();

  return (
    <>
      <PageMeta title="Responsible Disclosure Policy" />

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
            <SectionLabel>Security at QuantZen™</SectionLabel>
            <h1 className="max-w-[780px] text-[34px] max-[860px]:text-[27px] font-bold text-gray-950 leading-snug">
              Responsible{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
                  backgroundSize: "200% auto",
                  animation: "shimmer 3s linear infinite",
                }}
              >
                disclosure
              </span>{" "}
              , backed by a real safe harbor.
            </h1>
            <p className="mt-4.5 max-w-[680px] text-lg text-slate-500 leading-relaxed">
              Security is fundamental to our products and services. We appreciate the
              efforts of security researchers who responsibly identify and report
              vulnerabilities, and this policy sets out how we work together.
            </p>
          </div>
        </Wrap>
      </Section>

      {/* ── Scope ── */}
      <Section tight className="!bg-white">
        <Wrap>
          <div className="flex flex-col items-center text-center mb-9">
            <SectionLabel>Scope</SectionLabel>
            <h2 className="max-w-[640px] text-[26px] max-[860px]:text-[22px] font-bold text-gray-950 leading-snug">
              What this policy covers
            </h2>
            <p className="mt-2.5 max-w-[560px] text-[14.5px] text-slate-500 leading-relaxed">
              Unless otherwise stated, this policy applies to the following surfaces.
            </p>
          </div>

          <div className="max-w-[820px] mx-auto grid grid-cols-4 gap-4 max-[860px]:grid-cols-2 max-[480px]:grid-cols-1">
            {scopeItems.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  ref={(el) => (scopeRef.current[i] = el)}
                  className="rounded-2xl p-5 flex flex-col items-center text-center gap-3 transition-transform duration-300 hover:-translate-y-[3px]"
                  style={{
                    background: "linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(186,230,253,0.14) 100%)",
                    border: "1px solid rgba(99,102,241,0.12)",
                    opacity: scopeVisible[i] ? 1 : 0,
                    transform: scopeVisible[i] ? "translateY(0)" : "translateY(16px)",
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
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </Wrap>
      </Section>

      {/* ── Do / Don't ── */}
      <Section className="!bg-white relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(100deg, #ffffff 0%, #ffffff 55%, ${SKY} 82%, ${INDIGO} 100%)` }}
        />
        <Wrap className="relative">
          <div className="flex flex-col items-center text-center mb-12">
            <SectionLabel>Ground rules</SectionLabel>
            <h2 className="max-w-[720px] text-[34px] max-[860px]:text-[27px] font-bold text-gray-950 leading-snug">
              Research{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
                  backgroundSize: "200% auto",
                  animation: "shimmer 3s linear infinite",
                }}
              >
                responsibly
              </span>{" "}
              , stay inside these lines.
            </h2>
          </div>

          <div
            ref={ddRef}
            className="max-w-[900px] mx-auto grid grid-cols-2 gap-6 max-[760px]:grid-cols-1"
            style={{
              opacity: ddVisible ? 1 : 0,
              transform: ddVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            <div
              className="rounded-[22px] bg-white p-6"
              style={{ border: "1px solid rgba(16,185,129,0.18)", boxShadow: "0 1px 3px rgba(15,23,42,0.05), 0 12px 30px rgba(16,185,129,0.08)" }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(16,185,129,0.1)" }}>
                  <CheckIcon color="#059669" />
                </div>
                <h3 className="text-[16px] font-bold text-gray-950">Please do</h3>
              </div>
              <ul className="flex flex-col gap-2.5">
                {doItems.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-[13.5px] text-gray-700 leading-[1.5]">
                    <span className="mt-[3px] shrink-0"><CheckIcon color="#059669" /></span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-[22px] bg-white p-6"
              style={{ border: "1px solid rgba(244,63,94,0.18)", boxShadow: "0 1px 3px rgba(15,23,42,0.05), 0 12px 30px rgba(244,63,94,0.08)" }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(244,63,94,0.1)" }}>
                  <XIcon color="#E11D48" />
                </div>
                <h3 className="text-[16px] font-bold text-gray-950">Please do not</h3>
              </div>
              <ul className="flex flex-col gap-2.5">
                {dontItems.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-[13.5px] text-gray-700 leading-[1.5]">
                    <span className="mt-[3px] shrink-0"><XIcon color="#E11D48" /></span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Wrap>
      </Section>

      {/* ── Safe Harbor ── */}
      <Section tight className="!bg-white">
        <Wrap>
          <div
            ref={harborRef}
            className="max-w-[820px] mx-auto rounded-[24px] p-7 max-[640px]:p-5 flex items-start gap-5"
            style={{
              border: "1px solid rgba(186,230,253,0.7)",
              background: "rgba(186,230,253,0.14)",
              opacity: harborVisible ? 1 : 0,
              transform: harborVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            <div
              className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #60D5F5 0%, #6366F1 100%)", boxShadow: "0 4px 14px rgba(56,131,217,0.3)" }}
            >
              <ShieldCheckIcon />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-gray-950 mb-2.5">Safe harbor</h2>
              <p className="text-[13.5px] text-gray-600 leading-[1.7] mb-3">
                If your research is conducted in good faith, within this policy, and
                without harming users, we will not pursue legal action against
                legitimate security research.
              </p>
              <div className="flex flex-wrap gap-2">
                {["In good faith", "Within this policy", "Without harming users"].map((t) => (
                  <span
                    key={t}
                    className="text-[11.5px] font-semibold rounded-full px-3 py-[5px]"
                    style={{ background: "rgba(56,131,217,0.12)", color: "#1D4ED8" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Wrap>
      </Section>

      {/* ── Response timeline ── */}
      <Section className="!bg-white relative overflow-hidden">
        <div
          className="pointer-events-none absolute top-[5%] right-[-140px] w-[400px] h-[400px] rounded-full blur-[110px]"
          style={{ background: `radial-gradient(circle, ${INDIGO} 0%, transparent 70%)` }}
        />
        <Wrap className="relative">
          <div className="flex flex-col items-center text-center mb-12">
            <SectionLabel>Response timeline</SectionLabel>
            <h2 className="max-w-[700px] text-[28px] max-[860px]:text-[23px] font-bold text-gray-950 leading-snug">
              What happens after you report
            </h2>
          </div>

          <div className="max-w-[760px] mx-auto grid grid-cols-2 gap-6 max-[720px]:grid-cols-1">
            {timeline.map((t, i) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.title}
                  ref={(el) => (timeRef.current[i] = el)}
                  className="rounded-[22px] bg-white p-6 flex flex-col gap-3"
                  style={{
                    border: "1px solid rgba(99,102,241,0.12)",
                    boxShadow: "0 1px 3px rgba(15,23,42,0.05), 0 12px 30px rgba(99,102,241,0.08)",
                    opacity: timeVisible[i] ? 1 : 0,
                    transform: timeVisible[i] ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)", boxShadow: "0 4px 14px rgba(99,102,241,0.28)" }}
                  >
                    <Icon color="#fff" />
                  </div>
                  <h3 className="text-[15px] font-bold text-gray-950 leading-snug">{t.title}</h3>
                  <span
                    className="inline-flex self-start items-center gap-1.5 rounded-full px-3 py-[5px] text-[12px] font-bold"
                    style={{ background: "rgba(99,102,241,0.1)", color: "#4338CA" }}
                  >
                    {t.value}
                  </span>
                  <p className="text-[13px] text-gray-600 leading-[1.6]">{t.body}</p>
                </div>
              );
            })}
          </div>
        </Wrap>
      </Section>

      {/* ── Reporting ── */}
      <Section tight className="!bg-white">
        <Wrap>
          <div
            ref={reportRef}
            className="max-w-[820px] mx-auto rounded-[26px] p-8 max-[640px]:p-5 grid grid-cols-[1fr_1.1fr] gap-8 max-[760px]:grid-cols-1"
            style={{
              border: "1px solid rgba(99,102,241,0.12)",
              background: "linear-gradient(165deg, rgba(186,230,253,0.12) 0%, #ffffff 40%)",
              boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 24px 60px rgba(99,102,241,0.1)",
              opacity: reportVisible ? 1 : 0,
              transform: reportVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            <div>
              <SectionLabel>Reporting</SectionLabel>
              <h2 className="text-[20px] font-bold text-gray-950 mb-2 leading-snug">
                Found something? Send it our way.
              </h2>
              <p className="text-[13.5px] text-gray-600 leading-[1.65] mb-5">
                Email your report and we'll take it from there.
              </p>
              <a
                href="mailto:support@quantzenpqc.com"
                className="inline-flex items-center gap-2.5 rounded-full px-5 py-[11px] text-[13.5px] font-semibold text-white transition-transform duration-200 hover:-translate-y-[1px]"
                style={{ background: "linear-gradient(135deg, #6366F1 0%, #38BFE3 100%)", boxShadow: "0 8px 22px rgba(99,102,241,0.3)" }}
              >
                <MailIcon color="#fff" />
                support@quantzenpqc.com
              </a>
            </div>

            <div className="rounded-2xl bg-white p-5" style={{ border: "1px solid rgba(99,102,241,0.1)" }}>
              <span className="text-[11px] font-semibold uppercase tracking-[.1em] text-gray-400 mb-3 block">
                Please include
              </span>
              <ul className="flex flex-col gap-2.5">
                {reportChecklist.map((it) => (
                  <li key={it} className="flex items-center gap-2.5 text-[13px] text-gray-700">
                    <span className="shrink-0"><CheckIcon color="#4338CA" /></span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Wrap>
      </Section>

      {/* ── Recognition ── */}
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
              <AwardIcon color="#fff" />
            </div>
            <h2 className="text-[19px] font-bold text-white mb-1.5">Recognition</h2>
            <p className="text-[13.5px] text-white/85 leading-[1.6]">
              With your permission, we may acknowledge responsible disclosures after
              remediation thank you for helping keep QuantZen™ secure.
            </p>
          </div>
        </Wrap>
      </Section>
    </>
  );
}