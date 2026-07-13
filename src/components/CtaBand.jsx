import Button from "./Button";

export default function CtaBand({ heading, body, ctaLabel, className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-[22px] border border-indigo-900/30 bg-[#07071a] px-12 py-[60px] text-center ${className}`}>

      {/* Corner lights */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,.55)_0%,rgba(99,102,241,.12)_45%,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,rgba(186,230,253,.45)_0%,rgba(186,230,253,.1)_45%,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-16 -right-10 w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(186,230,253,.2)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-10 -left-8 w-[140px] h-[140px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,.25)_0%,transparent_70%)]" />

      {/* Quantum atom SVG */}
      <svg className="pointer-events-none absolute inset-0 w-full h-full" viewBox="0 0 1100 260" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        {/* Left atom */}
        <g opacity=".55">
          <ellipse cx="160" cy="130" rx="48" ry="22" fill="none" stroke="rgba(99,102,241,.35)" strokeWidth="1"/>
          <ellipse cx="160" cy="130" rx="48" ry="22" fill="none" stroke="rgba(99,102,241,.35)" strokeWidth="1" transform="rotate(60 160 130)"/>
          <ellipse cx="160" cy="130" rx="48" ry="22" fill="none" stroke="rgba(99,102,241,.35)" strokeWidth="1" transform="rotate(120 160 130)"/>
          <circle cx="160" cy="130" r="4" fill="rgba(129,140,248,.7)"/>
          <circle cx="208" cy="130" r="2.5" fill="rgba(165,180,252,.6)"/>
          <circle cx="160" cy="108" r="2" fill="rgba(165,180,252,.5)"/>
        </g>
        {/* Right atom */}
        <g opacity=".45">
          <ellipse cx="940" cy="125" rx="52" ry="24" fill="none" stroke="rgba(186,230,253,.4)" strokeWidth="1"/>
          <ellipse cx="940" cy="125" rx="52" ry="24" fill="none" stroke="rgba(186,230,253,.4)" strokeWidth="1" transform="rotate(60 940 125)"/>
          <ellipse cx="940" cy="125" rx="52" ry="24" fill="none" stroke="rgba(186,230,253,.4)" strokeWidth="1" transform="rotate(120 940 125)"/>
          <circle cx="940" cy="125" r="4" fill="rgba(186,230,253,.7)"/>
          <circle cx="992" cy="125" r="2.5" fill="rgba(186,230,253,.5)"/>
          <circle cx="940" cy="101" r="2" fill="rgba(186,230,253,.5)"/>
        </g>
        {/* Left lattice */}
        <g opacity=".22">
          <line x1="290" y1="38" x2="322" y2="78" stroke="rgba(99,102,241,.5)" strokeWidth=".8"/>
          <line x1="322" y1="78" x2="362" y2="55" stroke="rgba(99,102,241,.5)" strokeWidth=".8"/>
          <line x1="362" y1="55" x2="330" y2="28" stroke="rgba(99,102,241,.5)" strokeWidth=".8"/>
          <line x1="330" y1="28" x2="290" y2="38" stroke="rgba(99,102,241,.5)" strokeWidth=".8"/>
          <line x1="290" y1="38" x2="362" y2="55" stroke="rgba(99,102,241,.3)" strokeWidth=".8"/>
          <circle cx="290" cy="38" r="2.5" fill="rgba(129,140,248,.7)"/>
          <circle cx="322" cy="78" r="2.5" fill="rgba(129,140,248,.7)"/>
          <circle cx="362" cy="55" r="2.5" fill="rgba(129,140,248,.7)"/>
          <circle cx="330" cy="28" r="2.5" fill="rgba(129,140,248,.7)"/>
        </g>
        {/* Right lattice */}
        <g opacity=".18">
          <line x1="750" y1="175" x2="788" y2="205" stroke="rgba(186,230,253,.5)" strokeWidth=".8"/>
          <line x1="788" y1="205" x2="818" y2="178" stroke="rgba(186,230,253,.5)" strokeWidth=".8"/>
          <line x1="818" y1="178" x2="782" y2="152" stroke="rgba(186,230,253,.5)" strokeWidth=".8"/>
          <line x1="782" y1="152" x2="750" y2="175" stroke="rgba(186,230,253,.5)" strokeWidth=".8"/>
          <line x1="750" y1="175" x2="818" y2="178" stroke="rgba(186,230,253,.25)" strokeWidth=".8"/>
          <circle cx="750" cy="175" r="2" fill="rgba(186,230,253,.6)"/>
          <circle cx="788" cy="205" r="2" fill="rgba(186,230,253,.6)"/>
          <circle cx="818" cy="178" r="2" fill="rgba(186,230,253,.6)"/>
          <circle cx="782" cy="152" r="2" fill="rgba(186,230,253,.6)"/>
        </g>
      </svg>

      {/* Content */}
      <div className="relative z-10">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-indigo-300">
          <span className="h-[5px] w-[5px] rounded-full bg-indigo-400" />
          Live demo
        </span>
        <h2 className="mx-auto mb-2.5 max-w-[500px] text-[25px] font-bold leading-snug text-white">{heading}</h2>
        <p className="mx-auto mb-8 max-w-[440px] text-sm leading-relaxed text-slate-400">{body}</p>
        <Button to="/contact">{ctaLabel}</Button>
      </div>

    </div>
  );
}