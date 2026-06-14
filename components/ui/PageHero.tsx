import type { ReactNode } from "react";
import { Button } from "./Button";
import { Container } from "./Container";

type CtaButton = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  primaryCta?: CtaButton;
  secondaryCta?: CtaButton;
  compact?: boolean;
  align?: "left" | "center";
  children?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  compact = false,
  align = "center",
  children,
}: PageHeroProps) {
  const isLeft = align === "left";

  return (
    <section
      className={`relative flex items-center overflow-hidden pt-20 ${compact ? "min-h-[55vh]" : "min-h-[88vh]"}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-navy/30 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_75%)]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <Container
        className={`relative z-10 ${compact ? "py-16 lg:py-20" : "py-16 lg:py-28"}`}
      >
        <div className={`max-w-4xl ${isLeft ? "text-left" : "mx-auto text-center"}`}>
          {eyebrow && (
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent sm:text-sm">
              {eyebrow}
            </p>
          )}

          <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-5xl xl:text-[3.25rem]">
            {title}
          </h1>

          {description && (
            <p
              className={`mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg ${isLeft ? "" : "mx-auto"}`}
            >
              {description}
            </p>
          )}

          {(primaryCta || secondaryCta) && (
            <div
              className={`mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 ${isLeft ? "" : "items-center justify-center"}`}
            >
              {primaryCta && (
                <Button
                  href={primaryCta.href}
                  variant={primaryCta.variant ?? "primary"}
                  className="px-7 py-3"
                >
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button
                  href={secondaryCta.href}
                  variant={secondaryCta.variant ?? "secondary"}
                  className="px-7 py-3"
                >
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}

          {children}
        </div>
      </Container>
    </section>
  );
}
