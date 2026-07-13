import { useEffect, useRef, useState } from "react";
import PageMeta from "../components/PageMeta";
import Wrap from "../components/Wrap";
import Section from "../components/Section";
import AtomDivider from "../components/AtomDivider";
const INDIGO = "rgba(99,102,241,0.42)";
const SKY = "rgba(186,230,253,0.9)";
const INDIGO_SOLID = "rgba(99,102,241,1)";
const SKY_SOLID = "rgba(56,131,217,1)";


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

function Shimmer({ children }) {
  return (
    <span
      className="bg-clip-text text-transparent"
      style={{
        backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
        backgroundSize: "200% auto",
        animation: "shimmer 3s linear infinite",
      }}
    >
      {children}
    </span>
  );
}


const IconBank = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6" />
  </svg>
);
const IconTelecom = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3v13M8.5 6a5 5 0 0 0 0 7M15.5 6a5 5 0 0 1 0 7M6 4a9 9 0 0 0 0 11M18 4a9 9 0 0 1 0 11M9 21h6l-3-5z" />
  </svg>
);
const IconAlert = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3l9 16H3L12 3z" strokeLinejoin="round" />
    <path d="M12 10v4" />
    <circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);
const IconClock = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l3 2" />
  </svg>
);
const IconGauge = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3a9 9 0 1 0 6.36 15.36" />
    <path d="M12 12l4.2-4.2" />
    <path d="M12 3v3" />
  </svg>
);

const threatStats = [
  { fig: "~0%", cap: "of the public web has deployed hybrid post quantum TLS certificates the most visible layer of migration has effectively not started.", src: "2026 scan of 32,011 domains", bg: "#F1ECFF", chip: "#E2D7FF", text: "#4338CA", icon: IconAlert },
  { fig: "~60%", cap: "of security teams are already prototyping or evaluating post quantum cryptography intent is high, deployment is not.", src: "2025 survey, 3,100+ practitioners", bg: "#EAF1FF", chip: "#D7E4FF", text: "#1E3A8A", icon: IconGauge },
  { fig: "5–15 yrs", cap: "is the realistic rip and replace migration time for a large institution longer than the deadlines now allow.", src: "Industry migration estimates", bg: "#E7FBF6", chip: "#D2F5EA", text: "#0F766E", icon: IconClock },
];

const deadlines = [
  { date: "Sep 2026", jur: "Global", hot: true, title: "FIPS 140-2 modules sunset", body: "Legacy validated cryptographic modules begin to age out, pulling PQC forward in every regulated procurement." },
  { date: "End 2026", jur: "European Union", hot: true, title: "Begin the transition", body: "The EU coordinated roadmap sets end 2026 to start transitioning; DORA adds binding crypto agility obligations for financial entities." },
  { date: "Dec 2026", jur: "India", hot: true, title: "Cryptographic Bill of Materials due", body: "In scope organizations are expected to inventory their cryptography under the national quantum safe roadmap." },
  { date: "Jan 2027", jur: "United States", hot: false, title: "CNSA 2.0 procurement gate", body: "National security and critical infrastructure suppliers must ship quantum safe capability or exit the bid." },
  { date: "2028–29", jur: "India", hot: false, title: "Critical information infrastructure", body: "Critical systems targeted for migration; the RBI's readiness horizon frames the banking sector's timeline." },
  { date: "2030", jur: "EU · US · UAE", hot: false, title: "High-risk systems quantum-safe", body: "EU critical infrastructure, US Executive Order 14412 key establishment, and UAE transition plan mandates converge on 2030." },
  { date: "2031", jur: "United States", hot: false, title: "Digital signatures migrated", body: "EO 14412 extends the requirement to post quantum signatures for high impact and high value systems." },
];

const deadlineTheme = {
  near: {
    badge: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
    ring: "rgba(99,102,241,0.18)",
    chipText: "#4338CA",
    dateText: "text-[#4338CA]",
  },
  later: {
    badge: "linear-gradient(135deg, #38BFE3 0%, #3B82F6 100%)",
    ring: "rgba(56,131,217,0.18)",
    chipText: "#1D4ED8",
    dateText: "text-[#1D4ED8]",
  },
};

