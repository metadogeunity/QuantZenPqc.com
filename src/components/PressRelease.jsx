import { useState, useEffect, useRef, useCallback } from "react";

// These live in /public, so they're referenced by absolute path (no import needed)
const logo = "/Logo.png";
const logoGlow = "/Logo_withglow.png";

/**
 * Press Release section for the QuantZen home page.
 *
 * The header block (Latest News badge / "Press Release" / subtitle) is static.
 * The two-column content underneath (date + headline + copy on the left,
 * article-card mockup on the right) auto-rotates through 3 slides on a
 * continuous, never-ending loop, crossfading between them. Hover pauses
 * the rotation; moving the mouse away resumes it automatically.
 *
 * Rotation is driven by a single requestAnimationFrame loop keyed off
 * elapsed time (via performance.now()), rather than chained setTimeouts.
 * This avoids the "sometimes takes forever to change" bug that happens
 * when the browser throttles timers (background tab, heavy paint, etc.)
 * and a queue of setTimeouts backs up — rAF just picks up where it left
 * off using real elapsed time, so it never drifts or stacks delays.
 *
 * FIX (this version): the rotation could get permanently stuck on one
 * slide. Root causes:
 *   1. Touch devices fire a synthetic "mouseenter" on tap but often never
 *      fire the matching "mouseleave" until the user taps elsewhere —
 *      so a single tap could pause the rotation forever on mobile.
 *   2. The left column's height changes between slides (different
 *      paragraph lengths), which can shift the hover box under the
 *      cursor and cause spurious pause/resume firing.
 * Fixes applied:
 *   - Use onPointerEnter/onPointerLeave and only pause for pointerType
 *     "mouse", so touch taps never pause it.
 *   - Give the rotating container a min-height so slide-to-slide height
 *     changes can't shift the hover boundary under the cursor.
 *   - Added a safety valve: if we're ever paused for longer than any
 *     genuine hover would take, the loop force-resumes itself. This
 *     guarantees the rotation can never get stuck indefinitely no
 *     matter what caused the pause to stick.
 */

const SLIDES = [
  {
    id: "sdk-launch",
    date: "JANUARY 2026",
    heading: "QuantZen Expands Quantum Security Research",
    paragraphs: [
      "Building on its December milestone, QuantZen has expanded its quantum cryptography research initiatives to accelerate post quantum readiness across decentralized and enterprise systems.",
      "This expansion focuses on real world deployment, interoperability, and performance optimization for next generation cryptographic frameworks.",
    ],
    card: "sdkDark",
  },
  {
    id: "sdk-news",
    date: "JANUARY 2026",
    heading: "QuantZen Launches Quantum Safe SDK to Strengthen Web3 Security",
    paragraphs: [
      "QuantZen introduces a next generation quantum safe SDK designed to protect Web3 applications from emerging quantum threats.",
      "The solution enables developers to build resilient, future proof decentralized systems with enhanced cryptographic security.",
    ],
    card: "newsLight",
  },
  {
    id: "infra",
    date: "DECEMBER 2025",
    heading: "Advancing Quantum-Safe Infrastructure",
    paragraphs: [
      "QuantZen is pioneering next generation quantum safe security frameworks designed to protect Web3 and digital asset ecosystems against future cryptographic threats.",
      "This milestone reinforces QuantZen's commitment to building resilient, decentralized, and future ready security solutions.",
    ],
    card: "greenBorder",
  },
];

const ROTATE_MS = 2500; // how long each slide stays fully visible (post fade-in)
const FADE_MS = 300; // fade out/in duration
const CYCLE_MS = ROTATE_MS + FADE_MS; // total time a slide "owns" before the next starts
const MAX_PAUSE_MS = 10000; // safety valve: never stay paused longer than this

