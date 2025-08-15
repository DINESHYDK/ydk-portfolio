/**
 * Command Palette Demo Page
 * Demonstrates the command palette interface and settings section
 */

import React, { useState } from "react";
import { useEffect } from "react";
import {
  CommandPaletteLayout,
  SettingsSectionDemo,
} from "@/components/command-palette";

const CommandPalette: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<"palette" | "settings">(
    "palette"
  );

  useEffect(() => {
    document.title = "Command Palette — YDK Portfolio";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Modern command palette interface for YDK Portfolio navigation."
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-cp-background">
      {/* Demo Navigation */}
      <div className="fixed top-4 left-4 z-50">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveDemo("palette")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeDemo === "palette"
                ? "bg-cp-accent text-white"
                : "bg-cp-surface text-cp-text-secondary hover:bg-cp-hover"
            }`}
          >
            Full Palette
          </button>
          <button
            onClick={() => setActiveDemo("settings")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeDemo === "settings"
                ? "bg-cp-accent text-white"
                : "bg-cp-surface text-cp-text-secondary hover:bg-cp-hover"
            }`}
          >
            Settings Demo
          </button>
        </div>
      </div>

      {/* Demo Content */}
      {activeDemo === "palette" ? (
        <CommandPaletteLayout
          initialView="palette"
          initialTheme="dark"
          userPreferences={{
            animationsEnabled: true,
            keyboardShortcutsEnabled: true,
          }}
        />
      ) : (
        <SettingsSectionDemo />
      )}
    </div>
  );
};

export default CommandPalette;
