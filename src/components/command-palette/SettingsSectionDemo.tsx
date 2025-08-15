/**
 * SettingsSection Demo Component
 * Demonstrates SettingsSection with theme integration
 */

import React from "react";
import SettingsSection from "./SettingsSection";
import { useTheme } from "@/hooks/useTheme";

const SettingsSectionDemo: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const handleProfileClick = () => {
    console.log("Profile clicked");
    // Navigate to profile or show profile modal
  };

  const handleKeyboardShortcuts = () => {
    console.log("Keyboard shortcuts clicked");
    // Show keyboard shortcuts modal or navigate to shortcuts page
  };

  const handlePreferences = () => {
    console.log("Preferences clicked");
    // Navigate to preferences or show preferences modal
  };

  return (
    <div className="min-h-screen bg-cp-background p-8">
      <div className="max-w-md mx-auto">
        <div className="cp-container p-6">
          <h2 className="text-xl font-semibold text-cp-text-primary mb-6">
            Settings Section Demo
          </h2>

          <SettingsSection
            onProfileClick={handleProfileClick}
            onThemeToggle={toggleTheme}
            onKeyboardShortcuts={handleKeyboardShortcuts}
            onPreferences={handlePreferences}
            currentTheme={theme}
          />

          <div className="mt-6 p-4 bg-cp-surface rounded-lg">
            <h3 className="text-sm font-medium text-cp-text-primary mb-2">
              Current Theme State
            </h3>
            <p className="text-xs text-cp-text-secondary">
              Theme: <span className="text-cp-accent">{theme}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSectionDemo;