export default function PressRelease() {
  const [index, setIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const pausedRef = useRef(false);
  const fadeInRef = useRef(true);
  const slideStartRef = useRef(null); // timestamp (ms) the current slide's cycle began
  const pauseStartedAtRef = useRef(null); // timestamp when pause began, to shift slideStartRef on resume
  const rafRef = useRef(null);

  const [, setPausedState] = useState(false);
  const setPaused = useCallback((val) => {
    pausedRef.current = val;
    setPausedState(val);
  }, []);

  useEffect(() => {
    function tick(timestamp) {
      if (slideStartRef.current == null) {
        slideStartRef.current = timestamp;
      }

      if (pausedRef.current) {
        // Freeze the clock while paused — remember when we paused so we can
        // shift slideStartRef forward by the same amount on resume, instead
        // of losing/gaining time.
        if (pauseStartedAtRef.current == null) {
          pauseStartedAtRef.current = timestamp;
        } else if (timestamp - pauseStartedAtRef.current > MAX_PAUSE_MS) {
          // Safety valve: we've been paused far longer than any genuine
          // hover would last (missed pointerleave, weird browser/touch
          // edge case, etc). Force resume so it can never get stuck
          // permanently.
          pausedRef.current = false;
          setPausedState(false);
        }
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      if (pauseStartedAtRef.current != null) {
        const pausedFor = timestamp - pauseStartedAtRef.current;
        slideStartRef.current += pausedFor;
        pauseStartedAtRef.current = null;
      }

      const elapsed = timestamp - slideStartRef.current;

      if (elapsed >= ROTATE_MS && fadeInRef.current) {
        fadeInRef.current = false;
        setFadeIn(false);
      }

      if (elapsed >= CYCLE_MS) {
        setIndex((prev) => (prev + 1) % SLIDES.length);
        fadeInRef.current = true;
        setFadeIn(true);
        slideStartRef.current = timestamp;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const slide = SLIDES[index];

  // Only real mouse hover pauses the rotation. Touch devices fire a
  // synthetic pointerenter on tap but frequently never fire a matching
  // pointerleave, which would otherwise pause the rotation forever.
  const handlePointerEnter = (e) => {
    if (e.pointerType === "mouse") setPaused(true);
  };
  const handlePointerLeave = (e) => {
    if (e.pointerType === "mouse") setPaused(false);
  };

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <style>{`
        .pr-transition {
          transition: opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease;
        }
        .pr-hidden {
          opacity: 0;
          transform: translateY(14px);
        }
        .pr-shown {
          opacity: 1;
          transform: translateY(0);
        }
        .pr-card-hidden {
          opacity: 0;
          transform: translateY(14px) scale(0.97);
        }
        .pr-card-shown {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      `}</style>

      {/* Static header */}
      <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 lg:mb-16">
        <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 text-indigo-600 text-xs sm:text-sm font-semibold px-3.5 sm:px-4 py-1.5 mb-5 sm:mb-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M7 8h10M7 12h10M7 16h6" />
          </svg>
          LATEST NEWS
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-3 sm:mb-4">
          Press Release
        </h2>
        <p className="text-gray-500 text-base sm:text-lg px-2">
          QuantZen joins the forefront of quantum security innovation
        </p>
      </div>

      {/* Rotating content */}
      <div
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center"
        style={{ minHeight: "auto" }}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        {/* Left: text — same DOM node throughout, only classes + content change */}
        <div
          className={`pr-transition text-center lg:text-left ${fadeIn ? "pr-shown" : "pr-hidden"}`}
          style={{ minHeight: 220 }}
        >
          <p className="text-indigo-600 font-semibold text-xs sm:text-sm tracking-wide mb-2.5 sm:mb-3">
            {slide.date}
          </p>
          <h3 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-4 sm:mb-5">
            {slide.heading}
          </h3>
          {slide.paragraphs.map((p, i) => (
            <p key={i} className="text-gray-500 text-sm sm:text-base leading-relaxed mb-3.5 sm:mb-4">
              {p}
            </p>
          ))}
        </div>

        {/* Right: card mockup — also a stable DOM node */}
        <div className="relative flex justify-center lg:justify-end w-full" style={{ minHeight: 260 }}>
          <div className="absolute -inset-6 bg-indigo-100/50 blur-3xl rounded-full" />
          <div
            className={`relative pr-transition w-full max-w-[560px] ${
              fadeIn ? "pr-card-shown" : "pr-card-hidden"
            }`}
          >
            {slide.card === "sdkDark" && <SdkDarkCard />}
            {slide.card === "newsLight" && <NewsLightCard />}
            {slide.card === "greenBorder" && <GreenBorderCard />}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Slide 1: dark gradient SDK announcement card ---------- */


function QuantZenLogoMark({ className }) {
  // Stylized interlocked-shield mark, matched to the blue geometric icon in the dark panel
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 4 L58 16 V34 C58 48 47 57 32 60 C17 57 6 48 6 34 V16 Z" fill="#1c2560" stroke="#93c5fd" strokeWidth="1.5" />
      <path d="M32 4 L58 16 V34 C58 48 47 57 32 60 V4 Z" fill="#2b3a8f" opacity="0.7" />
      <circle cx="32" cy="30" r="12" fill="none" stroke="#bfdbfe" strokeWidth="1.6" />
      <path d="M32 22 L32 30 L38 34" stroke="#e0f2fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SdkDarkCard() {
  return (
    <div className="relative w-full max-w-[560px] mx-auto">
      {/* Soft halo bleeding out from behind the card, like the screenshot */}
      <div
        className="pointer-events-none absolute -inset-6 sm:-inset-10 rounded-[32px]"
        style={{
          background:
            "radial-gradient(60% 60% at 65% 70%, rgba(129,140,248,0.35) 0%, rgba(129,140,248,0.14) 45%, transparent 75%)",
          filter: "blur(6px)",
        }}
      />

      <div
        className="relative rounded-2xl overflow-hidden bg-white border border-gray-100"
        style={{ boxShadow: "0 30px 60px -15px rgba(30,20,80,0.45), 0 10px 25px -8px rgba(0,0,0,0.2)" }}
      >
        {/* White header: title + byline */}
        <div className="px-4 sm:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4">
          <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
            QuantZen Launches Quantum Safe SDK For Web3 Projects
          </h4>
          <p className="text-[10px] sm:text-xs text-gray-400 mt-2 flex items-center flex-wrap gap-x-1.5 gap-y-1">
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded whitespace-nowrap">
              Daily, Quantum Business, Research
            </span>
            <span className="whitespace-nowrap">&nbsp;·&nbsp; Mohib Ur Rehman &nbsp;·&nbsp; January 6, 2026</span>
          </p>
        </div>

        {/* Dark section with animated atom + spark background */}
        <div className="relative h-44 sm:h-52 lg:h-56 overflow-hidden bg-[#07071a] flex flex-col items-center justify-center">
          <style>{`
            @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes spinSlowReverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
            @keyframes drift {
              0%, 100% { transform: translate(0, 0); }
              50% { transform: translate(4px, -5px); }
            }
            @keyframes pulseGlow {
              0%, 100% { opacity: .55; r: 3.2; }
              50% { opacity: 1; r: 4.2; }
            }
            @keyframes floatGlow {
              0%, 100% { transform: translate(0, 0); opacity: .5; }
              50% { transform: translate(0, -8px); opacity: .85; }
            }
            @keyframes twinkle {
              0%, 100% { opacity: 0; transform: scale(0.4); }
              50% { opacity: 1; transform: scale(1.1); }
            }
            .atom-left { transform-origin: 90px 110px; animation: spinSlow 14s linear infinite; }
            .atom-right { transform-origin: 480px 100px; animation: spinSlowReverse 18s linear infinite; }
            .atom-dot-left { animation: pulseGlow 3s ease-in-out infinite; transform-origin: 90px 110px; }
            .atom-dot-right { animation: pulseGlow 4s ease-in-out infinite; transform-origin: 480px 100px; }
            .lattice-node { animation: drift 5s ease-in-out infinite; }
            .glow-orb { animation: floatGlow 6s ease-in-out infinite; }
            .spark-twinkle { animation: twinkle 2.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          `}</style>

          <div className="glow-orb pointer-events-none absolute -top-16 -left-16 w-[220px] h-[220px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,.55)_0%,rgba(99,102,241,.12)_45%,transparent_70%)]" style={{ animationDelay: "0s" }} />
          <div className="glow-orb pointer-events-none absolute -bottom-16 -right-16 w-[220px] h-[220px] rounded-full bg-[radial-gradient(circle,rgba(186,230,253,.45)_0%,rgba(186,230,253,.1)_45%,transparent_70%)]" style={{ animationDelay: "1.5s" }} />
          <div className="glow-orb pointer-events-none absolute -top-10 -right-8 w-[140px] h-[140px] rounded-full bg-[radial-gradient(circle,rgba(186,230,253,.2)_0%,transparent_70%)]" style={{ animationDelay: "3s" }} />
          <div className="glow-orb pointer-events-none absolute -bottom-8 -left-6 w-[110px] h-[110px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,.25)_0%,transparent_70%)]" style={{ animationDelay: "0.8s" }} />

          <svg className="pointer-events-none absolute inset-0 w-full h-full" viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <g className="atom-left" opacity=".5">
              <ellipse cx="90" cy="110" rx="38" ry="18" fill="none" stroke="rgba(99,102,241,.35)" strokeWidth="1" />
              <ellipse cx="90" cy="110" rx="38" ry="18" fill="none" stroke="rgba(99,102,241,.35)" strokeWidth="1" transform="rotate(60 90 110)" />
              <ellipse cx="90" cy="110" rx="38" ry="18" fill="none" stroke="rgba(99,102,241,.35)" strokeWidth="1" transform="rotate(120 90 110)" />
              <circle r="2.6" fill="#a5b4fc">
                <animateMotion dur="4.5s" repeatCount="indefinite" rotate="auto" path="M 128,110 A 38,18 0 1,1 52,110 A 38,18 0 1,1 128,110" />
              </circle>
              <circle r="2.2" fill="#c7d2fe">
                <animateMotion dur="6s" repeatCount="indefinite" rotate="auto" path="M 121,127 A 38,18 0 1,1 59,93 A 38,18 0 1,1 121,127" transform="rotate(60 90 110)" />
              </circle>
            </g>
            <circle className="atom-dot-left" cx="90" cy="110" r="3.2" fill="rgba(129,140,248,.85)" />

            <g className="atom-right" opacity=".4">
              <ellipse cx="480" cy="100" rx="42" ry="20" fill="none" stroke="rgba(186,230,253,.4)" strokeWidth="1" />
              <ellipse cx="480" cy="100" rx="42" ry="20" fill="none" stroke="rgba(186,230,253,.4)" strokeWidth="1" transform="rotate(60 480 100)" />
              <ellipse cx="480" cy="100" rx="42" ry="20" fill="none" stroke="rgba(186,230,253,.4)" strokeWidth="1" transform="rotate(120 480 100)" />
              <circle r="2.6" fill="#bae6fd">
                <animateMotion dur="5s" repeatCount="indefinite" rotate="auto" path="M 522,100 A 42,20 0 1,1 438,100 A 42,20 0 1,1 522,100" />
              </circle>
              <circle r="2.2" fill="#e0f2fe">
                <animateMotion dur="7s" repeatCount="indefinite" rotate="auto" path="M 513,118 A 42,20 0 1,1 447,82 A 42,20 0 1,1 513,118" transform="rotate(120 480 100)" />
              </circle>
            </g>
            <circle className="atom-dot-right" cx="480" cy="100" r="3.2" fill="rgba(186,230,253,.85)" />

            <g opacity=".22">
              <line x1="160" y1="30" x2="188" y2="60" stroke="rgba(99,102,241,.5)" strokeWidth=".8" />
              <line x1="188" y1="60" x2="220" y2="42" stroke="rgba(99,102,241,.5)" strokeWidth=".8" />
              <line x1="220" y1="42" x2="192" y2="18" stroke="rgba(99,102,241,.5)" strokeWidth=".8" />
              <line x1="192" y1="18" x2="160" y2="30" stroke="rgba(99,102,241,.5)" strokeWidth=".8" />
              <circle className="lattice-node" cx="160" cy="30" r="2" fill="rgba(129,140,248,.7)" style={{ animationDelay: "0s" }} />
              <circle className="lattice-node" cx="188" cy="60" r="2" fill="rgba(129,140,248,.7)" style={{ animationDelay: "1.2s" }} />
              <circle className="lattice-node" cx="220" cy="42" r="2" fill="rgba(129,140,248,.7)" style={{ animationDelay: "2.1s" }} />
              <circle className="lattice-node" cx="192" cy="18" r="2" fill="rgba(129,140,248,.7)" style={{ animationDelay: "0.6s" }} />
            </g>

            <g>
              <circle className="spark-twinkle" cx="260" cy="35" r="1.4" fill="#e0e7ff" style={{ animationDelay: "0s" }} />
              <circle className="spark-twinkle" cx="310" cy="150" r="1.6" fill="#bae6fd" style={{ animationDelay: "0.6s" }} />
              <circle className="spark-twinkle" cx="360" cy="70" r="1.2" fill="#c7d2fe" style={{ animationDelay: "1.1s" }} />
              <circle className="spark-twinkle" cx="230" cy="120" r="1.5" fill="#e0f2fe" style={{ animationDelay: "1.7s" }} />
              <circle className="spark-twinkle" cx="400" cy="160" r="1.3" fill="#a5b4fc" style={{ animationDelay: "2.2s" }} />
              <circle className="spark-twinkle" cx="290" cy="95" r="1.1" fill="#bae6fd" style={{ animationDelay: "0.3s" }} />
              <circle className="spark-twinkle" cx="340" cy="30" r="1.4" fill="#e0e7ff" style={{ animationDelay: "1.4s" }} />
            </g>
          </svg>

           <img src="/Logo.png" alt="QuantZen" className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mb-2 sm:mb-3 opacity-95 relative z-10" />
          <div className="flex items-center gap-1 text-white text-lg sm:text-xl lg:text-2xl font-bold relative z-10">
            QuantZen<sup className="text-xs align-super">™</sup>
          </div>
          <p className="text-indigo-300 text-[10px] sm:text-xs tracking-widest mt-1.5 sm:mt-2 font-medium relative z-10 text-center px-4">
            PERPETUAL PROTECTION. ZERO FORKS.
          </p>
        </div>
      </div>

      {/* Floating button, overlapping the card's bottom-right corner */}
      <div className="absolute -bottom-4 right-3 z-20">
        <ReadFullArticleButton />
      </div>
    </div>
  );
}

/* ---------- Slide 2: light "news outlet" card ---------- */

function NewsLightCard() {
  return (
    <div className="relative w-full max-w-[560px] mx-auto">
      <div
        className="relative rounded-2xl overflow-hidden bg-white border border-gray-100"
        style={{ boxShadow: "0 30px 60px -15px rgba(30,20,80,0.35), 0 10px 25px -8px rgba(0,0,0,0.15)" }}
      >
        {/* Main masthead */}
        <div className="bg-sky-200 px-4 sm:px-5 py-2.5 sm:py-3">
          <p className="font-serif font-bold text-gray-800 tracking-wide text-center text-sm sm:text-base">
            QUANTUM COMPUTING NEWS
          </p>
        </div>

        {/* Nav sub-strip, slightly darker than the masthead, centered + italic */}
        <div className="bg-sky-300/70 px-4 sm:px-5 py-1.5 flex items-center justify-center relative">
          <p className="text-[9px] sm:text-[10px] italic text-gray-700 tracking-wide text-center px-6">
            News &nbsp;&nbsp; Op-Eds &nbsp;&nbsp; Research &nbsp;&nbsp; Events
          </p>
          <span className="w-3 h-3 rounded-sm bg-gray-800/80 absolute right-3 sm:right-5 flex items-center justify-center flex-shrink-0">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </span>
        </div>

        <div className="px-4 sm:px-5 py-5 sm:py-6 min-h-[130px] sm:min-h-[150px] text-center">
          <h4 className="text-red-600 font-serif font-bold text-lg sm:text-xl leading-snug">
            The QuantZen Unveils Quantum Safe SDK For Web3 Security
          </h4>
          <p className="text-[11px] sm:text-xs text-gray-400 mt-2.5 sm:mt-3">January 6, 2026 &nbsp;·&nbsp; 4 min read</p>
        </div>

        <p className="px-4 sm:px-5 pb-3 text-[10px] italic text-gray-300 truncate">
          QuantZen Unveils Quantum Safe SDK: A New Frontier in Web3 Security and Resilience
        </p>
      </div>

      {/* Floating button, overlapping the card's bottom-right corner */}
      <div className="absolute -bottom-4 right-3 z-20">
        <ReadFullArticleButton />
      </div>
    </div>
  );
}

/* ---------- Slide 3: black card, green accent border ---------- */
function GreenBorderCard() {
  return (
    <div className="relative w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden bg-emerald-400 p-2">
      <div className="bg-black px-4 sm:px-6 lg:px-7 pt-5 sm:pt-6 pb-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <img src="/firsticonblack.png" alt="QuantZen" className="w-16 h-16 sm:w-24 sm:h-24 lg:w-30 lg:h-30 flex-shrink-0" />
           <p className="text-gray-400 text-base sm:text-xl lg:text-2xl font-medium tracking-wide truncate">
  <span className="relative inline-block">
    QuantZen
    <span className="absolute -top-1 -right-3 text-sm sm:text-lg lg:text-xl font-bold leading-none">
      ™
    </span>
  </span>
</p>
          </div>
           <img src="/secondiconblack.png" alt="QuantZen" className="w-24 h-16 sm:w-40 sm:h-24 lg:w-52 lg:h-32 flex-shrink-0" />
        </div>
        <div className="pt-4 sm:pt-5">
          <p className="text-white text-[13px] sm:text-[15px] lg:text-[16px] leading-relaxed font-semibold">
            <span className="relative inline-block">
    QuantZen
    <span className="absolute -top-1 -right-3 text-sm sm:text-lg lg:text-xl font-bold leading-none">
      ™
    </span>{" "}
  </span>&nbsp; &nbsp; Joins Quantum Security
            <br />
            Defence to Advance Quantum Safe
            <br />
            Infrastructure Across Web3 and Digital
            <br />
            Asset Ecosystems
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Shield emblem icon for the green-bordered card ---------- */
function ShieldEmblem({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="opacity-80 flex-shrink-0">
      <path
        d="M12 2L4 5v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V5l-8-3z"
        stroke="#9CA3AF"
        strokeWidth="1.3"
        fill="rgba(255,255,255,0.04)"
      />
      <circle cx="12" cy="10.5" r="2.6" stroke="#9CA3AF" strokeWidth="1.1" fill="none" />
      <path d="M9 15.5c.8-1 2-1.5 3-1.5s2.2.5 3 1.5" stroke="#9CA3AF" strokeWidth="1.1" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Shared "Read Full Article" pill button ---------- */
function ReadFullArticleButton() {
  return (
    <span className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-[11px] sm:text-xs font-semibold px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full whitespace-nowrap">
      Read Full Article
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="flex-shrink-0">
        <path d="M7 17L17 7M17 7H9M17 7V15" />
      </svg>
    </span>
  );
}