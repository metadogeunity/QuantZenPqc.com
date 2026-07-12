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

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#059669" />
      <path d="M8 12.5l2.5 2.5L16 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#E11D48" />
      <path d="M9 9l6 6M15 9l-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
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
      { threshold: 0.08, rootMargin: "0px 0px -80px 0px" }
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
        { threshold: 0.06, rootMargin: "0px 0px -60px 0px" }
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach((io) => io && io.disconnect());
  }, []);
  return [refs, visible];
}

const permitted = ["Browse the website", "Read documentation", "Contact us", "Share publicly available pages"];
const notPermitted = [
  "Copy proprietary materials",
  "Reverse engineer our software",
  "Attempt unauthorized access",
  "Misrepresent affiliation with QuantZen™",
  "Use our trademarks without permission",
];

const thirdPartyTech = ["ML KEM", "ML DSA", "FALCON", "NIST standards", "TLS", "API protocols"];

const sections = [
  {
    id: "acceptance",
    number: "01",
    title: "Acceptance",
    body: [
      { type: "p", text: "By accessing the QuantZen™ website, you agree to these Terms of Use." },
      { type: "p", text: "If you do not agree, please discontinue use of the website." },
    ],
  },
  {
    id: "about-quantzen",
    number: "02",
    title: "About QuantZen™",
    body: [
      { type: "p", text: "QuantZen™ is a cybersecurity technology platform developed by Zenith Studio LLC." },
      { type: "p", text: "The website provides information about our products, technology, partnerships, research, and services." },
    ],
  },
  {
    id: "intellectual-property",
    number: "03",
    title: "Intellectual Property",
    body: [
      { type: "p", text: "Unless otherwise stated, all content including the following is the intellectual property of Zenith Studio LLC." },
      {
        type: "list",
        items: ["QuantZen™", "Logos", "Graphics", "Architecture diagrams", "Product descriptions", "Whitepapers", "Documentation", "Source materials", "Website design"],
      },
      { type: "p", text: "This content is protected by applicable copyright, trademark, and intellectual property laws." },
    ],
  },
  {
    id: "patent-notice",
    number: "04",
    title: "Patent Notice",
    body: [{ type: "patent" }],
  },
  {
    id: "permitted-use",
    number: "05",
    title: "Permitted Use",
    body: [{ type: "permission" }],
  },
  {
    id: "no-professional-advice",
    number: "06",
    title: "No Professional Advice",
    body: [
      { type: "p", text: "Information provided on this website is for informational purposes only. Nothing constitutes any of the following." },
      { type: "list", items: ["Legal advice", "Cybersecurity certification", "Regulatory compliance advice", "Investment advice"] },
      { type: "p", text: "Professional advice should be obtained where appropriate." },
    ],
  },
  {
    id: "product-information",
    number: "07",
    title: "Product Information",
    body: [
      { type: "p", text: "Descriptions of products, features, roadmaps, and future capabilities are provided for general information." },
      { type: "p", text: "Future functionality is subject to change without notice." },
    ],
  },
  {
    id: "pilot-programs",
    number: "08",
    title: "Pilot Programs",
    body: [
      { type: "p", text: "Participation in pilot programs, demonstrations, or technical evaluations is subject to separate written agreements." },
    ],
  },
  {
    id: "third-party-technologies",
    number: "09",
    title: "Third Party Technologies",
    body: [
      { type: "p", text: "QuantZen™ may reference industry standards and third party technologies, including but not limited to the following." },
      { type: "chips" },
      { type: "p", text: "All third party trademarks remain the property of their respective owners." },
    ],
  },
  {
    id: "limitation-of-liability",
    number: "10",
    title: "Limitation of Liability",
    body: [
      { type: "p", text: "To the maximum extent permitted by law, Zenith Studio LLC shall not be liable for any of the following arising from use of this website." },
      {
        type: "list",
        items: ["Indirect damages", "Consequential damages", "Business interruption", "Loss of profits", "Data loss", "Cyber incidents involving third party systems"],
      },
    ],
  },
  {
    id: "disclaimer",
    number: "11",
    title: "Disclaimer",
    body: [
      { type: "p", text: "The website is provided on an \"as is\" and \"as available\" basis. We make no warranties regarding the following." },
      { type: "list", items: ["Availability", "Accuracy", "Completeness", "Reliability", "Suitability for any purpose"] },
    ],
  },
  {
    id: "confidential-information",
    number: "12",
    title: "Confidential Information",
    body: [
      { type: "p", text: "Information submitted through contact forms does not automatically create a confidential relationship." },
      { type: "p", text: "Do not submit confidential or proprietary information unless a separate Non Disclosure Agreement, referred to as an NDA, has been executed." },
    ],
  },
  {
    id: "governing-law",
    number: "13",
    title: "Governing Law",
    body: [
      { type: "p", text: "These Terms shall be governed by the laws of the United Arab Emirates." },
      { type: "p", text: "Any disputes shall be subject to the competent courts of the Emirate of Ras Al Khaimah, unless otherwise agreed in writing." },
    ],
  },
  {
    id: "changes-to-terms",
    number: "14",
    title: "Changes to Terms",
    body: [
      { type: "p", text: "Zenith Studio LLC may revise these Terms at any time." },
      { type: "p", text: "Continued use of the website constitutes acceptance of the revised Terms." },
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
          ["Trade License No.", "17003626"],
          ["Address", "FDCW2371, Compass Building, Al Shohada Road, Al Hamra Industrial Zone FZ, Ras Al Khaimah, United Arab Emirates"],
          ["Email", "support@quantzenpqc.com"],
          ["Website", "www.quantzenpqc.com"],
        ],
      },
    ],
  },
];

