/**
 * CommandPaletteLayout Component
 * Main layout wrapper for the entire command palette interface
 */

import React, { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  matchesShortcut,
  getUserPreferencesWithDefaults,
  getResponsiveClasses,
} from "@/lib/command-palette-utils";
import {
  KEYBOARD_SHORTCUTS,
  VIEW_MODES,
  THEME_MODES,
} from "@/lib/command-palette-constants";
import { UserPreferences, ViewMode, ThemeMode } from "@/types/command-palette";
import { useSwipeGestures } from "@/hooks/useSwipeGestures";
import { useVirtualKeyboard } from "@/hooks/useVirtualKeyboard";

import BackgroundEffects from "./BackgroundEffects";
import CommandPaletteContainer from "./CommandPaletteContainer";
import ContentRenderer from "./ContentRenderer";
import ErrorBoundary from "./ErrorBoundary";

interface CommandPaletteLayoutProps {
  className?: string;
  children?: React.ReactNode;
  initialView?: ViewMode;
  initialTheme?: ThemeMode;
  userPreferences?: Partial<UserPreferences>;
}

interface LayoutState {
  currentView: ViewMode;
  activeSection: string | null;
  theme: ThemeMode;
  isVisible: boolean;
  searchValue: string;
  preferences: UserPreferences;
}

