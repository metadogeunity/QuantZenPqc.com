import { useRef, useState, useEffect } from "react";
import PageMeta from "../components/PageMeta";
import Eyebrow from "../components/Eyebrow";
import Card from "../components/Card";
import ArchDiagram from "../components/ArchDiagram";
import CtaBand from "../components/CtaBand";
import Wrap from "../components/Wrap";
import Section from "../components/Section";
import ProductHeroStrip from "../components/ProductHeroStrip";
import AtomDivider from "../components/AtomDivider";

const productArchNodes = [
  { id: "app",     title: "Application",              detail: "client / mobile / service",                              icon: "ti-device-laptop", highlight: false },
  { id: "qz",      title: "QuantZen™ Security Layer",  detail: "SDK · interception · crypto · verify · policy · audit",  icon: "ti-shield-lock",   highlight: true  },
  { id: "gateway", title: "API Gateway",               detail: "existing gateway",                                       icon: "ti-server",        highlight: false },
  { id: "backend", title: "Backend Systems",           detail: "core unchanged",                                         icon: "ti-database",      highlight: false },
];

const gatewayChips = [
  "Kong",
  "NGINX",
  "Envoy",
  "Apigee",
  "AWS API Gateway",
  "Azure API Management",
];

const components = [
  {
    num: "01",
    title: "API interception layer",
    body: "Transparently intercepts outbound and inbound API calls including POST, PUT, and PATCH and applies protection without blocking application flow. Selection is policy driven, so unprotected endpoints pass through cleanly.",
  },
  {
    num: "02",
    title: "Endpoint SDK / middleware",
    body: "A lightweight library for Node.js, Python, and Java, or a sidecar/gateway proxy. Embeds at the boundary and operates without modifying the host application.",
  },
  {
    num: "03",
    title: "Post quantum authentication",
    body: "Binds authenticity and integrity to every request with ML DSA (Dilithium) digital signatures, so tampered or forged requests are rejected before processing.",
  },
  {
    num: "04",
    title: "Post quantum key establishment",
    body: "Establishes session secrets with ML KEM (Kyber) key encapsulation, with ephemeral keys held only in volatile memory and destroyed at session end.",
  },
  {
    num: "05",
    title: "Payload integrity verification",
    body: "Authenticated encryption (ChaCha20 Poly1305 / AES 256 GCM) protects the payload itself, detecting any modification in transit not just on the transport hop.",
  },
  {
    num: "06",
    title: "Verification engine",
    body: "Server side middleware decrypts, verifies signatures, checks replay protections, and forwards clean plaintext to backend logic or rejects and logs the request.",
  },
  {
    num: "07",
    title: "Policy engine",
    body: "Centralized control over enabled algorithms, protected domains, threat responses, and audit destinations distributed across the estate as data, not code.",
  },
  {
    num: "08",
    title: "Audit framework",
    body: "Generates a tamper evident record for every protected request timestamp, source, algorithm, verification result, and threat outcome for regulatory evidence.",
  },
];

