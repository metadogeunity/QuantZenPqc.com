export default function FeatureRow({ icon, title, children }) {
  return (
    <div className="grid grid-cols-[34px_1fr] gap-4 border-b border-line py-5 last:border-b-0">
      <div className="grid h-[34px] w-[34px] place-items-center rounded-lg border border-line2 font-mono text-[13px] text-blue">
        {icon}
      </div>
      <div>
        <h4 className="mb-[5px] text-[16.5px]">{title}</h4>
        <p className="text-[14.5px] text-muted">{children}</p>
      </div>
    </div>
  );
}
