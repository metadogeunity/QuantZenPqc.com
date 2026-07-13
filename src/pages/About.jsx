import PageMeta from "../components/PageMeta";
import Eyebrow from "../components/Eyebrow";
import Wrap from "../components/Wrap";
import Section from "../components/Section";
import AtomDivider from "../components/AtomDivider";

const valueMissionCards = [
  {
    title: "Vision",
    body: "A digital economy whose critical communications remain confidential and verifiable for their entire lifetime regardless of advances in computing.",
  },
  {
    title: "Mission",
    body: "To make post quantum protection deployable on the infrastructure organizations already run, removing cost, disruption, and risk as barriers to migration.",
  },
  {
    title: "Technology focus",
    body: "Standardized post quantum cryptography applied at the API layer: interception, authentication, key establishment, verification, agility, and immutable audit.",
  },
  {
    title: "Long term objective",
    body: "To become the trust layer for quantum resilient digital communications the dependable boundary through which critical API traffic is protected.",
  },
];

const disciplines = [
  {
    code: "PQ",
    title: "Post quantum cryptography",
    body: "Applying NIST standardized lattice based algorithms to real production traffic, with the agility to adopt what comes next.",
  },
  {
    code: "AS",
    title: "API security",
    body: "Protecting the interface layer where modern systems actually exchange value, identity, and instruction.",
  },
  {
    code: "CI",
    title: "Critical infrastructure protection",
    body: "Hardening the financial, telecom, and government systems whose continuity the economy depends on.",
  },
  {
    code: "EC",
    title: "Enterprise cybersecurity",
    body: "Meeting the deployment, governance, auditability, and compliance demands of regulated organizations.",
  },
];

// Faint lattice-point grid — a quiet nod to lattice-based cryptography,
// the mathematical foundation of the post-quantum algorithms QuantZen deploys.
function LatticeField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(79,70,229,0.16) 1px, transparent 0)",
        backgroundSize: "28px 28px",
        WebkitMaskImage:
          "radial-gradient(60% 60% at 50% 20%, black 0%, transparent 75%)",
        maskImage:
          "radial-gradient(60% 60% at 50% 20%, black 0%, transparent 75%)",
      }}
    />
  );
}

export default function About() {
  return (
    <>
      <PageMeta title="About" />

      <Section className="bg-white">
        <Wrap>
          <div className="relative overflow-hidden bg-white px-6 py-20 sm:px-10">
            <LatticeField />

            <div className="relative mx-auto max-w-[720px] text-center">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-indigo-500">
                About QuantZen
              </span>
              <h2 className="mx-auto mt-4 max-w-[600px] text-[34px] font-semibold leading-[1.2] tracking-tight text-slate-900 max-[860px]:text-[27px]">
                A trust layer for{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)", backgroundSize: "200% auto", animation: "shimmer 3s linear infinite" }}>
                quantum resilient
               </span>{" "}
                communication.
              </h2>
              <p className="mx-auto mt-5 max-w-[600px] text-lg leading-relaxed text-slate-500">
                QuantZen™ is an enterprise cybersecurity company building the
                cryptographic infrastructure that keeps API driven systems
                trustworthy through the quantum transition and beyond.
              </p>
            </div>

            {/* Pillar cards */}
            <div className="relative mx-auto mt-12 grid max-w-[900px] grid-cols-2 gap-5 max-[860px]:grid-cols-1">
              {valueMissionCards.map((c) => (
                <div
                  key={c.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-colors duration-200 hover:border-indigo-300"
                >
                  <h3 className="pl-4 font-mono text-[12px] font-semibold uppercase tracking-[0.08em] text-indigo-600">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Wrap>
      </Section>
    <AtomDivider from="#ffffff" to="#ffffff" />
      <Section className="bg-white">
        <Wrap>
          <div className="bg-transparent px-6 py-20 sm:px-10">
            <div className="mx-auto max-w-[720px] text-center">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-indigo-500">
                What we focus on
              </span>
              <h2 className="mx-auto mt-4 max-w-[520px] text-[34px] font-semibold leading-[1.2] tracking-tight text-slate-900 max-[860px]:text-[27px]">
                Four disciplines, one{" "}
                 <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)", backgroundSize: "200% auto", animation: "shimmer 3s linear infinite" }}>
                purpose
               </span>{" "}
                .
              </h2>
            </div>
            <div className="mx-auto mt-10 max-w-[820px] border-t border-slate-200">
              {disciplines.map((d) => (
                <div
                  key={d.title}
                  className="grid grid-cols-[56px_1fr] gap-6 border-b border-slate-200 py-7 max-[560px]:grid-cols-[40px_1fr] max-[560px]:gap-4"
                >
                  <span className="mt-0.5 flex h-7 w-10 items-center justify-center rounded-md border border-indigo-200 bg-indigo-50 font-mono text-[11px] font-semibold tracking-wide text-indigo-600">
                    {d.code}
                  </span>
                  <div>
                    <h3 className="text-[19px] font-semibold text-slate-900">
                      {d.title}
                    </h3>
                    <p className="mt-2 max-w-[600px] text-[15px] leading-relaxed text-slate-600">
                      {d.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Wrap>
      </Section>
    </>
  );
}