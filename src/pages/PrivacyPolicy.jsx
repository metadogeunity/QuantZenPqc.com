import { useEffect, useRef, useState } from "react";
import PageMeta from "../components/PageMeta";
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
      className="inline-flex items-center gap-[7px] text-[11px] font-semibold uppercase tracking-[.14em] rounded-full px-4 py-[6px] mb-5"
      style={eyebrowStyle}
    >
      <span className="w-[5px] h-[5px] rounded-full" style={{ background: INDIGO_SOLID }} />
      {children}
    </span>
  );
}

function GradientHeading({ children, highlight }) {
  return (
    <h2 className="max-w-[760px] text-[34px] max-[860px]:text-[27px] font-bold text-gray-950 leading-snug">
      {children}{" "}
      <span
        className="bg-clip-text text-transparent"
        style={{
          backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
          backgroundSize: "200% auto",
          animation: "shimmer 3s linear infinite",
        }}
      >
        {highlight}
      </span>
    </h2>
  );
}

function Dot() {
  return (
    <span
      className="mt-[9px] shrink-0 w-[6px] h-[6px] rounded-full"
      style={{ background: "linear-gradient(135deg, #6366F1 0%, #38BFE3 100%)" }}
    />
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
      { threshold: 0.08, rootMargin: "0px 0px -80px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

const sections = [
  {
    id: "introduction",
    number: "01",
    title: "Introduction",
    body: [
      { type: "p", text: "Welcome to QuantZen™, a product developed by Zenith Studio LLC, a company incorporated in the United Arab Emirates." },
      { type: "p", text: "QuantZen™ is committed to protecting your privacy and handling your personal information responsibly. This Privacy Policy explains how we collect, use, disclose, and protect information when you visit our website or communicate with us." },
      { type: "p", text: "By accessing our website, you agree to the practices described in this Privacy Policy." },
    ],
  },
  {
    id: "company-information",
    number: "02",
    title: "Company Information",
    body: [
      {
        type: "info",
        rows: [
          ["Company", "Zenith Studio LLC"],
          ["Trade License No.", "17003626"],
          ["Jurisdiction", "RAKEZ, Ras Al Khaimah Economic Zone, United Arab Emirates"],
          ["Email", "support@quantzenpqc.com"],
          ["Website", "www.quantzenpqc.com"],
        ],
      },
    ],
  },
  {
    id: "information-we-collect",
    number: "03",
    title: "Information We Collect",
    body: [
      { type: "sub", text: "Personal information" },
      {
        type: "list",
        items: ["Name", "Company name", "Job title", "Email address", "Phone number", "Country", "Information submitted through contact forms"],
      },
      { type: "sub", text: "Technical information" },
      { type: "p", text: "When you visit our website we may automatically collect the following." },
      {
        type: "list",
        items: ["IP address", "Browser type", "Device information", "Operating system", "Pages visited", "Time spent on pages", "Referring website", "Cookies and analytics information"],
      },
    ],
  },
  {
    id: "how-we-use-information",
    number: "04",
    title: "How We Use Your Information",
    body: [
      { type: "p", text: "We use the information we collect to:" },
      {
        type: "list",
        items: [
          "Respond to inquiries",
          "Schedule product demonstrations",
          "Process partnership requests",
          "Provide technical information",
          "Improve website performance",
          "Analyze website traffic",
          "Send product updates, only where permitted",
          "Protect our services from abuse",
          "Comply with applicable laws",
        ],
      },
    ],
  },
  {
    id: "cookies",
    number: "05",
    title: "Cookies",
    body: [
      { type: "p", text: "Our website may use cookies to:" },
      {
        type: "list",
        items: ["Remember preferences", "Improve user experience", "Analyze website traffic", "Maintain website security"],
      },
      { type: "p", text: "You may disable cookies through your browser settings." },
    ],
  },
  {
    id: "enterprise-communications",
    number: "06",
    title: "Enterprise Communications",
    body: [
      { type: "p", text: "If you request any of the following:" },
      { type: "list", items: ["Product demonstrations", "Pilot programs", "Technical documentation", "SDK access"] },
      { type: "p", text: "we may retain your business contact information for future communications." },
    ],
  },
  {
    id: "information-sharing",
    number: "07",
    title: "Information Sharing",
    body: [
      { type: "p", text: "We do not sell personal information. Information may only be shared under the following circumstances." },
      {
        type: "list",
        items: [
          "With service providers supporting our operations",
          "Where required by law",
          "During mergers or acquisitions",
          "To protect our legal rights",
        ],
      },
    ],
  },
  {
    id: "data-security",
    number: "08",
    title: "Data Security",
    body: [
      { type: "p", text: "We implement reasonable administrative, technical, and organizational safeguards designed to protect information against unauthorized access, disclosure, alteration, or destruction." },
      { type: "p", text: "No internet transmission can be guaranteed to be completely secure." },
    ],
  },
  {
    id: "international-transfers",
    number: "09",
    title: "International Transfers",
    body: [
      { type: "p", text: "Your information may be processed in jurisdictions where QuantZen™ operates or where our service providers maintain infrastructure." },
    ],
  },
  {
    id: "data-retention",
    number: "10",
    title: "Data Retention",
    body: [
      { type: "p", text: "We retain information only for as long as necessary to:" },
      {
        type: "list",
        items: ["Provide requested services", "Meet legal obligations", "Resolve disputes", "Enforce agreements"],
      },
    ],
  },
  {
    id: "your-rights",
    number: "11",
    title: "Your Rights",
    body: [
      { type: "p", text: "Depending on applicable law, you may request to:" },
      {
        type: "list",
        items: ["Access your information", "Correct inaccurate information", "Delete personal information", "Restrict processing", "Withdraw consent where applicable"],
      },
      { type: "p", text: "Requests may be sent to support@quantzenpqc.com." },
    ],
  },
  {
    id: "third-party-services",
    number: "12",
    title: "Third Party Services",
    body: [
      { type: "p", text: "Our website may contain links to third party websites. We are not responsible for their privacy practices." },
    ],
  },
  {
    id: "childrens-privacy",
    number: "13",
    title: "Children's Privacy",
    body: [
      { type: "p", text: "QuantZen™ does not knowingly collect personal information from children under 18 years of age." },
    ],
  },
  {
    id: "changes-to-policy",
    number: "14",
    title: "Changes to This Policy",
    body: [
      { type: "p", text: "We may update this Privacy Policy periodically. The updated version will always be available on this page." },
    ],
  },
  {
    id: "contact",
    number: "15",
    title: "Contact",
    body: [
      {
        type: "info",
        rows: [
          ["Company", "Zenith Studio LLC"],
          ["Trade License", "17003626"],
          ["Jurisdiction", "Ras Al Khaimah Economic Zone, United Arab Emirates"],
          ["Email", "support@quantzenpqc.com"],
        ],
      },
    ],
  },
];

function SectionBlock({ text }) {
  switch (text.type) {
    case "p":
      return <p className="text-[14px] leading-[1.75] text-gray-600">{text.text}</p>;
    case "sub":
      return <h4 className="text-[13px] font-bold uppercase tracking-[0.08em] text-indigo-600 mt-1">{text.text}</h4>;
    case "list":
      return (
        <ul className="flex flex-col gap-2.5">
          {text.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Dot />
              <span className="text-[14px] leading-[1.65] text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "info":
      return (
        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(99,102,241,0.14)" }}>
          {text.rows.map(([label, value], i) => (
            <div
              key={label}
              className="flex flex-wrap gap-1 sm:gap-6 px-5 py-3.5 text-[13.5px]"
              style={{
                background: i % 2 === 0 ? "rgba(99,102,241,0.035)" : "#ffffff",
                borderTop: i === 0 ? "none" : "1px solid rgba(99,102,241,0.08)",
              }}
            >
              <span className="w-full sm:w-[170px] shrink-0 font-semibold text-gray-800">{label}</span>
              <span className="text-gray-600 break-words">{value}</span>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

function PolicySection({ section, innerRef, visible }) {
  return (
    <div
      id={section.id}
      ref={innerRef}
      className="scroll-mt-28 rounded-[24px] bg-white p-7 max-[640px]:p-5 flex flex-col gap-4"
      style={{
        border: "1px solid rgba(99,102,241,0.12)",
        boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 14px 34px rgba(99,102,241,0.07)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div className="flex items-center gap-3.5">
        <span
          className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-[12.5px] font-bold text-white"
          style={{ background: "linear-gradient(135deg, #6366F1 0%, #38BFE3 100%)", boxShadow: "0 4px 14px rgba(99,102,241,0.28)" }}
        >
          {section.number}
        </span>
        <h3 className="text-[18px] font-bold text-gray-950 leading-snug">{section.title}</h3>
      </div>
      <div className="flex flex-col gap-3.5 pl-[3px]">
        {section.body.map((block, i) => (
          <SectionBlock key={i} text={block} />
        ))}
      </div>
    </div>
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
        { threshold: 0.06, rootMargin: "0px 0px -60px 0px" }
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach((io) => io && io.disconnect());
  }, []);
  return [refs, visible];
}

export default function PrivacyPolicy() {
  const [introRef, introVisible] = useReveal();
  const [sectionRefs, sectionsVisible] = useRevealList(sections.length);
  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [sectionRefs]);

  return (
    <>
      <PageMeta title="Privacy Policy" />

      {/* Intro */}
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
            <SectionLabel>Legal</SectionLabel>
            <GradientHeading highlight="Privacy Policy">How we handle your</GradientHeading>
            <p className="mt-4.5 max-w-[680px] text-lg text-slate-500 leading-relaxed">
              QuantZen™ is built by Zenith Studio LLC to protect information the way it protects
              every request that passes through it. This page explains what we collect, why we
              collect it, and the choices you have.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-[7px] text-[12.5px] font-mono text-slate-500" style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.14)" }}>
              Effective Date: July 2026
            </span>
          </div>
        </Wrap>
      </Section>

      {/* Content */}
      <Section tight className="!bg-white relative">
        <Wrap>
          <div className="flex gap-10 max-[960px]:flex-col">
            {/* Sticky table of contents */}
            <aside className="w-[240px] shrink-0 max-[960px]:w-full">
              <div className="sticky top-24 max-[960px]:static">
                <div
                  className="rounded-[20px] p-5 max-[960px]:p-4"
                  style={{
                    border: "1px solid rgba(99,102,241,0.14)",
                    background: "linear-gradient(165deg, rgba(186,230,253,0.14) 0%, #ffffff 45%)",
                  }}
                >
                  <h5 className="mb-3 font-mono text-[11px] tracking-[0.12em] text-slate-400 uppercase">On this page</h5>
                  <nav className="flex flex-col max-[960px]:flex-row max-[960px]:flex-wrap gap-1 max-[960px]:gap-2 max-h-[420px] max-[960px]:max-h-none overflow-y-auto pr-1">
                    {sections.map((s) => {
                      const active = activeId === s.id;
                      return (
                        <a
                          key={s.id}
                          href={`#${s.id}`}
                          className="rounded-lg px-3 py-[7px] text-[13px] leading-snug transition-colors max-[960px]:px-2.5 max-[960px]:py-1.5"
                          style={{
                            color: active ? INDIGO_SOLID : "#475569",
                            background: active ? "rgba(99,102,241,0.08)" : "transparent",
                            fontWeight: active ? 600 : 500,
                          }}
                        >
                          <span className="text-slate-400 font-mono text-[11px] mr-1.5">{s.number}</span>
                          {s.title}
                        </a>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </aside>

            {/* Sections */}
            <div className="flex-1 min-w-0 flex flex-col gap-6">
              {sections.map((section, i) => (
                <PolicySection
                  key={section.id}
                  section={section}
                  innerRef={(el) => (sectionRefs.current[i] = el)}
                  visible={sectionsVisible[i]}
                />
              ))}

              {/* Closing note */}
              <div
                className="rounded-[24px] p-7 max-[640px]:p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between"
                style={{
                  background: `linear-gradient(135deg, ${INDIGO_SOLID} 0%, ${SKY_SOLID} 100%)`,
                }}
              >
                <div>
                  <h4 className="text-white text-[16px] font-bold mb-1">Have a question about this policy?</h4>
                  <p className="text-white/80 text-[13.5px]">We are happy to walk you through how your data is handled.</p>
                </div>
                <a
                  href="mailto:support@quantzenpqc.com"
                  className="inline-flex items-center justify-center shrink-0 rounded-[10px] px-5 py-[10px] bg-white text-[13.5px] font-semibold text-indigo-600 no-underline whitespace-nowrap"
                >
                  support@quantzenpqc.com
                </a>
              </div>
            </div>
          </div>
        </Wrap>
      </Section>
    </>
  );
}