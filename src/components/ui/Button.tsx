import Link from "next/link";
import { clsx } from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  external?: boolean;
  "aria-label"?: string;
}

const sizeMap = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const variantMap = {
  primary: "bg-[var(--color-text-dark)] text-white hover:bg-[var(--color-text-dark-soft)] active:scale-[0.98]",
  outline: "border border-[var(--color-text-dark)] text-[var(--color-text-dark)] hover:bg-[var(--color-bg-light-dim)] active:scale-[0.98]",
  ghost: "text-[var(--color-text-dark-soft)] hover:text-[var(--color-text-dark)] hover:bg-[var(--color-bg-light-dim)]",
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  disabled,
  type = "button",
  external,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2",
    sizeMap[size],
    variantMap[variant],
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
    >
      {children}
    </button>
  );
}

// Light variant for dark backgrounds
export function ButtonLight({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  disabled,
  type = "button",
  external,
}: ButtonProps) {
  const lightVariantMap = {
    primary: "bg-[var(--color-text-primary)] text-[var(--color-text-dark)] hover:bg-[var(--color-accent-hover)] active:scale-[0.98]",
    outline: "border border-[var(--color-btn-outline-border)] text-white hover:bg-[var(--color-btn-outline-hover-bg)] active:scale-[0.98]",
    ghost: "text-white/90 hover:text-white hover:bg-white/10",
  };

  const classes = clsx(
    "inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)]",
    sizeMap[size],
    lightVariantMap[variant],
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
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
