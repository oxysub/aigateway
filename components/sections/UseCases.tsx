import { GlassCard } from "@/components/ui/GlassCard";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FeatureIcon } from "@/components/ui/Icons";
import type { IconName } from "@/components/ui/Icons";
import { FEATURED_USE_CASES } from "@/lib/constants";

export function UseCases({ id = "use-cases" }: { id?: string }) {
  return (
    <Section id={id} className="bg-surface/50">
      <SectionHeader
        eyebrow="Operational Applications"
        title="Solutions Deployed Across the Value Chain"
        description="Practical applications across engineering, maintenance, HSE, operations and commercial functions — aligned to how oil & gas organisations actually work."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURED_USE_CASES.map((item) => (
          <GlassCard key={item.title} className="flex h-full flex-col">
            <div className="mb-4 flex items-center justify-between gap-2">
              <FeatureIcon name={item.icon as IconName} />
              <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
                {item.domain}
              </span>
            </div>
            <h3 className="mb-2 text-base font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              {item.description}
            </p>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
