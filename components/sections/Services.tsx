import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { SERVICES } from "@/lib/constants";

export function Services() {
  return (
    <FeatureGrid
      id="services"
      eyebrow="Capabilities"
      title="Integrated Technology Services"
      description="Six core capability areas — from governed AI and industrial IoT to HSE systems, workforce augmentation, data foundations and ongoing platform support."
      items={SERVICES}
      columns={3}
    />
  );
}
