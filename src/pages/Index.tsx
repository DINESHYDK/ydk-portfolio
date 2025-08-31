import AuroraBackground from "@/components/AuroraBackground";
import { DesktopNavbar } from "@/components/navbar/DesktopNavbar";
import { MobileNavbar } from "@/components/navbar/MobileNavbar";
import { Hero } from "@/components/sections/Hero";
import { AboutMe } from "@/components/sections/AboutMe";
import { ProjectsRedesign as Projects } from "@/components/sections/ProjectsRedesign";
import { Skills } from "@/components/sections/Skills";
import { CodingStatsSection } from "@/components/sections/CodingStatsSection";
import { ContactChatbot } from "@/components/sections/ContactChatbot";
import Footer from "@/components/sections/Footer";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useState } from "react";

const Index = () => {
  const [party, setParty] = useState(false);
  const active = useActiveSection([
    "home",
    "about",
    "projects",
    "skills",
    "stats",
    "contact",
  ]);

  return (
    <div className="relative min-h-screen animate-enter">
      <header>
        <DesktopNavbar activeId={active} onParty={() => setParty((p) => !p)} />
        <MobileNavbar activeId={active} onParty={() => setParty((p) => !p)} />
      </header>

      <main className="animate-fade-in">
        <div className="absolute inset-0 -z-10">
          <AuroraBackground party={party} />
        </div>
        <div className="absolute inset-0 -z-10 bg-background/10" aria-hidden />

        <Hero />
        <AboutMe />
        <Projects />
        <Skills />
        <CodingStatsSection />
        <ContactChatbot />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
