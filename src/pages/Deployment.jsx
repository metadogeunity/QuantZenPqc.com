import PageMeta from "../components/PageMeta";
import Eyebrow from "../components/Eyebrow";
import Wrap from "../components/Wrap";
import Section from "../components/Section";

const deploymentModels = [
  { title: "On-premise", body: "Deploy entirely within your own data centers for full sovereignty over keys and traffic.", size: "col-span-4" },
  { title: "Private cloud", body: "Run within a dedicated private cloud tenancy alongside your existing services.", size: "col-span-2" },
  { title: "Hybrid cloud", body: "Protect traffic spanning on premise cores and public cloud services with one consistent policy.", size: "col-span-3" },
  { title: "Containerized", body: "Ship as a container image and run beside your services as a sidecar or gateway.", size: "col-span-3" },
];

const pipelineSteps = [
  { num: "01", title: "Assessment", body: "Map gateways, protocols, and payload formats; identify the highest value traffic to protect first." },
  { num: "02", title: "Integration", body: "Place the QuantZen layer at the boundary and connect to your existing gateway  no app changes." },
  { num: "03", title: "Testing", body: "Validate interception, signing, verification, and audit against real request formats and SLAs." },
  { num: "04", title: "Pilot", body: "Run a ring fenced subset of live traffic, measuring performance and operational impact." },
  { num: "05", title: "Production", body: "Expand coverage by policy across domains and routes at your pace." },
];

const guarantees = [
  { title: "No application changes", body: "Your codebase, schemas, and UI logic are never modified." },
  { title: "No API gateway changes", body: "Your gateway configuration and routing remain intact." },
  { title: "Minimal operational disruption", body: "Incremental, reversible rollout with measurable checkpoints." },
];

const serverIcon = (
  <svg width="100" height="108" viewBox="0 0 100 108" fill="none">
    <rect x="4" y="4" width="92" height="22" rx="6" fill="rgba(99,102,241,0.08)" stroke="rgba(99,102,241,0.3)" strokeWidth="1.2"/>
    <circle cx="16" cy="15" r="4" fill="#6366f1" fillOpacity=".6"/>
    <circle cx="28" cy="15" r="4" fill="#818cf8" fillOpacity=".4"/>
    <rect x="72" y="10" width="16" height="10" rx="3" fill="rgba(99,102,241,0.2)"/>
    <circle cx="66" cy="15" r="2.5" fill="#22c55e" fillOpacity=".9"/>
    <rect x="4" y="34" width="92" height="22" rx="6" fill="rgba(129,140,248,0.07)" stroke="rgba(129,140,248,0.25)" strokeWidth="1.2"/>
    <circle cx="16" cy="45" r="4" fill="#818cf8" fillOpacity=".6"/>
    <circle cx="28" cy="45" r="4" fill="#6366f1" fillOpacity=".4"/>
    <rect x="72" y="40" width="16" height="10" rx="3" fill="rgba(129,140,248,0.2)"/>
    <circle cx="66" cy="45" r="2.5" fill="#22c55e" fillOpacity=".9"/>
    <rect x="4" y="64" width="92" height="22" rx="6" fill="rgba(125,211,252,0.07)" stroke="rgba(125,211,252,0.25)" strokeWidth="1.2"/>
    <circle cx="16" cy="75" r="4" fill="#7dd3fc" fillOpacity=".6"/>
    <circle cx="28" cy="75" r="4" fill="#818cf8" fillOpacity=".4"/>
    <rect x="72" y="70" width="16" height="10" rx="3" fill="rgba(125,211,252,0.2)"/>
    <circle cx="66" cy="75" r="2.5" fill="#22c55e" fillOpacity=".9"/>
    <rect x="4" y="94" width="92" height="10" rx="3" fill="rgba(99,102,241,0.05)" stroke="rgba(99,102,241,0.15)" strokeWidth="1"/>
    <line x1="50" y1="26" x2="50" y2="34" stroke="#6366f1" strokeWidth="1" strokeDasharray="2,2" opacity=".4"/>
    <line x1="50" y1="56" x2="50" y2="64" stroke="#818cf8" strokeWidth="1" strokeDasharray="2,2" opacity=".4"/>
    <line x1="50" y1="86" x2="50" y2="94" stroke="#7dd3fc" strokeWidth="1" strokeDasharray="2,2" opacity=".4"/>
  </svg>
);

