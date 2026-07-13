export default function Section({ children, tight = false, className = "" }) {
  return (
    <section
      className={`${tight ? "py-14" : "py-[78px]"} ${className}`.trim()}
    >
      {children}
    </section>
  );
}