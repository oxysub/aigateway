import { PageHero } from "@/components/ui/PageHero";
import { COMPANY } from "@/lib/constants";

export function Hero() {
  return (
    <PageHero
      align="left"
      eyebrow={COMPANY.eyebrow}
      title={
        <>
          Enterprise AI, IoT and Data Intelligence for{" "}
          <span className="text-accent">Safer, Smarter Operations</span>
        </>
      }
      description={COMPANY.subheadline}
      primaryCta={{ label: "Discuss Your Requirements", href: "/#contact" }}
      secondaryCta={{ label: "View Capabilities", href: "/#services" }}
    />
  );
}