const globeIcon = (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="40" r="30" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
    <ellipse cx="40" cy="40" rx="30" ry="14" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
    <ellipse cx="40" cy="40" rx="30" ry="14" stroke="rgba(255,255,255,0.18)" strokeWidth="1" transform="rotate(60 40 40)"/>
    <ellipse cx="40" cy="40" rx="30" ry="14" stroke="rgba(255,255,255,0.18)" strokeWidth="1" transform="rotate(120 40 40)"/>
    <line x1="10" y1="40" x2="70" y2="40" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
    <line x1="40" y1="10" x2="40" y2="70" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
    <circle cx="40" cy="40" r="5" fill="rgba(255,255,255,0.35)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2"/>
  </svg>
);

const hybridIcon = (
  <svg width="110" height="80" viewBox="0 0 110 80" fill="none">
    <rect x="2" y="18" width="38" height="44" rx="10" fill="rgba(99,102,241,0.1)" stroke="#6366f1" strokeWidth="1.2"/>
    <circle cx="21" cy="36" r="7" fill="rgba(99,102,241,0.18)" stroke="#6366f1" strokeWidth="1"/>
    <rect x="9" y="48" width="24" height="4" rx="2" fill="rgba(99,102,241,0.22)"/>
    <rect x="70" y="18" width="38" height="44" rx="10" fill="rgba(125,211,252,0.12)" stroke="#7dd3fc" strokeWidth="1.2"/>
    <circle cx="89" cy="36" r="7" fill="rgba(125,211,252,0.2)" stroke="#7dd3fc" strokeWidth="1"/>
    <rect x="77" y="48" width="24" height="4" rx="2" fill="rgba(125,211,252,0.25)"/>
    <path d="M40 40 C52 40 58 40 70 40" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="5,3" fill="none"/>
    <circle cx="55" cy="40" r="6" fill="rgba(99,102,241,0.08)" stroke="#818cf8" strokeWidth="1" strokeDasharray="3,2"/>
  </svg>
);

const containerIcon = (
  <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
    <rect x="4" y="4" width="42" height="32" rx="8" fill="rgba(99,102,241,0.08)" stroke="#6366f1" strokeWidth="1.2"/>
    <circle cx="18" cy="18" r="6" fill="rgba(99,102,241,0.18)" stroke="#6366f1" strokeWidth="1"/>
    <rect x="27" y="13" width="13" height="3" rx="1.5" fill="rgba(99,102,241,0.28)"/>
    <rect x="54" y="4" width="42" height="32" rx="8" fill="rgba(129,140,248,0.08)" stroke="#818cf8" strokeWidth="1.2"/>
    <circle cx="68" cy="18" r="6" fill="rgba(129,140,248,0.18)" stroke="#818cf8" strokeWidth="1"/>
    <rect x="77" y="13" width="13" height="3" rx="1.5" fill="rgba(129,140,248,0.28)"/>
    <rect x="4" y="44" width="42" height="32" rx="8" fill="rgba(125,211,252,0.08)" stroke="#7dd3fc" strokeWidth="1.2"/>
    <circle cx="18" cy="58" r="6" fill="rgba(125,211,252,0.18)" stroke="#7dd3fc" strokeWidth="1"/>
    <rect x="27" y="53" width="13" height="3" rx="1.5" fill="rgba(125,211,252,0.28)"/>
    <rect x="54" y="44" width="42" height="32" rx="8" fill="rgba(165,180,252,0.08)" stroke="#a5b4fc" strokeWidth="1.2"/>
    <circle cx="68" cy="58" r="6" fill="rgba(165,180,252,0.18)" stroke="#a5b4fc" strokeWidth="1"/>
    <rect x="77" y="53" width="13" height="3" rx="1.5" fill="rgba(165,180,252,0.28)"/>
    <circle cx="38" cy="8" r="3" fill="#22c55e" fillOpacity=".85"/>
    <circle cx="88" cy="8" r="3" fill="#22c55e" fillOpacity=".85"/>
    <circle cx="38" cy="48" r="3" fill="#22c55e" fillOpacity=".85"/>
    <circle cx="88" cy="48" r="3" fill="#f59e0b" fillOpacity=".85"/>
  </svg>
);

