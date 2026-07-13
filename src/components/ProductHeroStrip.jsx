import { useEffect, useRef } from "react";

export default function ProductHeroStrip() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    let W, H, pts = [], angle = 0, animId;

    function resize() {
      W = c.offsetWidth; H = c.offsetHeight;
      c.width = W * devicePixelRatio; c.height = H * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      pts = [];
      for (let i = 0; i < 32; i++) {
        pts.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
          r: Math.random() * 1.4 + .5,
          col: Math.random() > .5 ? 0 : 1,
          p: Math.random() * Math.PI * 2,
        });
      }
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);
      angle += 0.4;

      // grid
      ctx.strokeStyle = "rgba(99,102,241,0.05)"; ctx.lineWidth = 1;
      for (let i = 0; i < W; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke(); }
      for (let j = 0; j < H; j += 40) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(W, j); ctx.stroke(); }

      pts.forEach(p => { p.x += p.vx; p.y += p.vy; p.p += .025; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; });

      // edges
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 100) {
          const al = (1 - d / 100) * .2;
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = pts[i].col === 0 ? `rgba(99,102,241,${al})` : `rgba(186,230,253,${al})`;
          ctx.lineWidth = .7; ctx.stroke();
        }
      }

      // dots
      pts.forEach(p => {
        const pulse = .5 + .5 * Math.sin(p.p);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col === 0 ? `rgba(99,102,241,${.5 + pulse * .4})` : `rgba(186,230,253,${.5 + pulse * .4})`;
        ctx.fill();
      });

      // left atom
      [0, 60, 120].forEach(deg => {
        ctx.save(); ctx.translate(W * .08, H * .5); ctx.rotate((deg + angle) * Math.PI / 180);
        ctx.beginPath(); ctx.ellipse(0, 0, 28, 11, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(99,102,241,0.35)"; ctx.lineWidth = .8; ctx.stroke();
        ctx.beginPath(); ctx.arc(28 * Math.cos(angle * Math.PI / 180), 11 * Math.sin(angle * Math.PI / 180), 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(129,140,248,.9)"; ctx.fill();
        ctx.restore();
      });
      ctx.beginPath(); ctx.arc(W * .08, H * .5, 3, 0, Math.PI * 2); ctx.fillStyle = "rgba(99,102,241,.8)"; ctx.fill();

      // right atom
      [0, 60, 120].forEach(deg => {
        ctx.save(); ctx.translate(W * .92, H * .5); ctx.rotate((deg - angle * .8) * Math.PI / 180);
        ctx.beginPath(); ctx.ellipse(0, 0, 28, 11, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(186,230,253,0.3)"; ctx.lineWidth = .8; ctx.stroke();
        ctx.beginPath(); ctx.arc(28 * Math.cos(-angle * .8 * Math.PI / 180), 11 * Math.sin(-angle * .8 * Math.PI / 180), 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(186,230,253,.9)"; ctx.fill();
        ctx.restore();
      });
      ctx.beginPath(); ctx.arc(W * .92, H * .5, 3, 0, Math.PI * 2); ctx.fillStyle = "rgba(186,230,253,.7)"; ctx.fill();

      animId = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", () => { cancelAnimationFrame(animId); resize(); frame(); });
    frame();
    return () => { cancelAnimationFrame(animId); };
  }, []);

  return (
    <div className="relative overflow-hidden bg-[#07071a]" style={{ height: 80 }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* corner lights */}
      <div className="pointer-events-none absolute -top-14 -left-14 w-[220px] h-[220px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(99,102,241,0.5) 0%,rgba(99,102,241,0.1) 50%,transparent 70%)" }} />
      <div className="pointer-events-none absolute -top-14 -right-14 w-[220px] h-[220px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(186,230,253,0.4) 0%,rgba(186,230,253,0.08) 50%,transparent 70%)" }} />

      {/* fade to white at bottom */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0"
        style={{ height: 40, background: "linear-gradient(to bottom, transparent, #ffffff)" }}
      />
    </div>
  );
}