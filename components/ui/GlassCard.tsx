import type { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={`group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors duration-300 hover:border-accent/30 hover:bg-white/[0.07] lg:p-8 ${className}`}
    >
      {children}
    </div>
  );
}
