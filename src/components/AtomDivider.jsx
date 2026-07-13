export default function AtomDivider({ from = "#07071a", to = "#ffffff" }) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: 90,
        background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)`,
      }}
    >
      {/* faint track the atom rides along */}
      <div
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.35) 15%, rgba(186,230,253,0.6) 50%, rgba(99,102,241,0.35) 85%, transparent 100%)",
        }}
      />

      {/* traveling atom */}
      <div className="atom-travel absolute top-1/2 -translate-y-1/2" style={{ left: "-60px" }}>
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          {[0, 60, 120].map((deg) => (
            <ellipse
              key={deg}
              cx="28"
              cy="28"
              rx="22"
              ry="9"
              transform={`rotate(${deg} 28 28)`}
              stroke="rgba(99,102,241,0.55)"
              strokeWidth="1"
              fill="none"
            />
          ))}
          <circle cx="28" cy="28" r="4.5" fill="rgba(99,102,241,1)" />
          <circle cx="50" cy="28" r="2.4" fill="rgba(186,230,253,1)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 28 28"
              to="360 28 28"
              dur="3.2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      <style>{`
        @keyframes atomTravel {
          0%   { left: -60px; opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { left: calc(100% + 60px); opacity: 0; }
        }
        .atom-travel {
          animation: atomTravel 7s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .atom-travel { animation: none; left: 50%; opacity: 1; }
        }
      `}</style>
    </div>
  );
}