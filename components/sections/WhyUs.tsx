import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { WHY_US } from "@/lib/constants";

export function WhyUs() {
  return (
    <FeatureGrid
      id="why-us"
      eyebrow="Why AI Gateway"
      title="A Partner for Governed Industrial Technology"
      description="Procurement-ready credentials, domain focus and a delivery approach shaped by oil & gas and energy sector requirements."
      items={WHY_US}
      columns={3}
      layout="horizontal"
    />
  );
}
