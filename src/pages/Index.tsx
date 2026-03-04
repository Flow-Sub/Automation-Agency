import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AgenticAISection from "@/components/AgenticAISection";
import DevelopmentSection from "@/components/DevelopmentSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Process } from "@/components/Process";
import { NetworkStats } from "@/components/NetworkStats";
import { TeamMembers } from "@/components/TeamMembers";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AgenticAISection />
      <Process />
      <DevelopmentSection />
      <ProjectsSection />
      <NetworkStats />
      <TeamMembers />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
