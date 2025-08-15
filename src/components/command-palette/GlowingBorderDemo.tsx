/**
 * GlowingBorder Demo Component
 * Simple demo to showcase the GlowingBorder component functionality
 */

import React from "react";
import GlowingBorder from "./GlowingBorder";

const GlowingBorderDemo: React.FC = () => {
  return (
    <div className="p-8 space-y-8 bg-cp-background min-h-screen">
      <h1 className="text-2xl font-bold text-cp-text-primary mb-8">
        GlowingBorder Component Demo
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Default (Medium) Intensity */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-cp-text-primary">
            Default (Medium)
          </h2>
          <GlowingBorder className="w-full h-32">
            <div className="p-4 text-cp-text-primary">
              <p>Default intensity with standard glow effect</p>
            </div>
          </GlowingBorder>
        </div>

        {/* Low Intensity */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-cp-text-primary">
            Low Intensity
          </h2>
          <GlowingBorder intensity="low" className="w-full h-32">
            <div className="p-4 text-cp-text-primary">
              <p>Subtle glow effect for minimal distraction</p>
            </div>
          </GlowingBorder>
        </div>

        {/* High Intensity */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-cp-text-primary">
            High Intensity
          </h2>
          <GlowingBorder intensity="high" className="w-full h-32">
            <div className="p-4 text-cp-text-primary">
              <p>Strong glow effect for emphasis</p>
            </div>
          </GlowingBorder>
        </div>

        {/* Custom Color */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-cp-text-primary">
            Custom Color
          </h2>
          <GlowingBorder color="hsl(120, 100%, 50%)" className="w-full h-32">
            <div className="p-4 text-cp-text-primary">
              <p>Custom green glow color</p>
            </div>
          </GlowingBorder>
        </div>

        {/* Fast Animation */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-cp-text-primary">
            Fast Animation
          </h2>
          <GlowingBorder animationSpeed={1} className="w-full h-32">
            <div className="p-4 text-cp-text-primary">
              <p>Fast animation speed (1s)</p>
            </div>
          </GlowingBorder>
        </div>

        {/* Slow Animation */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-cp-text-primary">
            Slow Animation
          </h2>
          <GlowingBorder animationSpeed={6} className="w-full h-32">
            <div className="p-4 text-cp-text-primary">
              <p>Slow animation speed (6s)</p>
            </div>
          </GlowingBorder>
        </div>
      </div>

      {/* Interactive Example */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-cp-text-primary">
          Interactive Example
        </h2>
        <GlowingBorder className="w-full">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-cp-text-primary mb-4">
              Command Palette Preview
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Type a command or search..."
                className="w-full p-3 bg-cp-surface border border-cp-border rounded-lg text-cp-text-primary placeholder-cp-text-secondary focus:outline-none focus:ring-2 focus:ring-cp-focus"
              />
              <div className="space-y-2">
                <div className="p-2 hover:bg-cp-hover rounded cursor-pointer text-cp-text-primary">
                  📁 Projects
                </div>
                <div className="p-2 hover:bg-cp-hover rounded cursor-pointer text-cp-text-primary">
                  👤 About
                </div>
                <div className="p-2 hover:bg-cp-hover rounded cursor-pointer text-cp-text-primary">
                  📧 Contact
                </div>
              </div>
            </div>
          </div>
        </GlowingBorder>
      </div>
    </div>
  );
};

export default GlowingBorderDemo;
