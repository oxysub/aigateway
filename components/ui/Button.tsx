import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white shadow-lg shadow-accent/25 hover:bg-accent-light hover:shadow-accent/40",
  secondary:
    "border border-white/20 bg-white/5 text-foreground backdrop-blur-sm hover:border-accent/50 hover:bg-white/10",
  ghost: "text-muted hover:text-foreground",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
}: ButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
