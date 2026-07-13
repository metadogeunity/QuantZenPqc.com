const snVariants = {
  neutral: "font-mono text-[13px] font-medium",
  threat:
    "border border-amber/35 bg-amber/[0.12] font-mono text-[13px] font-medium text-amber",
  block:
    "border border-teal/35 bg-teal/[0.12] font-mono text-[13px] font-medium text-teal",
};


export default function AttackScenarioStep({
  number,
  kind = "neutral",
  title,
  children,
  verdict,
}) {
  const verdictClass =
    kind === "threat" ? "text-amber" : "text-teal";

  return (
    <div className="grid grid-cols-[30px_1fr] gap-4 border-b border-dashed border-line2 py-3.5 last:border-b-0">
      <div
        className={`grid h-[30px] w-[30px] place-items-center rounded-lg ${snVariants[kind]}`}
      >
        {number}
      </div>
      <div>
        <h4 className="mb-[3px] text-[15.5px]">{title}</h4>
        <p className="text-sm text-muted">{children}</p>
        {verdict && (
          <span className={`mt-1.5 inline-block font-mono text-xs ${verdictClass}`}>
            {verdict}
          </span>
        )}
      </div>
    </div>
  );
}
