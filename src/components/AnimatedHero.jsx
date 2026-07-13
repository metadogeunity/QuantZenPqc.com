
import { useEffect, useRef } from "react";

const ORBITS = [
  { rx: 200, ry: 66, tilt: 0,   spd: 0.0105, col: [56, 189, 248],  label: "TLS" },
  { rx: 240, ry: 80, tilt: 58,  spd: 0.0078, col: [129, 140, 248], label: "PQC" },
  { rx: 274, ry: 92, tilt: 116, spd: 0.0058, col: [52, 211, 153],  label: "SIG" },
];

const SHIELD_R = 46;
const PI2 = Math.PI * 2;

function rgba(c, a) {
  return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
}

function pt(rx, ry, deg, a) {
  const t = (deg * Math.PI) / 180;
  const lx = rx * Math.cos(a);
  const ly = ry * Math.sin(a);
  return [lx * Math.cos(t) - ly * Math.sin(t), lx * Math.sin(t) + ly * Math.cos(t)];
}

const FEATURE_CARDS = [
  {
    title: "FIPS 203 / 204",
    desc: "NIST standardized ML KEM & ML DSA",
  },
  {
    title: "Zero rewrites",
    desc: "No application or gateway rewrites",
  },
  {
    title: "Drop in middleware",
    desc: "At your API boundary",
  },
];

