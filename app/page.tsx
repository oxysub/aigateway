import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { CredentialsBar } from "@/components/sections/CredentialsBar";
import { Industries } from "@/components/sections/Industries";
import { Services } from "@/components/sections/Services";
import { UseCases } from "@/components/sections/UseCases";
import { WhyUs } from "@/components/sections/WhyUs";
import { Cta } from "@/components/sections/Cta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CredentialsBar />
        <Industries />
        <Services />
        <UseCases />
        <WhyUs />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
