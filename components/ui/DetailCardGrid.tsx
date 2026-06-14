import { GlassCard } from "./GlassCard";
import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";
import { FeatureIcon } from "./Icons";
import type { IconName } from "./Icons";

type DetailItem = {
  title: string;
  description: string;
  icon: string;
  href?: string;
  capabilities?: readonly string[];
  outcome?: string;
};

type DetailCardGridProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  items: readonly DetailItem[];
  columns?: 2 | 3;
  className?: string;
};

const columnClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
};

export function DetailCardGrid({
  id,
  eyebrow,
  title,
  description,
  items,
  columns = 2,
  className = "",
}: DetailCardGridProps) {
  return (
    <Section id={id} className={className}>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />

      <div className={`grid gap-6 ${columnClasses[columns]}`}>
        {items.map((item) => {
          const card = (
            <GlassCard className="flex h-full flex-col">
              <FeatureIcon name={item.icon as IconName} />
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
              {item.capabilities && item.capabilities.length > 0 && (
                <ul className="mt-auto space-y-2 border-t border-white/10 pt-4">
                  {item.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="flex gap-2 text-sm text-foreground/80"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {capability}
                    </li>
                  ))}
                </ul>
              )}
              {item.outcome && (
                <p className="mt-auto border-t border-white/10 pt-4 text-sm font-medium text-accent">
                  {item.outcome}
                </p>
              )}
            </GlassCard>
          );

          if (item.href) {
            return (
              <a
                key={item.title}
                href={item.href}
                className="block transition-transform hover:scale-[1.02]"
              >
                {card}
              </a>
            );
          }

          return <div key={item.title}>{card}</div>;
        })}
      </div>
    </Section>
  );
}
