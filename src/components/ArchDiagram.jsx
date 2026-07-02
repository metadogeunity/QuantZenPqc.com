// import { Fragment, useEffect, useRef } from "react";

// const nodes = [
//   { id: "app",     title: "Your App",     detail: "client · service", label: "No changes needed", icon: "ti-device-laptop", highlight: false },
//   { id: "qz",      title: "QuantZen™",    detail: "middleware",       label: "Encrypts in transit", icon: "ti-shield-lock",   highlight: true  },
//   { id: "gateway", title: "API Gateway",  detail: "existing infra",  label: "Unchanged",          icon: "ti-server",         highlight: false },
//   { id: "backend", title: "Your Backend", detail: "services · DBs",  label: "No changes needed", icon: "ti-database",       highlight: false },
// ];

// export default function ArchDiagram() {
//   const nodeRefs = useRef([]);
//   const lineRefs = useRef([]);
//   const headRefs = useRef([]);

//   useEffect(() => {
//     const HOLD = 600, TRAVEL = 400, PAUSE = 800;

//     function clearAll() {
//       nodeRefs.current.forEach(n => n?.classList.remove("lit"));
//       lineRefs.current.forEach(l => l?.classList.remove("lit", "moving"));
//       headRefs.current.forEach(h => h?.classList.remove("lit"));
//     }

//     function step(i) {
//       nodeRefs.current[i]?.classList.add("lit");
//       if (i < 3) {
//         setTimeout(() => {
//           lineRefs.current[i]?.classList.add("lit", "moving");
//           headRefs.current[i]?.classList.add("lit");
//           setTimeout(() => step(i + 1), TRAVEL);
//         }, HOLD);
//       } else {
//         setTimeout(() => { clearAll(); setTimeout(() => step(0), 200); }, PAUSE);
//       }
//     }

//     const t = setTimeout(() => step(0), 600);
//     return () => clearTimeout(t);
//   }, []);

//   return (
//     <>
//       <style>{`
//         @keyframes blobPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1);opacity:.7} }
//         @keyframes dashMove { to { stroke-dashoffset: -16; } }
//         .arch-node-box { width:100%; max-width:148px; padding:18px 12px; border-radius:16px;
//           text-align:center; background:#fff; border:1.5px solid rgba(99,102,241,0.13);
//           box-shadow:0 2px 12px rgba(99,102,241,0.05);
//           transition: transform .3s ease, box-shadow .3s ease, background .4s ease, border-color .4s ease; }
//         .arch-node-box.lit { background:linear-gradient(145deg,rgba(186,230,253,0.7),rgba(186,230,253,0.22));
//           border-color:rgba(99,102,241,0.5); transform:translateY(-4px);
//           box-shadow:0 6px 32px rgba(99,102,241,0.22),0 0 0 4px rgba(99,102,241,0.07); }
//         .arch-icon { width:40px;height:40px;border-radius:11px;display:flex;align-items:center;
//           justify-content:center;margin:0 auto 10px;font-size:18px;line-height:1;
//           background:rgba(186,230,253,0.45);border:1px solid rgba(99,102,241,0.14);
//           transition:background .4s ease,border-color .4s ease; }
//         .arch-node-box.lit .arch-icon { background:rgba(99,102,241,0.13);border-color:rgba(99,102,241,0.3); }
//         .arch-name { font-size:12.5px;font-weight:600;color:#1e1b4b;letter-spacing:-.01em;transition:color .3s; }
//         .arch-node-box.lit .arch-name { color:#3730a3; }
//         .arch-mono { font-size:10px;font-family:monospace;color:#94a3b8;margin-top:3px;transition:color .3s; }
//         .arch-node-box.lit .arch-mono { color:#6366f1; }
//         .arch-arrow-line { stroke-dasharray:5 3; transition:stroke .3s; }
//         .arch-arrow-line.lit { stroke:rgba(99,102,241,0.7) !important; }
//         .arch-arrow-line.moving { animation:dashMove 1s linear infinite; }
//         .arch-arrow-head { transition:stroke .3s; }
//         .arch-arrow-head.lit { stroke:rgba(99,102,241,0.9) !important; }
//       `}</style>

//       <div className="relative overflow-hidden rounded-[24px] mt-10"
//         style={{ background:"linear-gradient(135deg,#f0f7ff 0%,#fafafe 60%,#fff 100%)",
//           border:"1px solid rgba(99,102,241,0.15)", padding:"40px 32px 32px" }}>

//         {/* Blobs */}
//         <div className="pointer-events-none absolute -right-14 -top-14 h-52 w-52 rounded-full"
//           style={{ background:"radial-gradient(circle,rgba(186,230,253,0.55) 0%,transparent 70%)",
//             animation:"blobPulse 4s ease-in-out infinite" }} />
//         <div className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full"
//           style={{ background:"radial-gradient(circle,rgba(99,102,241,0.08) 0%,transparent 70%)",
//             animation:"blobPulse 5s ease-in-out infinite reverse" }} />

//         <p className="relative z-10 mb-8 text-[11px] font-semibold uppercase tracking-[0.16em]"
//           style={{ color:"#6366f1" }}>Traffic flow</p>

