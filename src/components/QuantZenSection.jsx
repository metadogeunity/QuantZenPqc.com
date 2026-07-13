import Section from "./Section";
import Wrap from "./Wrap";
import Card from "./Card";
import { ShieldCheck, RefreshCw, Plug, Landmark, TimerReset } from "lucide-react";

const keyPoints = [
  {
    icon: <RefreshCw size={17} />,
    title: "No infrastructure replacement",
    body: "Adopt post quantum cryptography on top of what you already run  no rip-and-replace, no downtime.",
  },
  {
    icon: <ShieldCheck size={17} />,
    title: "Crypto agile architecture",
    body: "Swap or upgrade algorithms as standards evolve, without rearchitecting your systems each time.",
  },
  {
    icon: <Plug size={17} />,
    title: "Seamless API integration",
    body: "Drop into existing API layers and workflows with minimal engineering overhead.",
  },
  {
    icon: <Landmark size={17} />,
    title: "Built for banking & telecom",
    body: "Designed to meet the reliability, compliance, and scale demands of regulated industries.",
  },
  {
    icon: <TimerReset size={17} />,
    title: "Long-term security by design",
    body: "Migrate once, stay protected as the quantum threat landscape matures over the coming decades.",
  },
];

export default function QuantZenSection() {
  return (
    <Section className="relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute right-1/2 top-0 h-[420px] w-[820px] translate-x-1/2 -translate-y-1/3 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(99,102,241,0.16), rgba(186,230,253,0.22), transparent)",
        }}
      />
      <Wrap className="relative">
        {/* Header */}
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-indigo-500">
            Introducing QuantZen™
          </span>
          <h2 className="mt-3.5 max-w-[760px] text-[34px] font-bold text-slate-900 max-[860px]:text-[27px]">
            QuantZen™ is the{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
                backgroundSize: "200% auto",
                animation: "shimmer 3s linear infinite",
              }}
            >
              fast path
            </span>{" "}
            to quantum readiness
          </h2>
          <p className="mt-4.5 max-w-[620px] text-lg leading-relaxed text-gray-500">
            QuantZen™ enables organizations to adopt post quantum cryptography
            without replacing their existing infrastructure helping you
            transition securely and efficiently.
          </p>
        </div>

        {/* Integration flow visual */}
        <div className="mx-auto mb-16 flex max-w-[720px] items-center justify-center gap-3 max-[640px]:flex-col max-[640px]:gap-6">
          {[
            { label: "Existing Infrastructure", dim: true },
            { label: "QuantZen™ Layer", dim: false },
            { label: "Quantum-Safe", dim: true },
          ].map((step, i, arr) => (
            <div key={step.label} className="flex items-center gap-3 max-[640px]:flex-col">
              <div
                className={`flex h-[74px] w-[150px] flex-col items-center justify-center rounded-2xl border text-center text-[12px] font-semibold leading-snug ${
                  step.dim
                    ? "border-slate-200 bg-slate-50 text-slate-500"
                    : "border-indigo-200 bg-gradient-to-br from-indigo-50 to-sky-50 text-indigo-600 shadow-[0_4px_18px_rgba(99,102,241,0.14)]"
                }`}
              >
                {!step.dim && (
                  <span className="mb-1 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-white">
                    <ShieldCheck size={13} />
                  </span>
                )}
                {step.label}
              </div>
              {i < arr.length - 1 && (
                <div className="relative h-[2px] w-10 overflow-hidden rounded-full bg-slate-200 max-[640px]:h-8 max-[640px]:w-[2px]">
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, #6366f1, transparent)",
                      backgroundSize: "200% 100%",
                      animation: "flow 1.8s linear infinite",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Key points */}
        <div className="mb-6 flex items-center gap-3 max-[860px]:justify-center">
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-indigo-500">
            Key Points
          </span>
          <span className="h-px flex-1 bg-slate-200 max-[860px]:hidden" />
        </div>

        <div className="grid grid-cols-3 gap-5 max-[860px]:grid-cols-1">
          {keyPoints.slice(0, 3).map((c, i) => (
            <Card
              key={c.title}
              title={c.title}
              icon={c.icon}
              className="border-slate-200/80 bg-white shadow-[0_4px_18px_rgba(99,102,241,0.08)] opacity-0 transition-shadow [animation:fadeUp_0.6s_ease_forwards] hover:shadow-[0_8px_28px_rgba(99,102,241,0.14)]"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <p>{c.body}</p>
            </Card>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-5 max-[860px]:grid-cols-1">
          {keyPoints.slice(3).map((c, i) => (
            <Card
              key={c.title}
              title={c.title}
              icon={c.icon}
              className="border-slate-200/80 bg-white shadow-[0_4px_18px_rgba(99,102,241,0.08)] opacity-0 transition-shadow [animation:fadeUp_0.6s_ease_forwards] hover:shadow-[0_8px_28px_rgba(99,102,241,0.14)]"
              style={{ animationDelay: `${(i + 3) * 0.1}s` }}
            >
              <p>{c.body}</p>
            </Card>
          ))}
        </div>
      </Wrap>

      <style>{`
        @keyframes flow {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Section>
  );
}