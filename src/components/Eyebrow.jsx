export default function Eyebrow({ children }) {
  return (
    <span className="eyebrow inline-flex items-center gap-[9px] font-mono text-xs tracking-[0.22em] uppercase text-blue">
      {children}
    </span>
  );
}