//         <div className="relative z-10 flex items-center justify-center">
//           {nodes.map((node, i) => (
//             <Fragment key={node.id}>
//               {i > 0 && (
//                 <div className="flex-shrink-0 px-0.5 pb-7">
//                   <svg width="52" height="20" viewBox="0 0 52 20" fill="none">
//                     <line ref={el => lineRefs.current[i-1] = el}
//                       className="arch-arrow-line"
//                       x1="2" y1="10" x2="38" y2="10"
//                       stroke="rgba(99,102,241,0.22)" strokeWidth="1.5"/>
//                     <polyline ref={el => headRefs.current[i-1] = el}
//                       className="arch-arrow-head"
//                       points="33,5 41,10 33,15"
//                       stroke="rgba(99,102,241,0.35)" strokeWidth="1.5"
//                       fill="none" strokeLinejoin="round" strokeLinecap="round"/>
//                   </svg>
//                 </div>
//               )}
//               <div className="flex flex-1 flex-col items-center gap-2.5 min-w-0">
//                 {node.highlight
//                   ? <span className="text-[9px] font-bold uppercase tracking-[0.14em] rounded-full px-2.5 py-0.5"
//                       style={{ color:"#6366f1",background:"rgba(99,102,241,0.09)",border:"1px solid rgba(99,102,241,0.22)" }}>
//                       PQC Layer
//                     </span>
//                   : <div className="h-[24px]" />
//                 }
//                 <div ref={el => nodeRefs.current[i] = el} className="arch-node-box">
//                   <div className="arch-icon">
//                     <i className={`ti ${node.icon}`} style={{ color:"#4338ca" }} />
//                   </div>
//                   <div className="arch-name">{node.title}</div>
//                   <div className="arch-mono">{node.detail}</div>
//                 </div>
//                 <span className="text-[10px] text-center" style={{ color:"#b0b7c3" }}>{node.label}</span>
//               </div>
//             </Fragment>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }








import { Fragment, useEffect, useRef } from "react";

const nodes = [
  { id: "app",     title: "Your App",     detail: "client · service", label: "No changes needed", icon: "ti-device-laptop", highlight: false },
  { id: "qz",      title: "QuantZen™",    detail: "middleware",       label: "Encrypts in transit", icon: "ti-shield-lock",   highlight: true  },
  { id: "gateway", title: "API Gateway",  detail: "existing infra",  label: "Unchanged",          icon: "ti-server",         highlight: false },
  { id: "backend", title: "Your Backend", detail: "services · DBs",  label: "No changes needed", icon: "ti-database",       highlight: false },
];

