import { GlassCard } from "./GlassCard";
import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";
import { FeatureIcon } from "./Icons";
import type { IconName } from "./Icons";

type FeatureItem = {
  title: string;
  description: string;
  icon: string;
  href?: string;
};

type FeatureGridProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  items: readonly FeatureItem[];
  columns?: 2 | 3 | 4;
  className?: string;
  layout?: "vertical" | "horizontal";
  align?: "left" | "center";
};

const columnClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function FeatureGrid({
  id,
  eyebrow,
  title,
  description,
  items,
  columns = 4,
  className = "",
  layout = "vertical",
  align = "center",
}: FeatureGridProps) {
  return (
    <Section id={id} className={className}>
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        align={align}
      />

      <div className={`grid gap-6 ${columnClasses[columns]}`}>
        {items.map((item) => {
          const content = (
            <>
              <FeatureIcon
                name={item.icon as IconName}
                inline={layout === "horizontal"}
              />
              <div className={layout === "horizontal" ? "flex-1" : undefined}>
                <h3 className="mb-3 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </>
          );

          if (item.href) {
            return (
              <a key={item.title} href={item.href} className="block">
                <GlassCard
                  className={`h-full ${layout === "horizontal" ? "flex gap-5" : ""}`}
                >
                  {content}
                </GlassCard>
              </a>
            );
          }

          return (
            <GlassCard
              key={item.title}
              className={`h-full ${layout === "horizontal" ? "flex gap-5" : ""}`}
            >
              {content}
            </GlassCard>
          );
        })}
      </div>
    </Section>
  );
}
