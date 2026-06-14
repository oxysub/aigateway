import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Cta } from "@/components/sections/Cta";
import { COMPANY, ABOUT_CREDENTIALS, ABOUT_FOCUS_AREAS, SEO_KEYWORDS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "AI Gateway is a 100% Bumiputra company registered with MOF Malaysia and a registered Petronas vendor, delivering enterprise AI, industrial IoT and data intelligence for oil & gas and industrial operations.",
  keywords: [...SEO_KEYWORDS, "Bumiputra company", "Ministry of Finance Malaysia"],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | AI Gateway",
    description:
      "100% Bumiputra company registered with MOF Malaysia and Petronas, focused on industrial technology delivery.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          compact
          align="left"
          eyebrow="About AI Gateway"
          title={
            <>
              Malaysian Technology Company for{" "}
              <span className="text-accent">Industrial Operations</span>
            </>
          }
          description="A 100% Bumiputra company registered with the Ministry of Finance Malaysia and a registered vendor of Petronas Malaysia — delivering enterprise AI, industrial IoT and data intelligence."
        />

        <Section>
          <Container className="max-w-3xl">
            <div className="space-y-5">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Who We Are
              </h2>
              <p className="text-base leading-relaxed text-muted sm:text-lg">
                {COMPANY.name} is headquartered in Petaling Jaya, Malaysia. We work
                with operators and asset owners in oil &amp; gas and energy to improve
                HSE performance, asset reliability and operational decision-making
                through governed AI, industrial IoT and enterprise analytics.
              </p>
              <p className="text-base leading-relaxed text-muted sm:text-lg">
                As a{" "}
                <strong className="font-semibold text-foreground">100% Bumiputra company</strong>,
                we are registered with the{" "}
                <strong className="font-semibold text-foreground">Ministry of Finance Malaysia</strong>{" "}
                and operate as a{" "}
                <strong className="font-semibold text-foreground">registered vendor of Petronas Malaysia</strong>.
                These credentials reflect our commitment to compliance, governance and
                trusted delivery in regulated industrial environments.
              </p>
              <p className="text-base leading-relaxed text-muted sm:text-lg">
                Our delivery scope covers enterprise AI applications, industrial IoT
                platforms, HSE and compliance systems, data audit and AI readiness
                assessments, analytics platforms and managed application services.
              </p>
            </div>
          </Container>
        </Section>

        <FeatureGrid
          id="credentials"
          eyebrow="Credentials"
          title="Procurement-Ready Registrations"
          description="Vendor and company registrations that support engagement with Malaysia's energy, government and enterprise sectors."
          items={ABOUT_CREDENTIALS}
          columns={2}
          layout="horizontal"
          className="bg-surface/50"
          align="left"
        />

        <FeatureGrid
          id="focus"
          eyebrow="Delivery Scope"
          title="Core Capability Areas"
          description="Integrated technology services across AI, IoT, safety and data intelligence."
          items={ABOUT_FOCUS_AREAS}
          columns={2}
          align="left"
        />

        <Cta
          title="Speak With Our Team"
          description="Arrange a discussion about your operational requirements, vendor onboarding or technology assessment needs."
          className="pb-28"
        />
      </main>
      <Footer />
    </>
  );
}
