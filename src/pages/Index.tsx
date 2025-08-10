import AuroraBackground from "@/components/AuroraBackground";
import { DesktopNavbar } from "@/components/navbar/DesktopNavbar";
import { MobileNavbar } from "@/components/navbar/MobileNavbar";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { CodingStats } from "@/components/sections/CodingStats";
import { ContactChatbot } from "@/components/sections/ContactChatbot";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useState } from "react";

const Index = () => {
  const [party, setParty] = useState(false);
  const active = useActiveSection(["home", "projects", "skills", "stats", "contact"]);

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
        <Projects />
        <Skills />
        <CodingStats />
        <ContactChatbot />
      </main>

      <footer className="py-10 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Dinesh Krishna. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
