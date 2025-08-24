/**
 * Command Palette Utilities
 * Helper functions for command palette functionality
 */

import {
  NavigationItem,
  SuggestionItem,
  UserPreferences,
} from "@/types/command-palette";
import {
  KEYBOARD_SHORTCUTS,
  GLOW_INTENSITIES,
} from "./command-palette-constants";

/**
 * Filter navigation items based on search query
 */
export function filterNavigationItems(
  items: NavigationItem[],
  query: string
): NavigationItem[] {
  if (!query.trim()) return items;

  const searchTerm = query.toLowerCase().trim();

  return items.filter(
    (item) =>
      item.label.toLowerCase().includes(searchTerm) ||
      item.description?.toLowerCase().includes(searchTerm) ||
      item.shortcut?.toLowerCase().includes(searchTerm)
  );
}

/**
 * Get keyboard shortcut display string
 */
export function getShortcutDisplay(shortcut: string): string {
  return shortcut
    .split("+")
    .map((key) => {
      switch (key.toLowerCase()) {
        case "cmd":
        case "meta":
          return "⌘";
        case "ctrl":
          return "Ctrl";
        case "alt":
          return "Alt";
        case "shift":
          return "Shift";
        case "enter":
          return "↵";
        case "escape":
          return "Esc";
        case "arrowup":
          return "↑";
        case "arrowdown":
          return "↓";
        case "arrowleft":
          return "←";
        case "arrowright":
          return "→";
        default:
          return key.toUpperCase();
      }
    })
    .join(" + ");
}

/**
 * Check if keyboard shortcut matches event
 */
export function matchesShortcut(
  event: KeyboardEvent,
  shortcut: string
): boolean {
  const keys = shortcut.toLowerCase().split("+");
  const eventKey = event.key.toLowerCase();

  const hasCmd = keys.includes("cmd") || keys.includes("meta");
  const hasCtrl = keys.includes("ctrl");
  const hasAlt = keys.includes("alt");
  const hasShift = keys.includes("shift");

  const mainKey = keys.find(
    (key) => !["cmd", "meta", "ctrl", "alt", "shift"].includes(key)
  );

  return (
    (!hasCmd || event.metaKey) &&
    (!hasCtrl || event.ctrlKey) &&
    (!hasAlt || event.altKey) &&
    (!hasShift || event.shiftKey) &&
    (!mainKey || eventKey === mainKey)
  );
}

/**
 * Get glow effect CSS properties based on intensity
 */
export function getGlowStyles(intensity: keyof typeof GLOW_INTENSITIES) {
  const config = GLOW_INTENSITIES[intensity];

  return {
    filter: `blur(${config.blur})`,
    boxShadow: `0 0 ${config.blur} ${config.spread} hsl(var(--cp-glow) / ${config.opacity})`,
  };
}

/**
 * Debounce function for search input
 */
export function debounce<T extends (...args: never[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Get user preferences with defaults
 */
export function getUserPreferencesWithDefaults(
  preferences?: Partial<UserPreferences>
): UserPreferences {
  return {
    theme: "dark",
    animationsEnabled: true,
    keyboardShortcutsEnabled: true,
    defaultView: "palette",
    ...preferences,
  };
}

/**
 * Convert NavigationItem to SuggestionItem
 */
export function navigationItemToSuggestion(
  item: NavigationItem,
  onNavigate: (section: string) => void
): SuggestionItem {
  return {
    id: item.id,
    label: item.label,
    icon: item.icon as React.ComponentType,
    category: item.category,
    shortcut: item.shortcut,
    action: () => {
      if (item.action) {
        item.action();
      } else if (item.route) {
        onNavigate(item.route);
      }
    },
  };
}

/**
 * Generate unique ID for navigation items
 */
export function generateItemId(label: string, category: string): string {
  return `${category}-${label.toLowerCase().replace(/\s+/g, "-")}`;
}

/**
 * Check if device supports hover interactions
 */
export function supportsHover(): boolean {
  return window.matchMedia("(hover: hover)").matches;
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Get responsive class names based on screen size
 */
export function getResponsiveClasses(): {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
} {
  const width = window.innerWidth;

  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
  };
}
