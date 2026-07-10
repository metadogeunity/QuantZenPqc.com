import { Fragment, useEffect, useMemo, useRef } from "react";

const defaultNodes = [
  { id: "app",     title: "Your App",     detail: "client · service", label: "No changes needed", icon: "ti-device-laptop", highlight: false },
  { id: "qz",      title: "QuantZen™",    detail: "middleware",       label: "Encrypts in transit", icon: "ti-shield-lock",   highlight: true  },
  { id: "gateway", title: "API Gateway",  detail: "existing infra",  label: "Unchanged",          icon: "ti-server",         highlight: false },
  { id: "backend", title: "Your Backend", detail: "services · DBs",  label: "No changes needed", icon: "ti-database",       highlight: false },
];

export default function ArchDiagram({ nodes: nodesProp }) {
  const nodes = nodesProp || defaultNodes;
  const nodeRefs = useRef([]);
  const lineRefs = useRef([]);
  const headRefs = useRef([]);

  useEffect(() => {
    const HOLD = 600, TRAVEL = 400, PAUSE = 800;
    const last = nodes.length - 1;

    function clearAll() {
      nodeRefs.current.forEach(n => n?.classList.remove("lit"));
      lineRefs.current.forEach(l => l?.classList.remove("lit", "moving"));
      headRefs.current.forEach(h => h?.classList.remove("lit"));
    }

    function step(i) {
      nodeRefs.current[i]?.classList.add("lit");
      if (i < last) {
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
  }, [nodes]);

  // Build "1fr auto 1fr auto ... 1fr" so every node column is an equal
  // fraction of the row, and every arrow column just hugs its own content.
  const gridTemplateColumns = useMemo(() => {
    const cols = [];
    nodes.forEach((_, i) => {
      cols.push("minmax(0, 1fr)");
      if (i < nodes.length - 1) cols.push("auto");
    });
    return cols.join(" ");
  }, [nodes]);

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

        /*
          Grid instead of flex: rows = [badge] [box] [caption].
          Grid auto-sizes each ROW to the tallest cell in that row across
          ALL columns. So every box ends up the same height (as tall as
          whichever card's text needs the most room) and every caption
          starts on the exact same line — with zero manual height math
          and zero text clipping.
        */
        .arch-row {
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-rows: auto auto auto;
          align-items: stretch;
          column-gap: clamp(4px, 1.5vw, 12px);
          row-gap: 10px;
          justify-content: center;
        }

        .arch-badge-slot {
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
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

        /*
          No fixed height anymore — height:100% fills whatever the grid
          row decided (see .arch-row comment above). min-height keeps the
          original compact look when text is short.
        */
        .arch-node-box {
          width: 100%;
          height: 100%;
          min-height: clamp(116px, 16vw, 132px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: clamp(10px, 3vw, 18px) clamp(8px, 2.4vw, 14px);
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
          flex-shrink: 0;
          transition: background .4s ease, border-color .4s ease;
        }
        .arch-node-box.lit .arch-icon { background: rgba(99,102,241,0.13); border-color: rgba(99,102,241,0.3); }

        /* Full text always visible now — no line-clamp, no fixed height. */
        .arch-name {
          width: 100%;
          font-size: clamp(11px, 2.6vw, 12.5px);
          font-weight: 600;
          color: #1e1b4b;
          letter-spacing: -0.01em;
          line-height: 1.3;
          overflow-wrap: break-word;
          word-break: break-word;
          transition: color .3s;
        }
        .arch-node-box.lit .arch-name { color: #3730a3; }

        .arch-mono {
          width: 100%;
          font-size: clamp(9px, 2.2vw, 10px);
          font-family: monospace;
          color: #94a3b8;
          margin-top: 3px;
          line-height: 1.45;
          overflow-wrap: break-word;
          word-break: break-word;
          transition: color .3s;
        }
        .arch-node-box.lit .arch-mono { color: #6366f1; }

        .arch-caption {
          font-size: 10px;
          text-align: center;
          color: #b0b7c3;
          max-width: 100%;
          overflow-wrap: break-word;
          word-break: break-word;
        }

        .arch-arrow-cell {
          align-self: center;
          padding: 0 2px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .arch-arrow-cell svg {
          width: clamp(20px, 4vw, 52px);
          height: auto;
        }

        .arch-arrow-line { stroke-dasharray: 5 3; transition: stroke .3s; }
        .arch-arrow-line.lit { stroke: rgba(99,102,241,0.7) !important; }
        .arch-arrow-line.moving { animation: dashMove 1s linear infinite; }
        .arch-arrow-head { transition: stroke .3s; }
        .arch-arrow-head.lit { stroke: rgba(99,102,241,0.9) !important; }

        /* Stack vertically on narrow screens. Grid placement (gridColumn/
           gridRow set inline) is simply ignored once display isn't grid,
           so no extra overrides are needed for that part. */
        @media (max-width: 640px) {
          .arch-row {
            display: flex;
            flex-direction: column;
            align-items: center;
            row-gap: 0;
          }
          .arch-badge-slot,
          .arch-node-box,
          .arch-caption {
            width: 100%;
            max-width: 260px;
          }
          .arch-node-box {
            height: auto;
            min-height: 0;
          }
          .arch-arrow-cell {
            padding: 6px 0;
            transform: rotate(90deg);
          }
          .arch-arrow-line.moving { animation: dashMoveVertical 1s linear infinite; }
        }

        @media (min-width: 861px) and (max-width: 1100px) {
          .arch-name { font-size: 10.5px; }
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

        <div className="arch-row" style={{ gridTemplateColumns }}>
          {nodes.map((node, i) => {
            const col = i * 2 + 1; // 1-indexed grid column for this node

            return (
              <Fragment key={node.id}>
                {i > 0 && (
                  <div
                    className="arch-arrow-cell"
                    style={{ gridColumn: col - 1, gridRow: 2 }}
                  >
                    <svg width="52" height="20" viewBox="0 0 52 20" fill="none">
                      <line
                        ref={el => (lineRefs.current[i - 1] = el)}
                        className="arch-arrow-line"
                        x1="2" y1="10" x2="38" y2="10"
                        stroke="rgba(99,102,241,0.22)" strokeWidth="1.5"
                      />
                      <polyline
                        ref={el => (headRefs.current[i - 1] = el)}
                        className="arch-arrow-head"
                        points="33,5 41,10 33,15"
                        stroke="rgba(99,102,241,0.35)" strokeWidth="1.5"
                        fill="none" strokeLinejoin="round" strokeLinecap="round"
                      />
                    </svg>
                  </div>
                )}

                <div className="arch-badge-slot" style={{ gridColumn: col, gridRow: 1 }}>
                  {node.highlight && <span className="arch-badge">PQC Layer</span>}
                </div>

                <div
                  ref={el => (nodeRefs.current[i] = el)}
                  className="arch-node-box"
                  style={{ gridColumn: col, gridRow: 2 }}
                >
                  <div className="arch-icon">
                    <i className={`ti ${node.icon}`} style={{ color:"#4338ca" }} />
                  </div>
                  <div className="arch-name">{node.title}</div>
                  <div className="arch-mono">{node.detail}</div>
                </div>

                <span className="arch-caption" style={{ gridColumn: col, gridRow: 3 }}>
                  {node.label}
                </span>
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}