import React, { useState, useCallback, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { CommandPaletteLayout } from "@/components/command-palette";
import { useTheme } from "@/hooks/useTheme";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import CommandPalette from "./pages/CommandPalette";
import SettingsDemo from "./pages/SettingsDemo";

const queryClient = new QueryClient();

// Main App Router Component
const AppRouter = () => {
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle global keyboard shortcuts
  useEffect(() => {
    // Prevent browser scroll restoration on reload/back
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration =
        "manual" as typeof window.history.scrollRestoration;
    }

    // On first mount, always start at top and strip any hash
    requestAnimationFrame(() => {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        if (window.location.hash) {
          window.history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search
          );
        }
      } catch (error) {
        // Silently handle scroll errors in case of browser restrictions
        console.debug("Scroll reset failed:", error);
      }
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      // Toggle command palette with Cmd/Ctrl + K
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setShowCommandPalette((prev) => !prev);
      }

      // Close command palette with Escape
      if (event.key === "Escape" && showCommandPalette) {
        event.preventDefault();
        setShowCommandPalette(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showCommandPalette]);

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

      // Navigate to the route
      if (route !== location.pathname) {
        navigate(route);
      }

      // Close command palette after navigation
      setShowCommandPalette(false);
    },
    [location.pathname, navigate]
  );

  return (
    <>
      {/* Main Routes */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/command-palette" element={<CommandPalette />} />
        <Route path="/settings-demo" element={<SettingsDemo />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Command Palette Overlay */}
      {showCommandPalette && (
        <div className="fixed inset-0 z-[9999]">
          <CommandPaletteLayout
            initialView="palette"
            initialTheme={theme}
            userPreferences={{
              animationsEnabled: true,
              keyboardShortcutsEnabled: true,
            }}
          />
        </div>
      )}

      {/* Floating Command Palette Toggle Button - Hidden on Mobile */}
      {!showCommandPalette && (
        <button
          onClick={() => {
            // Import haptic function inline to avoid circular dependencies
            if (
              "vibrate" in navigator &&
              /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
              )
            ) {
              try {
                navigator.vibrate(300);
              } catch (error) {
                console.debug("Haptic feedback failed:", error);
              }
            }
            setShowCommandPalette(true);
          }}
          className="fixed bottom-6 right-6 z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 group hidden md:flex items-center justify-center"
          aria-label="Open command palette (⌘K)"
          title="Open command palette (⌘K)"
        >
          <svg
            className="w-5 h-5 transition-transform group-hover:scale-110"
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
      )}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
