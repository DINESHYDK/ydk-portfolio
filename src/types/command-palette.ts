/**
 * Command Palette Type Definitions
 * Core interfaces for navigation items, app state, and user preferences
 */

import { ReactComponentElement } from "react";

// Navigation Item Types
export interface NavigationItem {
  id: string;
  label: string;
  icon: string | React.ComponentType;
  category: "suggestions" | "settings";
  route?: string;
  action?: () => void;
  shortcut?: string;
  description?: string;
}

export interface NavigationCategory {
  id: string;
  label: string;
  items: NavigationItem[];
}

export interface SuggestionItem {
  id: string;
  label: string;
  icon: React.ComponentType;
  category: "suggestions" | "settings";
  action: () => void;
  shortcut?: string;
}

// Application State Types
export interface AppState {
  currentView: "palette" | "content";
  activeSection: string | null;
  searchQuery: string;
  filteredSuggestions: NavigationItem[];
  selectedIndex: number;
  isSearchFocused: boolean;
  theme: "dark" | "light";
}

// User Preferences Types
export interface UserPreferences {
  theme: "dark" | "light" | "system";
  animationsEnabled: boolean;
  keyboardShortcutsEnabled: boolean;
  defaultView: string;
}

// Component Props Types
export interface CommandPaletteContainerProps {
  className?: string;
  onNavigate?: (section: string) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onKeyDown?: (event: KeyboardEvent) => void;
  className?: string;
}

export interface SuggestionsSectionProps {
  suggestions: SuggestionItem[];
  onItemSelect: (item: SuggestionItem) => void;
  selectedIndex?: number;
  searchFilter?: string;
  className?: string;
}

export interface GlowingBorderProps {
  intensity?: "low" | "medium" | "high";
  color?: string;
  animationSpeed?: number;
  className?: string;
  children?: React.ReactNode;
}

export interface ContentRendererProps {
  activeSection: string;
  data?: Record<string, unknown>;
  onBack?: () => void;
  className?: string;
}

// Theme and Animation Types
export type ThemeMode = "dark" | "light" | "system";
export type AnimationIntensity = "low" | "medium" | "high";
export type ViewMode = "palette" | "content";
