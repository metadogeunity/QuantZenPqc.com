import { useState } from "react";
import { Mail } from "lucide-react";
export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await new Promise((res) => setTimeout(res, 900));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      className="relative left-1/2 w-screen -translate-x-1/2 flex items-center justify-center overflow-hidden px-6 py-24"
      style={{
        background:
          "linear-gradient(135deg, #e9e4fb 0%, #eef1fb 35%, #f4eefb 65%, #ece6fb 100%)",
      }}
    >
      <style>{`
        @property --border-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes borderSpin {
          to { --border-angle: 360deg; }
        }

        .qz-border-wrap {
          position: relative;
          padding: 1.5px;
          border-radius: 25.5px;
          background: linear-gradient(rgba(99,102,241,0.08), rgba(99,102,241,0.08));
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;
          --border-angle: 0deg;
        }

        .qz-border-wrap:hover {
          transform: scale(1.03) translateY(-4px);
          box-shadow: 0 20px 55px rgba(99, 102, 241, 0.22);
          background: conic-gradient(
            from var(--border-angle),
            rgba(99,102,241,0.1) 0%,
            #6366f1 8%,
            #a5b4fc 14%,
            #7dd3fc 20%,
            rgba(99,102,241,0.1) 30%,
            rgba(99,102,241,0.1) 100%
          );
          animation: borderSpin 2.8s linear infinite;
        }

        .qz-inner-card {
          border-radius: 24px;
          background: rgba(255,255,255,0.94);
        }
      `}</style>

      <div className="qz-border-wrap w-full max-w-[600px]">
        <div className="qz-inner-card p-10 backdrop-blur-sm max-[640px]:p-7">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
                <Mail size={16} />
              </span>
              <span className="text-[15px] font-bold tracking-[0.02em] text-slate-900">
                THE Q2Z NEWSLETTER
              </span>
            </div>

            <p className="max-w-[440px] text-[15px] leading-relaxed text-slate-500">
              Your Friday 5 minute read on post quantum security, Web3 risk,
              and practical migration insights. Stay informed subscribe to
              get the latest in your inbox.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-7 flex w-full max-w-[400px] flex-col gap-3"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-[14px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-lg py-2.5 text-[14px] font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-70"
                style={{
                  background: "linear-gradient(135deg, #6d28d9, #4f46e5)",
                }}
              >
                {status === "loading"
                  ? "Subscribing..."
                  : status === "success"
                  ? "Subscribed ✓"
                  : "Subscribe"}
              </button>
            </form>

            <p className="mt-4 text-[12px] text-slate-400">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
       
      </div>
      
    </section>
  );
}