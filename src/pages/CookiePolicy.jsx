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

function CookieIcon({ color = "#fff" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2.5c-.4 1.4-1.7 2.3-3.1 2-.3 1.4-1.6 2.3-3 2.1.1 1.4-.9 2.6-2.3 2.7A9.5 9.5 0 1 0 21.5 12c-1.4.4-2.9-.4-3.3-1.8-1.4.3-2.7-.6-2.9-2-1.4.4-2.9-.4-3.3-1.8v-3.9z"
        stroke={color}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="11.2" r="1.1" fill={color} />
      <circle cx="13.5" cy="9.2" r="1" fill={color} />
      <circle cx="14.5" cy="14.5" r="1.15" fill={color} />
      <circle cx="9.5" cy="16.5" r="0.9" fill={color} />
    </svg>
  );
}

function ShieldLockIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <rect x="9.3" y="11.2" width="5.4" height="4.2" rx="1" stroke={color} strokeWidth="1.7" />
      <path d="M10.3 11.2v-1.4a1.7 1.7 0 013.4 0v1.4" stroke={color} strokeWidth="1.7" />
    </svg>
  );
}

function ChartIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 20V10M10 20V4M16 20v-7M20 20H4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SlidersIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M5 6h14M5 12h14M5 18h14" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="9" cy="6" r="2" fill="#fff" stroke={color} strokeWidth="1.7" />
      <circle cx="16" cy="12" r="2" fill="#fff" stroke={color} strokeWidth="1.7" />
      <circle cx="11" cy="18" r="2" fill="#fff" stroke={color} strokeWidth="1.7" />
    </svg>
  );
}

function LinkIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M9.5 14.5l5-5" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M11 7.5l1.1-1.1a3.5 3.5 0 015 5L16 12.5M13 16.5l-1.1 1.1a3.5 3.5 0 01-5-5L8 11.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

const cookieTypes = [
  {
    icon: ShieldLockIcon,
    gradient: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
    tag: "Always active",
    tagStyle: { background: "rgba(99,102,241,0.1)", color: "#4338CA" },
    title: "Essential cookies",
    body: "Required for the website to function. These cover security, session management, and page navigation, and cannot be switched off.",
    items: ["Security", "Session management", "Page navigation"],
    locked: true,
  },
  {
    icon: ChartIcon,
    gradient: "linear-gradient(135deg, #38BFE3 0%, #3B82F6 100%)",
    tag: "Optional",
    tagStyle: { background: "rgba(56,131,217,0.1)", color: "#1D4ED8" },
    title: "Analytics cookies",
    body: "Help us understand how the site is used, so we can improve performance and content over time.",
    items: ["Pages visited", "Time spent", "Traffic sources", "Browser information"],
    locked: false,
  },
  {
    icon: SlidersIcon,
    gradient: "linear-gradient(135deg, #818CF8 0%, #6366F1 100%)",
    tag: "Optional",
    tagStyle: { background: "rgba(99,102,241,0.1)", color: "#4338CA" },
    title: "Functional cookies",
    body: "Remember choices you've made so the site feels the same each time you return.",
    items: ["Language", "Region", "Form preferences"],
    locked: false,
  },
];

const thirdParties = [
  { name: "Google Analytics", desc: "Site usage & traffic analytics" },
  { name: "Microsoft Clarity", desc: "Behavior & session insights" },
  { name: "LinkedIn Insight Tag", desc: "Campaign performance tracking" },
];

/* ---------- page ---------- */

