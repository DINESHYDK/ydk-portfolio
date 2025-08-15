/**
 * CommandPaletteContainer Component
 * Main container component that houses the command palette interface
 */

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { cn } from "@/lib/utils";
import {
  CommandPaletteContainerProps,
  SuggestionItem,
} from "@/types/command-palette";
import {
  matchesShortcut,
  debounce,
  getResponsiveClasses,
  navigationItemToSuggestion,
} from "@/lib/command-palette-utils";
import {
  KEYBOARD_SHORTCUTS,
  PALETTE_DIMENSIONS,
  BREAKPOINTS,
} from "@/lib/command-palette-constants";
import { navigationItems, getSuggestionsByCategory } from "@/data/navigation";

import GlowingBorder from "./GlowingBorder";
import SearchInput from "./SearchInput";
import SuggestionsSection from "./SuggestionsSection";
import SettingsSection from "./SettingsSection";

interface CommandPaletteContainerState {
  searchValue: string;
  selectedIndex: number;
  isSearchFocused: boolean;
  currentTheme: "dark" | "light" | "system";
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  error: string | null;
  isLoading: boolean;
}

const CommandPaletteContainer = React.forwardRef<
  HTMLDivElement,
  CommandPaletteContainerProps
>(
  (
    {
      className,
      onNavigate,
      searchValue: controlledSearchValue,
      onSearchChange: controlledOnSearchChange,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const combinedRef =
      (ref as React.RefObject<HTMLDivElement>) || containerRef;

    // Internal state
    const [state, setState] = useState<CommandPaletteContainerState>(() => {
      const responsive = getResponsiveClasses();
      return {
        searchValue: controlledSearchValue || "",
        selectedIndex: -1,
        isSearchFocused: false,
        currentTheme: "dark",
        error: null,
        isLoading: false,
        ...responsive,
      };
    });

    // Get suggestions from navigation data with error handling
    const suggestions: SuggestionItem[] = useMemo(() => {
      try {
        const suggestionItems = getSuggestionsByCategory("suggestions");
        return suggestionItems.map((item) =>
          navigationItemToSuggestion(item, (route) => {
            try {
              // Handle navigation - route is now the section name directly
              onNavigate?.(route);
            } catch (error) {
              console.error("Navigation error:", error);
              setState((prev) => ({
                ...prev,
                error: "Failed to navigate. Please try again.",
              }));
            }
          })
        );
      } catch (error) {
        console.error("Failed to load suggestions:", error);
        setState((prev) => ({
          ...prev,
          error: "Failed to load navigation options.",
        }));
        return [];
      }
    }, [onNavigate]);

    // Handle search value changes
    const handleSearchChange = useCallback(
      (value: string) => {
        setState((prev) => ({
          ...prev,
          searchValue: value,
          selectedIndex: -1,
        }));
        controlledOnSearchChange?.(value);
      },
      [controlledOnSearchChange]
    );

    // Debounced search handler for performance
    const debouncedSearchChange = useCallback(
      debounce(handleSearchChange, 150),
      [handleSearchChange]
    );

    // Memoize filtered suggestions for performance
    const filteredSuggestions = useMemo(() => {
      if (!state.searchValue.trim()) return suggestions;

      const searchTerm = state.searchValue.toLowerCase();
      return suggestions.filter(
        (item) =>
          item.label.toLowerCase().includes(searchTerm) ||
          (item.shortcut && item.shortcut.toLowerCase().includes(searchTerm))
      );
    }, [suggestions, state.searchValue]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        // Handle escape to close or clear search
        if (matchesShortcut(event, KEYBOARD_SHORTCUTS.CLOSE_PALETTE[0])) {
          event.preventDefault();
          if (state.searchValue) {
            handleSearchChange("");
          } else {
            // In a real app, this would close the palette
            console.log("Close palette");
          }
          return;
        }

        // Handle arrow navigation
        if (event.key === "ArrowDown") {
          event.preventDefault();
          setState((prev) => ({
            ...prev,
            selectedIndex: Math.min(
              prev.selectedIndex + 1,
              filteredSuggestions.length - 1
            ),
          }));
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          setState((prev) => ({
            ...prev,
            selectedIndex: Math.max(prev.selectedIndex - 1, -1),
          }));
        }
      },
      [state.searchValue, filteredSuggestions.length, handleSearchChange]
    );

    // Handle item selection
    const handleItemSelect = useCallback((item: SuggestionItem) => {
      console.log("Selected item:", item.label);
      // Reset state after selection
      setState((prev) => ({
        ...prev,
        searchValue: "",
        selectedIndex: -1,
      }));
    }, []);

    // Handle theme toggle
    const handleThemeToggle = useCallback(() => {
      setState((prev) => {
        const newTheme = prev.currentTheme === "dark" ? "light" : "dark";

        // Apply theme to document root
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(newTheme);

        // Store in localStorage
        localStorage.setItem("ydk-portfolio-theme", newTheme);

        return {
          ...prev,
          currentTheme: newTheme,
        };
      });
    }, []);

    // Handle profile click
    const handleProfileClick = useCallback(() => {
      onNavigate?.("profile");
    }, [onNavigate]);

    // Handle keyboard shortcuts
    const handleKeyboardShortcuts = useCallback(() => {
      console.log("Show keyboard shortcuts");
    }, []);

    // Handle preferences
    const handlePreferences = useCallback(() => {
      console.log("Show preferences");
    }, []);

    // Handle responsive breakpoint changes
    useEffect(() => {
      const handleResize = () => {
        const responsive = getResponsiveClasses();
        setState((prev) => ({
          ...prev,
          ...responsive,
        }));
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Set up keyboard event listeners
    useEffect(() => {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    // Update controlled search value
    useEffect(() => {
      if (
        controlledSearchValue !== undefined &&
        controlledSearchValue !== state.searchValue
      ) {
        setState((prev) => ({ ...prev, searchValue: controlledSearchValue }));
      }
    }, [controlledSearchValue, state.searchValue]);

    return (
      <div
        ref={combinedRef}
        className={cn(
          // Container positioning and sizing
          "relative",
          "w-full",
          "mx-auto",

          // Responsive sizing - Mobile first approach
          "min-h-[180px]", // Smaller on mobile
          "max-h-[85vh]", // More space on mobile
          "max-w-sm", // Mobile: 384px

          // Tablet breakpoint
          "md:max-w-lg", // Tablet: 512px
          "md:min-h-[200px]",
          "md:max-h-[80vh]", // More space on tablet

          // Desktop breakpoint
          "lg:max-w-2xl", // Desktop: 672px
          "lg:min-h-[200px]",
          "lg:max-h-[85vh]", // Much more space on desktop

          // Large desktop
          "xl:max-w-3xl", // Large: 768px
          "xl:max-h-[80vh]", // Optimal height for large screens

          // Animation and transitions
          "transform-gpu",
          "will-change-transform",
          "transition-all",
          "duration-300",
          "ease-out",

          // Mobile-specific adjustments
          state.isMobile && [
            "px-4", // Add horizontal padding on mobile
            "py-2", // Add vertical padding on mobile
          ],

          // Tablet-specific adjustments
          state.isTablet && ["px-6", "py-3"],

          // Desktop-specific adjustments
          state.isDesktop && [
            "px-0", // Remove padding on desktop
            "py-0",
          ],

          className
        )}
        style={{
          maxWidth: state.isMobile
            ? "calc(100vw - 2rem)"
            : state.isTablet
              ? PALETTE_DIMENSIONS.MAX_WIDTH
              : PALETTE_DIMENSIONS.MAX_WIDTH,
          maxHeight: state.isMobile ? "85vh" : state.isTablet ? "80vh" : "85vh", // Much more flexible height
          minHeight: state.isMobile ? "180px" : PALETTE_DIMENSIONS.MIN_HEIGHT,
        }}
        {...props}
      >
        <GlowingBorder
          intensity={state.isMobile ? "low" : "medium"}
          animationSpeed={state.isMobile ? 2 : 3}
          className="h-full"
        >
          {/* Main Content Container */}
          <div
            className={cn(
              "flex flex-col",
              "h-full",
              "max-h-full", // Ensure it doesn't exceed container
              "bg-cp-surface/95",
              "backdrop-blur-xl",
              "border border-cp-border/50",
              "overflow-hidden",
              "shadow-2xl",

              // Responsive border radius
              "rounded-lg", // Mobile: smaller radius
              "md:rounded-xl", // Tablet and up: larger radius

              // Mobile-specific optimizations
              state.isMobile && [
                "backdrop-blur-md", // Reduce blur on mobile for performance
              ],

              // Desktop enhancements
              state.isDesktop && [
                "backdrop-blur-2xl", // Enhanced blur on desktop
                "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]", // Enhanced shadow
              ]
            )}
          >
            {/* Search Input Section */}
            <div
              className={cn(
                "flex-shrink-0 border-b border-cp-border/30",
                // Responsive padding
                "p-3", // Mobile: smaller padding
                "md:p-4" // Tablet and up: larger padding
              )}
            >
              <SearchInput
                value={state.searchValue}
                onChange={handleSearchChange}
                placeholder={
                  state.isMobile ? "Search..." : "Type a command or search..."
                }
                className={cn(
                  // Responsive text sizing
                  "text-sm", // Mobile: smaller text
                  "md:text-base" // Tablet and up: normal text
                )}
              />
            </div>

            {/* Content Section */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <div
                className={cn(
                  // Responsive padding
                  "p-1.5", // Mobile: smaller padding
                  "md:p-2", // Tablet and up: normal padding
                  "pb-4" // Extra bottom padding to ensure content is visible
                )}
              >
                {/* Error State */}
                {state.error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <span>⚠️</span>
                      <span>{state.error}</span>
                    </div>
                    <button
                      onClick={() =>
                        setState((prev) => ({ ...prev, error: null }))
                      }
                      className="mt-2 text-xs text-red-300 hover:text-red-200 underline"
                    >
                      Dismiss
                    </button>
                  </div>
                )}

                {/* Loading State */}
                {state.isLoading && (
                  <div className="mb-4 p-3 bg-cp-surface/50 rounded-lg">
                    <div className="flex items-center gap-2 text-cp-text-secondary text-sm">
                      <div className="animate-spin w-4 h-4 border-2 border-cp-accent border-t-transparent rounded-full"></div>
                      <span>Loading...</span>
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                <SuggestionsSection
                  suggestions={filteredSuggestions}
                  onItemSelect={handleItemSelect}
                  selectedIndex={state.selectedIndex}
                  searchFilter={state.searchValue}
                  className={cn(
                    // Responsive spacing
                    "mb-3", // Mobile: smaller margin
                    "md:mb-4" // Tablet and up: normal margin
                  )}
                />

                {/* Settings */}
                <SettingsSection
                  onProfileClick={handleProfileClick}
                  onThemeToggle={handleThemeToggle}
                  onKeyboardShortcuts={handleKeyboardShortcuts}
                  onPreferences={handlePreferences}
                  currentTheme={state.currentTheme}
                />
              </div>
            </div>

            {/* Footer with keyboard hints - Hidden on mobile for space */}
            {!state.isMobile && (
              <div className="flex-shrink-0 px-4 py-2 border-t border-cp-border/30">
                <div className="flex items-center justify-between text-xs text-cp-text-secondary">
                  <div
                    className={cn(
                      "flex items-center",
                      // Responsive gap
                      "gap-2", // Tablet: smaller gap
                      "lg:gap-4" // Desktop: larger gap
                    )}
                  >
                    <div className="flex items-center gap-1">
                      <kbd className="px-1 py-0.5 bg-cp-border/30 rounded text-[10px]">
                        ↑↓
                      </kbd>
                      <span className="hidden lg:inline">Navigate</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <kbd className="px-1 py-0.5 bg-cp-border/30 rounded text-[10px]">
                        ↵
                      </kbd>
                      <span className="hidden lg:inline">Select</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <kbd className="px-1 py-0.5 bg-cp-border/30 rounded text-[10px]">
                        Esc
                      </kbd>
                      <span className="hidden lg:inline">Close</span>
                    </div>
                  </div>
                  <div className="text-cp-text-secondary/60 hidden md:block">
                    Command Palette
                  </div>
                </div>
              </div>
            )}
          </div>
        </GlowingBorder>
      </div>
    );
  }
);

CommandPaletteContainer.displayName = "CommandPaletteContainer";

export default CommandPaletteContainer;
