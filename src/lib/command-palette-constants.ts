/**
 * Command Palette Constants
 * Configuration values and constants for the command palette system
 */

// Animation durations (in milliseconds)
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Keyboard shortcuts
export const KEYBOARD_SHORTCUTS = {
  OPEN_PALETTE: ['cmd+k', 'ctrl+k'],
  CLOSE_PALETTE: ['escape'],
  NAVIGATE_UP: ['arrowup'],
  NAVIGATE_DOWN: ['arrowdown'],
  SELECT_ITEM: ['enter'],
  GO_BACK: ['backspace'],
} as const;

// Command palette dimensions
export const PALETTE_DIMENSIONS = {
  MAX_WIDTH: '640px',
  MAX_HEIGHT: '400px',
  MIN_HEIGHT: '200px',
  BORDER_RADIUS: '12px',
} as const;

// Glow effect intensities
export const GLOW_INTENSITIES = {
  LOW: {
    blur: '10px',
    spread: '2px',
    opacity: 0.2,
  },
  MEDIUM: {
    blur: '20px',
    spread: '4px',
    opacity: 0.3,
  },
  HIGH: {
    blur: '30px',
    spread: '6px',
    opacity: 0.4,
  },
} as const;

// Z-index layers
export const Z_INDEX = {
  BACKGROUND: -1,
  CONTENT: 1,
  OVERLAY: 10,
  MODAL: 20,
  TOOLTIP: 30,
} as const;

// Responsive breakpoints
export const BREAKPOINTS = {
  MOBILE: '320px',
  TABLET: '768px',
  DESKTOP: '1024px',
  LARGE: '1280px',
} as const;

// Default navigation categories
export const DEFAULT_CATEGORIES = {
  SUGGESTIONS: 'suggestions',
  SETTINGS: 'settings',
} as const;

// Theme modes
export const THEME_MODES = {
  DARK: 'dark',
  LIGHT: 'light',
  SYSTEM: 'system',
} as const;

// View modes
export const VIEW_MODES = {
  PALETTE: 'palette',
  CONTENT: 'content',
} as const;