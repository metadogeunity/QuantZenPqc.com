import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck, Rocket, Lock, Fingerprint, Link2,
  BadgeCheck, Sparkles, ShieldPlus, Compass, EyeOff,
} from "lucide-react";

const items = [
  { letter: "Q", word: "Quantum-Safe",           icon: <ShieldCheck size={18} />, body: "Cryptography built to withstand attacks from large scale quantum computers, not just today's classical threats." },
  { letter: "R", word: "Ready to Deploy",         icon: <Rocket size={18} />,      body: "Integrate in days, not quarters QuantZen™ is built to go live fast, without a re architecture cycle." },
  { letter: "S", word: "Secure by Design",        icon: <Lock size={18} />,        body: "Post quantum protection isn't bolted on it's foundational to how QuantZen™ is engineered." },
  { letter: "T", word: "Trust Layer",             icon: <Fingerprint size={18} />, body: "A dedicated cryptographic trust layer that authenticates and protects every request in transit." },
  { letter: "U", word: "Unified Integration",     icon: <Link2 size={18} />,       body: "One SDK across your stack APIs, gateways, and services with a single consistent integration path." },
  { letter: "V", word: "Verifiable Integrity",    icon: <BadgeCheck size={18} />,  body: "Every signature and exchange can be independently verified, leaving no room for silent tampering." },
  { letter: "W", word: "Without UX Friction",     icon: <Sparkles size={18} />,    body: "Quantum safe security that your users and your engineers never have to think about." },
  { letter: "X", word: "Xtra Defense",            icon: <ShieldPlus size={18} />,  body: "An additional hardened layer of protection stacked on top of your existing security posture." },
  { letter: "Y", word: "Your Safety Migration",   icon: <Compass size={18} />,     body: "A guided, low risk path to post quantum readiness planned around your infrastructure, your timeline." },
  { letter: "Z", word: "Zero Infrastructure Replacement", icon: <EyeOff size={18} />, body: "No rip and replace. QuantZen™ layers on top of what you already run." },
];

function QtoZRow({ item, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-6 py-7 max-[760px]:!flex-row max-[760px]:gap-4 max-[760px]:py-5 ${
        isLeft ? "flex-row" : "flex-row-reverse text-right"
      }`}
    >
      {/* Content card */}
      <div
        className={`flex-1 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } ${isLeft ? "max-[760px]:text-left" : "max-[760px]:text-left"}`}
        style={{ transitionDelay: `${(index % 2) * 80}ms` }}
      >
        <div
          className={`inline-flex max-w-[380px] flex-col gap-2 rounded-2xl border border-[#eaeaf2] bg-white p-5 shadow-[0_2px_16px_rgba(99,102,241,0.06)] transition-all hover:border-indigo-200 hover:shadow-[0_6px_24px_rgba(99,102,241,0.12)] ${
            isLeft ? "items-end text-right max-[760px]:items-start max-[760px]:text-left" : "items-start text-left"
          }`}
        >
          <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-indigo-500">
            {item.icon}
            {item.word}
          </span>
          <p className="text-[13.5px] leading-[1.65] text-slate-500">{item.body}</p>
        </div>
      </div>

      {/* Center spine node */}
      <div className="relative z-10 flex flex-shrink-0 flex-col items-center">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full text-[19px] font-extrabold text-white transition-all duration-700 ${
            visible ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
          style={{
            background: "linear-gradient(135deg,#6366f1,#7dd3fc)",
            boxShadow: visible ? "0 0 0 6px rgba(99,102,241,0.1)" : "none",
          }}
        >
          {item.letter}
        </div>
      </div>

      {/* Empty opposite side to balance layout */}
      <div className="flex-1 max-[760px]:hidden" />
    </div>
  );
}

export default function QtoZSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/3 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(99,102,241,0.14), rgba(186,230,253,0.2), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-[880px] px-6">
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-indigo-500">
            A–Z of security. Q–Z of us.
          </span>
          <h2 className="mt-3.5 max-w-[700px] text-[34px] font-bold text-slate-900 max-[860px]:text-[27px]">
            Your{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
                backgroundSize: "200% auto",
                animation: "shimmer 3s linear infinite",
              }}
            >
              Q to Z
            </span>{" "}
            of QuantZen™
          </h2>
          <p className="mt-4.5 max-w-[560px] text-lg leading-relaxed text-gray-500">
            Ten letters. Ten reasons. Everything QuantZen™ stands for, from
            the first promise to the last.
          </p>
        </div>

        {/* Spine */}
        <div className="relative">
          <div
            className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 max-[760px]:left-6"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(99,102,241,0.25) 8%, rgba(99,102,241,0.25) 92%, transparent)",
            }}
          />
          {items.map((item, i) => (
            <QtoZRow key={item.letter} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}