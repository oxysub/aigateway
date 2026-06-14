import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { AiTraining } from "@/components/sections/AiTraining";
import { Cta } from "@/components/sections/Cta";
import { SEO_KEYWORDS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI Training",
  description:
    "Hands-on GenAI training programmes for business leaders, developers and enterprise IT teams. HRD Corp claimable courses from AI Gateway Malaysia.",
  keywords: [
    ...SEO_KEYWORDS,
    "AI training Malaysia",
    "GenAI training",
    "HRD Corp claimable",
  ],
  alternates: { canonical: "/training" },
  openGraph: {
    title: "AI Training | AI Gateway",
    description:
      "Practical AI and GenAI training for teams, leaders and technical practitioners.",
    type: "website",
  },
};

export default function TrainingPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          compact
          align="left"
          eyebrow="Training Programmes"
          title={
            <>
              AI &amp; GenAI{" "}
              <span className="text-accent">Training</span>
            </>
          }
          description="Practical training programmes for business leaders, developers and enterprise IT teams — building the skills needed to adopt and govern AI in industrial environments."
        />

        <AiTraining />

        <Cta
          title="Enquire About Training Programmes"
          description="Contact our team to discuss programme selection, scheduling and HRD Corp claimable options for your organisation."
          className="pb-28"
        />
      </main>
      <Footer />
    </>
  );
}
