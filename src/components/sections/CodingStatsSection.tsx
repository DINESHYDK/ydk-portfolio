import React from "react";
import SplitText from "../../../react_bits/SplitText/SplitText";
import { Calendar } from "lucide-react";
import { CodingStatsDashboard } from "./dashboard/CodingStatsDashboard";

export const CodingStatsSection: React.FC = () => {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section id="stats" className="py-20">
      <div className="container">
        <header className="mb-8 text-center">
          <SplitText
            text="Coding Stats"
            className="text-3xl md:text-4xl font-bold text-primary mb-3"
            splitType="chars"
            delay={50}
            duration={0.8}
            from={{ opacity: 0, y: 50, rotationX: -90 }}
            to={{ opacity: 1, y: 0, rotationX: 0 }}
          />
          <p className="text-muted-foreground mt-1">
            Competitive programming achievements across platforms
          </p>
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </header>

        <CodingStatsDashboard />
      </div>
    </section>
  );
};

export default CodingStatsSection;