const k8sIcon = (
  <svg width="90" height="90" viewBox="0 0 110 110" fill="none">
    <circle cx="55" cy="55" r="46" stroke="#6366f1" strokeWidth="1" strokeDasharray="6,4" opacity=".3"/>
    <circle cx="55" cy="55" r="33" stroke="#818cf8" strokeWidth="1" opacity=".2"/>
    <circle cx="55" cy="9" r="8" fill="rgba(99,102,241,0.12)" stroke="#6366f1" strokeWidth="1.2"/>
    <circle cx="55" cy="101" r="8" fill="rgba(129,140,248,0.12)" stroke="#818cf8" strokeWidth="1.2"/>
    <circle cx="88" cy="37" r="8" fill="rgba(125,211,252,0.12)" stroke="#7dd3fc" strokeWidth="1.2"/>
    <circle cx="88" cy="73" r="8" fill="rgba(165,180,252,0.12)" stroke="#a5b4fc" strokeWidth="1.2"/>
    <circle cx="22" cy="37" r="8" fill="rgba(99,102,241,0.12)" stroke="#6366f1" strokeWidth="1.2"/>
    <circle cx="22" cy="73" r="8" fill="rgba(129,140,248,0.12)" stroke="#818cf8" strokeWidth="1.2"/>
    <line x1="55" y1="17" x2="55" y2="44" stroke="#6366f1" strokeWidth="1" opacity=".3"/>
    <line x1="55" y1="66" x2="55" y2="93" stroke="#6366f1" strokeWidth="1" opacity=".3"/>
    <line x1="81" y1="42" x2="64" y2="51" stroke="#7dd3fc" strokeWidth="1" opacity=".3"/>
    <line x1="81" y1="68" x2="64" y2="59" stroke="#7dd3fc" strokeWidth="1" opacity=".3"/>
    <line x1="29" y1="42" x2="46" y2="51" stroke="#6366f1" strokeWidth="1" opacity=".3"/>
    <line x1="29" y1="68" x2="46" y2="59" stroke="#6366f1" strokeWidth="1" opacity=".3"/>
    <circle cx="55" cy="55" r="12" fill="rgba(99,102,241,0.1)" stroke="#6366f1" strokeWidth="1.5"/>
    <circle cx="55" cy="55" r="5" fill="#6366f1" fillOpacity=".45"/>
  </svg>
);

const icons = [serverIcon, globeIcon, hybridIcon, containerIcon];
const cardBg = [
  { className: "bg-white border border-indigo-200/30 shadow-sm", isViolet: false },
  { className: "", isViolet: true },
  { className: "border border-indigo-100/40", isViolet: false, bg: "linear-gradient(135deg,rgba(224,231,255,.75),rgba(219,234,254,.85))" },
  { className: "border border-indigo-100/35", isViolet: false, bg: "linear-gradient(135deg,rgba(238,242,255,.9),rgba(240,249,255,.9))" },
];

