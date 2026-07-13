import { Link } from "react-router-dom";

const base =
  "inline-flex items-center gap-[9px] rounded-[9px] border px-[22px] py-[13px] font-body text-[15px] font-medium transition-all duration-[180ms] cursor-pointer";

const variants = {
  primary:
    "border-blue bg-blue text-[#06122b] hover:bg-blue-hover hover:shadow-[0_10px_30px_-10px_var(--color-blue)]",
  ghost:
    "border-line2 bg-transparent text-text hover:border-blue hover:text-blue",
};

export default function Button({
  to,
  onClick,
  variant = "primary",
  children,
  className = "",
  style,
}) {
  const classes = `${base} ${variants[variant]} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <span className={classes} style={style} onClick={onClick} role="button">
      {children}
    </span>
  );
}
