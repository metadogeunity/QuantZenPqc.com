export default function Wrap({ children, className = "" }) {
  return (
    <div className={`mx-auto max-w-(--container-wrap) px-7 ${className}`.trim()}>
      {children}
    </div>
  );
}
