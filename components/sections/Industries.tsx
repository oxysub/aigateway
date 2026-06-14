import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { INDUSTRIES } from "@/lib/constants";

export function Industries() {
  return (
    <FeatureGrid
      id="industries"
      eyebrow="Industries"
      title="Built for Energy and Industrial Operations"
      description="We serve organisations where operational safety, asset reliability and production continuity are non-negotiable."
      items={INDUSTRIES}
      columns={2}
      align="left"
    />
  );
}
