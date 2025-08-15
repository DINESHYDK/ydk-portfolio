/**
 * MainLayout Component
 * Main application layout with integrated command palette
 */

import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CommandPaletteLayout } from "@/components/command-palette";
import { useTheme } from "@/hooks/useTheme";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [showCommandPalette, setShowCommandPalette] = useState(true);
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle navigation from command palette
  const handleNavigate = useCallback(
    (section: string) => {
      // Map sections to routes
      const routeMap: Record<string, string> = {
        home: "/",
        about: "/",
        projects: "/",
        skills: "/",
        "coding-stats": "/",
        contact: "/contact",
        resume: "/resume",
      };

      const route = routeMap[section] || "/";

      // If navigating to a different route, use React Router
      if (route !== location.pathname) {
        navigate(route);
      }

      // For sections within the same page, the command palette will handle the content display
    },
    [location.pathname, navigate]
  );

  // Handle global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Toggle command palette with Cmd/Ctrl + K
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setShowCommandPalette((prev) => !prev);
      }

      // Close command palette with Escape
      if (event.key === "Escape" && showCommandPalette) {
        setShowCommandPalette(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showCommandPalette]);

  // Show command palette by default, but allow it to be toggled
  if (showCommandPalette) {
    return (
      <CommandPaletteLayout
        initialView="palette"
        initialTheme={theme}
        userPreferences={{
          animationsEnabled: true,
          keyboardShortcutsEnabled: true,
        }}
      />
    );
  }

  // Fallback to regular content when command palette is hidden
  return (
    <div className="min-h-screen bg-background text-foreground">
      {children}

      {/* Floating button to reopen command palette */}
      <button
        onClick={() => setShowCommandPalette(true)}
        className="fixed bottom-6 right-6 z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        aria-label="Open command palette"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default MainLayout;
