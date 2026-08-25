import Link from "next/link";
import type { ReactNode, MouseEventHandler } from "react";

type Variant = "primary" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] px-6 py-3 text-sm font-medium transition-colors duration-[250ms] ease-out disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-brand-primary text-white hover:bg-brand-primary-hover",
  outline:
    "border border-brand-primary text-brand-primary bg-transparent hover:bg-brand-primary hover:text-white",
  ghost: "text-brand-primary hover:text-brand-primary-hover px-2 py-1",
};

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Si se define, el botón se renderiza como enlace (next/link). */
  href?: string;
  target?: string;
  rel?: string;
  /** Solo aplican cuando no se pasa `href`. */
  type?: "button" | "submit";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export function Button({
  children,
  variant = "primary",
  className = "",
  href,
  target,
  rel,
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} target={target} rel={rel} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