export default function Deployment() {
  return (
    <>
      <PageMeta title="Deployment" />
      <Section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full opacity-50" style={{ background: "radial-gradient(circle,rgba(196,181,253,.55),transparent 70%)", filter: "blur(72px)", animation: "blobPulse 7s ease-in-out infinite" }}/>
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full opacity-40" style={{ background: "radial-gradient(circle,rgba(186,230,253,.55),transparent 70%)", filter: "blur(64px)", animation: "blobPulse 7s ease-in-out 3.5s infinite" }}/>

        <Wrap className="relative z-10">
          <div className="mb-14 flex flex-col items-center text-center">
             <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-indigo-500">
              Deployment
            </span>
            <h2 className="mt-3.5 max-w-[760px] text-[34px] font-bold text-slate-900 max-[860px]:text-[27px]">
              Runs where your{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)", backgroundSize: "200% auto", animation: "shimmer 3s linear infinite" }}>
                workloads
              </span>{" "}
              run.
            </h2>
            <p className="mt-4.5 max-w-[620px] text-lg leading-relaxed text-gray-500">
              QuantZen deploys into your environment of choice and operates as a stateless layer at the API boundary. No data leaves your trust perimeter unless you choose it to.
            </p>
          </div>

          <div className="grid grid-cols-6 gap-4 max-[860px]:grid-cols-1">

            {/* First 4 cards */}
            {deploymentModels.map((m, i) => {
              const { className, isViolet, bg } = cardBg[i];
              return (
                <div
                  key={m.title}
                  className={`group relative overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 ${m.size} max-[860px]:col-span-1 ${className}`}
                  style={isViolet ? { background: "linear-gradient(145deg,#6366f1,#818cf8)" } : bg ? { background: bg } : undefined}
                >
                  <div className="pointer-events-none absolute rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ width: 200, height: 200, top: -60, right: -40, background: isViolet ? "radial-gradient(circle,rgba(255,255,255,.15),transparent 70%)" : "radial-gradient(circle,rgba(99,102,241,.12),transparent 70%)", filter: "blur(40px)" }}/>
                  <div className="relative flex h-full flex-col">
                    <span className="mb-3.5 inline-block self-start rounded-[6px] border px-[8px] py-0.5 font-mono text-[10px] tracking-[0.14em] uppercase"
                      style={isViolet ? { color: "rgba(255,255,255,.9)", background: "rgba(255,255,255,.15)", borderColor: "rgba(255,255,255,.22)" } : { color: "#6366f1", background: "rgba(99,102,241,.07)", borderColor: "rgba(99,102,241,.2)" }}>
                      {m.title}
                    </span>
                    <h3 className={`mb-2 text-[18px] font-bold ${isViolet ? "text-white" : i >= 2 ? "text-indigo-900" : "text-slate-900"}`}>{m.title}</h3>
                    <p className={`text-[13.5px] leading-relaxed ${isViolet ? "text-indigo-100" : "text-gray-500"} max-w-[260px]`}>{m.body}</p>
                  </div>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 transition-opacity duration-300" style={{ opacity: isViolet ? 0.45 : 0.35, animation: "floatY 4s ease-in-out infinite", animationDelay: `${i * 0.4}s` }}>
                    {icons[i]}
                  </div>
                </div>
              );
            })}

            {/* Kubernetes — col-span-4, reduced height */}
            <div
              className="group relative col-span-4 overflow-hidden rounded-3xl border border-purple-200/30 px-7 py-5 transition-all duration-300 hover:-translate-y-1.5 max-[860px]:col-span-1"
              style={{ background: "linear-gradient(135deg,rgba(233,213,255,.45),rgba(224,231,255,.65))" }}
            >
              <div className="pointer-events-none absolute rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ width: 200, height: 200, top: -60, right: -40, background: "radial-gradient(circle,rgba(99,102,241,.12),transparent 70%)", filter: "blur(40px)" }}/>
              <div className="relative flex items-center gap-5">
                <div className="flex-1">
                  <span className="mb-3 inline-block rounded-[6px] border border-purple-200/40 bg-purple-50 px-[8px] py-0.5 font-mono text-[10px] tracking-[0.14em] uppercase text-violet-600">Kubernetes</span>
                  <h3 className="mb-1.5 text-[18px] font-bold text-indigo-900">Kubernetes</h3>
                  <p className="text-[13.5px] leading-relaxed text-gray-600">Deploy as a sidecar or ingress component, scaled and managed natively by your cluster.</p>
                </div>
                {/* icon inline so it never overflows */}
                <div className="shrink-0 opacity-35" style={{ animation: "floatYSimple 4s ease-in-out 1.6s infinite" }}>
                  {k8sIcon}
                </div>
              </div>
            </div>

            {/* One policy, everywhere — col-span-2, same reduced height */}
            <div
              className="group relative col-span-2 overflow-hidden rounded-3xl px-7 py-5 transition-all duration-300 hover:-translate-y-1.5 max-[860px]:col-span-1"
              style={{ background: "linear-gradient(135deg,#6366f1 0%,#818cf8 50%,#7dd3fc 100%)", boxShadow: "0 4px 24px rgba(99,102,241,.22)" }}
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-[160px] w-[160px] rounded-full opacity-25" style={{ background: "radial-gradient(circle,rgba(255,255,255,.3),transparent 70%)", filter: "blur(36px)" }}/>
              {/* icon positioned in background, clipped by overflow-hidden */}
              <div className="pointer-events-none absolute bottom-0 right-0 opacity-20" style={{ animation: "floatYSimple 5s ease-in-out infinite" }}>
                <svg width="90" height="90" viewBox="0 0 100 100" fill="none">
                  <path d="M50 8 L82 22 L82 52 C82 70 50 92 50 92 C50 92 18 70 18 52 L18 22 Z" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.1)"/>
                  <path d="M37 50 L46 59 L63 40" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <circle cx="50" cy="50" r="38" stroke="rgba(255,255,255,.2)" strokeWidth="1" strokeDasharray="5,4"/>
                </svg>
              </div>
              <div className="relative">
                <span className="mb-3 inline-block rounded-[6px] border border-white/22 bg-white/14 px-[8px] py-0.5 font-mono text-[10px] tracking-[0.14em] uppercase text-white/88">Universal</span>
                <h3 className="mb-1.5 text-[18px] font-bold text-white">One policy, everywhere</h3>
                <p className="text-[13.5px] leading-relaxed text-indigo-100">The same protection and audit policy applies across every deployment model.</p>
              </div>
            </div>

          </div>
        </Wrap>
      </Section>

      {/* ── Section 2: Path to Production ── */}
      <Section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute -left-20 top-10 h-[360px] w-[360px] rounded-full opacity-40" style={{ background: "radial-gradient(circle,rgba(186,230,253,.55),transparent 70%)", filter: "blur(68px)", animation: "blobPulse 7s ease-in-out 2s infinite" }}/>
        <div className="pointer-events-none absolute -right-12 bottom-20 h-[280px] w-[280px] rounded-full opacity-35" style={{ background: "radial-gradient(circle,rgba(196,181,253,.5),transparent 70%)", filter: "blur(60px)", animation: "blobPulse 7s ease-in-out 4s infinite" }}/>

        <Wrap className="relative z-10">
          <div className="mb-12 flex flex-col items-center text-center">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-indigo-500">
             The path to production
            </span>
            <h2 className="mt-3.5 max-w-[760px] text-[34px] font-bold text-slate-900 max-[860px]:text-[27px]">
              A measured rollout, not a{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)", backgroundSize: "200% auto", animation: "shimmer 3s linear infinite" }}>
                flag day.
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {pipelineSteps.map((s) => (
              <div
                key={s.num}
                className="group flex items-center gap-6 rounded-2xl border border-indigo-100/50 bg-white px-7 py-6 shadow-[0_2px_10px_rgba(99,102,241,0.05)] transition-all duration-300 hover:translate-x-1.5 hover:shadow-[0_8px_28px_rgba(99,102,241,0.16)]"
              >
                <div
                  className="min-w-[52px] font-mono text-[26px] font-bold leading-none"
                  style={{ background: "linear-gradient(135deg,#6366f1,#7dd3fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                >
                  {s.num}
                </div>
                <div className="flex-1">
                  <div className="mb-1 text-[15px] font-semibold text-slate-900">{s.title}</div>
                  <div className="text-[13.5px] leading-relaxed text-gray-500">{s.body}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 max-[860px]:grid-cols-1">
            {guarantees.map((g, i) => {
              const isMiddle = i === 1;
              return (
                <div
                  key={g.title}
                  className="group relative overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5"
                  style={{
                    background: isMiddle ? "linear-gradient(135deg,#6366f1,#818cf8)" : i === 0 ? "linear-gradient(135deg,rgba(196,181,253,.22),rgba(186,230,253,.32))" : "linear-gradient(135deg,rgba(186,230,253,.35),rgba(196,181,253,.22))",
                    border: isMiddle ? "none" : "1px solid rgba(99,102,241,.13)",
                    boxShadow: isMiddle ? "0 8px 32px rgba(99,102,241,.3)" : "0 2px 16px rgba(99,102,241,.06)",
                  }}
                >
                  <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-xl text-base font-bold"
                    style={{ background: isMiddle ? "rgba(255,255,255,.18)" : "rgba(99,102,241,.1)", color: isMiddle ? "white" : "#6366f1", border: isMiddle ? "1px solid rgba(255,255,255,.22)" : "1px solid rgba(99,102,241,.18)" }}>
                    ✓
                  </div>
                  <div className={`mb-2 text-[15px] font-bold ${isMiddle ? "text-white" : "text-slate-900"}`}>{g.title}</div>
                  <div className={`text-[13.5px] leading-relaxed ${isMiddle ? "text-indigo-100" : "text-gray-500"}`}>{g.body}</div>
                </div>
              );
            })}
          </div>
        </Wrap>
      </Section>

      <style>{`
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes blobPulse { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.07) rotate(6deg);opacity:.7} }
        @keyframes floatY { 0%,100%{transform:translateY(-50%)} 50%{transform:translateY(calc(-50% - 10px))} }
        @keyframes floatYSimple { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
    </>
  );
}