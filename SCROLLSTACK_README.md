# ScrollStack Project Section Implementation

## Overview

This project section implements a modern, interactive project showcase with a ScrollStack effect that displays project cards in a stacked, scrolling animation. The cards stack behind each other with scaling, blurring, and smooth animations while maintaining normal page scrolling.

## Features

### Visual Layout

- **Card Structure**: Each project card has two halves:
  - Left Half: Project title (top) → Brief description → Tech stack tags (bottom)
  - Right Half: Static project image/screenshot preview
- **Color Scheme**: Alternating subtle blue-to-violet gradients between cards
- **Card Styling**: Rounded corners (rounded-3xl), dark semi-transparent backgrounds with backdrop blur

### ScrollStack Animation

- **Stacking Effect**: Cards stack behind each other as you scroll
- **Scaling**: Background cards scale down progressively (baseScale: 0.9, itemScale: 0.03)
- **Blurring**: Cards behind the active one get blurred (blurAmount: 2)
- **Positioning**: Cards stick at 15% from top, release at 5% (stackPosition: "15%", scaleEndPosition: "5%")
- **Spacing**: 120px between cards, 30px stack distance

### Responsive Design

- **Mobile Layout**: Cards stack vertically (flex-col) on mobile, horizontally (flex-row) on desktop
- **Padding**: Responsive padding (p-4 sm:p-6 for cards, px-2 sm:px-4 for container)
- **Text Sizes**: Responsive typography (text-xl sm:text-2xl for titles, text-xs sm:text-sm for descriptions)
- **Tech Tags**: Smaller on mobile (text-[10px] sm:text-xs), show max 3 tags with "+X more" indicator

## Technical Implementation

### Core Components

#### WindowScrollStack Component

- Custom scroll stack that uses window scroll instead of container scroll
- Key features:
  - Uses `window.addEventListener('scroll')` for scroll detection
  - Calculates card positions with `getBoundingClientRect()`
  - Applies `transform: translate3d()` and `scale()` for animations
  - Implements blur filters for depth effect
  - No `overflow-y-auto` container (prevents scroll blocking)

#### ProjectStackCard Component

- Individual project card with:
  - Alternating gradients: blue (even index) vs violet (odd index)
  - Two-column layout: project info (left) + image preview (right)
  - Dark backgrounds: `bg-black/40` with gradient overlays (40-60% opacity)
  - Tech tags: border-only style, rounded-full, max 3 visible
  - Click handler: opens detailed modal

#### ProjectShowcase Container

- Main section wrapper with:
  - Filter buttons for project categories
  - AnimatePresence for smooth filter transitions
  - Modal integration for detailed project views
  - Keyboard navigation support

### Configuration

```tsx
<WindowScrollStack
  itemDistance={120} // Space between cards
  itemScale={0.03} // Scale reduction per card
  itemStackDistance={30} // Vertical offset when stacked
  stackPosition="15%" // Where cards start sticking
  scaleEndPosition="5%" // Where cards start scaling
  baseScale={0.9} // Minimum scale for background cards
  blurAmount={2} // Blur intensity for background cards
/>
```

### Key Features Implemented

#### 1. Scroll Integration

- **Window Scroll**: Use `window.addEventListener('scroll')` not container scroll
- **Position Calculation**: Use `getBoundingClientRect()` for accurate positioning
- **Performance**: Use `requestAnimationFrame` and transform caching
- **Passive Listeners**: Add `{ passive: true }` for better performance

#### 2. Modal System

- **Click Anywhere**: Entire card is clickable to open modal
- **Arrow Navigation**: Left/right arrows to navigate between projects
- **Close Options**: X button (top-right) + click outside to close
- **Keyboard Support**: ESC to close, arrow keys for navigation

#### 3. Filter System

- **Categories**: "All", "Web Apps", "AI Projects"
- **Smooth Transitions**: Use AnimatePresence for filter changes
- **Count Display**: Show project count for each category

#### 4. Auto-Navigation

```tsx
onStackComplete={() => {
  setTimeout(() => {
    const nextSection = document.querySelector("#skills, #contact, section:nth-of-type(4)");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }, 500);
}}
```

## File Structure

```
src/components/sections/
├── ProjectShowcase.tsx          // Main container
├── ProjectStackCard.tsx         // Individual card component
├── WindowScrollStack.tsx        // Custom scroll stack
├── ProjectModal.tsx            // Detailed project modal
└── FilterButton.tsx            // Category filter buttons

src/data/
└── projects.ts                 // Project data and utilities

src/types/
└── project-showcase.ts         // TypeScript interfaces
```

## CSS Classes

The implementation uses custom CSS classes for consistent styling:

```css
.scroll-stack-card {
  @apply relative w-full h-80 my-8 p-6 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top;
  will-change: transform, filter;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

.project-card-gradient-blue {
  @apply bg-gradient-to-br from-blue-500/40 to-blue-600/60 border-blue-400/60;
}

.project-card-gradient-violet {
  @apply bg-gradient-to-br from-violet-500/40 to-violet-600/60 border-violet-400/60;
}
```

## Performance Optimizations

- **Transform Caching**: Cache transform values to avoid unnecessary updates
- **Passive Listeners**: Use passive scroll listeners
- **Will-Change**: Set `will-change: 'transform, filter'` on cards
- **Transform3d**: Use `translate3d()` for hardware acceleration

## Dependencies

- `framer-motion`: For animations
- `react`: React framework
- `typescript`: TypeScript support
- `tailwindcss`: Utility-first CSS framework

## Usage

The ScrollStack project section is automatically integrated into the main page through the `Projects` component, which renders the `ProjectShowcase`. Users can:

1. **Scroll** to see the stacking effect
2. **Filter** projects by category
3. **Click** on cards to open detailed modals
4. **Navigate** between projects using arrow keys or buttons
5. **Experience** smooth animations and transitions

The section automatically navigates to the next section when the scroll stack is complete, providing a seamless user experience.
