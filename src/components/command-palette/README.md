# Command Palette Components

This directory contains all components related to the command palette interface redesign.

## Component Structure

```
command-palette/
├── index.ts                    # Main exports
├── CommandPaletteLayout.tsx    # Main layout wrapper
├── CommandPaletteContainer.tsx # Main interface container
├── SearchInput.tsx             # Command input field
├── SuggestionsSection.tsx      # Navigation suggestions
├── SuggestionItem.tsx          # Individual navigation items
├── SettingsSection.tsx         # Profile and settings
├── ProfileItem.tsx             # Profile access component
├── SettingItem.tsx             # Individual settings
├── GlowingBorder.tsx          # Animated border effect
├── BackgroundEffects.tsx       # Ambient lighting effects
└── ContentRenderer.tsx         # Dynamic content display
```

## Usage

Import components from the main index:

```typescript
import {
  CommandPaletteLayout,
  CommandPaletteContainer,
  SearchInput,
} from "@/components/command-palette";
```

## Design Principles

- Dark theme with glowing border effects
- Keyboard navigation support
- Responsive design across all devices
- Smooth animations and transitions
- Accessibility-first approach
