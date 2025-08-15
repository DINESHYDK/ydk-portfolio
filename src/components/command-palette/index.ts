/**
 * Command Palette Components
 * Export all command palette related components
 */

export { default as GlowingBorder } from './GlowingBorder';
export { default as SearchInput } from './SearchInput';
export { default as SuggestionsSection } from './SuggestionsSection';
export { default as SettingsSection } from './SettingsSection';
export { default as SettingsSectionDemo } from './SettingsSectionDemo';
export { default as CommandPaletteContainer } from './CommandPaletteContainer';
export { default as ContentRenderer } from './ContentRenderer';
export { default as BackgroundEffects } from './BackgroundEffects';
export { default as CommandPaletteLayout } from './CommandPaletteLayout';
export { default as ErrorBoundary } from './ErrorBoundary';
export { default as LoadingSkeleton } from './LoadingSkeleton';

// Re-export types for convenience
export type {
  NavigationItem,
  NavigationCategory,
  SuggestionItem,
  AppState,
  UserPreferences,
  CommandPaletteContainerProps,
  SearchInputProps,
  SuggestionsSectionProps,
  GlowingBorderProps,
  ContentRendererProps,
  ThemeMode,
  AnimationIntensity,
  ViewMode,
} from '@/types/command-palette';