export default function WhyNoW() {
  const [heroRef, heroVisible] = useReveal();
  const [statsRef, statsVisible] = useReveal();
  const [timelineRef] = useReveal();
  const [deadlineRefs, deadlinesVisible] = useRevealList(deadlines.length);
  const [gapRef, gapVisible] = useReveal();
  const [firstRef, firstVisible] = useReveal();

  return (
    <>
      <PageMeta title="Why Now" />

      {/* ============ HERO ============ */}
      <Section className="!bg-white relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-[160px] left-1/2 -translate-x-1/2 w-[680px] max-[640px]:w-[420px] h-[400px] max-[640px]:h-[280px] rounded-full blur-[100px]"
          style={{ background: `radial-gradient(circle, ${SKY} 0%, ${INDIGO} 55%, transparent 75%)` }}
        />
        <Wrap className="relative">
          <div
            ref={heroRef}
            className="flex flex-col items-center text-center mx-auto"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            <SectionLabel>The case for acting now</SectionLabel>
            <h1 className="max-w-[760px] text-[34px] max-[860px]:text-[27px] max-[420px]:text-[22px] font-bold text-gray-950 leading-snug">
              The window to migrate is <Shimmer>already closing.</Shimmer>
            </h1>
            <p className="mt-4.5 max-w-[680px] text-lg max-[420px]:text-[15px] text-slate-500 leading-relaxed">
              Quantum computing won't wait for your upgrade cycle. Encrypted
              banking and telecom data is being harvested today to be
              decrypted later and the deadlines to become quantum safe are{" "}
              <span className="font-semibold text-gray-800">
                now fixed in regulation, not left to prediction.
              </span>
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href="#deadlines"
                className="rounded-full px-6 py-3 max-[420px]:px-4.5 max-[420px]:py-2.5 text-sm max-[420px]:text-[13px] font-semibold text-white transition hover:-translate-y-0.5"
                style={{ background: INDIGO_SOLID, boxShadow: "0 10px 26px rgba(99,102,241,0.3)" }}
              >
                See the 2026–2030 deadlines
              </a>
              <a
                href="#gap"
                className="rounded-full px-6 py-3 max-[420px]:px-4.5 max-[420px]:py-2.5 text-sm max-[420px]:text-[13px] font-semibold transition hover:-translate-y-0.5"
                style={{ border: "1px solid rgba(99,102,241,0.25)", color: INDIGO_SOLID }}
              >
                See the execution gap
              </a>
            </div>
          </div>

          {/* exposure-gap card */}
          <div
            className="relative max-w-[800px] mx-auto mt-14 rounded-[28px] p-6 sm:p-8 max-[380px]:p-4"
            style={{
              border: "1px solid rgba(99,102,241,0.12)",
              background: `linear-gradient(165deg, rgba(186,230,253,0.14) 0%, #ffffff 40%)`,
              boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 24px 60px rgba(99,102,241,0.1)",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease-out 0.15s, transform 0.6s ease-out 0.15s",
            }}
          >
            {/* gap-head: title + badge, wraps to its own line instead of colliding */}
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
              <div className="text-[15px] sm:text-base max-[380px]:text-[13px] font-bold text-gray-950 leading-snug">
                The harvest now, decrypt later exposure gap
              </div>
              <div
                className="text-[11px] max-[380px]:text-[10px] font-semibold tracking-wide whitespace-nowrap"
                style={{ color: INDIGO_SOLID }}
              >
                ≈ 15 YEARS OF EXPOSURE
              </div>
            </div>

            {/* axis: two normal-flow bands (grow in height if text wraps — can never overflow),
                with a decorative hatch + CRQC marker layered on top, spanning both */}
            <div className="relative mt-9 pt-7 pb-8">
              {/* CRQC callout, sits above the bands so it never overlaps their text */}
              <div className="absolute -top-1 flex -translate-x-1/2 flex-col items-center" style={{ left: "24%" }}>
                <span
                  className="whitespace-nowrap rounded-full px-2.5 py-[3px] text-[10px] sm:text-[10.5px] max-[380px]:text-[9px] max-[380px]:px-2 font-semibold"
                  style={{ background: "rgba(99,102,241,0.1)", color: "#4338CA" }}
                >
                  CRQC window opens
                </span>
              </div>

              <div className="relative flex flex-col gap-2.5">
                {/* confidentiality band */}
                <div
                  className="relative z-10 rounded-xl px-4 max-[380px]:px-3 py-2.5 max-[380px]:py-2 text-[12px] sm:text-[13px] max-[380px]:text-[10.5px] font-semibold leading-snug"
                  style={{
                    width: "80%",
                    marginLeft: "4%",
                    background: "rgba(56,131,217,0.14)",
                    border: "1px solid rgba(56,131,217,0.4)",
                    color: "#1D4ED8",
                  }}
                >
                  Your data must stay&nbsp;&nbsp;confidential → 2046
                </div>

                {/* threat band */}
                <div
                  className="relative z-10 rounded-xl px-4 max-[380px]:px-3 py-2.5 max-[380px]:py-2 text-[12px] sm:text-[13px] max-[380px]:text-[10.5px] font-semibold leading-snug"
                  style={{
                    width: "76%",
                    marginLeft: "24%",
                    background: "rgba(99,102,241,0.14)",
                    border: "1px solid rgba(99,102,241,0.4)",
                    color: "#4338CA",
                  }}
                >
                  Quantum threat plausible → 2031+
                </div>

                {/* hatched exposure overlay — spans both bands via inset-y-0 on this relative wrapper */}
                <div
                  className="pointer-events-none absolute inset-y-0 z-0 rounded-xl"
                  style={{
                    left: "24%",
                    width: "60%",
                    borderLeft: `2px dashed ${INDIGO_SOLID}`,
                    background:
                      "repeating-linear-gradient(45deg, rgba(99,102,241,0.22) 0, rgba(99,102,241,0.22) 7px, transparent 7px, transparent 14px)",
                  }}
                />

                {/* CRQC vertical divider */}
                <div className="pointer-events-none absolute -top-2  -bottom-2 z-0 w-0.5" style={{ left: "24%", background: INDIGO_SOLID }} />
              </div>

              {/* harvested-today caption, below the bands so it never collides with band text */}
              <div className="mt-3 text-center">
                <span className="text-[11px] sm:text-[11.5px] max-[380px]:text-[9.5px] font-medium" style={{ color: "#4338CA" }}>
                  ↑ harvested today, decrypted once the window above opens
                </span>
              </div>
            </div>

            {/* ticks */}
            <div className="flex justify-between border-t border-gray-100 pt-3">
              {["2025", "2030", "2035", "2040", "2045", "2050"].map((yr) => (
                <span key={yr} className="text-[10px] sm:text-[11px] max-[380px]:text-[9px] text-gray-400 font-medium">
                  {yr}
                </span>
              ))}
            </div>
          </div>
        </Wrap>
      </Section>
       <AtomDivider from="#ffffff" to="#ffffff" />

      {/* ============ THREAT ============ */}
      <Section tight className="!bg-white" id="threat">
        <Wrap>
          <div className="flex flex-col items-center text-center mb-12">
            <SectionLabel>The threat isn't future tense</SectionLabel>
            <h2 className="max-w-[760px] text-[34px] max-[860px]:text-[27px] max-[420px]:text-[22px] font-bold text-gray-950 leading-snug">
              Adversaries are already <Shimmer>collecting what they can't yet read.</Shimmer>
            </h2>
            <p className="mt-4.5 max-w-[680px] text-lg max-[420px]:text-[15px] text-slate-500 leading-relaxed">
              In a harvest now, decrypt later attack, encrypted payment, KYC
              and identity traffic is captured today and stored until a
              cryptographically relevant quantum computer can break it.
              Because banking and telecom data stays sensitive for one to two
              decades, data intercepted in 2026 is still exposed long after
              the threat arrives.
            </p>
          </div>

          <div
            ref={statsRef}
            className="max-w-[900px] mx-auto grid grid-cols-3 gap-6 max-[860px]:grid-cols-1 max-[420px]:gap-4"
          >
            {threatStats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.fig}
                  className="min-w-0 rounded-[20px] p-6 max-[380px]:p-5 flex flex-col transition-transform duration-300 hover:-translate-y-[2px]"
                  style={{
                    background: s.bg,
                    opacity: statsVisible ? 1 : 0,
                    transform: statsVisible ? "translateY(0)" : "translateY(16px)",
                    transition: `opacity 0.6s ease-out ${i * 0.1}s, transform 0.6s ease-out ${i * 0.1}s, box-shadow 0.3s`,
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: s.chip, color: s.text }}
                  >
                    <Icon />
                  </div>
                  <div className="text-[34px] sm:text-[38px] font-bold tracking-tight leading-none break-words" style={{ color: s.text }}>
                    {s.fig}
                  </div>
                  <p className="mt-3 text-[13px] leading-[1.65] text-gray-700 break-words">{s.cap}</p>
                  <span
                    className="mt-4 inline-flex w-fit max-w-full items-center rounded-full px-3 py-[4px] text-[10.5px] font-semibold break-words"
                    style={{ background: "rgba(255,255,255,0.6)", color: s.text }}
                  >
                    {s.src}
                  </span>
                </div>
              );
            })}
          </div>
        </Wrap>
      </Section>
       <AtomDivider from="#ffffff" to="#ffffff" />

      {/* ============ DEADLINES ============ */}
      <Section className="!bg-white relative overflow-hidden" id="deadlines">
        <div
          className="pointer-events-none absolute top-[5%] right-[-140px] w-[400px] max-[640px]:w-[260px] h-[400px] max-[640px]:h-[260px] rounded-full blur-[110px]"
          style={{ background: `radial-gradient(circle, ${INDIGO} 0%, transparent 70%)` }}
        />
        <Wrap className="relative">
          <div className="flex flex-col items-center text-center mb-12">
            <SectionLabel>The 2026–2030 squeeze</SectionLabel>
            <h2 className="max-w-[760px] text-[34px] max-[860px]:text-[27px] max-[420px]:text-[22px] font-bold text-gray-950 leading-snug">
              The tightest run of <Shimmer>crypto deadlines</Shimmer> in history.
            </h2>
            <p className="mt-4.5 max-w-[680px] text-lg max-[420px]:text-[15px] text-slate-500 leading-relaxed">
              These milestones are dated and, increasingly, enforced through
              procurement and supervision. For banking and telecom, "we'll
              plan next year" stops being a defensible board answer in 2026.
            </p>
          </div>

          <div
            ref={timelineRef}
            className="relative max-w-[700px] mx-auto rounded-[28px] p-8 max-[640px]:p-5 max-[380px]:p-4"
            style={{
              border: "1px solid rgba(99,102,241,0.12)",
              background: "linear-gradient(165deg, rgba(186,230,253,0.12) 0%, #ffffff 35%)",
              boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 24px 60px rgba(99,102,241,0.1)",
            }}
          >
            <div className="absolute left-[49px] top-[40px] bottom-[40px] w-px overflow-hidden max-[640px]:left-[39px] max-[380px]:left-[35px]" style={{ background: "rgba(99,102,241,0.12)" }}>
              <div
                className="w-full"
                style={{
                  height: deadlinesVisible[deadlinesVisible.length - 1] ? "100%" : "0%",
                  background: `linear-gradient(180deg, ${INDIGO_SOLID}, ${INDIGO_SOLID} 45%, ${SKY_SOLID})`,
                  transition: "height 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s",
                }}
              />
            </div>

            <div className="relative">
              {deadlines.map((ev, i) => {
                const theme = ev.hot ? deadlineTheme.near : deadlineTheme.later;
                const visible = deadlinesVisible[i];
                return (
                  <div
                    key={ev.date + ev.title}
                    ref={(el) => (deadlineRefs.current[i] = el)}
                    className="relative flex min-w-0 gap-4 sm:gap-5 max-[380px]:gap-3 pb-9 last:pb-0"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateX(0)" : "translateX(-24px)",
                      transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    <div
                      className="relative z-10 shrink-0 w-11 h-11 max-[380px]:w-9 max-[380px]:h-9 rounded-full flex items-center justify-center"
                      style={{
                        background: theme.badge,
                        boxShadow: visible ? `0 0 0 6px ${theme.ring}` : `0 0 0 0px ${theme.ring}`,
                        transition: "box-shadow 0.5s ease-out 0.15s",
                      }}
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-white/90" />
                    </div>
                    <div
                      className="flex-1 min-w-0 rounded-2xl bg-white p-5 max-[380px]:p-4"
                      style={{
                        border: "1px solid rgba(99,102,241,0.1)",
                        boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 8px 22px rgba(15,23,42,0.05)",
                      }}
                    >
                      <div className="flex flex-wrap items-start gap-2 mb-1.5">
                        <span
                          className="inline-flex shrink-0 items-center rounded-full px-2.5 py-[3px] text-[10.5px] font-semibold whitespace-nowrap"
                          style={{ background: "rgba(99,102,241,0.08)", color: theme.chipText }}
                        >
                          {ev.date}
                        </span>
                        <h3 className="min-w-0 flex-1 text-[15px] max-[380px]:text-[14px] font-bold text-gray-950 leading-snug break-words">
                          <span style={{ color: theme.chipText }}>{ev.jur}</span> · {ev.title}
                        </h3>
                      </div>
                      <p className="text-[13.5px] max-[380px]:text-[12.5px] text-gray-600 leading-[1.65] break-words">{ev.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Wrap>
      </Section>
         <AtomDivider from="#ffffff" to="#ffffff" />
      {/* ============ THE GAP ============ */}
      <Section className="!bg-white relative overflow-hidden" id="gap">
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(100deg, #ffffff 0%, #ffffff 55%, ${SKY} 82%, ${INDIGO} 100%)` }}
        />
        <Wrap className="relative">
          <div className="flex flex-col items-center text-center mb-12">
            <SectionLabel>Intent vs. reality</SectionLabel>
            <h2 className="max-w-[760px] text-[34px] max-[860px]:text-[27px] max-[420px]:text-[22px] font-bold text-gray-950 leading-snug">
              Everyone plans to migrate. <Shimmer>Almost no one has.</Shimmer>
            </h2>
          </div>

          <div ref={gapRef} className="max-w-[760px] mx-auto grid grid-cols-2 gap-6 max-[640px]:grid-cols-1 max-[420px]:gap-4">
            <div
              className="min-w-0 rounded-[22px] bg-white p-6 sm:p-8 max-[380px]:p-5"
              style={{
                border: "1px solid rgba(99,102,241,0.12)",
                boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 10px 28px rgba(99,102,241,0.08)",
                opacity: gapVisible ? 1 : 0,
                transform: gapVisible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
              }}
            >
              <div className="text-[11px] font-semibold uppercase tracking-[.14em] text-gray-400">Intent</div>
              <div className="mt-3 text-[42px] sm:text-[52px] max-[380px]:text-[36px] font-bold tracking-tight leading-none" style={{ color: INDIGO_SOLID }}>
                ~60%
              </div>
              <p className="mt-4 text-[14px] sm:text-[15px] text-gray-600 leading-relaxed break-words">
                of security teams are evaluating or prototyping post quantum
                cryptography the awareness battle is won.
              </p>
            </div>

            <div
              className="min-w-0 rounded-[22px] p-6 sm:p-8 max-[380px]:p-5 text-white"
              style={{
                background: "linear-gradient(135deg, #6366F1 0%, #4338CA 100%)",
                boxShadow: "0 10px 30px rgba(99,102,241,0.35)",
                opacity: gapVisible ? 1 : 0,
                transform: gapVisible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease-out 0.12s, transform 0.6s ease-out 0.12s",
              }}
            >
              <div className="text-[11px] font-semibold uppercase tracking-[.14em] text-indigo-200">Deployed</div>
              <div className="mt-3 text-[42px] sm:text-[52px] max-[380px]:text-[36px] font-bold tracking-tight leading-none text-white">~0%</div>
              <p className="mt-4 text-[14px] sm:text-[15px] text-indigo-100/80 leading-relaxed break-words">
                hybrid PQC certificates measured across the public web the
                execution gap is the whole opportunity.
              </p>
            </div>
          </div>

          <p className="mt-8 max-w-[760px] mx-auto text-center text-base max-[420px]:text-[14px] font-medium text-gray-700 leading-relaxed">
            The gap exists because the honest options are impossible in the
            time available: rip and replace takes years institutions don't
            have.{" "}
            <span className="font-semibold" style={{ color: INDIGO_SOLID }}>
              The way to close it is to add quantum safe protection in front
              of existing systems not tear them out.
            </span>
          </p>
        </Wrap>
      </Section>
       <AtomDivider from="#ffffff" to="#ffffff" />

      {/* ============ WHO GOES FIRST ============ */}
      <Section tight className="!bg-white" id="who-goes-first">
        <Wrap>
          <div className="flex flex-col items-center text-center mb-12">
            <SectionLabel>Who goes first</SectionLabel>
            <h2 className="max-w-[760px] text-[34px] max-[860px]:text-[27px] max-[420px]:text-[22px] font-bold text-gray-950 leading-snug">
              Banking and telecom are <Shimmer>at the front of the queue.</Shimmer>
            </h2>
            <p className="mt-4.5 max-w-[680px] text-lg max-[420px]:text-[15px] text-slate-500 leading-relaxed">
              Regulators single out internet facing, globally converged
              sectors for the earliest migration and the industries have
              already organized to move.
            </p>
          </div>

          <div ref={firstRef} className="max-w-[800px] mx-auto grid grid-cols-2 gap-7 max-[860px]:grid-cols-1 max-[420px]:gap-4">
            {[
              {
                Icon: IconBank,
                iconBg: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
                title: "Banking & payments",
                body: "National guidance names financial services among the first to migrate. Payment rails, KYC and identity data carry the longest confidentiality horizons and the highest harvest now value.",
              },
              {
                Icon: IconTelecom,
                iconBg: "linear-gradient(135deg, #38BFE3 0%, #3B82F6 100%)",
                title: "Telecom & eSIM",
                body: "The GSMA Post Quantum Telco Network Taskforce 50+ companies and 20+ operators is already publishing migration guidelines for SIM, device authentication and crypto agility.",
              },
            ].map((c, i) => (
              <div
                key={c.title}
                className="min-w-0 rounded-[20px] p-6 sm:p-7 max-[380px]:p-5 bg-white transition-transform duration-300 hover:-translate-y-[3px]"
                style={{
                  border: "1px solid rgba(99,102,241,0.12)",
                  boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 10px 28px rgba(99,102,241,0.08)",
                  opacity: firstVisible ? 1 : 0,
                  transform: firstVisible ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.6s ease-out ${i * 0.12}s, transform 0.6s ease-out ${i * 0.12}s`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                  style={{ background: c.iconBg, boxShadow: "0 4px 14px rgba(99,102,241,0.3)" }}
                >
                  <c.Icon />
                </div>
                <h3 className="mt-4 font-bold text-[19px] text-gray-950 break-words">{c.title}</h3>
                <p className="mt-2 text-[14.5px] text-gray-600 leading-relaxed break-words">{c.body}</p>
              </div>
            ))}
          </div>
        </Wrap>
      </Section>
       <AtomDivider from="#ffffff" to="#ffffff" />
    </>
  );
}