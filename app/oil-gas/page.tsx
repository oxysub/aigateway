import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { UseCases } from "@/components/sections/UseCases";
import { Cta } from "@/components/sections/Cta";
import { SEO_KEYWORDS } from "@/lib/constants";
import {
  OIL_GAS_AI_SOLUTIONS,
  OIL_GAS_IOT_SOLUTIONS,
  OIL_GAS_SAFETY_SOLUTIONS,
  OIL_GAS_DATA_READINESS,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Oil & Gas Solutions",
  description:
    "Enterprise AI, Industrial IoT and Data Intelligence for oil and gas operations — asset monitoring, HSE systems, engineering copilots and AI readiness assessments.",
  keywords: [
    ...SEO_KEYWORDS,
    "oil and gas AI",
    "HSE analytics",
    "permit to work",
    "engineering copilot",
  ],
  openGraph: {
    title: "Oil & Gas Solutions | AI Gateway",
    description:
      "Enterprise AI, IoT and data intelligence for upstream, midstream and downstream operations.",
    type: "website",
  },
};

export default function OilGasPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          compact
          align="left"
          eyebrow="Oil & Gas"
          title={
            <>
              Technology Solutions for{" "}
              <span className="text-accent">Oil &amp; Gas Operations</span>
            </>
          }
          description="Upstream, midstream and downstream — covering production operations, asset integrity, HSE, engineering and corporate functions through governed AI, industrial IoT and enterprise analytics."
          primaryCta={{ label: "Discuss Your Requirements", href: "/#contact" }}
          secondaryCta={{ label: "View AI Solutions", href: "#ai-solutions" }}
        />

        <FeatureGrid
          id="ai-solutions"
          eyebrow="Enterprise AI"
          title="AI Solutions for Operational Teams"
          description="Governed knowledge assistants and copilots integrated with your standards, procedures and operational context."
          items={OIL_GAS_AI_SOLUTIONS}
          columns={3}
          align="left"
        />

        <FeatureGrid
          id="iot-solutions"
          eyebrow="Industrial IoT"
          title="Industrial IoT & Operational Intelligence"
          description="Sensor integration, condition monitoring and production analytics for plant and field assets."
          items={OIL_GAS_IOT_SOLUTIONS}
          columns={2}
          className="bg-surface/50"
          align="left"
        />

        <FeatureGrid
          id="safety-solutions"
          eyebrow="Safety & Compliance"
          title="HSE & Compliance Systems"
          description="Digital tools for inspections, permit-to-work, incident management and HSE performance reporting."
          items={OIL_GAS_SAFETY_SOLUTIONS}
          columns={2}
          align="left"
        />

        <FeatureGrid
          id="data-readiness"
          eyebrow="Data Intelligence"
          title="Data Audit & AI Readiness"
          description="Structured assessments to establish data quality, governance and organisational readiness before major technology investment."
          items={OIL_GAS_DATA_READINESS}
          columns={2}
          className="bg-surface/50"
          align="left"
        />

        <UseCases id="featured-use-cases" />

        <Cta
          title="Scope a Solution for Your Operations"
          description="Share your operational priorities and current technology landscape. We will arrange a discussion with our technical team."
          className="pb-28"
        />
      </main>
      <Footer />
    </>
  );
}