export default function ArchDiagram() {
  const nodeRefs = useRef([]);
  const lineRefs = useRef([]);
  const headRefs = useRef([]);

  useEffect(() => {
    const HOLD = 600, TRAVEL = 400, PAUSE = 800;

    function clearAll() {
      nodeRefs.current.forEach(n => n?.classList.remove("lit"));
      lineRefs.current.forEach(l => l?.classList.remove("lit", "moving"));
      headRefs.current.forEach(h => h?.classList.remove("lit"));
    }

    function step(i) {
      nodeRefs.current[i]?.classList.add("lit");
      if (i < 3) {
        setTimeout(() => {
          lineRefs.current[i]?.classList.add("lit", "moving");
          headRefs.current[i]?.classList.add("lit");
          setTimeout(() => step(i + 1), TRAVEL);
        }, HOLD);
      } else {
        setTimeout(() => { clearAll(); setTimeout(() => step(0), 200); }, PAUSE);
      }
    }

    const t = setTimeout(() => step(0), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @keyframes blobPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1);opacity:.7} }
        @keyframes dashMove { to { stroke-dashoffset: -16; } }
        @keyframes dashMoveVertical { to { stroke-dashoffset: -16; } }

        .arch-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          margin-top: 2.5rem;
          background: linear-gradient(135deg,#f0f7ff 0%,#fafafe 60%,#fff 100%);
          border: 1px solid rgba(99,102,241,0.15);
          padding: clamp(24px, 6vw, 40px) clamp(16px, 5vw, 32px) clamp(20px, 4vw, 32px);
          box-sizing: border-box;
        }

        .arch-eyebrow {
          position: relative;
          z-index: 10;
          margin-bottom: clamp(20px, 4vw, 32px);
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #6366f1;
        }

        .arch-row {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: nowrap;
          gap: 0;
        }

        .arch-node-col {
          display: flex;
          flex: 1 1 0;
          min-width: 0;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .arch-badge-slot {
          height: 24px;
          display: flex;
          align-items: center;
        }

        .arch-badge {
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          border-radius: 999px;
          padding: 2px 10px;
          color: #6366f1;
          background: rgba(99,102,241,0.09);
          border: 1px solid rgba(99,102,241,0.22);
          white-space: nowrap;
        }

        .arch-node-box {
          width: 100%;
          max-width: 148px;
          padding: clamp(12px, 3vw, 18px) clamp(8px, 2vw, 12px);
          border-radius: 16px;
          text-align: center;
          background: #fff;
          border: 1.5px solid rgba(99,102,241,0.13);
          box-shadow: 0 2px 12px rgba(99,102,241,0.05);
          box-sizing: border-box;
          transition: transform .3s ease, box-shadow .3s ease, background .4s ease, border-color .4s ease;
        }
        .arch-node-box.lit {
          background: linear-gradient(145deg,rgba(186,230,253,0.7),rgba(186,230,253,0.22));
          border-color: rgba(99,102,241,0.5);
          transform: translateY(-4px);
          box-shadow: 0 6px 32px rgba(99,102,241,0.22), 0 0 0 4px rgba(99,102,241,0.07);
        }

        .arch-icon {
          width: clamp(32px, 8vw, 40px);
          height: clamp(32px, 8vw, 40px);
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto clamp(6px, 2vw, 10px);
          font-size: clamp(15px, 3.5vw, 18px);
          line-height: 1;
          background: rgba(186,230,253,0.45);
          border: 1px solid rgba(99,102,241,0.14);
          transition: background .4s ease, border-color .4s ease;
        }
        .arch-node-box.lit .arch-icon { background: rgba(99,102,241,0.13); border-color: rgba(99,102,241,0.3); }

        .arch-name {
          font-size: clamp(11px, 2.6vw, 12.5px);
          font-weight: 600;
          color: #1e1b4b;
          letter-spacing: -0.01em;
          transition: color .3s;
        }
        .arch-node-box.lit .arch-name { color: #3730a3; }

        .arch-mono {
          font-size: clamp(9px, 2.2vw, 10px);
          font-family: monospace;
          color: #94a3b8;
          margin-top: 3px;
          transition: color .3s;
        }
        .arch-node-box.lit .arch-mono { color: #6366f1; }

        .arch-caption {
          font-size: 10px;
          text-align: center;
          color: #b0b7c3;
        }

        .arch-arrow-cell {
          flex: 0 0 auto;
          padding: 0 2px 28px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .arch-arrow-line { stroke-dasharray: 5 3; transition: stroke .3s; }
        .arch-arrow-line.lit { stroke: rgba(99,102,241,0.7) !important; }
        .arch-arrow-line.moving { animation: dashMove 1s linear infinite; }
        .arch-arrow-head { transition: stroke .3s; }
        .arch-arrow-head.lit { stroke: rgba(99,102,241,0.9) !important; }

        /* Stack vertically on narrow screens */
        @media (max-width: 640px) {
          .arch-row {
            flex-direction: column;
            align-items: center;
          }
          .arch-node-col {
            width: 100%;
            max-width: 220px;
          }
          .arch-arrow-cell {
            padding: 6px 0;
            transform: rotate(90deg);
          }
          .arch-arrow-line.moving { animation: dashMoveVertical 1s linear infinite; }
        }

        @media (min-width: 641px) and (max-width: 860px) {
          .arch-node-box { max-width: 120px; }
          .arch-arrow-cell svg { width: 34px; }
        }
      `}</style>

      <div className="arch-wrap">
        {/* Blobs */}
        <div className="pointer-events-none absolute -right-14 -top-14 h-52 w-52 rounded-full"
          style={{ background:"radial-gradient(circle,rgba(186,230,253,0.55) 0%,transparent 70%)",
            animation:"blobPulse 4s ease-in-out infinite" }} />
        <div className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full"
          style={{ background:"radial-gradient(circle,rgba(99,102,241,0.08) 0%,transparent 70%)",
            animation:"blobPulse 5s ease-in-out infinite reverse" }} />

        <p className="arch-eyebrow">Traffic flow</p>

        <div className="arch-row">
          {nodes.map((node, i) => (
            <Fragment key={node.id}>
              {i > 0 && (
                <div className="arch-arrow-cell">
                  <svg width="52" height="20" viewBox="0 0 52 20" fill="none">
                    <line ref={el => lineRefs.current[i-1] = el}
                      className="arch-arrow-line"
                      x1="2" y1="10" x2="38" y2="10"
                      stroke="rgba(99,102,241,0.22)" strokeWidth="1.5"/>
                    <polyline ref={el => headRefs.current[i-1] = el}
                      className="arch-arrow-head"
                      points="33,5 41,10 33,15"
                      stroke="rgba(99,102,241,0.35)" strokeWidth="1.5"
                      fill="none" strokeLinejoin="round" strokeLinecap="round"/>
                  </svg>
                </div>
              )}
              <div className="arch-node-col">
                {node.highlight
                  ? <span className="arch-badge-slot"><span className="arch-badge">PQC Layer</span></span>
                  : <div className="arch-badge-slot" />
                }
                <div ref={el => nodeRefs.current[i] = el} className="arch-node-box">
                  <div className="arch-icon">
                    <i className={`ti ${node.icon}`} style={{ color:"#4338ca" }} />
                  </div>
                  <div className="arch-name">{node.title}</div>
                  <div className="arch-mono">{node.detail}</div>
                </div>
                <span className="arch-caption">{node.label}</span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}