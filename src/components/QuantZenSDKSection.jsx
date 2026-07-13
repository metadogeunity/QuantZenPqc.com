import ArchDiagram from "./ArchDiagram";
import { ShieldCheck, FileSignature, RefreshCw, Lock, Ban } from "lucide-react";

const web2FlowNodes = [
  { id: "client",   title: "Client / Application",        detail: "your app",          label: "No changes needed",   icon: "ti-device-laptop", highlight: false },
  { id: "sdk",      title: "QuantZen™ SDK",                detail: "integration layer", label: "Drop-in SDK",         icon: "ti-shield-lock",   highlight: true  },
  { id: "pqc",      title: "PQC Sign & Verify",            detail: "cryptographic core",label: "Quantum-safe",        icon: "ti-certificate",   highlight: true  },
  { id: "gateway",  title: "API Gateway",                  detail: "existing infra",    label: "Unchanged",           icon: "ti-server",        highlight: false },
  { id: "server",   title: "Application Server",           detail: "existing infra",    label: "Unchanged",           icon: "ti-server-2",      highlight: false },
  { id: "db",       title: "Database / Enterprise Svcs",   detail: "existing infra",    label: "Unchanged",           icon: "ti-database",      highlight: false },
];

const keyCapabilities = [
  { icon: <ShieldCheck size={16} />, label: "Quantum safe API authentication" },
  { icon: <FileSignature size={16} />, label: "Post quantum digital signatures" },
  { icon: <RefreshCw size={16} />, label: "Cryptographic agility" },
  { icon: <Lock size={16} />, label: "Secure communication channels" },
  { icon: <Ban size={16} />, label: "No infrastructure replacement" },
];

export default function QuantZenSDKSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative mx-auto max-w-[900px] px-6 py-20">
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-indigo-500">
            One SDK, two worlds
          </span>
          <h2 className="mt-3.5 max-w-[760px] text-[34px] font-bold text-slate-900 max-[860px]:text-[27px]">
            Same{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
                backgroundSize: "200% auto",
                animation: "shimmer 3s linear infinite",
              }}
            >
              outcome
            </span>
            : quantum safe security now.
          </h2>
          <p className="mt-4.5 max-w-[620px] text-lg leading-relaxed text-gray-500">
            QuantZen™ integrates into existing Web2 applications without
            changing your infrastructure. It adds a post quantum
            cryptographic trust layer to protect APIs, authentication, and
            digital communications while preserving compatibility with
            current systems.
          </p>
        </div>

        <div className="mb-3 text-center">
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-indigo-500">
            Web2 Flow
          </span>
        </div>
        <div className="relative mx-auto max-w-[900px] px-6 py-20"><ArchDiagram nodes={web2FlowNodes} /></div>
        

        {/* Key Capabilities */}
        <div className="mt-16 mb-6 flex items-center gap-3 max-[860px]:justify-center">
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-indigo-500">
            Key Capabilities
          </span>
          <span className="h-px flex-1 bg-slate-200 max-[860px]:hidden" />
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {keyCapabilities.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 rounded-full border border-[#eaeaf2] bg-white px-4 py-2 text-[13px] font-medium text-slate-700 transition-all hover:border-indigo-200 hover:shadow-[0_2px_20px_rgba(99,102,241,.07)]"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
                {item.icon}
              </span>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}