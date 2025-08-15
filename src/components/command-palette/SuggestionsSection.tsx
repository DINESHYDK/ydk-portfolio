/**
 * SuggestionsSection Component
 * Displays categorized navigation options with icons, keyboard navigation, and search filtering
 */

import React, { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { filterNavigationItems } from "@/lib/command-palette-utils";
import { SuggestionsSectionProps } from "@/types/command-palette";
import SuggestionItem from "./SuggestionItem";

const SuggestionsSection = React.memo(
  React.forwardRef<HTMLDivElement, SuggestionsSectionProps>(
    (
      {
        suggestions,
        onItemSelect,
        selectedIndex = -1,
        searchFilter = "",
        className,
        ...props
      },
      ref
    ) => {
      const sectionRef = useRef<HTMLDivElement>(null);
      const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
      const combinedRef =
        (ref as React.RefObject<HTMLDivElement>) || sectionRef;

      // Filter suggestions based on search query
      const filteredSuggestions = React.useMemo(() => {
        const trimmedFilter = searchFilter.trim();
        if (!trimmedFilter) return suggestions;

        return suggestions.filter(
          (item) =>
            item.label.toLowerCase().includes(trimmedFilter.toLowerCase()) ||
            (item.shortcut &&
              item.shortcut.toLowerCase().includes(trimmedFilter.toLowerCase()))
        );
      }, [suggestions, searchFilter]);

      // Group suggestions by category
      const groupedSuggestions = React.useMemo(() => {
        const groups: { [key: string]: typeof filteredSuggestions } = {};

        filteredSuggestions.forEach((item) => {
          if (!groups[item.category]) {
            groups[item.category] = [];
          }
          groups[item.category].push(item);
        });

        return groups;
      }, [filteredSuggestions]);

      // Handle keyboard navigation
      const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
          if (filteredSuggestions.length === 0) return;

          switch (event.key) {
            case "ArrowDown": {
              event.preventDefault();
              const nextIndex =
                selectedIndex < filteredSuggestions.length - 1
                  ? selectedIndex + 1
                  : 0;
              // Scroll selected item into view
              if (itemRefs.current[nextIndex]) {
                itemRefs.current[nextIndex]?.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                });
              }
              break;
            }

            case "ArrowUp": {
              event.preventDefault();
              const prevIndex =
                selectedIndex > 0
                  ? selectedIndex - 1
                  : filteredSuggestions.length - 1;
              // Scroll selected item into view
              if (itemRefs.current[prevIndex]) {
                itemRefs.current[prevIndex]?.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                });
              }
              break;
            }

            case "Enter":
              event.preventDefault();
              if (
                selectedIndex >= 0 &&
                selectedIndex < filteredSuggestions.length
              ) {
                const selectedItem = filteredSuggestions[selectedIndex];
                onItemSelect(selectedItem);
              }
              break;

            case "Escape":
              event.preventDefault();
              // Let parent handle escape
              break;
          }
        },
        [filteredSuggestions, selectedIndex, onItemSelect]
      );

      // Set up keyboard event listeners
      useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
      }, [handleKeyDown]);

      // Handle mouse selection
      const handleMouseEnter = useCallback((index: number) => {
        // This would typically update the selectedIndex in the parent component
        // For now, we'll just ensure the item gets proper hover state
      }, []);

      // Handle item click
      const handleItemClick = useCallback(
        (item: (typeof filteredSuggestions)[0]) => {
          onItemSelect(item);
        },
        [onItemSelect]
      );

      // Get category display name
      const getCategoryDisplayName = (category: string): string => {
        switch (category) {
          case "suggestions":
            return "Suggestions";
          case "settings":
            return "Settings";
          default:
            return category.charAt(0).toUpperCase() + category.slice(1);
        }
      };

      // If no suggestions after filtering, show empty state
      if (filteredSuggestions.length === 0) {
        return (
          <div
            ref={combinedRef}
            className={cn(
              "flex flex-col items-center justify-center",
              "py-8 px-4",
              "text-center",
              className
            )}
            role="status"
            aria-live="polite"
            {...props}
          >
            <div className="text-cp-text-secondary text-sm">
              {searchFilter.trim() ? (
                <>
                  No results found for{" "}
                  <span className="text-cp-text-primary font-medium">
                    "{searchFilter}"
                  </span>
                </>
              ) : (
                "No suggestions available"
              )}
            </div>
            {searchFilter.trim() && (
              <div className="text-cp-text-secondary/70 text-xs mt-1">
                Try a different search term
              </div>
            )}
          </div>
        );
      }

      return (
        <div
          ref={combinedRef}
          className={cn(
            "flex flex-col",
            "max-h-80",
            "overflow-y-auto",
            "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cp-border",
            className
          )}
          role="listbox"
          aria-label="Navigation suggestions"
          aria-activedescendant={
            selectedIndex >= 0 && filteredSuggestions[selectedIndex]
              ? filteredSuggestions[selectedIndex].id
              : undefined
          }
          {...props}
        >
          {Object.entries(groupedSuggestions).map(
            ([category, items], categoryIndex) => (
              <div key={category} className={cn(categoryIndex > 0 && "mt-4")}>
                {/* Category Header */}
                <div
                  className={cn(
                    "px-3 py-2",
                    "text-xs font-semibold",
                    "text-cp-text-secondary",
                    "uppercase tracking-wider",
                    "border-b border-cp-border/30",
                    "mb-1"
                  )}
                >
                  {getCategoryDisplayName(category)}
                </div>

                {/* Category Items */}
                <div className="space-y-0.5">
                  {items.map((item, itemIndex) => {
                    const globalIndex = filteredSuggestions.findIndex(
                      (s) => s.id === item.id
                    );
                    const isSelected = globalIndex === selectedIndex;

                    return (
                      <SuggestionItem
                        key={item.id}
                        ref={(el) => {
                          itemRefs.current[globalIndex] = el;
                        }}
                        id={item.id}
                        label={item.label}
                        icon={item.icon}
                        shortcut={item.shortcut}
                        isSelected={isSelected}
                        onClick={() => handleItemClick(item)}
                        onMouseEnter={() => handleMouseEnter(globalIndex)}
                        className={cn(
                          "cp-animate-in",
                          // Stagger animation delay
                          `[animation-delay:${(categoryIndex * items.length + itemIndex) * 50}ms]`
                        )}
                      />
                    );
                  })}
                </div>
              </div>
            )
          )}

          {/* Scroll indicator */}
          {filteredSuggestions.length > 6 && (
            <div
              className={cn(
                "flex items-center justify-center",
                "py-2 mt-2",
                "text-xs text-cp-text-secondary/60",
                "border-t border-cp-border/20"
              )}
            >
              Use ↑↓ to navigate • Enter to select
            </div>
          )}
        </div>
      );
    }
  )
);

SuggestionsSection.displayName = "SuggestionsSection";

export default SuggestionsSection;
