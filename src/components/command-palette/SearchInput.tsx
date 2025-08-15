/**
 * SearchInput Component
 * Command-style search input with real-time filtering and keyboard support
 */

import React, { useEffect, useRef, useCallback } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchInputProps } from "@/types/command-palette";
import { matchesShortcut } from "@/lib/command-palette-utils";
import { KEYBOARD_SHORTCUTS } from "@/lib/command-palette-constants";

const SearchInput = React.memo(
  React.forwardRef<HTMLInputElement, SearchInputProps>(
    (
      {
        value,
        onChange,
        placeholder = "Type a command or search...",
        onKeyDown,
        className,
        ...props
      },
      ref
    ) => {
      const inputRef = useRef<HTMLInputElement>(null);
      const combinedRef =
        (ref as React.RefObject<HTMLInputElement>) || inputRef;

      // Handle global keyboard shortcuts
      const handleGlobalKeyDown = useCallback(
        (event: KeyboardEvent) => {
          // Check for Cmd/Ctrl + K to focus search
          if (
            matchesShortcut(event, KEYBOARD_SHORTCUTS.OPEN_PALETTE[0]) ||
            matchesShortcut(event, KEYBOARD_SHORTCUTS.OPEN_PALETTE[1])
          ) {
            event.preventDefault();
            combinedRef.current?.focus();
          }
        },
        [combinedRef]
      );

      // Handle input-specific keyboard events
      const handleInputKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
          // Call parent onKeyDown if provided
          if (onKeyDown) {
            onKeyDown(event.nativeEvent);
          }

          // Handle escape to blur input
          if (event.key === "Escape") {
            combinedRef.current?.blur();
          }
        },
        [onKeyDown, combinedRef]
      );

      // Handle input change
      const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(event.target.value);
        },
        [onChange]
      );

      // Set up global keyboard listeners
      useEffect(() => {
        document.addEventListener("keydown", handleGlobalKeyDown);
        return () => {
          document.removeEventListener("keydown", handleGlobalKeyDown);
        };
      }, [handleGlobalKeyDown]);

      // Auto-focus on mount (optional behavior)
      useEffect(() => {
        // Small delay to ensure component is mounted
        const timer = setTimeout(() => {
          combinedRef.current?.focus();
        }, 100);

        return () => clearTimeout(timer);
      }, [combinedRef]);

      return (
        <div className="relative w-full">
          {/* Search Icon */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
            <Search
              className="h-4 w-4 text-cp-text-secondary transition-colors duration-200"
              aria-hidden="true"
            />
          </div>

          {/* Input Field */}
          <input
            ref={combinedRef}
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={handleInputKeyDown}
            placeholder={placeholder}
            aria-label="Search commands and navigation"
            aria-describedby="search-instructions"
            role="combobox"
            aria-expanded="true"
            aria-autocomplete="list"
            className={cn(
              // Base styles
              "w-full",
              "pl-10 pr-4 py-3",
              "text-cp-text-primary",
              "placeholder:text-cp-text-secondary",
              "bg-transparent",
              "border-0",
              "outline-none",
              "font-medium",

              // Responsive text sizing
              "text-sm sm:text-base",

              // Mobile optimizations
              "touch-manipulation", // Optimize for touch
              "-webkit-tap-highlight-color: transparent", // Remove tap highlight on iOS

              // Focus styles
              "focus:placeholder:text-cp-text-secondary/70",

              // Transitions
              "transition-all",
              "duration-200",
              "ease-out",

              // Custom class overrides
              className
            )}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            // Mobile-specific attributes
            inputMode="search"
            enterKeyHint="search"
            {...props}
          />

          {/* Keyboard Shortcut Hint */}
          {!value && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="hidden sm:flex items-center gap-1 text-xs text-cp-text-secondary/60">
                <kbd className="px-1.5 py-0.5 bg-cp-border/50 rounded text-[10px] font-mono">
                  ⌘
                </kbd>
                <kbd className="px-1.5 py-0.5 bg-cp-border/50 rounded text-[10px] font-mono">
                  K
                </kbd>
              </div>
            </div>
          )}

          {/* Focus indicator line */}
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 h-0.5",
              "bg-gradient-to-r from-cp-glow via-cp-accent to-cp-glow",
              "transform scale-x-0 origin-center",
              "transition-transform duration-300 ease-out",
              "focus-within:scale-x-100"
            )}
          />

          {/* Screen reader instructions */}
          <div id="search-instructions" className="sr-only">
            Type to search commands and navigation options. Use arrow keys to
            navigate results, Enter to select, and Escape to clear.
          </div>
        </div>
      );
    }
  )
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
