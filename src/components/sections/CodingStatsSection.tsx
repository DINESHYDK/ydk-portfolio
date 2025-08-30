import React from "react";
import { Calendar } from "lucide-react";
import { CodingStatsDashboard } from "./dashboard/CodingStatsDashboard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const CodingStatsSection: React.FC = () => {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section id="stats" className="py-20">
      <div className="container">
        <SectionHeading
          text="Coding Stats"
          subtitle="Competitive programming achievements across platforms"
        />
        <div className="flex items-center justify-center gap-2 mt-3 text-xs text-muted-foreground mb-8">
          <Calendar className="h-3 w-3" />
          <span>Last updated: {lastUpdated}</span>
        </div>

        <CodingStatsDashboard />
      </div>
    </section>
  );
};

export default CodingStatsSection;
