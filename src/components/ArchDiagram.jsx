import { Fragment, useEffect, useRef } from "react";

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
  const dotRefs = useRef([]);

  useEffect(() => {
    const HOLD = 550, TRAVEL = 500, PAUSE = 900;
    const last = nodes.length - 1;

    function clearAll() {
      nodeRefs.current.forEach(n => n?.classList.remove("lit"));
      lineRefs.current.forEach(l => l?.classList.remove("lit"));
      dotRefs.current.forEach(d => d?.classList.remove("run"));
    }

    function step(i) {
      nodeRefs.current[i]?.classList.add("lit");
      if (i < last) {
        setTimeout(() => {
          lineRefs.current[i]?.classList.add("lit");
          dotRefs.current[i]?.classList.add("run");
          setTimeout(() => step(i + 1), TRAVEL);
        }, HOLD);
      } else {
        setTimeout(() => { clearAll(); setTimeout(() => step(0), 200); }, PAUSE);
      }
    }

    const t = setTimeout(() => step(0), 500);
    return () => clearTimeout(t);
  }, [nodes]);

  return (
    <>
      <style>{`
        @keyframes archBlob { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12);opacity:.65} }
        @keyframes archDotV { 0%{ top:4%; opacity:0; } 8%{ opacity:1; } 92%{ opacity:1; } 100%{ top:94%; opacity:0; } }
        @keyframes archRing { 0%,100%{ box-shadow:0 0 0 0 rgba(109,94,245,0.28), 0 0 0 4px rgba(109,94,245,0.10); } 50%{ box-shadow:0 0 0 5px rgba(109,94,245,0.14), 0 0 0 9px rgba(34,211,238,0.08); } }

        .arch-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 26px;
          margin-top: 2.5rem;
          background: linear-gradient(160deg,#f7f8fc 0%,#fbfbfe 55%,#ffffff 100%);
          border: 1px solid #E9EAF3;
          padding: clamp(28px, 6vw, 44px) clamp(18px, 5vw, 36px) clamp(24px, 4vw, 36px);
          box-sizing: border-box;
          font-family: inherit;
          width: 100%;
        }

        .arch-eyebrow {
          position: relative;
          z-index: 10;
          margin-bottom: clamp(24px, 5vw, 36px);
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #6D5EF5;
        }
        .arch-eyebrow::after {
          content: "";
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(109,94,245,0.35), transparent);
        }

        /* ---- Vertical stack ---- */
        .arch-row {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          width: 100%;
          max-width: 420px;
          margin: 0 auto;
        }

        .arch-item {
          display: flex;
          flex-direction: column;
        }

        /* ---- Card ---- */
        .arch-node-box {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          gap: 14px;
          padding: clamp(14px, 3vw, 18px) clamp(16px, 3.4vw, 20px);
          border-radius: 18px;
          text-align: left;
          background: #ffffff;
          border: 1.5px solid #E9EAF3;
          box-shadow: 0 1px 2px rgba(23,24,60,0.03);
          box-sizing: border-box;
          transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
        }
        .arch-node-box.highlight {
          border-color: rgba(109,94,245,0.28);
          background: linear-gradient(165deg, rgba(109,94,245,0.05), rgba(34,211,238,0.04) 60%, #ffffff 100%);
        }
        .arch-node-box.lit {
          transform: translateX(4px);
          box-shadow: 0 10px 30px rgba(109,94,245,0.16);
        }
        .arch-node-box.highlight.lit {
          animation: archRing 1.8s ease-in-out infinite;
          border-color: rgba(109,94,245,0.55);
        }

        .arch-index {
          position: absolute;
          top: 10px;
          left: 14px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: #C3C6D9;
        }
        .arch-node-box.highlight .arch-index { color: rgba(109,94,245,0.55); }

        .arch-badge {
          position: absolute;
          top: 9px;
          right: 10px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 8px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          border-radius: 999px;
          padding: 3px 7px;
          color: #ffffff;
          background: linear-gradient(120deg,#6D5EF5,#22D3EE);
          white-space: nowrap;
        }

        .arch-icon {
          width: clamp(38px, 8vw, 44px);
          height: clamp(38px, 8vw, 44px);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(16px, 3.4vw, 19px);
          line-height: 1;
          background: #F1F2F9;
          border: 1px solid #E9EAF3;
          flex-shrink: 0;
          transition: background .35s ease, border-color .35s ease;
        }
        .arch-node-box.highlight .arch-icon {
          background: linear-gradient(135deg, rgba(109,94,245,0.14), rgba(34,211,238,0.12));
          border-color: rgba(109,94,245,0.25);
        }
        .arch-icon i { color: #4B4FDB; }
        .arch-node-box:not(.highlight) .arch-icon i { color: #6B7280; }

        .arch-text-col {
          flex: 1;
          min-width: 0;
          padding-top: 12px;
        }

        .arch-name {
          width: 100%;
          font-size: clamp(13px, 2.6vw, 14.5px);
          font-weight: 700;
          color: #161B33;
          letter-spacing: -0.01em;
          line-height: 1.32;
          white-space: normal;
          word-break: normal;
          overflow-wrap: break-word;
        }

        .arch-mono {
          width: 100%;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: clamp(9.5px, 2vw, 10.5px);
          color: #9CA1B5;
          margin-top: 4px;
          line-height: 1.45;
          white-space: normal;
          word-break: normal;
          overflow-wrap: break-word;
        }

        /* ---- Caption pill ---- */
        .arch-caption {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-left: clamp(66px, 12vw, 78px);
          margin-top: 8px;
        }
        .arch-caption span {
          white-space: normal;
          word-break: normal;
          overflow-wrap: break-word;
          font-size: 10.5px;
          font-weight: 600;
          line-height: 1.35;
          padding: 5px 10px;
          border-radius: 999px;
          max-width: 100%;
          box-sizing: border-box;
        }
        .arch-caption.neutral span {
          color: #8B8FA3;
          background: #F1F2F7;
        }
        .arch-caption.highlight span {
          color: #4B4FDB;
          background: linear-gradient(120deg, rgba(109,94,245,0.10), rgba(34,211,238,0.10));
        }

        /* ---- Vertical connector ---- */
        .arch-arrow-cell {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 34px;
          padding-left: clamp(24px, 6vw, 30px);
        }
        .arch-arrow-line {
          position: relative;
          width: 2px;
          height: 100%;
          border-radius: 2px;
          background: repeating-linear-gradient(180deg, #D9DCEA 0 6px, transparent 6px 11px);
          transition: background .3s ease;
        }
        .arch-arrow-line.lit {
          background: linear-gradient(180deg, #6D5EF5, #22D3EE);
        }
        .arch-arrow-dot {
          position: absolute;
          left: 50%;
          top: 4%;
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #22D3EE;
          box-shadow: 0 0 8px 2px rgba(34,211,238,0.7);
          transform: translate(-50%, -50%);
          opacity: 0;
        }
        .arch-arrow-dot.run { animation: archDotV 0.5s ease forwards; }
      `}</style>

      <div className="arch-wrap">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
          style={{ background:"radial-gradient(circle,rgba(109,94,245,0.10) 0%,transparent 70%)",
            animation:"archBlob 4.5s ease-in-out infinite" }} />
        <div className="pointer-events-none absolute -left-12 -bottom-12 h-44 w-44 rounded-full"
          style={{ background:"radial-gradient(circle,rgba(34,211,238,0.08) 0%,transparent 70%)",
            animation:"archBlob 5.5s ease-in-out infinite reverse" }} />

        <p className="arch-eyebrow">Traffic flow</p>

        <div className="arch-row">
          {nodes.map((node, i) => (
            <Fragment key={node.id}>
              <div className="arch-item">
                <div
                  ref={el => (nodeRefs.current[i] = el)}
                  className={`arch-node-box${node.highlight ? " highlight" : ""}`}
                >
                  <span className="arch-index">{String(i + 1).padStart(2, "0")}</span>
                  {node.highlight && <span className="arch-badge">PQC</span>}
                  <div className="arch-icon">
                    <i className={`ti ${node.icon}`} />
                  </div>
                  <div className="arch-text-col">
                    <div className="arch-name" title={node.title}>{node.title}</div>
                    <div className="arch-mono" title={node.detail}>{node.detail}</div>
                  </div>
                </div>

                <div className={`arch-caption ${node.highlight ? "highlight" : "neutral"}`}>
                  <span title={node.label}>{node.label}</span>
                </div>
              </div>

              {i < nodes.length - 1 && (
                <div className="arch-arrow-cell">
                  <div ref={el => (lineRefs.current[i] = el)} className="arch-arrow-line" />
                  <div ref={el => (dotRefs.current[i] = el)} className="arch-arrow-dot" />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}