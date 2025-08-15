/**
 * Settings Demo Page
 * Standalone demo of the SettingsSection component
 */

import React from "react";
import { useEffect } from "react";
import { SettingsSectionDemo } from "@/components/command-palette";

const SettingsDemo: React.FC = () => {
  useEffect(() => {
    document.title = "Settings Demo — YDK Portfolio";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Demo of the SettingsSection component with theme integration."
      );
    }
  }, []);

  return <SettingsSectionDemo />;
};

export default SettingsDemo;
