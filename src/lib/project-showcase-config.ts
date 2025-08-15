/**
 * Configuration constants for the Interactive Project Showcase
 */

export const ANIMATION_CONFIG = {
  // Hover animation timings
  HOVER_DELAY: 100, // ms
  HOVER_DURATION: 300, // ms
  
  // Modal animation timings
  MODAL_DURATION: 300, // ms
  
  // Filter animation timings
  FILTER_DURATION: 200, // ms
  
  // Animation easing
  EASING: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

export const HOVER_STATES = {
  DEFAULT: {
    imageOpacity: 1,
    buttonsTranslateY: 100,
    cardScale: 1,
  },
  HOVERED: {
    imageOpacity: 0.6,
    buttonsTranslateY: 0,
    cardScale: 1.02,
  },
} as const;

export const MODAL_STATES = {
  CLOSED: {
    scale: 0.8,
    opacity: 0,
    backdropOpacity: 0,
  },
  OPEN: {
    scale: 1,
    opacity: 1,
    backdropOpacity: 0.8,
  },
} as const;

export const FILTER_STATES = {
  HIDDEN: {
    gridItemOpacity: 0,
    gridItemScale: 0.8,
  },
  VISIBLE: {
    gridItemOpacity: 1,
    gridItemScale: 1,
  },
} as const;

export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
} as const;

export const GRID_COLUMNS = {
  MOBILE: 1,
  TABLET: 2,
  DESKTOP: 3,
} as const;

export const TOUCH_TARGETS = {
  MIN_SIZE: 44, // px - minimum touch target size for accessibility
} as const;