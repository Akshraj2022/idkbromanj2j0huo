import Hero from "@/components/Hero";
import Tiers from "@/components/Tiers";
import Drops from "@/components/Drops";
import ParentControl from "@/components/ParentControl";
import HowInvitesWork from "@/components/HowInvitesWork";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main id="main-content">
        <Hero />
        <Tiers />
        <Drops />
        <ParentControl />
        <HowInvitesWork />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