export default function AnimatedHero() {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const state = {
      W: 0,
      H: 0,
      T: 0,
      lanes: ORBITS.map(() => ({
        packets: [
          { a: Math.random() * PI2, trail: [] },
          { a: Math.random() * PI2 + Math.PI, trail: [] },
        ],
      })),
      pulses: [],
      dust: Array.from({ length: 55 }, () => ({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.00016,
        vy: (Math.random() - 0.5) * 0.00016,
        r: Math.random() * 0.85 + 0.25,
        a: Math.random() * 0.13 + 0.04,
        ph: Math.random() * PI2,
        c: Math.random() < 0.5 ? [56, 189, 248] : [129, 140, 248],
      })),
    };
    stateRef.current = state;

    function resize() {
      const el = canvas.parentElement;
      state.W = canvas.width = el ? el.offsetWidth : window.innerWidth;
      state.H = canvas.height = el ? el.offsetHeight : window.innerHeight;
      state.lanes.forEach((l) => l.packets.forEach((pk) => (pk.trail = [])));
    }
    resize();

    const cx = () => state.W / 2;
    const cy = () => state.H / 2;

    function drawBg() {
      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, state.W, state.H);
      const g = ctx.createRadialGradient(
        cx(), cy(), 0,
        cx(), cy(), Math.min(state.W, state.H) * 0.6
      );
      g.addColorStop(0, "rgba(14,24,70,0.9)");
      g.addColorStop(0.5, "rgba(7,14,40,0.5)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, state.W, state.H);
    }

    function drawDust() {
      state.dust.forEach((p) => {
        p.x = (p.x + p.vx + 1) % 1;
        p.y = (p.y + p.vy + 1) % 1;
        const f = 0.5 + 0.5 * Math.sin(state.T * 0.014 + p.ph);
        ctx.save();
        ctx.globalAlpha = p.a * f;
        ctx.fillStyle = rgba(p.c, 1);
        ctx.beginPath();
        ctx.arc(p.x * state.W, p.y * state.H, p.r, 0, PI2);
        ctx.fill();
        ctx.restore();
      });
    }

    function drawShield(x, y) {
      const r = SHIELD_R + Math.sin(state.T * 0.02) * 2;
      ctx.save();
      ctx.translate(x, y);
      ctx.strokeStyle = "rgba(186,230,253,0.28)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const a0 = (i / 6) * PI2 + state.T * 0.0015;
        const a1 = ((i + 1) / 6) * PI2 + state.T * 0.0015;
        ctx.beginPath();
        ctx.moveTo(r * Math.cos(a0), r * Math.sin(a0));
        ctx.lineTo(r * Math.cos(a1), r * Math.sin(a1));
        ctx.stroke();
      }
      ctx.strokeStyle = "rgba(56,189,248,0.14)";
      ctx.beginPath();
      for (let i = 0; i <= 6; i++) {
        const a = (i / 6) * PI2 - state.T * 0.001;
        const px = r * 0.7 * Math.cos(a);
        const py = r * 0.7 * Math.sin(a);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }

    function drawPulses(x, y) {
      const pulses = state.pulses;
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const age = state.T - p.startT;
        const life = 46;
        if (age > life) { pulses.splice(i, 1); continue; }
        const f = age / life;
        const r = SHIELD_R + f * 60;
        ctx.save();
        ctx.globalAlpha = (1 - f) * 0.55;
        ctx.strokeStyle = rgba(p.col, 1);
        ctx.lineWidth = 1.4 * (1 - f * 0.6);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, PI2);
        ctx.stroke();
        ctx.restore();
      }
    }

    function drawOrbits() {
      const x = cx(), y = cy();
      ORBITS.forEach((o, i) => {
        const lane = state.lanes[i];

        ctx.save();
        ctx.strokeStyle = rgba(o.col, 0.1);
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        for (let j = 0; j <= 240; j++) {
          const a = (j / 240) * PI2;
          const [dx, dy] = pt(o.rx, o.ry, o.tilt, a);
          j === 0 ? ctx.moveTo(x + dx, y + dy) : ctx.lineTo(x + dx, y + dy);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

        lane.packets.forEach((pk) => {
          const prevA = pk.a;
          pk.a += o.spd;

          const crossedTop = prevA % PI2 < Math.PI && pk.a % PI2 >= Math.PI;
          if (crossedTop) state.pulses.push({ startT: state.T, col: o.col });

          const [dx, dy] = pt(o.rx, o.ry, o.tilt, pk.a);
          const ex = x + dx, ey = y + dy;
          pk.trail.push({ x: ex, y: ey });
          if (pk.trail.length > 34) pk.trail.shift();

          const len = pk.trail.length;
          for (let j = 2; j < len; j++) {
            const f = j / len;
            ctx.save();
            ctx.globalAlpha = f * f * 0.8;
            ctx.strokeStyle = rgba(o.col, 1);
            ctx.lineWidth = f * f * 2.6;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(pk.trail[j - 1].x, pk.trail[j - 1].y);
            ctx.lineTo(pk.trail[j].x, pk.trail[j].y);
            ctx.stroke();
            ctx.restore();
          }

          const hg = ctx.createRadialGradient(ex, ey, 0, ex, ey, 13);
          hg.addColorStop(0, rgba(o.col, 0.5));
          hg.addColorStop(1, "rgba(0,0,0,0)");
          ctx.save();
          ctx.fillStyle = hg;
          ctx.beginPath();
          ctx.arc(ex, ey, 13, 0, PI2);
          ctx.fill();
          ctx.restore();

          ctx.save();
          ctx.translate(ex, ey);
          ctx.rotate(pk.a * 1.4);
          const sg = ctx.createRadialGradient(-0.6, -0.6, 0, 0, 0, 4.5);
          sg.addColorStop(0, "rgba(255,255,255,1)");
          sg.addColorStop(0.55, rgba(o.col, 0.9));
          sg.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = sg;
          ctx.fillRect(-3.1, -3.1, 6.2, 6.2);
          ctx.restore();
        });
      });
    }

    function drawNucleus() {
      const x = cx(), y = cy();
      const p = 1 + 0.04 * Math.sin(state.T * 0.03);

      [[160, 0.012], [110, 0.022], [70, 0.045], [38, 0.1], [18, 0.22]].forEach(([r, a]) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r * p);
        g.addColorStop(0, `rgba(56,189,248,${a * 2})`);
        g.addColorStop(0.5, `rgba(99,102,241,${a})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.save();
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r * p, 0, PI2);
        ctx.fill();
        ctx.restore();
      });

      drawPulses(x, y);
      drawShield(x, y);

      const cg = ctx.createRadialGradient(x - 3, y - 3, 0, x, y, 12 * p);
      cg.addColorStop(0, "rgba(255,255,255,1)");
      cg.addColorStop(0.3, "rgba(186,230,253,1)");
      cg.addColorStop(0.7, "rgba(56,189,248,0.9)");
      cg.addColorStop(1, "rgba(14,116,144,0.4)");
      ctx.save();
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(x, y, 12 * p, 0, PI2);
      ctx.fill();
      ctx.strokeStyle = "rgba(186,230,253,0.22)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(x, y, 20 * p, 0, PI2);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(x, y);
      ctx.strokeStyle = "rgba(3,7,18,0.55)";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(0, -1, 4, Math.PI, 0, false);
      ctx.stroke();
      ctx.fillStyle = "rgba(3,7,18,0.55)";
      ctx.fillRect(-4.5, -1, 9, 6);
      ctx.restore();

      ctx.save();
      ctx.strokeStyle = "rgba(56,189,248,0.09)";
      ctx.lineWidth = 0.5;
      ctx.setLineDash([6, 20]);
      ctx.lineDashOffset = -((state.T * 0.2) % 100);
      ctx.beginPath();
      ctx.arc(x, y, 310, 0, PI2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    function frame() {
      state.T++;
      drawBg();
      drawDust();
      drawOrbits();
      drawNucleus();
      rafRef.current = requestAnimationFrame(frame);
    }

    if (reduced) {
      drawBg(); drawDust(); drawOrbits(); drawNucleus();
    } else {
      rafRef.current = requestAnimationFrame(frame);
    }

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div style={styles.wrapper}>
      <canvas ref={canvasRef} style={styles.canvas} />

      <div style={styles.ui}>
        {/* Patent badge */}
        <div style={styles.patent}>
          <span style={styles.pt}>Indian Patent Application Filed - 202641078837</span>
        </div>

        {/* Headline */}
        <h1 style={styles.h1}>
         THE SUSTAINABILITY TRUST 
          <br />
          LAYER ​
FOR THE POST-QUANTUM DIGITAL{" "}
           <span
  className="inline-block bg-clip-text text-transparent"
  style={{
    backgroundImage:
      "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc,#6366f1)",
    backgroundSize: "200% 100%",
    animation: "shimmer 3s linear infinite",
  }}
>
   ECONOMY​
</span>{" "}
        </h1>

        {/* Sub-copy */}
        <p style={styles.sub}>
          The post quantum trust layer for digital infrastructure, enabling banks, telecom operators, and enterprises to adopt quantum safe cryptography without replacing existing systems by securing APIs and biometric authentication through a PQC agile architecture designed for quantum resilience.
        </p>

        {/* CTAs */}
        <div style={styles.btns}>
          <button
            style={styles.bp}
            onMouseEnter={e => Object.assign(e.currentTarget.style, styles.bpHover)}
            onMouseLeave={e => Object.assign(e.currentTarget.style, styles.bp)}
          >
            Request a demo →
          </button>
         
        </div>

        {/* Trusted icon */}
        <div style={styles.trustRow}>
          <img src="/Trustedicon.png" alt="Trusted" style={styles.trustIcon} />
        </div>

        {/* Badge row */}
        <div style={styles.badgeRow}>
          <img
            src="/PostQuantumReady.png"
            alt="Post Quantum Ready"
            style={styles.badgeImg}
          />
          <img
            src="/NoForkNoMigration.png"
            alt="No Fork No Migration"
            style={styles.badgeImg}
          />
        </div>

        {/* Feature cards */}
        <div style={styles.cards}>
          {FEATURE_CARDS.map((card, i) => (
            <div key={i} style={styles.card}>
              <p style={styles.cardTitle}>{card.title}</p>
              <p style={styles.cardDesc}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pdot-anim { animation: none !important; opacity: 1 !important; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  wrapper: {
    width: "100%",
    minHeight: "700px",
    background: "#030712",
    position: "relative",
    overflow: "visible",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    paddingBottom: "80px",
  },
  canvas: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  },
  ui: {
    position: "relative",
    zIndex: 3,
    textAlign: "center",
    padding: "60px 24px 0",
    maxWidth: "780px",
    width: "100%",
  },
  patent: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "5px 15px",
    border: "1px solid rgba(251,191,36,0.28)",
    borderRadius: "100px",
    marginBottom: "28px",
    background: "rgba(251,191,36,0.07)",
  },
  pdot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "#fbbf24",
    display: "inline-block",
    animation: "blink 2s ease-in-out infinite",
  },
  pt: {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.13em",
    textTransform: "uppercase",
    color: "rgba(253,230,138,0.8)",
  },
  h1: {
    fontSize: "48px",
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: "-0.035em",
    color: "#f0f9ff",
    marginBottom: "22px",
    margin: "0 0 22px 0",
  },
  gradient: {
    background: "linear-gradient(110deg,#38bdf8 0%,#818cf8 55%,#34d399 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  sub: {
    fontSize: "16px",
    color: "rgba(148,163,184,0.7)",
    lineHeight: 1.82,
    margin: "0 auto 36px",
    maxWidth: "540px",
  },
  strong: {
    color: "rgba(186,230,253,0.88)",
    fontWeight: 600,
  },
  btns: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "14px",
    flexWrap: "wrap",
    marginBottom: "30px"
  },
  bp: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "13px 30px",
    borderRadius: "10px",
    background: "linear-gradient(135deg,#0ea5e9,#6366f1)",
    color: "#fff",
    fontSize: "13.5px",
    fontWeight: 700,
    letterSpacing: "0.02em",
    cursor: "pointer",
    border: "none",
    boxShadow: "0 0 36px rgba(99,102,241,0.3),inset 0 1px 0 rgba(255,255,255,0.12)",
    transition: "transform .2s ease,box-shadow .2s ease",
  },
  bpHover: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "13px 30px",
    borderRadius: "10px",
    background: "linear-gradient(135deg,#0ea5e9,#6366f1)",
    color: "#fff",
    fontSize: "13.5px",
    fontWeight: 700,
    letterSpacing: "0.02em",
    cursor: "pointer",
    border: "none",
    boxShadow: "0 0 44px rgba(99,102,241,0.42),inset 0 1px 0 rgba(255,255,255,0.16)",
    transform: "translateY(-1px)",
    transition: "transform .2s ease,box-shadow .2s ease",
  },
  bg: {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    padding: "13px 22px",
    borderRadius: "10px",
    color: "rgba(148,163,184,0.8)",
    fontSize: "13.5px",
    fontWeight: 600,
    border: "1px solid rgba(148,163,184,0.2)",
    cursor: "pointer",
    background: "transparent",
    transition: "border-color .2s ease,color .2s ease",
  },
  bgHover: {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    padding: "13px 22px",
    borderRadius: "10px",
    color: "rgba(186,230,253,0.9)",
    fontSize: "13.5px",
    fontWeight: 600,
    border: "1px solid rgba(186,230,253,0.4)",
    cursor: "pointer",
    background: "transparent",
    transition: "border-color .2s ease,color .2s ease",
  },

  /* ── Trusted icon (centered above the badge pair) ── */
  /* ── Trusted icon (centered above the badge pair) ── */
  trustRow: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "0px",    // ↓↓ almost no gap to badge row
    position: "relative",
    zIndex: 10,
  },
  trustIcon: {
    height: "140px",
    width: "auto",
    objectFit: "contain",
  },

  /* ── Badge row (side by side, gap between, centered as a pair) ── */
  badgeRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "32px",
    marginBottom: "2px",   
    position: "relative",
    zIndex: 10,
    transform: "translateY(-40%)"
  },
  badgeImg: {
    height: "120px",
    width: "auto",
    objectFit: "contain",
  },
  /* ── Feature cards ── */
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "14px",
    transform: "translateY(52px)",
    position: "relative",
    zIndex: 10,
    transform: "translateY(-20%)"
  },
  card: {
    borderRadius: "16px",
    padding: "20px 20px 22px",
    textAlign: "left",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    transition: "transform .22s ease, box-shadow .22s ease, border-color .22s ease",
    cursor: "default",
  },
  cardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "14px",
  },
  cardTag: {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "3px 9px",
    borderRadius: "100px",
    lineHeight: 1.6,
  },
  cardAccentLine: {
    height: "1.5px",
    borderRadius: "2px",
    marginBottom: "14px",
    opacity: 0.6,
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#e2e8f0",
    margin: "0 0 7px",
    padding: 0,
    letterSpacing: "-0.02em",
    lineHeight: 1.25,
  },
  cardDesc: {
    fontSize: "12.5px",
    color: "rgba(148,163,184,0.65)",
    lineHeight: 1.6,
    margin: 0,
    padding: 0,
  },
};