const CommandPaletteLayout: React.FC<CommandPaletteLayoutProps> = ({
  className,
  children,
  initialView = "palette",
  initialTheme = "dark",
  userPreferences = {},
}) => {
  // Initialize state
  const [state, setState] = useState<LayoutState>({
    currentView: initialView,
    activeSection: null,
    theme: initialTheme,
    isVisible: true,
    searchValue: "",
    preferences: getUserPreferencesWithDefaults(userPreferences),
  });

  // Get responsive classes
  const responsive = getResponsiveClasses();

  // Virtual keyboard awareness
  const { isKeyboardVisible, getViewportSafeHeight, getKeyboardAdjustedStyle } =
    useVirtualKeyboard();

  // Handle navigation between sections
  const handleNavigate = useCallback((section: string) => {
    setState((prev) => ({
      ...prev,
      currentView: "content",
      activeSection: section,
      searchValue: "", // Clear search when navigating
    }));
  }, []);

  // Handle back navigation to palette
  const handleBack = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentView: "palette",
      activeSection: null,
    }));
  }, []);

  // Handle search value changes
  const handleSearchChange = useCallback((value: string) => {
    setState((prev) => ({ ...prev, searchValue: value }));
  }, []);

  // Handle theme toggle
  const handleThemeToggle = useCallback(() => {
    setState((prev) => {
      const newTheme = prev.theme === "dark" ? "light" : "dark";
      return {
        ...prev,
        theme: newTheme,
        preferences: {
          ...prev.preferences,
          theme: newTheme,
        },
      };
    });
  }, []);

  // Handle palette visibility toggle
  const handleToggleVisibility = useCallback(() => {
    setState((prev) => ({ ...prev, isVisible: !prev.isVisible }));
  }, []);

  // Swipe gesture handlers for mobile navigation
  useSwipeGestures({
    onSwipeRight: useCallback(() => {
      if (responsive.isMobile && state.currentView === "content") {
        handleBack();
      }
    }, [responsive.isMobile, state.currentView, handleBack]),

    onSwipeLeft: useCallback(() => {
      if (
        responsive.isMobile &&
        state.currentView === "palette" &&
        state.activeSection
      ) {
        // Could implement quick navigation to last viewed section
      }
    }, [responsive.isMobile, state.currentView, state.activeSection]),

    threshold: 80, // Increased threshold for more intentional swipes
    preventScroll: false, // Allow normal scrolling
  });

  // Global keyboard event handler
  const handleGlobalKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Don't handle shortcuts if user has disabled them
      if (!state.preferences.keyboardShortcutsEnabled) return;

      // Handle palette toggle (Cmd/Ctrl + K)
      if (
        matchesShortcut(event, KEYBOARD_SHORTCUTS.OPEN_PALETTE[0]) ||
        matchesShortcut(event, KEYBOARD_SHORTCUTS.OPEN_PALETTE[1])
      ) {
        event.preventDefault();
        if (state.currentView === "content") {
          handleBack();
        } else {
          handleToggleVisibility();
        }
        return;
      }

      // Handle escape key
      if (matchesShortcut(event, KEYBOARD_SHORTCUTS.CLOSE_PALETTE[0])) {
        event.preventDefault();
        if (state.currentView === "content") {
          handleBack();
        } else if (state.searchValue) {
          handleSearchChange("");
        } else {
          handleToggleVisibility();
        }
        return;
      }

      // Handle back navigation (Backspace when not in input)
      if (
        event.key === "Backspace" &&
        state.currentView === "content" &&
        !(event.target instanceof HTMLInputElement)
      ) {
        event.preventDefault();
        handleBack();
        return;
      }

      // Handle theme toggle (Cmd/Ctrl + Shift + T)
      if (event.metaKey && event.shiftKey && event.key === "T") {
        event.preventDefault();
        handleThemeToggle();
        return;
      }
    },
    [
      state.preferences.keyboardShortcutsEnabled,
      state.currentView,
      state.searchValue,
      handleBack,
      handleToggleVisibility,
      handleSearchChange,
      handleThemeToggle,
    ]
  );

  // Set up global keyboard listeners
  useEffect(() => {
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [handleGlobalKeyDown]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;

    // Remove existing theme classes
    root.classList.remove("light", "dark");

    // Apply new theme
    if (state.theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      root.classList.add(prefersDark ? "dark" : "light");
    } else {
      root.classList.add(state.theme);
    }
  }, [state.theme]);

  // Handle system theme changes
  useEffect(() => {
    if (state.theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(mediaQuery.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [state.theme]);

  // Don't render if not visible
  if (!state.isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        // Full screen container
        "fixed inset-0 z-50",

        // Backdrop
        "bg-cp-background/80",
        "backdrop-blur-sm",

        // Flexbox centering
        "flex items-center justify-center",

        // Responsive padding
        responsive.isMobile ? "p-2" : "p-4",

        // Transitions
        "transition-all duration-300 ease-out",

        // Theme-aware styling
        state.theme === "light" && "bg-white/80",

        className
      )}
      style={{
        // Adjust height for virtual keyboard on mobile
        height: responsive.isMobile ? getViewportSafeHeight() : "100vh",
        ...getKeyboardAdjustedStyle(),
      }}
    >
      {/* Background Effects */}
      <BackgroundEffects
        intensity={state.preferences.animationsEnabled ? "medium" : "low"}
        theme={state.theme === "system" ? "dark" : state.theme}
      />

      {/* Main Content Container */}
      <div
        className={cn(
          "relative",
          "w-full",
          "h-full",
          "flex items-center justify-center",
          "transform-gpu",
          "will-change-transform",

          // Responsive max dimensions
          responsive.isMobile
            ? "max-w-sm max-h-[85vh]"
            : "max-w-4xl max-h-[600px]",

          // Virtual keyboard adjustments
          isKeyboardVisible && responsive.isMobile && "max-h-[60vh]"
        )}
      >
        {/* Command Palette View */}
        {state.currentView === "palette" && (
          <ErrorBoundary
            onError={(error, errorInfo) => {
              console.error("Command Palette Error:", error, errorInfo);
            }}
          >
            <div
              className={cn(
                "w-full max-w-2xl mx-auto",
                "flex items-center justify-center",
                "transform transition-all duration-300 ease-out",
                "animate-scale-in"
              )}
            >
              <CommandPaletteContainer
                onNavigate={handleNavigate}
                searchValue={state.searchValue}
                onSearchChange={handleSearchChange}
              />
            </div>
          </ErrorBoundary>
        )}

        {/* Content View */}
        {state.currentView === "content" && (
          <ErrorBoundary
            onError={(error, errorInfo) => {
              console.error("Content Renderer Error:", error, errorInfo);
            }}
          >
            <div
              className={cn(
                "w-full h-full",
                "transform transition-all duration-300 ease-out",
                "animate-scale-in"
              )}
            >
              <ContentRenderer
                activeSection={state.activeSection || ""}
                onBack={handleBack}
              />
            </div>
          </ErrorBoundary>
        )}
      </div>

      {/* Accessibility announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {state.currentView === "content" &&
          state.activeSection &&
          `Viewing ${state.activeSection} content. Press Escape or swipe right to go back.`}
        {state.currentView === "palette" &&
          `Command palette open. Type to search or use arrow keys to navigate.`}
      </div>

      {/* Global Keyboard Shortcuts Overlay (for debugging) */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 right-4 text-xs text-cp-text-secondary/60 space-y-1">
          <div>⌘K: Toggle Palette</div>
          <div>Esc: Back/Close</div>
          <div>⌘⇧T: Toggle Theme</div>
          <div>↑↓: Navigate</div>
          <div>↵: Select</div>
        </div>
      )}

      {/* Children (if any additional content needs to be rendered) */}
      {children}
    </div>
  );
};

export default CommandPaletteLayout;
