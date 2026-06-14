import { CREDENTIALS } from "@/lib/constants";
import { FeatureIcon } from "@/components/ui/Icons";
import type { IconName } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Container";

export function CredentialsBar() {
  return (
    <section className="border-y border-white/10 bg-surface/80 backdrop-blur-sm">
      <Container className="py-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {CREDENTIALS.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-4 border-white/10 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
            >
              <FeatureIcon name={item.icon as IconName} inline />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {item.label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