function SectionBlock({ text }) {
  switch (text.type) {
    case "p":
      return <p className="text-[14px] leading-[1.75] text-gray-600">{text.text}</p>;
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
    case "patent":
      return (
        <div
          className="rounded-2xl p-5 flex flex-col gap-3 max-[480px]:p-4"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(56,131,217,0.08) 100%)",
            border: "1px solid rgba(99,102,241,0.18)",
          }}
        >
          <div className="flex items-center gap-2.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l2.4 4.86 5.36.78-3.88 3.78.92 5.34L12 14.27l-4.8 2.49.92-5.34-3.88-3.78 5.36-.78L12 2z" fill={INDIGO_SOLID} />
            </svg>
            <span className="text-[13px] font-bold uppercase tracking-[0.06em] text-indigo-700">Patent pending</span>
          </div>
          <p className="text-[14px] leading-[1.7] text-gray-700">
            Certain technologies described on this website are the subject of pending patent applications, including
            Indian Patent Application No. 202641078837.
          </p>
          <p className="text-[13.5px] leading-[1.7] text-gray-600">
            Nothing contained on this website grants any license to use patented technology.
          </p>
        </div>
      );
    case "permission":
      return (
        <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(5,150,105,0.05)", border: "1px solid rgba(5,150,105,0.18)" }}
          >
            <h4 className="text-[13px] font-bold uppercase tracking-[0.06em] text-emerald-700 mb-3">You may</h4>
            <ul className="flex flex-col gap-2.5">
              {permitted.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-[1px] shrink-0"><CheckIcon /></span>
                  <span className="text-[13.5px] leading-[1.6] text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(225,29,72,0.05)", border: "1px solid rgba(225,29,72,0.16)" }}
          >
            <h4 className="text-[13px] font-bold uppercase tracking-[0.06em] text-rose-700 mb-3">You may not</h4>
            <ul className="flex flex-col gap-2.5">
              {notPermitted.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-[1px] shrink-0"><CrossIcon /></span>
                  <span className="text-[13.5px] leading-[1.6] text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    case "chips":
      return (
        <div className="flex flex-wrap gap-2.5">
          {thirdPartyTech.map((tech) => (
            <span
              key={tech}
              className="rounded-full px-3.5 py-[7px] text-[12.5px] font-semibold text-indigo-700"
              style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)" }}
            >
              {tech}
            </span>
          ))}
        </div>
      );
    default:
      return null;
  }
}

function TermsSection({ section, innerRef, visible }) {
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

export default function TermsOfUse() {
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
      <PageMeta title="Terms of Use" />

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
            <GradientHeading highlight="Terms of Use">The agreement behind your</GradientHeading>
            <p className="mt-4.5 max-w-[680px] text-lg text-slate-500 leading-relaxed">
              These Terms govern your use of the QuantZen™ website, operated by Zenith Studio LLC.
              Please read them carefully before browsing our platform, documentation, or requesting a demo.
            </p>
            <span
              className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-[7px] text-[12.5px] font-mono text-slate-500"
              style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.14)" }}
            >
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
                <TermsSection
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
                  <h4 className="text-white text-[16px] font-bold mb-1">Questions about these Terms?</h4>
                  <p className="text-white/80 text-[13.5px]">Reach out and our team will clarify anything you need.</p>
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