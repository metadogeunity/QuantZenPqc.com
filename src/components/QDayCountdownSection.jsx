
import { useEffect, useState } from "react";

const Q_DAY_TARGET = new Date("2030-01-01T00:00:00Z");

function getTimeLeft() {
  const now = new Date();
  const diff = Math.max(0, Q_DAY_TARGET - now);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Hourglass() {
  return (
    <div className="qz-hourglass">
      <style>{`
        @keyframes topSandDrain {
          0%   { transform: scaleY(1); }
          85%  { transform: scaleY(0.04); }
          100% { transform: scaleY(0.04); }
        }
        @keyframes bottomSandFill {
          0%   { transform: scaleY(0.04); }
          85%  { transform: scaleY(1); }
          100% { transform: scaleY(1); }
        }
        @keyframes streamFlow {
          0%   { opacity: 0; }
          5%   { opacity: 1; }
          82%  { opacity: 1; }
          90%  { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes dropFall {
          0%   { transform: translateY(0); opacity: 0; }
          8%   { opacity: 1; }
          80%  { transform: translateY(30px); opacity: 1; }
          88%  { opacity: 0; }
          100% { opacity: 0; }
        }
        .qz-top-sand    { transform-origin: 26px 18px; animation: topSandDrain 4s ease-in-out infinite; }
        .qz-bottom-sand { transform-origin: 26px 50px; animation: bottomSandFill 4s ease-in-out infinite; }
        .qz-stream      { animation: streamFlow 4s ease-in-out infinite; }
        .qz-drop        { animation: dropFall 4s ease-in-out infinite; }
      `}</style>

      <svg width="48" height="66" viewBox="0 0 52 72" fill="none">
        <defs>
          <linearGradient id="sandGradBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
          <linearGradient id="frameGradBlue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a5b4fc" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>

          <clipPath id="topClipCurve">
            <path d="M9 7
                     C9 18, 14 26, 26 34
                     C38 26, 43 18, 43 7
                     Z" />
          </clipPath>
          <clipPath id="bottomClipCurve">
            <path d="M26 34
                     C14 42, 9 50, 9 65
                     H43
                     C43 50, 38 42, 26 34
                     Z" />
          </clipPath>
        </defs>

        <rect x="4" y="2" width="44" height="5" rx="2.5" fill="url(#frameGradBlue)" />
        <rect x="4" y="65" width="44" height="5" rx="2.5" fill="url(#frameGradBlue)" />

        <path
          d="M9 7
             C9 18, 14 26, 26 34
             C38 26, 43 18, 43 7
             M26 34
             C14 42, 9 50, 9 65
             M26 34
             C38 42, 43 50, 43 65"
          stroke="#6366f1"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M9 7 C9 18, 14 26, 26 34 C38 26, 43 18, 43 7 Z
             M26 34 C14 42, 9 50, 9 65 H43 C43 50, 38 42, 26 34 Z"
          fill="rgba(99,102,241,0.05)"
        />

        <g clipPath="url(#topClipCurve)">
          <rect className="qz-top-sand" x="9" y="9" width="34" height="26" fill="url(#sandGradBlue)" />
        </g>

        <g clipPath="url(#bottomClipCurve)">
          <rect className="qz-bottom-sand" x="9" y="36" width="34" height="29" fill="url(#sandGradBlue)" />
        </g>

        <rect className="qz-stream" x="25" y="32" width="2" height="10" fill="#7dd3fc" />
        <circle className="qz-drop" cx="26" cy="34" r="1.6" fill="#7dd3fc" />
      </svg>
    </div>
  );
}

function TimeBox({ value, label }) {
  return (
    <div
      className="flex h-[74px] w-[74px] flex-col items-center justify-center rounded-2xl text-white shadow-[0_6px_20px_rgba(99,102,241,0.25)] max-[480px]:h-[62px] max-[480px]:w-[62px]"
      style={{ background: "linear-gradient(160deg, #38bdf8 0%, #6366f1 55%, #7c3aed 100%)" }}
    >
      <span className="text-[22px] font-extrabold leading-none max-[480px]:text-[17px]">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-indigo-100 max-[480px]:text-[8px]">
        {label}
      </span>
    </div>
  );
}

export default function QDayCountdownSection() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
        <div className="relative overflow-hidden pt-2 pb-12">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/3 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(99,102,241,0.14), rgba(186,230,253,0.2), transparent)" }}
      />

      <div className="relative mx-auto flex max-w-[720px] flex-col items-center px-6 text-center">
        <h2
          className="flex items-center gap-2 text-[34px] font-extrabold tracking-tight max-[600px]:text-[24px]"
          style={{
            background: "linear-gradient(135deg, #38bdf8, #4f46e5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          COUNTDOWN TO Q-DAY <span className="text-[#7dd3fc]">✨</span>
        </h2>

        <p className="mt-3 text-[16px] text-slate-500 max-[600px]:text-[14px]">
          The quantum era is approaching. Secure your Web3 infrastructure today.
        </p>

        <div className="mt-10 flex items-center gap-10 max-[600px]:flex-col max-[600px]:gap-6">
          <Hourglass />
          <div className="flex items-center gap-4 max-[480px]:gap-3">
            <TimeBox value={time.days} label="Days" />
            <TimeBox value={time.hours} label="Hours" />
            <TimeBox value={time.minutes} label="Minutes" />
            <TimeBox value={time.seconds} label="Seconds" />
          </div>
        </div>
       
      </div>
    </div>
  

  );
}