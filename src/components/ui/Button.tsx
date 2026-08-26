"use client";

import Link from "next/link";
import type { ReactNode, MouseEventHandler } from "react";
import { trackEvent, type ConversionEvent } from "@/lib/analytics";

type Variant = "primary" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] px-8 py-3.5 text-[13px] font-bold uppercase tracking-wider transition-opacity duration-[250ms] ease-out disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "text-white bg-[image:var(--gradient-brand)] hover:opacity-90",
  outline:
    "border border-brand-primary text-brand-primary bg-transparent hover:bg-brand-primary hover:text-white",
  ghost: "text-brand-primary hover:text-brand-primary-hover px-2 py-1 normal-case tracking-normal font-medium",
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
  /** Si se define, dispara este evento de conversión al hacer clic (ver src/lib/analytics.ts). */
  trackEvent?: ConversionEvent;
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
  trackEvent: eventName,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={classes}
        onClick={eventName ? () => trackEvent(eventName) : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={(e) => {
        if (eventName) trackEvent(eventName);
        onClick?.(e);
      }}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