export default function ProductHero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, nodes = [], animId, atomAngle = 0;
    const INDIGO = "rgba(99,102,241,";
    const SKY = "rgba(186,230,253,";

    function resize() {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W * devicePixelRatio; canvas.height = H * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      init();
    }

    function init() {
      nodes = [];
      for (let i = 0; i < 28; i++) {
        nodes.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - .5) * 0.28, vy: (Math.random() - .5) * 0.28,
          r: Math.random() * 1.8 + 0.8,
          color: Math.random() > 0.5 ? "indigo" : "sky",
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }

    function drawAtom(cx, cy, rx, ry, color, angle) {
      const col = color === "indigo" ? INDIGO : SKY;
      [0, 60, 120].forEach(deg => {
        const a = (deg + angle) * Math.PI / 180;
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(a);
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = col + "0.3)"; ctx.lineWidth = 0.8; ctx.stroke();
        const ex = rx * Math.cos(angle * Math.PI / 180);
        const ey = ry * Math.sin(angle * Math.PI / 180);
        ctx.beginPath(); ctx.arc(ex, ey, 2, 0, Math.PI * 2);
        ctx.fillStyle = col + "0.8)"; ctx.fill();
        ctx.restore();
      });
      ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = col + "0.7)"; ctx.fill();
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);
      atomAngle += 0.3;

      ctx.strokeStyle = "rgba(99,102,241,0.045)"; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 44) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 44) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.pulse += 0.02;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.18;
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = (nodes[i].color === "indigo" && nodes[j].color === "indigo") ? INDIGO + alpha + ")" : SKY + alpha + ")";
            ctx.lineWidth = 0.7; ctx.stroke();
          }
        }
      }

      nodes.forEach(n => {
        const col = n.color === "indigo" ? INDIGO : SKY;
        const pulse = 0.5 + 0.5 * Math.sin(n.pulse);
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = col + (0.5 + pulse * 0.3) + ")"; ctx.fill();
      });

      drawAtom(W * 0.1, H * 0.48, 36, 16, "indigo", atomAngle);
      drawAtom(W * 0.9, H * 0.52, 40, 18, "sky", -atomAngle * 0.8);

      animId = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", () => { cancelAnimationFrame(animId); resize(); });
    frame();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <>
      <div className="relative overflow-hidden bg-[#07071a]" style={{ borderRadius: 0, height: 320 }}>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        <div className="pointer-events-none absolute -top-24 -left-24 w-[360px] h-[360px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(99,102,241,0.35) 0%,rgba(99,102,241,0.08) 45%,transparent 70%)" }} />
        <div className="pointer-events-none absolute -bottom-20 -right-20 w-[300px] h-[300px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(186,230,253,0.28) 0%,rgba(186,230,253,0.06) 45%,transparent 70%)" }} />
        <div className="mb-14 flex flex-col items-center text-center">
             <span className="mb-[18px] inline-flex items-center gap-[6px] rounded-full border border-indigo-500/30 bg-indigo-500/15 px-4 py-[5px] text-[11px] font-semibold uppercase tracking-widest text-indigo-300">
            The platform
          </span>
            <h2 className="mt-3.5 max-w-[760px] text-[34px] font-bold text-white max-[860px]:text-[27px] mt-4">
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)", backgroundSize: "200% auto", animation: "shimmer 3s linear infinite" }}>
                  QuantZen™{" "}
              </span>{" "}
               quantum safe middleware<br className="hidden sm:block" /> for API communication.
            </h2>
            <p className="mt-4.5 max-w-[620px] text-lg leading-relaxed text-gray-500">
              A modular security layer that intercepts API traffic, applies post quantum cryptography, and records an immutable audit trail without changing the systems it protects.
            </p>
          </div>
      </div>

      {/* dark hero → white section: the only real color-jump boundary on this page */}
      <AtomDivider from="#ffffff" to="#ffffff" />

      <Section className="relative overflow-hidden bg-white">
        <div className="flex flex-col items-center text-center mb-2">
          <ArchDiagram nodes={productArchNodes} chips={gatewayChips} spaced />
        </div>
      </Section>

      {/* white → white */}
      <AtomDivider from="#ffffff" to="#ffffff" />

      {/* ── Section 2: Platform components ── */}
      <Section className="bg-white relative overflow-hidden">
        <div
          className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] rounded-full blur-[120px] opacity-60 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(186,230,253,0.9) 0%, rgba(99,102,241,0.42) 55%, transparent 75%)",
          }}
        />
        <div
          className="absolute -bottom-[160px] -left-[160px] w-[420px] h-[420px] rounded-full blur-[110px] opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.42) 0%, transparent 70%)",
          }}
        />

        <Wrap className="relative">
          <div className="mb-14 flex flex-col items-center text-center">
             <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-indigo-500">
              Platform components
            </span>
            <h2 className="mt-3.5 max-w-[760px] text-[34px] font-bold text-slate-900 max-[860px]:text-[27px]">
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)", backgroundSize: "200% auto", animation: "shimmer 3s linear infinite" }}>
                  Eight components,{" "}
              </span>{" "}
                    one cohesive layer{" "}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 max-[860px]:grid-cols-1">
            {components.map((c) => (
              <div
                key={c.num}
                className="group relative rounded-[20px] p-[1px] transition-transform duration-300 hover:-translate-y-1"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(99,102,241,0.42), rgba(186,230,253,0.9))",
                }}
              >
                <div className="relative h-full rounded-[19px] bg-white p-7 overflow-hidden">
                  <div
                    className="absolute -top-10 -right-10 w-[140px] h-[140px] rounded-full blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(186,230,253,0.9), rgba(99,102,241,0.42))",
                    }}
                  />

                  <div
                    className="relative w-11 h-11 rounded-full flex items-center justify-center mb-5 font-mono text-[12px] font-bold text-white shadow-md"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(99,102,241,1), rgba(56,131,217,1))",
                    }}
                  >
                    {c.num}
                  </div>

                  <h3 className="relative text-[17px] font-bold text-gray-950 mb-2.5 leading-snug">
                    {c.title}
                  </h3>
                  <p className="relative text-[13.5px] text-slate-500 leading-[1.7]">
                    {c.body}
                  </p>

                  <div
                    className="absolute bottom-0 left-7 right-7 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(99,102,241,0.6), rgba(186,230,253,0.9))",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* white → white */}
      <AtomDivider from="#ffffff" to="#ffffff" />

      {/* ── Section 3: Integration + CTA ── */}
      <Section className="bg-white">
        <Wrap>
          <div className="mb-14 flex flex-col items-center text-center">
             <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-indigo-500">
              Integration
            </span>
            <h2 className="mt-3.5 max-w-[760px] text-[34px] font-bold text-slate-900 max-[860px]:text-[27px]">
              Built to sit beside your{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)", backgroundSize: "200% auto", animation: "shimmer 3s linear infinite" }}>
                 Stack
              </span>{" "}
                    not inside it.{" "}
            </h2>
            <p className="mt-4.5 max-w-[620px] text-lg leading-relaxed text-gray-500">
              QuantZen integrates with the API gateways and infrastructure you
              already operate. It runs as a stateless layer at the boundary, so
              traffic continues to flow through your existing gateway to
              unchanged backend services. Adoption is incremental protect one
              domain or route first, then expand by policy.
            </p>
          </div>

          <CtaBand
            heading="Map QuantZen to your architecture."
            body="We'll review your gateway, protocols, and payload formats and show exactly where the layer fits."
            ctaLabel="Talk to our engineers →"
          />
        </Wrap>
      </Section>
    </>
  );
}





