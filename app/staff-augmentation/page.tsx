import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Cta } from "@/components/sections/Cta";
import {
  SEO_KEYWORDS,
  STAFF_AUGMENTATION_POSITIONING,
  STAFF_AUGMENTATION_OFFERINGS,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Workforce & Staff Augmentation",
  description:
    "IT staff augmentation and skilled technology resources for Oil & Gas, Energy and Industrial clients — AI engineers, data specialists, developers, cybersecurity and project delivery teams.",
  keywords: [
    ...SEO_KEYWORDS,
    "IT staff augmentation",
    "workforce augmentation",
    "oil and gas contractors",
    "AI engineers Malaysia",
  ],
  openGraph: {
    title: "Workforce & Staff Augmentation | AI Gateway",
    description:
      "Skilled technology, engineering and project resources for oil & gas and industrial digital transformation programmes.",
    type: "website",
  },
};

export default function StaffAugmentationPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          compact
          align="left"
          eyebrow="Workforce Services"
          title={
            <>
              Workforce &{" "}
              <span className="text-accent">Staff Augmentation</span>
            </>
          }
          description="Supply skilled technology, engineering and project resources for Oil & Gas, Energy and Industrial clients — from individual specialists to full delivery teams."
          primaryCta={{ label: "Discuss Your Requirements", href: "/#contact" }}
          secondaryCta={{ label: "View Offerings", href: "#offerings" }}
        />

        <Section>
          <Container className="max-w-3xl">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {STAFF_AUGMENTATION_POSITIONING}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              We provide IT professionals, data specialists, AI engineers,
              application developers, cybersecurity resources and project delivery
              teams — engaged on staff augmentation, squad or project-based models
              to support your operational and technology programmes.
            </p>
          </Container>
        </Section>

        <FeatureGrid
          id="offerings"
          eyebrow="Resource Offerings"
          title="Workforce & Staff Augmentation"
          description="Flexible resourcing across technology, engineering and project delivery functions for industrial and energy sector clients."
          items={STAFF_AUGMENTATION_OFFERINGS}
          columns={4}
          className="bg-surface/50"
          align="left"
        />

        <Cta
          title="Discuss Your Resourcing Requirements"
          description="Tell us about the roles, skills and engagement model you need. Our team will respond to scope a relevant discussion."
          className="pb-28"
        />
      </main>
      <Footer />
    </>
  );
}
