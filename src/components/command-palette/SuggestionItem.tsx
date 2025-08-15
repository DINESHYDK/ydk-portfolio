/**
 * SuggestionItem Component
 * Individual navigation item with icon integration and hover states
 */

import React from "react";
import { cn } from "@/lib/utils";
import { getShortcutDisplay } from "@/lib/command-palette-utils";

export interface SuggestionItemProps {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  description?: string;
  isSelected?: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  className?: string;
}

const SuggestionItem = React.memo(
  React.forwardRef<HTMLButtonElement, SuggestionItemProps>(
    (
      {
        id,
        label,
        icon: Icon,
        shortcut,
        description,
        isSelected = false,
        onClick,
        onMouseEnter,
        className,
        ...props
      },
      ref
    ) => {
      const handleClick = () => {
        onClick();
      };

      const handleMouseEnter = () => {
        if (onMouseEnter) {
          onMouseEnter();
        }
      };

      return (
        <button
          ref={ref}
          type="button"
          className={cn(
            // Base styles
            "w-full",
            "flex items-center gap-3",
            "px-3 py-2.5",
            "text-left",
            "rounded-lg",
            "transition-all",
            "duration-200",
            "ease-out",
            "group",
            "relative",

            // Performance optimizations
            "transform-gpu",
            "will-change-transform",
            "backface-hidden",

            // Mobile touch target optimization
            "min-h-[44px]", // Minimum touch target size for mobile
            "touch-manipulation", // Optimize for touch

            // Default state
            "text-cp-text-primary",
            "bg-transparent",
            "border border-transparent",

            // Hover state (only on devices that support hover)
            "hover:bg-cp-hover",
            "hover:border-cp-border",
            "hover:text-cp-text-primary",
            "@media (hover: hover) { hover:transform hover:translateY(-0.5px) }",

            // Active state for touch devices
            "active:bg-cp-hover",
            "active:scale-[0.98]",
            "active:transition-transform active:duration-75",

            // Selected state
            isSelected && [
              "bg-cp-hover",
              "border-cp-border",
              "text-cp-text-primary",
              "shadow-sm",
            ],

            // Focus state
            "focus:outline-none",
            "focus:ring-2",
            "focus:ring-cp-focus/50",
            "focus:ring-offset-2",
            "focus:ring-offset-cp-background",

            // Custom class overrides
            className
          )}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          aria-selected={isSelected}
          role="option"
          aria-describedby={description ? `${id}-description` : undefined}
          {...props}
        >
          {/* Icon */}
          <div
            className={cn(
              "flex-shrink-0",
              "w-5 h-5",
              "transition-colors duration-200",
              "text-cp-text-secondary",
              "group-hover:text-cp-accent",
              isSelected && "text-cp-accent"
            )}
          >
            <Icon className="w-full h-full" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Label */}
            <div
              className={cn(
                "font-medium",
                "text-sm",
                "truncate",
                "transition-colors duration-200"
              )}
            >
              {label}
            </div>

            {/* Description */}
            {description && (
              <div
                id={`${id}-description`}
                className={cn(
                  "text-xs",
                  "text-cp-text-secondary",
                  "truncate",
                  "mt-0.5",
                  "transition-colors duration-200",
                  "group-hover:text-cp-text-secondary/80"
                )}
              >
                {description}
              </div>
            )}
          </div>

          {/* Keyboard Shortcut */}
          {shortcut && (
            <div className="flex-shrink-0 flex items-center gap-1">
              {getShortcutDisplay(shortcut)
                .split(" + ")
                .map((key, index, array) => (
                  <React.Fragment key={key}>
                    <kbd
                      className={cn(
                        "px-1.5 py-0.5",
                        "text-[10px]",
                        "font-mono",
                        "rounded",
                        "border",
                        "transition-all duration-200",
                        "bg-cp-border/30",
                        "border-cp-border/50",
                        "text-cp-text-secondary",
                        "group-hover:bg-cp-border/50",
                        "group-hover:border-cp-border",
                        "group-hover:text-cp-text-primary",
                        isSelected && [
                          "bg-cp-border/50",
                          "border-cp-border",
                          "text-cp-text-primary",
                        ]
                      )}
                    >
                      {key}
                    </kbd>
                    {index < array.length - 1 && (
                      <span className="text-cp-text-secondary/60 text-xs">
                        +
                      </span>
                    )}
                  </React.Fragment>
                ))}
            </div>
          )}

          {/* Selection indicator */}
          {isSelected && (
            <div
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2",
                "w-0.5 h-6",
                "bg-cp-accent",
                "rounded-r-full",
                "transition-all duration-200"
              )}
            />
          )}

          {/* Hover glow effect */}
          <div
            className={cn(
              "absolute inset-0",
              "rounded-lg",
              "opacity-0",
              "transition-opacity duration-200",
              "pointer-events-none",
              "group-hover:opacity-100",
              isSelected && "opacity-50",
              "bg-gradient-to-r from-cp-glow/5 via-cp-accent/5 to-cp-glow/5"
            )}
          />
        </button>
      );
    }
  )
);

SuggestionItem.displayName = "SuggestionItem";

export default SuggestionItem;