export default function CookiePolicy() {
  const [introRef, introVisible] = useReveal();
  const [typesRef, typesVisible] = useRevealList(cookieTypes.length);
  const [tpRef, tpVisible] = useReveal();
  const [manageRef, manageVisible] = useReveal();
  const [contactRef, contactVisible] = useReveal();

  return (
    <>
      <PageMeta title="Cookie Policy" />

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
            <SectionLabel>Legal · Effective July 2026</SectionLabel>
            <h1 className="max-w-[760px] text-[34px] max-[860px]:text-[27px] font-bold text-gray-950 leading-snug">
              How{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
                  backgroundSize: "200% auto",
                  animation: "shimmer 3s linear infinite",
                }}
              >
                cookies
              </span>{" "}
              work on QuantZen™.
            </h1>
            <p className="mt-4.5 max-w-[680px] text-lg text-slate-500 leading-relaxed">
              This policy explains how Zenith Studio LLC ("QuantZen™", "we", "our", or "us")
              uses cookies and similar technologies on{" "}
              <a
                href="https://www.quantzenpqc.com"
                className="font-semibold text-gray-800 underline decoration-indigo-300 underline-offset-2 hover:text-indigo-600"
              >
                www.quantzenpqc.com
              </a>
              . By continuing to use our website, you consent to this policy unless
              you disable cookies through your browser settings.
            </p>
          </div>
        </Wrap>
      </Section>

      {/* ── What are cookies ── */}
      <Section tight className="!bg-white">
        <Wrap>
          <div
            className="max-w-[820px] mx-auto rounded-[24px] p-7 max-[640px]:p-5 flex items-start gap-5"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(186,230,253,0.14) 100%)",
              border: "1px solid rgba(99,102,241,0.12)",
            }}
          >
            <div
              className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #6366F1 0%, #38BFE3 100%)", boxShadow: "0 4px 14px rgba(99,102,241,0.3)" }}
            >
              <CookieIcon />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-gray-950 mb-1.5">What are cookies?</h2>
              <p className="text-[13.5px] text-gray-600 leading-[1.7]">
                Cookies are small text files stored on your device when you visit a website.
                They help websites remember preferences, improve performance, and provide
                analytics small pieces of memory that make the site work better for you.
              </p>
            </div>
          </div>
        </Wrap>
      </Section>

      {/* ── Cookie types ── */}
      <Section className="!bg-white relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(100deg, #ffffff 0%, #ffffff 55%, ${SKY} 82%, ${INDIGO} 100%)` }}
        />
        <Wrap className="relative">
          <div className="flex flex-col items-center text-center mb-12">
            <SectionLabel>The cookies we use</SectionLabel>
            <h2 className="max-w-[760px] text-[34px] max-[860px]:text-[27px] font-bold text-gray-950 leading-snug">
              Three{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
                  backgroundSize: "200% auto",
                  animation: "shimmer 3s linear infinite",
                }}
              >
                categories
              </span>{" "}
              of cookies, one is optional twice over.
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-1 max-w-[1000px] mx-auto">
            {cookieTypes.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  ref={(el) => (typesRef.current[i] = el)}
                  className="rounded-[22px] bg-white p-6 flex flex-col transition-transform duration-300 hover:-translate-y-[3px]"
                  style={{
                    border: "1px solid rgba(99,102,241,0.1)",
                    boxShadow: "0 1px 3px rgba(15,23,42,0.05), 0 12px 30px rgba(99,102,241,0.08)",
                    opacity: typesVisible[i] ? 1 : 0,
                    transform: typesVisible[i] ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center"
                      style={{ background: c.gradient, boxShadow: "0 4px 14px rgba(99,102,241,0.28)" }}
                    >
                      <Icon color="#fff" />
                    </div>
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-[5px] text-[11px] font-semibold whitespace-nowrap"
                      style={c.tagStyle}
                    >
                      {c.locked && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                          <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="2.4" />
                          <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="2.4" />
                        </svg>
                      )}
                      {c.tag}
                    </span>
                  </div>

                  <h3 className="text-[16.5px] font-bold text-gray-950 mb-1.5 leading-snug">{c.title}</h3>
                  <p className="text-[13px] text-gray-600 leading-[1.65] mb-4">{c.body}</p>

                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {c.items.map((it) => (
                      <span
                        key={it}
                        className="text-[11.5px] font-medium rounded-full px-2.5 py-[4px]"
                        style={{ background: "rgba(99,102,241,0.06)", color: "#4338CA" }}
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Wrap>
      </Section>

      {/* ── Third-party cookies ── */}
      <Section className="!bg-white">
        <Wrap>
          <div className="flex flex-col items-center text-center mb-10">
            <SectionLabel>Third party cookies</SectionLabel>
            <h2 className="max-w-[700px] text-[28px] max-[860px]:text-[23px] font-bold text-gray-950 leading-snug">
              Trusted partners we work with
            </h2>
            <p className="mt-3 max-w-[600px] text-[15px] text-slate-500 leading-relaxed">
              We may use trusted third party services to help us understand and improve the
              site. Each provider maintains its own privacy policy.
            </p>
          </div>

          <div
            ref={tpRef}
            className="max-w-[820px] mx-auto grid grid-cols-3 gap-5 max-[720px]:grid-cols-1"
            style={{
              opacity: tpVisible ? 1 : 0,
              transform: tpVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            {thirdParties.map((p) => (
              <div
                key={p.name}
                className="rounded-2xl p-5 flex flex-col gap-3 transition-transform duration-300 hover:-translate-y-[2px]"
                style={{ background: "#F1ECFF", border: "1px solid rgba(99,102,241,0.1)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(99,102,241,0.12)" }}
                >
                  <LinkIcon color={INDIGO_SOLID} />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-gray-950 leading-snug">{p.name}</h3>
                  <p className="text-[12.5px] text-gray-600 mt-0.5 leading-[1.5]">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ── Managing cookies ── */}
      <Section tight className="!bg-white relative overflow-hidden">
        <div
          className="pointer-events-none absolute top-[10%] right-[-140px] w-[380px] h-[380px] rounded-full blur-[110px]"
          style={{ background: `radial-gradient(circle, ${INDIGO} 0%, transparent 70%)` }}
        />
        <Wrap className="relative">
          <div
            ref={manageRef}
            className="max-w-[820px] mx-auto rounded-[24px] p-7 max-[640px]:p-5 flex items-start gap-5"
            style={{
              border: "1px solid rgba(186,230,253,0.7)",
              background: "rgba(186,230,253,0.14)",
              opacity: manageVisible ? 1 : 0,
              transform: manageVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            <div
              className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #60D5F5 0%, #6366F1 100%)", boxShadow: "0 4px 14px rgba(56,131,217,0.3)" }}
            >
              <SlidersIcon color="#fff" />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-gray-950 mb-1.5">Managing your cookies</h2>
              <p className="text-[13.5px] text-gray-600 leading-[1.7]">
                You can disable cookies at any time from your browser settings. Essential
                cookies keep the site secure and functional, so disabling some cookies
                particularly analytics or functional ones may affect how parts of the
                website work for you.
              </p>
            </div>
          </div>
        </Wrap>
      </Section>

      {/* ── Contact ── */}
      <Section className="!bg-white">
        <Wrap>
          <div
            ref={contactRef}
            className="max-w-[560px] mx-auto rounded-[24px] p-8 max-[640px]:p-6 text-center"
            style={{
              background: "linear-gradient(135deg, #6366F1 0%, #38BFE3 100%)",
              boxShadow: "0 20px 50px rgba(99,102,241,0.25)",
              opacity: contactVisible ? 1 : 0,
              transform: contactVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            <div
              className="mx-auto w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "rgba(255,255,255,0.18)" }}
            >
              <MailIcon color="#fff" />
            </div>
            <h2 className="text-[19px] font-bold text-white mb-1.5">Questions about this policy?</h2>
            <p className="text-[13.5px] text-white/85 leading-[1.6] mb-5">
              Zenith Studio LLC reach out and we'll get back to you.
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